<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Motor extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'name',
        'year',
        'price',
        'mileage',
        'color',
        'transmission',
        'condition',
        'description',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'year' => 'integer',
        'price' => 'float',
        'mileage' => 'integer',
        'is_featured' => 'boolean',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(MotorImage::class);
    }
}
