<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StandingController extends Controller
{
    public function show() {
        return Inertia::render('Standing/Index', []);
    }
}
