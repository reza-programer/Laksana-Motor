<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Promo::latest()->get());
    }

    public function active(): JsonResponse
    {
        return response()->json(Promo::where('is_active', true)->latest()->get());
    }

    public function show(int $id): JsonResponse
    {
        $promo = Promo::find($id);
        if (!$promo) {
            return response()->json(['message' => 'Promo tidak ditemukan'], 404);
        }
        return response()->json($promo);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $promo = Promo::create($validated);
        return response()->json($promo, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $promo = Promo::find($id);
        if (!$promo) {
            return response()->json(['message' => 'Promo tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $promo->update($validated);
        return response()->json($promo);
    }

    public function destroy(int $id): JsonResponse
    {
        $promo = Promo::find($id);
        if (!$promo) {
            return response()->json(['message' => 'Promo tidak ditemukan'], 404);
        }
        $promo->delete();
        return response()->json(['message' => 'Promo berhasil dihapus']);
    }
}
