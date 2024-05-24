<?php

namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;

use App\Models\Ujian;
use App\Models\Nilai;
use App\Models\Peserta;
use App\Models\Soal;
use App\Models\Jawaban;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Auth;
use Redirect;
use Response;
use Carbon\Carbon;
class UjianController extends Controller
{
    //untuk menangani halaman konfirmasi
    public function konfirmasi($id)
    {
        $ujian = Ujian::find($id); //cek data ujian
        $peserta = Auth::guard('peserta')->user(); //ambil peserta login

        $nilai = Nilai::where([
            ['id_peserta','=',$peserta->id],
            ['id_ujian','=',$id],
        ])->first();

        return Inertia::render('Front/UjianKonfirmasi',[
            'ujian' => $ujian,
            'peserta' => $peserta,
            'nilai' => $nilai
        ]);
    }

    //mulai mengerjakan ujian
    public function mulai(Request $rq, $id){
        $rq->session()->put('ujian', $id); //buat session ujian
        $peserta = Auth::guard('peserta')->user(); //ambil peserta login

        //update mulai pada tabel nilai
        $nilai = Nilai::where([
            'id_peserta' => $peserta->id,
            'id_ujian' => $id
        ])->first();
        $nilai->mulai = Carbon::now();
        $nilai->update();

        //ambil semua soal sesuai id ujian
        $ujian = Ujian::find($id);
        $soal = Soal::where('id_ujian', '=', $id);
        if($ujian->acak_soal == 'Y') $soal = $soal->inRandomOrder();
        $soal = $soal->get();

        $urut = 1;
        foreach($soal as $s){
            //cek apakah sudah ada data jawaban
            $jawaban = Jawaban::where([
                'id_peserta' => $peserta->id,
                'id_soal' =>  $s->id
            ])->first();

            //buat array pilihan
            $pilihan = [1,2];
            if(!empty($s->pilihan_3)) $pilihan[] = 3;
            if(!empty($s->pilihan_4)) $pilihan[] = 4;
            if(!empty($s->pilihan_5)) $pilihan[] = 5;

            //acak pilihan
            if($ujian->acak_jawaban == 'Y') shuffle($pilihan);

            //jika belum ada, buatkan data jawaban
            if($jawaban){
                $jawaban->urut = $urut;
                $jawaban->update();
            }else{
                $jawaban = new Jawaban;
                $jawaban->id_peserta = $peserta->id;
                $jawaban->id_ujian = $id;
                $jawaban->id_soal = $s->id;
                $jawaban->urut = $urut;
                $jawaban->jawaban = 0;
                $jawaban->pilihan = implode(",", $pilihan);
                $jawaban->hasil = 0;
                $jawaban->save();
            }
            $urut++;
        }

        //redirect ke ujian halaman 1
        return Redirect::route('ujian', 1);
    }

    //Halaman ujian
    public function ujian(Request $rq, $page){
        $idujian = $rq->session()->get('ujian'); //ambil data ujian aktif (sesuai session ujian)
        $peserta = Auth::guard('peserta')->user();

        if($idujian == null){ //jika tidak ada session ujian, arahkan ke home
            return Redirect::route('home');
        }else{
           //ambil semua soal
           $semuasoal = Jawaban::leftJoin('soal', 'jawaban.id_soal', '=', 'soal.id')
                ->where([
                    'soal.id_ujian' => $idujian,
                    'jawaban.id_peserta' => $peserta->id
                ])
                ->select('soal.*', 'jawaban.jawaban', 'jawaban.urut')
                ->orderBy('jawaban.urut')
                ->get();

            //hitung jawaban sudah dikerjakan
            $dikerjakan = Jawaban::leftJoin('soal', 'jawaban.id_soal', '=', 'soal.id')
                ->where([
                    'soal.id_ujian' => $idujian,
                    'jawaban.id_peserta' => $peserta->id
                ])
                ->where('jawaban.jawaban','!=',0)
                ->count();

            //ambil data soal yang sedang aktif (sesuai $page)
            $soalaktif =Jawaban::leftJoin('soal', 'jawaban.id_soal', '=', 'soal.id')
                ->where([
                    'soal.id_ujian' => $idujian,
                    'jawaban.id_peserta' => $peserta->id,
                    'jawaban.urut'=>$page
                ])
                ->select('soal.*', 'jawaban.jawaban', 'jawaban.pilihan')
                ->first();

            if($soalaktif) $pilihan = explode(",", $soalaktif->pilihan);
            else $pilihan = [];

            //ambil data nilai untuk ambil sisa durasi
            $nilai = Nilai::where([
                'id_peserta' => $peserta->id,
                'id_ujian' => $idujian
            ])->first();

            $ujian = Ujian::find($idujian);

            return Inertia::render('Front/Ujian', [
                'soal' => $semuasoal,
                'soalaktif' => $soalaktif,
                'pilihan' => $pilihan,
                'ujian' => $ujian,
                'nosoal' => $page,
                'dikerjakan' => $dikerjakan,
                'nilai' => $nilai
            ]);
        }
    }

    //update durasi (diakses dengan axios.post)
    public function update_durasi(Request $rq, $id)
    {
        $nilai = Nilai::find($id);
        $nilai->durasi = $rq->durasi;
        $nilai->update();

        return Response::json(['success'=> true]);
    }

    //pindah halaman ujian dengan menyertakan sisa durasi
    public function halaman(Request $rq, $page){
        return Redirect::route('ujian', $page)
            ->with(['durasi' => $rq->durasi]);
    }

    //kirim jawaban ketika menjawab
    public function jawab(Request $rq){
        $idsoal = $rq->soal;
        $jawab = $rq->jawab;
        $page = $rq->nosoal;
        $durasi = $rq->durasi;
        $ujian = $rq->ujian;

        $peserta = Auth::guard('peserta')->user();

        //update durasi pada tabel nilai
        $nilai = Nilai::where([
            'id_peserta' => $peserta->id,
            'id_ujian' => $ujian
        ])->first();
        $nilai->durasi = $durasi;
        $nilai->update();

        //cek soal dan jawaban
        $soal = Soal::find($idsoal);
        $jawaban = Jawaban::where([
            'id_soal' => $idsoal,
            'id_peserta' => $peserta->id
        ])->first();

        //tentukan hasil sesuai jawaban. 1 jika sama dengan kunci
        if($soal->kunci == $jawab){
            $hasil = 1;
        }else{
            $hasil = 0;
        }

        //update jawaban dan hasil
        if($jawaban){
            $jawaban->jawaban = $jawab;
            $jawaban->hasil = $hasil;
            $jawaban->update();
        }

        return Redirect::back();
    }

    public function selesai(Request $rq, $ujian){
        $peserta = Auth::guard('peserta')->user();

        //hitung jawaban benar (nilainya 1)
        $jmlbenar = Jawaban::leftJoin('soal', 'jawaban.id_soal', '=', 'soal.id')
             ->where([
                'soal.id_ujian' => $ujian,
                'jawaban.id_peserta' => $peserta->id,
                'jawaban.hasil' => 1
             ])->count();

        //hitung jumlah soal
        $jmlsoal = Soal::where('id_ujian','=', $ujian)->count();

        //hitung nilai dan update ke tabel nilai
        $nilaiujian = round($jmlbenar/$jmlsoal*100, 2);
        $nilai = Nilai::where([
            'id_peserta' => $peserta->id,
            'id_ujian' => $ujian
        ])->first();

        $nilai->selesai = Carbon::now();
        $nilai->jml_benar = $jmlbenar;
        $nilai->nilai = $nilaiujian;
        $nilai->update();

        //hapus session ujian
        $rq->session()->forget('ujian');
        return Redirect::route('ujian.hasil', $ujian);
    }

    public function hasil($id){
        $ujian = Ujian::find($id);
        $peserta = Auth::guard('peserta')->user();

        //ambil data nilai
        $nilai = Nilai::where([
            'id_peserta' => $peserta->id,
            'id_ujian' => $id,
        ])->first();

        return Inertia::render('Front/UjianHasil',[
            'ujian' => $ujian,
            'peserta' => $peserta,
            'nilai' => $nilai
        ]);
    }

}
