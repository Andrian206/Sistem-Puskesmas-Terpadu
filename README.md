# SIPUSKESMAS - Sistem Informasi Puskesmas Terpadu

Sistem informasi berbasis web untuk mendigitalkan seluruh alur pelayanan kesehatan di Puskesmas, mulai dari pendaftaran pasien hingga manajemen farmasi.

# SIPUSKESMAS — Sistem Informasi Puskesmas Terpadu

## Deskripsi

SIPUSKESMAS adalah aplikasi web untuk mendigitalisasi alur pelayanan di Puskesmas, mencakup pendaftaran pasien, pemeriksaan medis, manajemen resep dan stok farmasi, serta pelaporan untuk manajemen. Aplikasi ini ditujukan untuk petugas pendaftaran, dokter, apoteker, kepala puskesmas, dan administrator.

## Ruang Lingkup

- Pendaftaran pasien dan manajemen antrean
- Rekam medis dan pencatatan pemeriksaan
- Pembuatan resep elektronik (e‑resep)
- Manajemen stok obat dan proses penyerahan
- Dashboard laporan dan statistik
- Kontrol akses berbasis peran (RBAC)

## Fitur Utama

- Modul Pendaftaran: registrasi pasien, verifikasi, pembuatan kunjungan, nomor antrean
- Modul Pemeriksaan (Dokter): antrean per poli, rekam medis, input tanda vital dan diagnosis, e‑resep
- Modul Farmasi (Apoteker): penerimaan resep, cek dan pengurangan stok, peringatan stok kritis
- Modul Manajemen: dashboard statistik, laporan kunjungan dan pemakaian obat
- Modul Admin: manajemen pengguna dan data master (poli, obat)

## Teknologi

- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend / Database: Supabase (PostgreSQL, Auth, Realtime)
- Visualisasi: Chart.js

## Prasyarat

1. Akun Supabase (https://supabase.com)
2. Browser modern (Chrome, Firefox, Edge)
3. Editor kode (VS Code direkomendasikan)

## Instalasi dan Konfigurasi

1. Buat project baru di Supabase dan catat `Project URL` serta `anon public key`.
2. Impor skema database dengan menjalankan `database/schema.sql` di SQL Editor Supabase.
3. Buka `js/config.js` dan set nilai konfigurasi Supabase:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

4. Jalankan aplikasi lokal dengan membuka `index.html` di browser atau menggunakan Live Server di VS Code.

## Pembuatan Akun Administrator

Tambahkan user di Supabase Authentication lalu masukkan record terkait di tabel `users` dengan role `admin`. Contoh:

```sql
INSERT INTO users (id, email, nama, role)
VALUES ('<USER_UID>', 'admin@puskesmas.id', 'Administrator', 'admin');
```

Catatan: jika Row Level Security (RLS) aktif, pastikan kebijakan RLS dan roles sudah dikonfigurasi sebelum pengujian fungsi administrasi.

## Struktur Proyek (ringkasan)

```
index.html
README.md
css/
      └── style.css
js/
      └── config.js
pages/
      ├── pendaftaran.html
      ├── dokter.html
      ├── farmasi.html
      ├── kepala.html
      └── admin.html
database/
      └── schema.sql
```

## Akun Demo (opsional)

Contoh akun pengujian (buat setelah setup Supabase):

- Admin: admin@puskesmas.id / password123
- Pendaftaran: pendaftaran@puskesmas.id / password123
- Dokter: dokter@puskesmas.id / password123
- Apoteker: apoteker@puskesmas.id / password123
- Kepala: kepala@puskesmas.id / password123

## Troubleshooting Singkat

- "User not found": pastikan user ada di Supabase Auth dan tabel `users`.
- "Permission denied": cek kebijakan RLS dan role.
- Data tidak muncul: periksa `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di `js/config.js` serta console browser.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.

## Kontribusi

Silakan fork repository dan buat pull request untuk perbaikan atau fitur baru. Untuk perubahan besar, buka isu terlebih dahulu.

---

Dokumentasi ini disusun ulang untuk kejelasan penggunaan dan persiapan deployment lokal.
