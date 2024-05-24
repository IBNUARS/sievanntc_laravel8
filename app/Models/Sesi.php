<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sesi extends Model
{

   protected $table = 'sesi';
   protected $fillable = [
      'id_ujian',
      'nama_sesi',
      'mulai',
      'selesai',
    ];

}
