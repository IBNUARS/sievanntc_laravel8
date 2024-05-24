<?php

namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;

use App\Models\Peserta;
use App\Models\Ujian;
use App\Models\Kelompok;
use App\Models\Nilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Auth;
use Redirect;
class HomeController extends Controller
{
    
    public function index()
    {
        //ambil data peserta login
        $peserta = Auth::guard('peserta')->user();

        //ambil semua ujian pada tabel kelompok sesuai id peserta
        $ujian = Kelompok::leftJoin('ujian','kelompok.id_ujian','=','ujian.id')
            ->leftJoin('sesi','kelompok.id_sesi', '=', 'sesi.id')
            ->where('kelompok.id_peserta','=', $peserta->id)
            ->select('ujian.*', 'sesi.nama_sesi', 'sesi.mulai', 'sesi.selesai')
            ->get();

        $data = [];
        foreach($ujian as $uji){
            //cek data nilai 
            $nilai = Nilai::where([
                'id_peserta' =>  $peserta->id,
                'id_ujian' => $uji->id ,
            ])->first();
            
            if($nilai == null){ //buatkan data nilai dengan nilai sementara 0 jika belum ada
                $nilai = new Nilai;
                $nilai->id_peserta = $peserta->id;
                $nilai->durasi = $uji->durasi * 60000;
                $nilai->id_ujian = $uji->id;
                $nilai->jml_benar = 0;
                $nilai->nilai = 0;
                $nilai->save();
            }

            $data[] = [
                'ujian' => $uji,
                'nilai' => $nilai
            ];
        }

        return Inertia::render('Front/Home',[
            'data' => $data
        ]);
    }

}
