<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class matches extends Model
{
    use HasFactory;

    protected $table = 'matches';
    public $incrementing = false;

    protected $fillable = ['home_team_id','away_team_id', 'home_score', 'away_score'];

    public $timestamps = false;

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            $model->id = 'match-'.uniqid();
        });
    }

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id', 'id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id', 'id');
    }

}
