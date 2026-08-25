<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Motor;
use App\Models\MotorImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MotorController extends Controller
{
    /**
     * Display a listing of motors with filters and search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Motor::with('images');

        // Filter: Brand
        if ($request->filled('brand') && $request->brand !== 'Semua') {
            $query->where('brand', $request->brand);
        }

        // Filter: Status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter: Transmission
        if ($request->filled('transmission')) {
            $query->where('transmission', $request->transmission);
        }

        // Filter: Price Range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', (float) $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float) $request->max_price);
        }

        // Filter: Year Range
        if ($request->filled('min_year')) {
            $query->where('year', '>=', (int) $request->min_year);
        }
        if ($request->filled('max_year')) {
            $query->where('year', '<=', (int) $request->max_year);
        }

        // Filter: Max Mileage
        if ($request->filled('max_mileage')) {
            $query->where('mileage', '<=', (int) $request->max_mileage);
        }

        // Search: Name / Brand / Description
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');
        match ($sortBy) {
            'price_asc' => $query->orderBy('price', 'asc'),
            'price_desc' => $query->orderBy('price', 'desc'),
            'year_desc' => $query->orderBy('year', 'desc'),
            'km_asc' => $query->orderBy('mileage', 'asc'),
            default => $query->latest(),
        };

        if ($request->has('page')) {
            $perPage = (int) $request->get('per_page', 12);
            $motors = $query->paginate($perPage);
            return response()->json($motors);
        }

        return response()->json($query->get());
    }

    /**
     * Get featured motors for home page.
     */
    public function featured(): JsonResponse
    {
        $featured = Motor::with('images')
            ->where('is_featured', true)
            ->where('status', '!=', 'Terjual')
            ->latest()
            ->take(8)
            ->get();

        return response()->json($featured);
    }

    /**
     * Get distinct brands list.
     */
    public function brands(): JsonResponse
    {
        $brands = Motor::select('brand')
            ->distinct()
            ->pluck('brand');

        return response()->json($brands);
    }

    /**
     * Display the specified motor.
     */
    public function show(int $id): JsonResponse
    {
        $motor = Motor::with('images')->find($id);

        if (!$motor) {
            return response()->json(['message' => 'Motor tidak ditemukan'], 404);
        }

        return response()->json($motor);
    }

    /**
     * Store a newly created motor in database.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:2030',
            'price' => 'required|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'color' => 'nullable|string|max:100',
            'transmission' => 'required|string|max:50',
            'condition' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|in:Tersedia,Booking,Terjual',
            'is_featured' => 'boolean',
            'images' => 'nullable|array',
            'images.*.image' => 'required|string',
            'images.*.is_primary' => 'boolean',
        ]);

        $motor = Motor::create([
            'brand' => $validated['brand'],
            'name' => $validated['name'],
            'year' => $validated['year'],
            'price' => $validated['price'],
            'mileage' => $validated['mileage'] ?? 0,
            'color' => $validated['color'] ?? null,
            'transmission' => $validated['transmission'],
            'condition' => $validated['condition'] ?? null,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'is_featured' => $validated['is_featured'] ?? false,
        ]);

        if (!empty($validated['images'])) {
            foreach ($validated['images'] as $img) {
                MotorImage::create([
                    'motor_id' => $motor->id,
                    'image' => $img['image'],
                    'is_primary' => $img['is_primary'] ?? false,
                ]);
            }
        }

        return response()->json($motor->load('images'), 201);
    }

    /**
     * Update the specified motor in database.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $motor = Motor::find($id);

        if (!$motor) {
            return response()->json(['message' => 'Motor tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'brand' => 'sometimes|string|max:100',
            'name' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer|min:2000|max:2030',
            'price' => 'sometimes|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'color' => 'nullable|string|max:100',
            'transmission' => 'sometimes|string|max:50',
            'condition' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:Tersedia,Booking,Terjual',
            'is_featured' => 'boolean',
            'images' => 'nullable|array',
        ]);

        $motor->update($validated);

        if (isset($validated['images'])) {
            MotorImage::where('motor_id', $motor->id)->delete();
            foreach ($validated['images'] as $img) {
                MotorImage::create([
                    'motor_id' => $motor->id,
                    'image' => $img['image'],
                    'is_primary' => $img['is_primary'] ?? false,
                ]);
            }
        }

        return response()->json($motor->load('images'));
    }

    /**
     * Remove the specified motor from database.
     */
    public function destroy(int $id): JsonResponse
    {
        $motor = Motor::find($id);

        if (!$motor) {
            return response()->json(['message' => 'Motor tidak ditemukan'], 404);
        }

        $motor->delete();

        return response()->json(['message' => 'Motor berhasil dihapus']);
    }
}
