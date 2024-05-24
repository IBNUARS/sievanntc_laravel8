<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportFormatPeserta implements FromArray, ShouldAutoSize
{

    public function array(): array
    {
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

        $data[] = array(
            1,
            "No Unik",
            "Contoh Nama",
            "L/P",
            "Angkatan ke",
            "Nama Kelas",
            "Terserah/kosongkan",
        );

        return $data;
    }
}
