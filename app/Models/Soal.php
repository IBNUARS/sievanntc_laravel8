<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soal extends Model
{

   protected $table = 'soal';
   protected $fillable = [
     'id_ujian',
      'soal',
      'pilihan_1',
      'pilihan_2',
      'pilihan_3',
      'pilihan_4',
      'pilihan_5',
      'kunci',
   ];
}
