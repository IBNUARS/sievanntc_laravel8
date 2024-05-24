<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth as Auth;
class CekLoginPeserta
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $peserta = Auth::guard('peserta')->user();
        if($peserta){
            return $next($request);
        }
        else  return redirect()->route('ujian.login');
    }
}
