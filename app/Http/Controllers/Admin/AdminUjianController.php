<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ujian;
use App\Models\Soal;
use Inertia\Inertia;

use Redirect;

class AdminUjianController extends Controller
{
    //tampilkan halaman manajemen data
    public function index()
    {
        $ujian = Ujian::orderBy('id', 'desc')->get();

        return Inertia::render('Ujian/Index', [
        	'ujian'=> $ujian
        ]);
    }

    //Tampilkan halaman tambah data
    public function create()
    {
        return Inertia::render('Ujian/Create');
    }

    //Menyimpan tambah data
    public function store(Request $request){
        $request->validate([
            'nama_ujian' => 'required',
            'nama_mapel' => 'required',
            'jumlah_soal' => 'required',
            'durasi' => 'required',
            'deskripsi' => 'required',
        ]);

    	Ujian::create($request->all());

    	return Redirect::route('admin.ujian.index')
          ->with(['message'=>'Data berhasil ditambahkan']);
    }

    //tampilkan halaman edit data
    public function edit(Ujian $ujian){
    	return Inertia::render('Ujian/Edit', [
    		'ujian'=>$ujian
    	]);
    }

    //simpan edit data
    public function update(Request $request, Ujian $ujian){
        $request->validate([
            'nama_ujian' => 'required',
            'nama_mapel' => 'required',
            'jumlah_soal' => 'required',
            'durasi' => 'required',
            'deskripsi' => 'required',
        ]);
        
    	$ujian->update($request->all());

    	return Redirect::route('admin.ujian.index')
           ->with(['message'=>'Data berhasil diedit']);
    }

    //Hapus 1 data
    public function destroy(Ujian $ujian){
    	$ujian->delete();

    	return Redirect::route('admin.ujian.index')
           ->with(['message'=>'Data berhasil dihapus']);
    }

}
