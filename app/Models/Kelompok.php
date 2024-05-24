<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelompok extends Model
{

   protected $table = 'kelompok';
   protected $fillable = [
    'id_peserta',
    'id_ujian',
    'id_sesi',
   ];

}
