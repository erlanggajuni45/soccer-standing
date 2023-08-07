<?php

namespace App\Http\Controllers;

use App\Models\standings;
use App\Models\teams;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandingController extends Controller
{
    public function show() {
        $standings = standings::join('teams', 'standings.team_id', '=', 'teams.id')
                        ->orderBy('points', 'desc')
                        ->select('teams.name', 'standings.*')
                        ->get();
        return Inertia::render('Standing/Index', ['standings' => $standings]);
    }
}
