# Portfolio Paid Ads – Yosef Bartolumeus Dias

Website portfolio berbasis Node.js (Express + EJS). Semua isi halaman ada di satu file: `data/portfolio.json`.

## Menjalankan di komputer

Butuh Node.js versi 18 ke atas.

```bash
npm install
npm start
```

Buka http://localhost:3000. Selama pengembangan, pakai `npm run dev` supaya server restart otomatis saat kode berubah.

## Mengubah isi

Semua teks, angka, paket, FAQ, dan kontak ada di `data/portfolio.json`. Perubahan langsung terlihat setelah halaman di-refresh, tanpa restart server.

- **Kontak:** isi `contact.whatsapp` (contoh `081234567890`) dan `contact.email`. Tombol "Ngobrol yuk" otomatis membuka WhatsApp dengan pesan pembuka dari `contact.whatsappMessage`.
- **Foto:** simpan foto di `public/img/`, lalu isi `profile.photo` dengan `/img/nama-file.jpg`. Isi `profile.heroPhoto` juga kalau ingin foto muncul di belakang hero.
- **Grafik:** data bulanan ada di `caseStudy.chart` (dalam juta rupiah). Skala grafik menyesuaikan otomatis.

## Struktur

```
server.js            server Express
data/portfolio.json  semua konten
views/index.ejs      template halaman
public/css/style.css tampilan
public/js/chart.js   grafik belanja vs revenue
public/img/          foto
```

## Online-kan

Bisa di-deploy gratis di Render, Railway, atau layanan lain yang mendukung Node.js:

1. Upload folder ini ke repository GitHub (folder `node_modules` tidak perlu ikut).
2. Hubungkan repository ke Render/Railway.
3. Build command: `npm install`, start command: `npm start`.

Port otomatis memakai variabel `PORT` dari layanan hosting.
