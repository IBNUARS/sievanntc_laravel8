<?php

namespace App\Imports;

use App\Models\soal;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportSoal implements ToCollection, WithHeadingRow
{
    protected $id;
    public function __construct($id)
    {
        $this->id = $id; 
    }

    public function collection(Collection $rows)
    {
      foreach ($rows as $row) 
      {
            //insert soal 
            Soal::create([
              'id_ujian' => $this->id,
              'soal' => $row['soal'],
              'pilihan_1' => $row['pilihan_1'],
              'pilihan_2' => $row['pilihan_2'],
              'pilihan_3' => $row['pilihan_3'],
              'pilihan_4' => $row['pilihan_4'],
              'pilihan_5' => $row['pilihan_5'],
              'kunci' => $row['kunci'],
            ]);    
      }
    }
}
