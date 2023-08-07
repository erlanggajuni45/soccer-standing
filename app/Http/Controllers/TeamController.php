<?php

namespace App\Http\Controllers;

use App\Models\teams;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Redirect;


class TeamController extends Controller
{
    public function show() {
        return Inertia::render('Team/Index', []);
    }

    public function create(Request $req) {
        $rules = [
            'name' => 'required|string|max:100|unique:teams,name,NULL,id,city,' . request()->get('city'),
            'city' => 'required|string|max:50|unique:teams,city,NULL,id,name,' . request()->get('name'),
        ];


        $messages = [
            'name.required' => 'Mohon isi kolom nama klub',
            'city.required' => 'Mohon isi kolom kota klub',
            'unique' => 'Nama dan kota klub sudah ada!',
        ];

        $validator = Validator::make($req->all(), $rules, $messages)->validate();

        teams::create($validator);

        return Redirect::route('team.post');
    }
}
