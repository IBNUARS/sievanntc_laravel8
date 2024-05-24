<?php

namespace App\Exports;

use App\Models\Peserta;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportPeserta implements FromArray, ShouldAutoSize
{

    public function array(): array
    {
        $peserta = Peserta::all();

        $data = array();
        $data[] = array(
            "NO",
            "NO UJIAN",
            "NAMA PESERTA",
            "JENIS KELAMIN",
            "ANGKATAN",
            "KELAS",
            "PASSWORD",
        );
        $no = 0;
        foreach($peserta as $list){
        	$no++;
        	$row = array();
        	$row[]    = $no;
            $row[]    = $list->no_ujian;
        	$row[]    = $list->nama_peserta;
            $row[]    = $list->jenis_kelamin;
            $row[]    = $list->angkatan;
            $row[]    = $list->kelas;
            $row[]    = $list->password;

            $data[] = $row;
        }

        return $data;
    }
}
