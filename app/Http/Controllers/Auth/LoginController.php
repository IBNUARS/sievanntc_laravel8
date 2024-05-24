<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Redirect;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    //Menampilkan halaman login
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    //Mengarahkan ke halaman admin/dashboard
    protected function authenticated(Request $request, $user)
    {
        return Redirect::route('admin.dashboard');
    }

    //Agar login dengan username
    public function username(){
        return 'username';
    }
 
    //Custome logout laravel
    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}