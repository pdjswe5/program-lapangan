# Program Lapangan

Sistem manajemen fasilitas olahraga berbasis web untuk bisnis persewaan padel, mini soccer, dan futsal. Dibangun dengan React 18 dan Babel Standalone — tidak memerlukan build tool atau instalasi npm.

## Modul

| Modul | Fitur |
|---|---|
| **SO** | Daftar Booking, Form Booking Baru (Divisi, Lapangan, Jam, Penyewa) |
| **Jual** | Katalog Pelanggan, Order Penjualan, Nota Penjualan |
| **Beli** | Katalog Pemasok, Order Pembelian, Nota Pembelian |
| **Kas Bank** | Kas/Bank, Kas Masuk/Keluar, Bank Masuk/Keluar, Transfer, Giro, Pelunasan |
| **Bagi Hasil** | Hitung Bagi Hasil Tenant, Riwayat |
| **Import AYO** | Upload & Import data booking dari platform AYO (ayo.co.id) |
| **Opname** | Katalog Stok, Stock Opname, Mutasi Barang, Penyesuaian |
| **Aset** | Katalog Aset Tetap (Bangunan, Kendaraan, Perlengkapan) |
| **Penyusutan** | Hitung Penyusutan per Periode (Metode Garis Lurus) |

## Cara Menjalankan

Project ini adalah aplikasi HTML statis — cukup serve file-nya dengan web server lokal.

### Menggunakan VS Code Live Preview (Recommended)

1. Install ekstensi [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) di VS Code
2. Buka folder project di VS Code
3. Klik kanan file `erp.html` → **Show Preview**
   - Atau tekan `Ctrl+Shift+P` → ketik `Live Preview: Show Preview (External Browser)`

> Konfigurasi default preview sudah diatur di `.vscode/settings.json`.

### Menggunakan Python

```bash
python -m http.server 8080
```

Lalu buka browser ke `http://localhost:8080/erp.html`

### Menggunakan Node.js

```bash
npx serve .
```

Lalu buka URL yang muncul di terminal dan tambahkan `/erp.html`.

> **Catatan:** Jangan buka `erp.html` dengan double-click langsung (file://). Browser akan memblokir pemuatan file JSX karena kebijakan CORS.

## Struktur File

```
program-lapangan/
├── erp.html              # Entry point — load semua script
├── styles.css            # Global stylesheet
├── app.jsx               # App shell & routing
├── components.jsx        # TopBar, MultiTabNav, icon set, shared components
├── data.jsx              # Data dummy (perusahaan, aset, barang, booking, tenant, dll.)
├── dashboard.jsx         # Home dashboard
├── so.jsx                # Modul SO (Booking Lapangan)
├── pelanggan.jsx         # Modul Jual (Order & Nota Penjualan)
├── purchase.jsx          # Modul Beli (Order & Nota Pembelian)
├── keuangan.jsx          # Modul Kas Bank
├── bagi-hasil.jsx        # Modul Bagi Hasil Tenant
├── import-ayo.jsx        # Modul Import AYO
├── inventory.jsx         # Modul Opname (Stok Barang)
├── akuntan.jsx           # Modul Aset
├── penyusutan.jsx        # Modul Penyusutan
├── po-list.jsx           # Komponen list Purchase Order
├── po-detail.jsx         # Komponen detail Purchase Order
├── po-dialog.jsx         # Dialog buat/edit Purchase Order
└── tweaks-panel.jsx      # Panel kustomisasi tema & layout
```

## Data Dummy

- **5 Perusahaan**: PT Lapangan Jaya Sport, PT Arena Padel Nusantara, PT Mini Soccer Indonesia, PT Futsal Bersatu, CV Sport Center Mandiri
- **6 Tenant** (Bagi Hasil): Warung Kopi Lapangan, Toko Sport Corner, dll.
- **15 Aset**: Lapangan Padel 1 & 2, Lapangan Mini Soccer, Lapangan Futsal, Kendaraan, Perlengkapan
- **20+ Stok Barang**: Minuman (Cleo, Isoplus, Pocari, Aqua), Makanan (Snack, Chitato), Perlengkapan (Bola, Raket, Kaos Kaki)
- **13 Booking**: Data SO dengan status Pending / Konfirmasi / Berjalan / Selesai / Batal
- **Divisi**: Padel · Mini Soccer · Futsal

## Tech Stack

- **React 18** — via CDN (unpkg)
- **Babel Standalone** — transpile JSX langsung di browser
- **Vanilla CSS** — tanpa framework CSS eksternal
- **Font**: IBM Plex Sans & IBM Plex Mono (Google Fonts)
