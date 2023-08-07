<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchController extends Controller
{
    public function show() {
        return Inertia::render('Match/Index', []);
    }
}
