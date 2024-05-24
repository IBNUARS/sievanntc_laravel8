<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Peserta extends Authenticatable
{
   protected $table = 'peserta';
   protected $fillable = [
      'no_ujian',
      'password',
      'nama_peserta',
      'jenis_kelamin',
      'angkatan',
      'kelas',
    ];

}

