<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class standings extends Model
{
    use HasFactory;

    protected $table = 'standings';
    public $incrementing = false;

    protected $fillable = [
        'team_id',
        'total_matches',
        'wins',
        'draws',
        'loses',
        'goals_scored',
        'goals_against',
    ];

    public $timestamps = false;

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            $model->id = 'standing-'.uniqid();
        });
    }

    public function team()
    {
        return $this->belongsTo(teams::class);
    }
}
