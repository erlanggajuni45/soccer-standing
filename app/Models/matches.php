<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class matches extends Model
{
    use HasFactory;

    protected $table = 'matches';
    public $incrementing = false;

    protected $fillable = ['name','city'];

    public $timestamps = false;

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            $model->id = 'team-'.uniqid();
        });
    }
}
