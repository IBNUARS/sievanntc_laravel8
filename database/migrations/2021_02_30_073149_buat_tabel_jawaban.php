<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class BuatTabelJawaban extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jawaban', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_peserta')->references('id')->on('peserta')->cascadeOnDelete();
            $table->foreignId('id_ujian')->references('id')->on('ujian')->cascadeOnDelete();
            $table->foreignId('id_soal')->references('id')->on('soal')->cascadeOnDelete();
            $table->integer('urut');
            $table->string('pilihan',20);
            $table->integer('jawaban');
            $table->integer('hasil');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jawaban');
    }
}
