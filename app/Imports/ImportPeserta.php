<?php

namespace App\Imports;

use App\Models\Peserta;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportPeserta implements ToCollection, WithHeadingRow
{
   public function collection(Collection $rows)
   {
      foreach ($rows as $row)
      {
         if($row['jenis_kelamin']=="L" ) $jenis_kelamin = "L";
         else $jenis_kelamin = 'P';

         if($row['password'] != "") $password = $row['password'];
         else $password = substr(md5($row['no_ujian']),0,5);

         $peserta = Peserta::where('no_ujian','=',$row['no_ujian'])->first();
         if ($peserta === null) {
            //insert peserta jika peserta dg no_ujian tsb belum ada
            Peserta::create([
               'no_ujian' => $row['no_ujian'],
               'nama_peserta' => $row['nama_peserta'],
               'jenis_kelamin' => $jenis_kelamin,
               'angkatan' => $row['angkatan'],
               'kelas' => $row['kelas'],
               'password' => $password,
            ]);
         } else {
            //update peserta jika peserta dg no_ujian tsb sudah ada  \
            $peserta->update([
               'nama_peserta' => $row['nama_peserta'],
               'jenis_kelamin' => $jenis_kelamin,
               'angkatan' => $row['angkatan'],
               'kelas' => $row['kelas'],
            ]);
         }
      }
   }
}
