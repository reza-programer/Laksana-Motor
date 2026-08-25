<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Get all website settings.
     */
    public function index(): JsonResponse
    {
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    /**
     * Update website settings.
     */
    public function update(Request $request): JsonResponse
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : (string) $value]
            );
        }

        return response()->json([
            'message' => 'Pengaturan berhasil disimpan',
            'settings' => Setting::all()->pluck('value', 'key')
        ]);
    }
}
