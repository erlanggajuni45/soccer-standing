<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\teams;
use App\Models\matches;
use App\Models\standings;

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
            'home_team_id' => 'required|string',
            'away_team_id' => 'required|string|different:home_team_id',
            'home_score' => 'required|numeric|min:0',
            'away_score' => 'required|numeric|min:0',
        ];

        $messages = [
            'home_team_id.required' => 'Mohon pilih klub rumah',
            'away_team_id.required' => 'Mohon pilih klub tandang',
            'home_score.required' => 'Mohon isi skor klub rumah',
            'away_score.required' => 'Mohon isi skor klub tandang',
            'different' => 'Klub rumah dan klub tandang harus berbeda',
            'numeric' => 'Skor harus berupa angka',
            'min' => 'Skor tidak boleh kurang dari 0',
        ];

        foreach ($req->all() as $index => $data) {
            $validator = Validator::make($data, $rules, $messages);
            if ($validator->fails()) {
                $errors = $validator->errors();
                $errors->add('index', $index);
                return redirect()->back()->withErrors($errors);
            } else {
                $isExist = matches::where('home_team_id', $data['home_team_id'])
                                ->where('away_team_id', $data['away_team_id'])
                                ->count();
                if ($isExist > 0) {
                    return redirect()->back()->withErrors(['unique' => 'Pertandingan sudah ada']);
                }
            }
        }

        foreach ($req->all() as $data) {
            matches::create($data);
            $home_team = $data['home_team_id'];
            $away_team = $data['away_team_id'];

            $home_standing = standings::where('team_id', $home_team)->first();
            $away_standing = standings::where('team_id', $away_team)->first();

            $home_score = $data['home_score'];
            $away_score = $data['away_score'];

            if ($home_score > $away_score) {
                $home_standing->wins += 1;
                $home_standing->points += 3;

                $away_standing->loses += 1;
            } else if ($home_score < $away_score) {
                $away_standing->wins += 1;
                $away_standing->points += 3;

                $home_standing->loses += 1;
            } else {
                $home_standing->draws += 1;
                $away_standing->draws += 1;
                $home_standing->points += 1;
                $away_standing->points += 1;
            }

            $home_standing->total_matches += 1;
            $home_standing->goals_scored += $home_score;
            $home_standing->goals_against += $away_score;

            $away_standing->total_matches += 1;
            $away_standing->goals_scored += $away_score;
            $away_standing->goals_against += $home_score;

            $home_standing->save();
            $away_standing->save();
        }

        return Redirect::route('match.post');
    }
}
