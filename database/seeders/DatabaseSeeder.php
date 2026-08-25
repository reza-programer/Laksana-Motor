<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Motor;
use App\Models\MotorImage;
use App\Models\Promo;
use App\Models\Testimonial;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User with password: laksanamotor123
        User::updateOrCreate(
            ['email' => 'admin@laksanamotor.com'],
            [
                'name' => 'Admin Laksana Motor',
                'password' => Hash::make('laksanamotor123'),
            ]
        );

        // 2. Realistic motorcycle photos
        $motorImages = [
            'vario160' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&auto=format&fit=crop&q=80',
            'nmax' => 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=700&auto=format&fit=crop&q=80',
            'beat' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=80',
            'aerox' => 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=700&auto=format&fit=crop&q=80',
            'scoopy' => 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=700&auto=format&fit=crop&q=80',
            'pcx' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=700&auto=format&fit=crop&q=80',
        ];

        // 3. Motors Data
        $motors = [
            [
                'id' => 1,
                'brand' => 'Honda',
                'name' => 'Honda Vario 160',
                'year' => 2023,
                'price' => 18500000,
                'mileage' => 12500,
                'color' => 'Hitam Doff',
                'transmission' => 'Otomatis',
                'condition' => 'Body mulus 98%, mesin halus, tarikan enteng, ban masih tebal.',
                'description' => 'Honda Vario 160 tahun 2023 warna hitam doff. Unit terawat pemakaian pribadi. Surat-surat lengkap (STNK, BPKB, Faktur), pajak hidup panjang. Servis rutin berkala, siap pakai tanpa PR.',
                'status' => 'Tersedia',
                'is_featured' => true,
                'images' => [
                    ['image' => $motorImages['vario160'], 'is_primary' => true],
                    ['image' => $motorImages['pcx'], 'is_primary' => false],
                ],
            ],
            [
                'id' => 2,
                'brand' => 'Yamaha',
                'name' => 'Yamaha NMAX 155',
                'year' => 2021,
                'price' => 21800000,
                'mileage' => 18200,
                'color' => 'Merah Doff',
                'transmission' => 'Otomatis',
                'condition' => 'Kondisi prima, cat original tanpa baret parah, kelistrikan normal.',
                'description' => 'Yamaha NMAX 155 ABS tahun 2021 warna merah doff. Mesin VVA bertenaga dan irit, ban tubeless baru, smart key system aktif. Surat komplit, tangan pertama dari baru.',
                'status' => 'Tersedia',
                'is_featured' => true,
                'images' => [
                    ['image' => $motorImages['nmax'], 'is_primary' => true],
                    ['image' => $motorImages['aerox'], 'is_primary' => false],
                ],
            ],
            [
                'id' => 3,
                'brand' => 'Honda',
                'name' => 'Honda Beat CBS',
                'year' => 2022,
                'price' => 13500000,
                'mileage' => 9300,
                'color' => 'Putih',
                'transmission' => 'Otomatis',
                'condition' => 'Super mulus seperti baru, km rendah asli, mesin halus standar pabrik.',
                'description' => 'Honda Beat CBS tahun 2022 warna putih. Sangat irit dan lincah untuk harian. Ban tebal bawaan, kunci kontak 2, surat-surat lengkap dan dijamin keabsahannya.',
                'status' => 'Tersedia',
                'is_featured' => true,
                'images' => [
                    ['image' => $motorImages['beat'], 'is_primary' => true],
                ],
            ],
            [
                'id' => 4,
                'brand' => 'Yamaha',
                'name' => 'Yamaha Aerox 155',
                'year' => 2022,
                'price' => 20300000,
                'mileage' => 15600,
                'color' => 'Hitam Cyan',
                'transmission' => 'Otomatis',
                'condition' => 'Kondisi siap pakai, tarikan responsif, speedometer digital normal.',
                'description' => 'Yamaha Aerox 155 Connected tahun 2022 warna hitam kombinasi. Desain sporty kekinian, mesin 155cc VVA, fitur Y-Connect normal. Surat lengkap dan siap langsung jalan.',
                'status' => 'Tersedia',
                'is_featured' => true,
                'images' => [
                    ['image' => $motorImages['aerox'], 'is_primary' => true],
                ],
            ],
            [
                'id' => 5,
                'brand' => 'Honda',
                'name' => 'Honda Scoopy',
                'year' => 2022,
                'price' => 14800000,
                'mileage' => 8100,
                'color' => 'Krem / Beige',
                'transmission' => 'Otomatis',
                'condition' => 'Body mulus 95%, ban tebal, fitur Smart Key lancar, mesin halus.',
                'description' => 'Honda Scoopy Prestige tahun 2022 warna krem elegan. Smart Key aktif, USB port aman, surat lengkap siap balik nama.',
                'status' => 'Tersedia',
                'is_featured' => true,
                'images' => [
                    ['image' => $motorImages['scoopy'], 'is_primary' => true],
                ],
            ],
            [
                'id' => 6,
                'brand' => 'Honda',
                'name' => 'Honda PCX 160 ABS',
                'year' => 2023,
                'price' => 28500000,
                'mileage' => 4500,
                'color' => 'Hitam Glossy',
                'transmission' => 'Otomatis',
                'condition' => 'Istimewa seperti unit baru keluar dealer, low KM asli.',
                'description' => 'Honda PCX 160 ABS tahun 2023. Unit mewah dan sangat nyaman, fitur HSTC dan ABS aman, surat-surat super lengkap tangan pertama.',
                'status' => 'Tersedia',
                'is_featured' => false,
                'images' => [
                    ['image' => $motorImages['pcx'], 'is_primary' => true],
                ],
            ],
        ];

        foreach ($motors as $motorData) {
            $images = $motorData['images'];
            unset($motorData['images']);

            $motor = Motor::updateOrCreate(['id' => $motorData['id']], $motorData);

            MotorImage::where('motor_id', $motor->id)->delete();
            foreach ($images as $img) {
                MotorImage::create([
                    'motor_id' => $motor->id,
                    'image' => $img['image'],
                    'is_primary' => $img['is_primary'],
                ]);
            }
        }

        // 4. Promo Data
        Promo::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'DP Mulai 1 Jutaan!',
                'description' => 'Dapatkan kemudahan pembelian motor bekas pilihan dengan DP terjangkau dan proses persetujuan cepat.',
                'image' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80',
                'start_date' => '2024-03-01',
                'end_date' => '2024-03-31',
                'is_active' => true,
            ]
        );

        // 5. Testimonial Data
        $testimonials = [
            [
                'id' => 1,
                'name' => 'Rizky Pratama',
                'motor' => 'Yamaha NMAX 2021',
                'content' => 'Motor yang saya beli di Laksana Motor kondisinya bagus, sesuai deskripsi. Prosesnya juga cepat dan mudah.',
                'image' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
                'is_active' => true,
            ],
            [
                'id' => 2,
                'name' => 'Dewi Anggraini',
                'motor' => 'Honda Vario 160 2023',
                'content' => 'Pelayanan ramah dan informatif. Unit banyak pilihan dan harganya masuk akal. Recommended!',
                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
                'is_active' => true,
            ],
            [
                'id' => 3,
                'name' => 'M. Hafidz',
                'motor' => 'Honda Beat 2022',
                'content' => 'Sudah beli 2 motor di sini, unit selalu memuaskan. Terpercaya dan surat-suratnya terjamin aman!',
                'image' => 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testi) {
            Testimonial::updateOrCreate(['id' => $testi['id']], $testi);
        }

        // 6. Settings Data
        Setting::updateOrCreate(
            ['key' => 'hero_bg_image'],
            ['value' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85']
        );
        Setting::updateOrCreate(
            ['key' => 'hero_title_1'],
            ['value' => 'Motor Bekas']
        );
        Setting::updateOrCreate(
            ['key' => 'hero_title_2'],
            ['value' => 'Berkualitas,']
        );
        Setting::updateOrCreate(
            ['key' => 'hero_accent'],
            ['value' => 'Siap Jalan.']
        );
        Setting::updateOrCreate(
            ['key' => 'hero_subtitle'],
            ['value' => 'Temukan motor bekas pilihan dengan kondisi terbaik, harga transparan, dan proses pembelian yang mudah di Laksana Motor.']
        );
    }
}
