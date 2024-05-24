<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ujian;
use App\Models\Soal;
use Inertia\Inertia;

use App\Imports\ImportSoal;
use App\Exports\ExportFormatSoal;
use Excel;

use Redirect;

class AdminSoalController extends Controller
{
    //tampilkan halaman manajemen data
    public function index(Request $request)
    {
        $request->session()->put('idujian', "");

        return Inertia::render('Soal/Index', [
            'ujian'=> Ujian::all(),
            'soal'=> [],
            'id' => 0
        ]);
    }

    //tampilkan halaman data per ujian
    public function show(Request $request, $id)
    {
        if($id!=0) $request->session()->put('idujian', $id);
        else  $request->session()->put('idujian', "");

        $soal = Soal::orderBy('id', 'desc')->where('id_ujian', '=', $id)->get();

        return Inertia::render('Soal/Index', [
            'ujian'=> Ujian::all(),
            'soal'=> $soal,
            'id' => $id
        ]);
    }

    //Tampilkan halaman tambah data
    public function create(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Soal/Create', [
            'ujian'=> Ujian::all(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    //Menyimpan tambah data
    public function store(Request $request){
        $request->validate([
            'soal' => 'required',
            'id_ujian' => 'required',
            'pilihan_1' => 'required',
            'pilihan_2' => 'required',
            'kunci' => 'required',
        ]);

    	$soal = new Soal;
    	$soal->soal = $request->soal;
    	$soal->id_ujian = $request->id_ujian;
    	$soal->pilihan_1 = $request->pilihan_1;
    	$soal->pilihan_2 = $request->pilihan_2;
    	$soal->pilihan_3 = $request->pilihan_3;
    	$soal->pilihan_4 = $request->pilihan_4;
    	$soal->pilihan_5 = $request->pilihan_5;
    	$soal->kunci = $request->kunci;
    	$soal->save();

    	return Redirect::route('admin.soal.show', $request->id_ujian)
          ->with(['message'=>'Data berhasil ditambahkan']);
    }

    //tampilkan halaman edit data
    public function edit(Request $request, Soal $soal){
        $ujianaktif = $request->session()->get('idujian');
    	return Inertia::render('Soal/Edit', [
            'soal'=> $soal,
            'ujian'=> Ujian::all(),
            'ujianaktif' => $ujianaktif
    	]);
    }

    //simpan edit data
    public function update(Request $request, Soal $soal){
        $request->validate([
            'soal' => 'required',
            'id_ujian' => 'required',
            'pilihan_1' => 'required',
            'pilihan_2' => 'required',
            'kunci' => 'required',
        ]);

    	$soal->update($request->all());

    	return Redirect::route('admin.soal.show', $request->id_ujian)
           ->with(['message'=>'Data berhasil diedit']);
    }

    //Hapus 1 data
    public function destroy(Request $request, Soal $soal){
    	$soal->delete();

        $ujian = $request->session()->get('idujian');
    	return Redirect::route('admin.soal.show', $ujian)
           ->with(['message'=>'Data berhasil dihapus']);
    }


    //tampilkan halaman impor data
    public function importForm(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Soal/Import', [
            'ujian'=> Ujian::all(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    //proses import data
    public function import(Request $request)
    {
        $this->validate($request, [
            'id_ujian' => 'required',
            'file_import' => 'required|mimes:xlsx'
        ]);

        $file = $request->file('file_import');
        $soal = new ImportSoal($request->id_ujian);

        Excel::import($soal, $file);

        return Redirect::route('admin.soal.show', $request->id_ujian)
            ->with(['message'=>'Data Soal berhasil diimpor']);
    }

    //download format untuk impor
    public function downloadFormat(){
        $format = new ExportFormatSoal();
        return Excel::download($format, 'Format Soal.xlsx');
    }
}
