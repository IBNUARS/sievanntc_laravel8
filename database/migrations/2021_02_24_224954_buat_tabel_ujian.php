<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class BuatTabelUjian extends Migration
{
    
    public function up()
    {
        Schema::create('ujian', function (Blueprint $table) {
            $table->id();
            $table->string('nama_ujian',100);
            $table->string('nama_mapel',100);
            $table->integer('jumlah_soal');
            $table->integer('durasi');
            $table->text('deskripsi');
            $table->enum('acak_soal',['Y','N']);
            $table->enum('acak_jawaban',['Y','N']);
            $table->enum('tampilkan_hasil',['Y','N']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ujian');
    }
}
