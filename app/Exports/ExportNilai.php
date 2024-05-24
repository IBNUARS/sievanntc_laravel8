<?php

namespace App\Exports;

use App\Models\Nilai;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportNilai implements FromArray, ShouldAutoSize
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
        $data[] = array(
            "NO",
            "NO UJIAN",
            "NAMA PESERTA",
            "ANGKATAN",
            "KELAS",
            "MULAI",
            "SELESAI",
            "JML BENAR",
            "NILAI"
        );
        $no = 0;
        foreach($nilai as $list){
        	$no++;
        	$row = array();
        	$row[] = $no;
            $row[] = $list->no_ujian;
        	$row[] = $list->nama_peserta;
        	$row[] = $list->angkatan;
        	$row[] = $list->kelas;
            $row[] = $list->mulai;
            $row[] = $list->selesai;
            $row[] = $list->jml_benar;
            $row[] = $list->nilai;

            $data[] = $row;
        }

        return $data;
    }
}
