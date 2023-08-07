<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\teams;
use App\Models\matches;

class MatchController extends Controller
{
    public function show() {
        $teams = teams::all();
        return Inertia::render('Match/Index', [
            'teams' => $teams,
        ]);
    }

    public function create(Request $req) {
        $rules = [
            'home_team_id' => 'required|string|unique:matches,home_team_id,NULL,id,away_team_id,' . request()->get('away_team_id'),
            'away_team_id' => 'required|string|different:home_team_id|unique:matches,away_team_id,NULL,id,home_team_id,' . request()->get('home_team_id'),
            'home_score' => 'required|numeric|min:0',
            'away_score' => 'required|numeric|min:0',
        ];

        $messages = [
            'home_team_id.required' => 'Mohon pilih klub rumah',
            'away_team_id.required' => 'Mohon pilih klub tandang',
            'home_score.required' => 'Mohon isi skor klub rumah',
            'away_score.required' => 'Mohon isi skor klub tandang',
            'different' => 'Klub rumah dan klub tandang harus berbeda',
            'unique' => 'Pertandingan sudah ada',
            'numeric' => 'Skor harus berupa angka',
            'min' => 'Skor tidak boleh kurang dari 0',
        ];

        foreach ($req->all() as $index => $data) {
            $validator = Validator::make($data, $rules, $messages);
            if ($validator->fails()) {
                $errors = $validator->errors();
                $errors->add('index', $index);
                return redirect()->back()->withErrors($errors);
            }
        }

        // foreach ($req->all() as $index => $data) {
        //     matches::create(Validator::make($data, $rules, $messages));
        // }

        return Redirect::route('match.post');
    }
}
