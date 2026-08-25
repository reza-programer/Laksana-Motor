<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Testimonial::latest()->get());
    }

    public function active(): JsonResponse
    {
        return response()->json(Testimonial::where('is_active', true)->latest()->get());
    }

    public function show(int $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan'], 404);
        }
        return response()->json($testimonial);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'motor' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $testimonial = Testimonial::create($validated);
        return response()->json($testimonial, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'motor' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $testimonial->update($validated);
        return response()->json($testimonial);
    }

    public function destroy(int $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan'], 404);
        }
        $testimonial->delete();
        return response()->json(['message' => 'Testimoni berhasil dihapus']);
    }
}
