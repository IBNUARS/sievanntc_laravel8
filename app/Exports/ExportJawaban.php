<?php

namespace App\Exports;

use App\Models\Nilai;
use App\Models\Soal;
use App\Models\Jawaban;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportJawaban implements FromArray, ShouldAutoSize
{
    protected $id;
    public function __construct($id)
    {
        $this->id = $id;
    }

    public function array(): array
    {
        $nilai = Nilai::leftJoin('peserta','peserta.id','=','nilai.id_peserta')
            ->where('nilai.id_ujian','=',$this->id)
            ->orderBy('peserta.no_ujian', 'asc')->get();

        $data = array();
        $col = array(
            "NO",
            "NO UJIAN",
            "NAMA PESERTA",
            "ANGKATAN",
            "KELAS",
        );

        //buat nomor sesuai jumlah soal
        $soal = Soal::where('id_ujian','=',$this->id)->get();
        $nosoal = 1;
        foreach($soal as $s){
            $col[] = $nosoal;
            $nosoal++;
        }

        $col[] = "JML. BENAR";
        $col[] = "NILAI";
        $data[] = $col;

        $huruf = [1=>"A","B","C","D","E"];
        $no = 0;
        foreach($nilai as $list){
        	$no++;
        	$row = array();
        	$row[] = $no;
            $row[] = $list->no_ujian;
        	$row[] = $list->nama_peserta;
        	$row[] = $list->angkatan;
        	$row[] = $list->kelas;

            $soal = Soal::where('id_ujian','=',$this->id)->get();
           foreach($soal as $s){
                $jawaban = Jawaban::where([
                    'id_soal' => $s->id,
                    'id_peserta' => $list->id_peserta
                ])->first();

                if($jawaban) $row[] = $huruf[$jawaban->jawaban];
                else $row[] = "";
            }

            $row[] = $list->jml_benar;
            $row[] = $list->nilai;

            $data[] = $row;
        }

        return $data;
    }
}
