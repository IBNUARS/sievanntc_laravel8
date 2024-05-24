<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ujian extends Model
{

   protected $table = 'ujian';
   protected $fillable = [
      'nama_ujian',
      'nama_mapel',
      'jumlah_soal',
      'durasi',
      'deskripsi',
      'acak_soal',
      'acak_jawaban',
      'tampilkan_hasil'
   ];
  
}
