<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{

   protected $table = 'nilai';
   protected $fillable = [
      'id_peserta',
      'id_ujian',
      'durasi',
      'mulai',
      'selesai',
      'jml_benar',
      'nilai', 
    ];

}
