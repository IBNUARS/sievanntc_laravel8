<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;

use Redirect;

class UserController extends Controller
{
    //tampilkan halaman profil user
    public function profil(){
        //Arahkan user ke halaman yang 
    	return Inertia::render(
            'User/Profil', [
            'user'=> Auth::user()
    	]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required',
            'username' => 'required',
            'email' => 'required',
            'password1' => 'same:password2',
            'password2' => 'same:password1',
        ]);
        
        $user = User::find($id);
    	$user->name        = $request->name;
        $user->username    = $request->username;
        $user->email       = $request->email;

        //Ubah password hanya jika ada perubahan (input password tidak kosong)
        if(!empty($request->password1 or !empty($request->password2))){
           $user->password = Hash::make($request->password1); //Enkripsi password dg Hash agar aman
        }

        if($request->hasFile('picture')){ //upload foto hanya jika ada perubahan foto
            //hapus file foto sebelumnya
            if($user->picture!=null and $user->picture!='user.gif' and file_exists(public_path('images/icon/'.$user->picture))){
                unlink(public_path('images/icon/'.$user->picture));
            }
            $image_name = "user-".time().'.'.$request->picture->extension();  
            $request->picture->move(public_path('images/icon/'), $image_name);

            $user->picture   = $image_name;
        }

     	$user->update();

    	return Redirect::route('admin.user.profil')
            ->with(['message'=>'Data berhasil diperbarui']);
    }
    
}
