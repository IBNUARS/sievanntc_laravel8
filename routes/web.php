<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminUjianController;
use App\Http\Controllers\Admin\AdminSoalController;
use App\Http\Controllers\Admin\AdminSesiController;
use App\Http\Controllers\Admin\AdminPesertaController;
use App\Http\Controllers\Admin\AdminNilaiController;
use App\Http\Controllers\Admin\AdminKelompokController;

use App\Http\Controllers\Front\LoginPesertaController;
use App\Http\Controllers\Front\HomeController;
use App\Http\Controllers\Front\UjianController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

// Auth     
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.attemp');
Route::post('/logout', [LoginController::class, 'logout']);

// Auth Peserta    
Route::get('/ujian/login', [LoginPesertaController::class, 'showLoginForm'])->name('ujian.login');
Route::post('/ujian/login', [LoginPesertaController::class, 'login'])->name('ujian.login.attemp');
Route::post('/ujian/logout', [LoginPesertaController::class, 'logout'])->name('ujian.logout');

//Admin     - hanya apat diakses oleh user level 1 (admin)
Route::group(['middleware' => 'auth', 'prefix' => '/admin', 'as'=>'admin.'], function(){
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profil', [UserController::class, 'profil'])->name('user.profil');
    Route::put('/user/{id}', [UserController::class, 'update'])->name('user.update');
    
	Route::resource('/ujian', AdminUjianController::class);
    Route::resource('/sesi', AdminSesiController::class); 
    
    Route::get('/soal/import', [AdminSoalController::class, 'importForm'])->name('soal.importform');
    Route::post('/soal/import', [AdminSoalController::class, 'import'])->name('soal.import');
    Route::get('/soal/format', [AdminSoalController::class, 'downloadFormat'])->name('soal.format');
    Route::resource('/soal', AdminSoalController::class);
    
    Route::get('/peserta/import', [AdminPesertaController::class, 'importForm'])->name('peserta.importform');
    Route::post('/peserta/import', [AdminPesertaController::class, 'import'])->name('peserta.import');
    Route::get('/peserta/export', [AdminPesertaController::class, 'export'])->name('peserta.export');
    Route::get('/peserta/format', [AdminPesertaController::class, 'downloadFormat'])->name('peserta.format');
    Route::get('/peserta/print', [AdminPesertaController::class, 'print'])->name('peserta.print');
    Route::get('/peserta/kartupdf', [AdminPesertaController::class, 'kartuPdf'])->name('peserta.kartupdf');
    Route::resource('/peserta', AdminPesertaController::class);

    Route::get('/kelompok/setujian/{id}', [AdminKelompokController::class, 'setUjian'])->name('kelompok.setujian');
    Route::resource('/kelompok', AdminKelompokController::class);

    Route::get('/nilai/export/{id}', [AdminNilaiController::class, 'export'])->name('nilai.export');
    Route::get('/nilai/exportjawaban/{id}', [AdminNilaiController::class, 'exportJawaban'])->name('nilai.export_jawaban');
    Route::get('/nilai/view/{id}', [AdminNilaiController::class, 'view'])->name('nilai.view');
    Route::resource('/nilai', AdminNilaiController::class);
    
});


//Peserta     - hanya apat diakses oleh user level 0
Route::group(['middleware' => 'peserta'], function(){
    Route::get('/', [HomeController::class, 'index']);
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    
    Route::post('/ujian/{id}/konfirmasi', [UjianController::class, 'konfirmasi'])->name('ujian.konfirmasi');
    
    Route::post('/ujian/{id}', [UjianController::class, 'mulai'])->name('ujian.mulai');
    Route::get('/ujian/{page}', [UjianController::class, 'ujian'])->name('ujian');
    Route::put('/ujian/{page}', [UjianController::class, 'halaman'])->name('ujian.halaman');
    
    Route::put('/ujian/{id}/update', [UjianController::class, 'update_durasi'])->name('ujian.update');
    Route::post('/ujian/{id}/jawab', [UjianController::class, 'jawab'])->name('ujian.jawab');
    Route::put('/ujian/{id}/selesai', [UjianController::class, 'selesai'])->name('ujian.selesai');
    Route::get('/ujian/{id}/hasil', [UjianController::class, 'hasil'])->name('ujian.hasil');
});