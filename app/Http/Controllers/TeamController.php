<?php

namespace App\Http\Controllers;

use App\Models\teams;
use App\Models\standings;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
            'name.required' => 'Mohon isi nama klub',
            'name.max' => 'Nama klub tidak boleh lebih dari 100 karakter',
            'city.required' => 'Mohon isi kota klub',
            'city.max' => 'Kota klub tidak boleh lebih dari 50 karakter',
            'unique' => 'Kombinasi nama dan kota klub sudah ada',
        ];

        $validator = Validator::make($req->all(), $rules, $messages)->validate();

        $result = teams::create($validator);

        $dataStandings = [
            'team_id' => $result->id,
            'total_matches' => 0,
            'wins' => 0,
            'draws' => 0,
            'loses' => 0,
            'goals_scored' => 0,
            'goals_against' => 0,
            'points' => 0,
        ];

        standings::create($dataStandings);

        return Redirect::route('team.post');
    }
}
