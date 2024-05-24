<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

use App\Models\Peserta;
use App\Models\User;
use App\Models\Jawaban;
use App\Models\Kelompok;
use App\Models\Nilai;

use Inertia\Inertia;
use App\Imports\ImportPeserta;
use App\Exports\ExportPeserta;
use App\Exports\ExportFormatPeserta;
use Excel;
use PDF;

use Redirect;

class AdminPesertaController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $peserta = Peserta::orderBy('peserta.no_ujian', 'asc')->get();

        return Inertia::render('Peserta/Index', [
        	'peserta'=> $peserta
        ]);
    }

    //Tampilkan halaman tambah data
    public function create()
    {
        return Inertia::render('Peserta/Create');
    }

    //Menyimpan tambah data
    public function store(Request $request){
        $request->validate([
            'no_ujian' => 'required|unique:peserta',
            'nama_peserta' => 'required',
            'jenis_kelamin' => 'required',
            'angkatan' => 'required',
            'kelas' => 'required',
        ]);

    	if($request->password == "") $password = substr(md5($request->no_ujian),0,5);
        else $password = $request->password;

    	Peserta::create([
            'no_ujian' => $request->no_ujian,
            'nama_peserta' => $request->nama_peserta,
            'jenis_kelamin' => $request->jenis_kelamin,
            'angkatan' => $request->angkatan,
            'kelas' => $request->kelas,
            'password' => $password
        ]);

    	return Redirect::route('admin.peserta.index')
          ->with(['message'=>'Data berhasil ditambahkan']);
    }

    //tampilkan halaman edit data
    public function edit($id){
    	return Inertia::render('Peserta/Edit', [
    		'peserta'=> Peserta::find($id)
    	]);
    }

    //simpan edit data
    public function update(Request $request, $id){
        $request->validate([
            'no_ujian' => 'required',
            'nama_peserta' => 'required',
            'jenis_kelamin' => 'required',
            'angkatan' => 'required',
            'kelas' => 'required',
        ]);
        $peserta = Peserta::find($id);

        if($request->password != "") $password = $request->password;
        else $password = $peserta->password;

    	$peserta->update([
            'no_ujian' => $request->no_ujian,
            'nama_peserta' => $request->nama_peserta,
            'jenis_kelamin' => $request->jenis_kelamin,
            'angkatan' => $request->angkatan,
            'kelas' => $request->kelas,
            'password' => $password
        ]);

    	return Redirect::route('admin.peserta.index')
           ->with(['message'=>'Data berhasil diedit']);
    }

    //Hapus 1 data
    public function destroy($id){
    	Peserta::find($id)->delete();

        Kelompok::where('id_peserta','=',$id)->delete();
        Jawaban::where('id_peserta','=',$id)->delete();
        Nilai::where('id_peserta','=',$id)->delete();

    	return Redirect::route('admin.peserta.index')
           ->with(['message'=>'Data berhasil dihapus']);
    }

    //tampilkan halaman impor data
    public function importForm()
    {
        return Inertia::render('Peserta/Import');
    }

    //proses import data
    public function import(Request $request)
    {
        $this->validate($request, [
            'file_import' => 'required'
        ]);

        $file = $request->file_import;

        $peserta = new ImportPeserta();

        Excel::import($peserta, $file);

        return Redirect::route('admin.peserta.index')
            ->with(['message'=>'Data peserta berhasil diimpor']);
    }

    //download excel
    public function export(){
        $peserta = new ExportPeserta();
        return Excel::download($peserta, 'Data Peserta.xlsx');
    }

    //download format untuk impor
    public function downloadFormat(){
        $format = new ExportFormatPeserta();
        return Excel::download($format, 'Format Data Peserta.xlsx');
    }

    //halaman cetak kartu
    public function print()
    {
        return Inertia::render('Peserta/Print');
    }

    //kartu pdf
    public function kartuPdf()
    {
        $peserta = Peserta::orderBy('peserta.no_ujian', 'asc')->get();

        $pdf = PDF::loadView('kartu_pdf', compact('peserta'));
        return $pdf->stream();
    }
}
