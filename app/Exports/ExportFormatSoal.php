<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportFormatSoal implements FromArray, ShouldAutoSize
{
    
    public function array(): array
    {
        $data = array();
        
        $data[] = array(
            "NO", 
            "SOAL", 
            "PILIHAN 1", 
            "PILIHAN 2", 
            "PILIHAN 3", 
            "PILIHAN 4", 
            "PILIHAN 5", 
            "KUNCI",
        );

        $data[] = array(
            1,
            "Jika Soal mengandung gambar, masukkan teksnya saja.",
            "Pilihan 1",
            "Pilihan 2",
            "Pilihan 3",
            "Pilihan 4",
            "Pilihan 5",
            "1-5",
        );
      

        return $data;
    }
}
