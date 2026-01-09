# SIPUSKESMAS - Sistem Informasi Puskesmas Terpadu

Sistem informasi berbasis web untuk mendigitalkan seluruh alur pelayanan kesehatan di Puskesmas, mulai dari pendaftaran pasien hingga manajemen farmasi.

## 🏥 Fitur Utama

### 1. Modul Pendaftaran (Petugas Pendaftaran)
- ✅ Registrasi pasien baru dengan NIK
- ✅ Verifikasi pasien lama (mencegah duplikasi)
- ✅ Pendaftaran kunjungan dengan pilihan Poli dan jenis bayar (BPJS/Umum)
- ✅ Generate nomor antrean otomatis
- ✅ Dashboard statistik harian

### 2. Modul Pemeriksaan (Dokter)
- ✅ Melihat daftar antrean pasien sesuai poli
- ✅ Akses riwayat medis pasien sebelumnya
- ✅ Input tanda vital (tekanan darah, suhu, nadi, BB)
- ✅ Input diagnosis (anamnesa, pemeriksaan fisik, diagnosis)
- ✅ E-Resep dengan pilihan obat dari katalog
- ✅ Realtime update antrean

### 3. Modul Farmasi (Apoteker)
- ✅ Menerima resep otomatis dari dokter
- ✅ Cek stok obat secara otomatis
- ✅ Peringatan jika stok tidak mencukupi
- ✅ Penyerahan obat dan pengurangan stok otomatis
- ✅ Monitoring stok kritis
- ✅ Update/tambah stok obat

### 4. Modul Manajemen (Kepala Puskesmas)
- ✅ Dashboard statistik (kunjungan harian/bulanan)
- ✅ Grafik tren kunjungan 7 hari terakhir
- ✅ Distribusi jenis bayar (BPJS vs Umum)
- ✅ Laporan 10 penyakit terbanyak
- ✅ Laporan pemakaian obat
- ✅ Export data dengan filter tanggal

### 5. Modul Admin
- ✅ Manajemen user dengan Role-Based Access Control (RBAC)
- ✅ Data master Poli (CRUD)
- ✅ Data master Obat (CRUD)
- ✅ Dashboard statistik sistem

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **UI Icons**: Font Awesome 6
- **Charts**: Chart.js

## 📋 Prasyarat

1. Akun [Supabase](https://supabase.com) (gratis)
2. Web browser modern (Chrome, Firefox, Edge)
3. Text editor (VS Code recommended)

## 🚀 Panduan Instalasi

### Langkah 1: Setup Supabase

1. Buat project baru di [Supabase Dashboard](https://app.supabase.com)
2. Catat **Project URL** dan **anon public key** dari Settings > API
3. Buka **SQL Editor** di Supabase Dashboard
4. Copy dan jalankan seluruh isi file `database/schema.sql`

### Langkah 2: Konfigurasi Aplikasi

1. Buka file `js/config.js`
2. Ganti nilai berikut dengan kredensial Supabase Anda:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### Langkah 3: Buat User Pertama (Admin)

**Cara 1: Melalui Supabase Dashboard**
1. Buka Supabase Dashboard > Authentication > Users
2. Klik "Add User" > "Create New User"
3. Masukkan email dan password
4. Copy User UID yang dihasilkan
5. Buka SQL Editor, jalankan:

```sql
INSERT INTO users (id, email, nama, role) VALUES 
    ('2dd27550-aa14-4b9d-9bac-bd61a51c9bb6', 'admin@puskesmas.id', 'Administrator', 'admin');
```

**Cara 2: Melalui Aplikasi (setelah disable RLS sementara)**
1. Disable RLS pada tabel users:
```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```
2. Buka aplikasi dan daftar melalui admin panel
3. Enable kembali RLS:
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### Langkah 4: Jalankan Aplikasi

1. Buka file `index.html` di browser
2. Atau gunakan Live Server di VS Code
3. Login dengan akun yang sudah dibuat

## 👥 Demo Akun (Setelah Setup)

Buat akun-akun berikut untuk testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@puskesmas.id | password123 |
| Pendaftaran | pendaftaran@puskesmas.id | password123 |
| Dokter | dokter@puskesmas.id | password123 |
| Apoteker | apoteker@puskesmas.id | password123 |
| Kepala | kepala@puskesmas.id | password123 |

## 📁 Struktur Folder

```
Puskesmas/
├── index.html              # Halaman login
├── css/
│   └── style.css           # Stylesheet utama
├── js/
│   └── config.js           # Konfigurasi Supabase
├── pages/
│   ├── pendaftaran.html    # Modul Pendaftaran
│   ├── dokter.html         # Modul Dokter
│   ├── farmasi.html        # Modul Farmasi
│   ├── kepala.html         # Modul Kepala Puskesmas
│   └── admin.html          # Modul Admin
├── database/
│   └── schema.sql          # Database schema
└── README.md               # Dokumentasi
```

## 🔐 Keamanan

- **Authentication**: Supabase Auth dengan email/password
- **Authorization**: Role-Based Access Control (RBAC)
- **Row Level Security (RLS)**: Enabled pada semua tabel
- **Data Validation**: Client-side dan database constraints

## 📊 Alur Sistem

```
[Pasien Datang]
      ↓
[Petugas Pendaftaran] → Registrasi/Verifikasi → Buat Kunjungan → Generate Antrean
      ↓
[Dokter] → Lihat Antrean → Periksa Pasien → Input Diagnosis → Buat E-Resep
      ↓
[Apoteker] → Terima Resep → Cek Stok → Serahkan Obat → Update Stok
      ↓
[Selesai]

[Kepala Puskesmas] → Monitoring & Laporan (Read-only)
[Admin] → Manajemen User & Data Master
```

## 🔧 Troubleshooting

### Error: "User not found" saat login
- Pastikan user sudah terdaftar di Supabase Auth DAN tabel users
- Cek apakah ID di tabel users sama dengan ID di auth.users

### Error: "Permission denied" 
- Cek apakah RLS policies sudah benar
- Pastikan user memiliki role yang sesuai

### Data tidak muncul
- Periksa console browser untuk error
- Pastikan SUPABASE_URL dan KEY sudah benar
- Cek koneksi internet

### Realtime tidak update
- Pastikan Realtime sudah enabled di Supabase
- Cek apakah ada subscription error di console

## 📝 Lisensi

MIT License - Bebas digunakan untuk keperluan pembelajaran dan pengembangan.

## 🤝 Kontribusi

Silakan fork repository ini dan buat pull request untuk perbaikan atau penambahan fitur.

---

Dibuat dengan ❤️ untuk digitalisasi pelayanan kesehatan di Indonesia.
