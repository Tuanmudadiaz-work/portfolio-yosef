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
- **Foto:** simpan foto di `public/img/`, lalu isi `profile.photo` dengan `img/nama-file.jpg`. Isi `profile.heroPhoto` juga kalau ingin foto muncul di belakang hero.
- **Grafik:** data bulanan ada di `caseStudy.chart` (dalam juta rupiah). Skala grafik menyesuaikan otomatis.

## Struktur

```
server.js            server Express (untuk di komputer / Render)
build.js             membuat versi statis di dist/ (untuk GitHub Pages)
lib/portfolio.js     baca data + link WhatsApp, dipakai server.js dan build.js
data/portfolio.json  semua konten
views/index.ejs      template halaman
public/css/style.css tampilan
public/js/chart.js   grafik belanja vs revenue
public/img/          foto dan logo
```

## Online-kan

### GitHub Pages (otomatis)

Setiap push ke branch `main`, GitHub Actions (`.github/workflows/pages.yml`) menjalankan `npm run build` lalu mempublikasikan folder `dist/` ke:

https://tuanmudadiaz-work.github.io/portfolio-yosef/

Jadi cukup edit `data/portfolio.json`, commit, lalu push. Website ter-update sekitar 1 menit kemudian. Progresnya bisa dilihat di tab **Actions** di GitHub.

Untuk mengecek hasil build di komputer: `npm run build`, lalu buka `dist/index.html`.

Path gambar, CSS, dan JS sengaja ditulis relatif (`img/...`, bukan `/img/...`) supaya tetap jalan di alamat `/portfolio-yosef/`.

CSS dan JS dipanggil lewat `d.asset(...)` di template, yang menambahkan `?v=<hash isi file>`. Setiap file berubah, alamatnya ikut berubah, jadi pengunjung tidak tertahan di cache versi lama setelah deploy.

### Render / Railway (opsional)

Kalau butuh server Node.js (misalnya untuk `/api/portfolio`), bisa di-deploy gratis di Render, Railway, atau layanan lain yang mendukung Node.js:

1. Upload folder ini ke repository GitHub (folder `node_modules` tidak perlu ikut).
2. Hubungkan repository ke Render/Railway.
3. Build command: `npm install`, start command: `npm start`.

Port otomatis memakai variabel `PORT` dari layanan hosting.
