<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

use App\Models\Kelompok;
use App\Models\Ujian;
use App\Models\Sesi;
use App\Models\Peserta;
use App\Models\User;

use Inertia\Inertia;

use Redirect;

class AdminKelompokController extends Controller
{
    //tampilkan halaman manajemen data
    public function index(Request $request)
    {
        $request->session()->put('idujian',"");
        return Inertia::render('Kelompok/Index', [
            'ujian' => Ujian::all(),
        	'kelompok'=> []
        ]);
    }

    //tampilkan halaman data per ujian
    public function show(Request $request, $id)
    {        
        if($id) $request->session()->put('idujian', $id); 
        else  $request->session()->put('idujian', ""); 

        $kelompok = Kelompok::leftJoin('peserta', 'peserta.id', '=', 'kelompok.id_peserta')
            ->leftJoin('sesi','sesi.id','=','kelompok.id_sesi')
            ->select('peserta.no_ujian', 'peserta.nama_peserta', 'sesi.nama_sesi', 'kelompok.*')
            ->where('kelompok.id_ujian','=', $id)
            ->orderBy('peserta.no_ujian', 'asc')->get();

        return Inertia::render('Kelompok/Index', [
            'ujian' => Ujian::all(),
        	'kelompok'=> $kelompok,
            'id' => $id
        ]);
    }

    //Tampilkan halaman tambah data
    public function create(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        $peserta_kelompok = Kelompok::where('id_ujian', '=', $ujianaktif)->pluck('id_peserta')->all();
        $peserta = Peserta::whereNotIn('id', $peserta_kelompok)->get();
        return Inertia::render('Kelompok/Create',[
            'peserta' => $peserta,
            'ujian' => Ujian::all(),
            'sesi' => Sesi::where('id_ujian','=',$ujianaktif)->get(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    //Menyimpan tambah data
    public function store(Request $request){
        $request->validate([
            'peserta' => 'required',
            'id_ujian' => 'required',
            'id_sesi' => 'required',
        ]);

        foreach($request->peserta as $pst){
            $peserta = Peserta::where('no_ujian','=',$pst)->first();
            if($peserta!==null){
                $kelompok = new Kelompok;
                $kelompok->id_peserta = $peserta->id;
                $kelompok->id_ujian = $request->id_ujian;
                $kelompok->id_sesi = $request->id_sesi;
                $kelompok->save();
            }
        }

    	return Redirect::route('admin.kelompok.show', $request->id_ujian)
          ->with(['message'=>'Data berhasil ditambahkan']);
    }

    //Hapus 1 data
    public function destroy(Request $request, Kelompok $kelompok){
    	$kelompok->delete();

        $ujian = $request->session()->get('idujian');
    	return Redirect::route('admin.kelompok.show', $ujian)
           ->with(['message'=>'Data berhasil dihapus']);
    }

    //ketika ujian dipilih
    public function setUjian(Request $request, $id)
    {
        $request->session()->put('idujian', $id); 
        return Redirect::route('admin.kelompok.create');
    }
}
