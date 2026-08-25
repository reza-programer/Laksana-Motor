<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('motors', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('name');
            $table->integer('year');
            $table->decimal('price', 15, 2);
            $table->integer('mileage')->default(0);
            $table->string('color')->nullable();
            $table->string('transmission')->default('Otomatis');
            $table->text('condition')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['Tersedia', 'Booking', 'Terjual'])->default('Tersedia');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motors');
    }
};
