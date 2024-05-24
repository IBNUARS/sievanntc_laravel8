<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

use App\Models\Peserta;

use Inertia\Inertia;
use Redirect;
use Auth;

class LoginPesertaController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;


    //Menampilkan halaman login
    public function showLoginForm()
    {
        return Inertia::render('Front/Login');
    }

    //Proses login peserta
    protected function login(Request $rq)
    {
        //validasi input
        $this->validate($rq, [
            'no_ujian' => 'required|exists:peserta',
            'password' => 'required',
        ],[
            'no_ujian.exists' => "No. ujian tidak terdaftar",
        ]);

        //cek no ujian dan password
        $peserta = Peserta::where([
            'no_ujian' => $rq->no_ujian,
            'password' => $rq->password
        ])->first();

        if($peserta){//jika ditemukan
            Auth::guard('peserta')->login($peserta); //proses login
            return Redirect::route('home');
        }
        else return Redirect::back()->withErrors(['password'=>'Password salah!']);
    }

    //logout peserta
    public function username(){
        Auth::logout();
        return Redirect::route('ujian.login');
    }
}