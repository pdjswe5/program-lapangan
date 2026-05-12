// Data dummy — Program Lapangan (Manajemen Olahraga)

// ─── Perusahaan (PT selector) ─────────────────────────────────────────────
const PERUSAHAAN = [
  { kode:'PT001', nama:'PT Lapangan Jaya Sport',      kota:'Jakarta',   telp:'021-5551001' },
  { kode:'PT002', nama:'PT Arena Padel Nusantara',    kota:'Surabaya',  telp:'031-5551002' },
  { kode:'PT003', nama:'PT Mini Soccer Indonesia',    kota:'Bandung',   telp:'022-5551003' },
  { kode:'PT004', nama:'PT Futsal Bersatu',           kota:'Semarang',  telp:'024-5551004' },
  { kode:'CV001', nama:'CV Sport Center Mandiri',     kota:'Tangerang', telp:'021-5551005' },
];

// ─── Supplier / Pemasok ───────────────────────────────────────────────────
const SUPPLIERS = [
  { code:'S001', name:'PT Sport Equipment Indonesia', city:'Jakarta',   phone:'021-5552001' },
  { code:'S002', name:'CV Alat Olahraga Nusantara',  city:'Surabaya',  phone:'031-5552002' },
  { code:'S003', name:'PT Bola Mas',                  city:'Bandung',   phone:'022-5552003' },
  { code:'S004', name:'CV Raket Prima Jaya',          city:'Semarang',  phone:'024-5552004' },
  { code:'S005', name:'PT Minuman Sehat Abadi',       city:'Jakarta',   phone:'021-5552005' },
  { code:'S006', name:'CV Snack Arena',               city:'Bekasi',    phone:'021-5552006' },
  { code:'S007', name:'PT Perlengkapan Sport Raya',  city:'Jakarta',   phone:'021-5552007' },
  { code:'S008', name:'CV Futsal Gear Indo',          city:'Tangerang', phone:'021-5552008' },
];

// ─── Tenant (untuk Bagi Hasil) ────────────────────────────────────────────
const TENANTS = [
  { kode:'TN001', nama:'Warung Kopi Lapangan',    kontak:'Budi Santoso',    telp:'08122001001', kategori:'F&B'    },
  { kode:'TN002', nama:'Toko Sport Corner',        kontak:'Ani Wijaya',      telp:'08122001002', kategori:'Retail' },
  { kode:'TN003', nama:'Kantin Arena Segar',       kontak:'Dodi Prasetyo',   telp:'08122001003', kategori:'F&B'    },
  { kode:'TN004', nama:'Rental Sepatu & Raket',    kontak:'Siti Nuraini',    telp:'08122001004', kategori:'Rental' },
  { kode:'TN005', nama:'Photo & Video Arena',      kontak:'Reza Firmansyah', telp:'08122001005', kategori:'Jasa'   },
  { kode:'TN006', nama:'Suplemen & Vitamin Sport', kontak:'Linda Kusuma',    telp:'08122001006', kategori:'Retail' },
];

// ─── Aset (untuk modul Aset & Penyusutan) ────────────────────────────────
const ASET = [
  { kode:'AS001', nama:'Lapangan Padel 1',               kategori:'Bangunan',     tglBeli:'01-01-2023', nilaiPerolehan: 850000000, umurEkonomis:20, susutPerTahun:  42500000, akumulasi:  85000000, nilaiBuku: 765000000, aktif:true  },
  { kode:'AS002', nama:'Lapangan Padel 2',               kategori:'Bangunan',     tglBeli:'01-06-2023', nilaiPerolehan: 850000000, umurEkonomis:20, susutPerTahun:  42500000, akumulasi:  63750000, nilaiBuku: 786250000, aktif:true  },
  { kode:'AS003', nama:'Lapangan Mini Soccer A',         kategori:'Bangunan',     tglBeli:'15-03-2022', nilaiPerolehan: 650000000, umurEkonomis:20, susutPerTahun:  32500000, akumulasi: 130000000, nilaiBuku: 520000000, aktif:true  },
  { kode:'AS004', nama:'Lapangan Futsal 1',              kategori:'Bangunan',     tglBeli:'01-01-2021', nilaiPerolehan: 500000000, umurEkonomis:20, susutPerTahun:  25000000, akumulasi: 125000000, nilaiBuku: 375000000, aktif:true  },
  { kode:'AS005', nama:'Lapangan Futsal 2',              kategori:'Bangunan',     tglBeli:'01-01-2022', nilaiPerolehan: 500000000, umurEkonomis:20, susutPerTahun:  25000000, akumulasi: 100000000, nilaiBuku: 400000000, aktif:true  },
  { kode:'AS006', nama:'Bangunan Gedung Utama',          kategori:'Bangunan',     tglBeli:'01-01-2020', nilaiPerolehan:2500000000, umurEkonomis:40, susutPerTahun:  62500000, akumulasi: 375000000, nilaiBuku:2125000000, aktif:true  },
  { kode:'AS007', nama:'Kendaraan Honda Brio Operasional', kategori:'Kendaraan', tglBeli:'15-04-2023', nilaiPerolehan: 215000000, umurEkonomis: 8, susutPerTahun:  26875000, akumulasi:  53750000, nilaiBuku: 161250000, aktif:true  },
  { kode:'AS008', nama:'Kendaraan Pickup Mini',          kategori:'Kendaraan',    tglBeli:'01-08-2022', nilaiPerolehan: 175000000, umurEkonomis: 8, susutPerTahun:  21875000, akumulasi:  61250000, nilaiBuku: 113750000, aktif:true  },
  { kode:'AS009', nama:'Raket Padel Head (set 10)',      kategori:'Perlengkapan', tglBeli:'01-01-2024', nilaiPerolehan:   8500000, umurEkonomis: 3, susutPerTahun:   2833333, akumulasi:   2833333, nilaiBuku:   5666667, aktif:true  },
  { kode:'AS010', nama:'Bola Padel Head (set 20)',       kategori:'Perlengkapan', tglBeli:'01-01-2024', nilaiPerolehan:   3600000, umurEkonomis: 2, susutPerTahun:   1800000, akumulasi:   1800000, nilaiBuku:   1800000, aktif:true  },
  { kode:'AS011', nama:'Bola Futsal Penalty (10 buah)', kategori:'Perlengkapan', tglBeli:'01-03-2024', nilaiPerolehan:   4500000, umurEkonomis: 2, susutPerTahun:   2250000, akumulasi:   1125000, nilaiBuku:   3375000, aktif:true  },
  { kode:'AS012', nama:'Bola Mini Soccer (5 buah)',      kategori:'Perlengkapan', tglBeli:'01-03-2024', nilaiPerolehan:   2500000, umurEkonomis: 2, susutPerTahun:   1250000, akumulasi:    625000, nilaiBuku:   1875000, aktif:true  },
  { kode:'AS013', nama:'AC Ruang Tunggu (4 unit)',       kategori:'Perlengkapan', tglBeli:'01-06-2023', nilaiPerolehan:  28000000, umurEkonomis: 5, susutPerTahun:   5600000, akumulasi:   9800000, nilaiBuku:  18200000, aktif:true  },
  { kode:'AS014', nama:'Kursi Tribun (50 unit)',         kategori:'Perlengkapan', tglBeli:'15-03-2022', nilaiPerolehan:  15000000, umurEkonomis: 5, susutPerTahun:   3000000, akumulasi:  12000000, nilaiBuku:   3000000, aktif:true  },
  { kode:'AS015', nama:'Kamera CCTV (12 titik)',         kategori:'Perlengkapan', tglBeli:'01-09-2023', nilaiPerolehan:  18000000, umurEkonomis: 5, susutPerTahun:   3600000, akumulasi:   5400000, nilaiBuku:  12600000, aktif:true  },
];

// ─── Stok Barang (untuk Opname & Jual) ───────────────────────────────────
const BARANG = [
  // Minuman
  { code:'MN001', name:'Cleo 600ml',                 kategori:'Minuman',       unit:'botol',  price:  4000, hpp:  2800, stock:240, gudang:'Gudang Utama', minQty: 50, active:true  },
  { code:'MN002', name:'Cleo 1500ml',                kategori:'Minuman',       unit:'botol',  price:  7000, hpp:  5000, stock:150, gudang:'Gudang Utama', minQty: 30, active:true  },
  { code:'MN003', name:'Isoplus 350ml',              kategori:'Minuman',       unit:'botol',  price:  6000, hpp:  4200, stock:180, gudang:'Gudang Utama', minQty: 50, active:true  },
  { code:'MN004', name:'Pocari Sweat 350ml',         kategori:'Minuman',       unit:'botol',  price:  8000, hpp:  5800, stock:120, gudang:'Gudang Utama', minQty: 40, active:true  },
  { code:'MN005', name:'Aqua 600ml',                 kategori:'Minuman',       unit:'botol',  price:  4000, hpp:  2700, stock:300, gudang:'Gudang Utama', minQty: 60, active:true  },
  { code:'MN006', name:'Mizone 500ml',               kategori:'Minuman',       unit:'botol',  price:  7000, hpp:  5200, stock: 96, gudang:'Gudang Utama', minQty: 30, active:true  },
  { code:'MN007', name:'100Plus 325ml',              kategori:'Minuman',       unit:'kaleng', price:  8500, hpp:  6500, stock: 72, gudang:'Gudang Utama', minQty: 24, active:true  },
  // Makanan
  { code:'MK001', name:'Snack Ring Ubi 75g',         kategori:'Makanan',       unit:'pcs',    price:  5000, hpp:  3500, stock:144, gudang:'Gudang Utama', minQty: 30, active:true  },
  { code:'MK002', name:'Chitato 68g',                kategori:'Makanan',       unit:'pcs',    price:  8000, hpp:  6000, stock: 96, gudang:'Gudang Utama', minQty: 20, active:true  },
  { code:'MK003', name:'Indomie Goreng (Cup)',        kategori:'Makanan',       unit:'pcs',    price:  8000, hpp:  5500, stock: 80, gudang:'Gudang Utama', minQty: 20, active:true  },
  { code:'MK004', name:'Kopi Good Day Sachet',       kategori:'Makanan',       unit:'pcs',    price:  3000, hpp:  2000, stock:200, gudang:'Gudang Utama', minQty: 50, active:true  },
  { code:'MK005', name:'Energen Sereal Sachet',      kategori:'Makanan',       unit:'pcs',    price:  4500, hpp:  3200, stock:120, gudang:'Gudang Utama', minQty: 30, active:true  },
  // Perlengkapan Olahraga
  { code:'PO001', name:'Bola Futsal Penalty Size 4', kategori:'Perlengkapan',  unit:'pcs',    price:175000, hpp:130000, stock: 25, gudang:'Gudang Utama', minQty:  5, active:true  },
  { code:'PO002', name:'Bola Padel Head Pro S',      kategori:'Perlengkapan',  unit:'tabung', price: 65000, hpp: 45000, stock: 40, gudang:'Gudang Utama', minQty: 10, active:true  },
  { code:'PO003', name:'Raket Padel Dunlop Fusion',  kategori:'Perlengkapan',  unit:'pcs',    price:850000, hpp:620000, stock: 12, gudang:'Gudang Utama', minQty:  3, active:true  },
  { code:'PO004', name:'Kaos Kaki Sport Dewasa',     kategori:'Perlengkapan',  unit:'pasang', price: 25000, hpp: 16000, stock: 60, gudang:'Gudang Utama', minQty: 15, active:true  },
  { code:'PO005', name:'Sepatu Futsal Specs',        kategori:'Perlengkapan',  unit:'pasang', price:450000, hpp:320000, stock:  8, gudang:'Gudang Utama', minQty:  3, active:true  },
  { code:'PO006', name:'Grip Raket Overgrip',        kategori:'Perlengkapan',  unit:'pcs',    price: 15000, hpp:  9000, stock: 50, gudang:'Gudang Utama', minQty: 10, active:true  },
  { code:'PO007', name:'Rompi Olahraga Mesh',        kategori:'Perlengkapan',  unit:'pcs',    price: 35000, hpp: 22000, stock: 30, gudang:'Gudang Utama', minQty: 10, active:true  },
  { code:'PO008', name:'Net Futsal (set)',            kategori:'Perlengkapan',  unit:'set',    price:350000, hpp:250000, stock:  5, gudang:'Gudang Utama', minQty:  2, active:true  },
];

// ─── Booking / SO List ────────────────────────────────────────────────────
// Fields: no, tgl, divisi, lapangan, jamMulai, jamSelesai, durasi (jam),
//         hargaPerJam, totalHarga, dp (down payment), sisaBayar, metode, penyewa, hp, status, catatan
const BOOKING_LIST = [
  { no:'BO-2026-0042', tgl:'12-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 1',       jamMulai:'08:00', jamSelesai:'10:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:100000, sisaBayar:100000, metode:'Transfer BCA', penyewa:'Reza Permana',        hp:'0812-3001-001', status:'Konfirmasi', catatan:'' },
  { no:'BO-2026-0041', tgl:'12-05-2026', divisi:'Futsal',      lapangan:'Lapangan Futsal 1',       jamMulai:'10:00', jamSelesai:'12:00', durasi:2,   hargaPerJam:150000, totalHarga:300000, dp:150000, sisaBayar:150000, metode:'Transfer BCA', penyewa:'Bima Sakti',          hp:'0812-3001-002', status:'Konfirmasi', catatan:'Kompetisi internal' },
  { no:'BO-2026-0040', tgl:'12-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 2',        jamMulai:'14:00', jamSelesai:'16:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:200000, sisaBayar:     0, metode:'Tunai',        penyewa:'Diana Putri',         hp:'0812-3001-003', status:'Berjalan',   catatan:'Bawa raket sendiri' },
  { no:'BO-2026-0039', tgl:'12-05-2026', divisi:'Mini Soccer', lapangan:'Lapangan Mini Soccer A',  jamMulai:'16:00', jamSelesai:'17:30', durasi:1.5, hargaPerJam:200000, totalHarga:300000, dp:150000, sisaBayar:150000, metode:'QRIS',         penyewa:'Tim Matahari FC',     hp:'0812-3001-004', status:'Pending',    catatan:'Tim 7 orang, minta rompi' },
  { no:'BO-2026-0038', tgl:'11-05-2026', divisi:'Futsal',      lapangan:'Lapangan Futsal 2',       jamMulai:'18:00', jamSelesai:'20:00', durasi:2,   hargaPerJam:150000, totalHarga:300000, dp:300000, sisaBayar:     0, metode:'Transfer BRI', penyewa:'Komunitas Futsal SBY',hp:'0812-3001-005', status:'Selesai',    catatan:'' },
  { no:'BO-2026-0037', tgl:'11-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 1',        jamMulai:'07:00', jamSelesai:'09:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:200000, sisaBayar:     0, metode:'Tunai',        penyewa:'Kevin Sanjaya',       hp:'0812-3001-006', status:'Selesai',    catatan:'' },
  { no:'BO-2026-0036', tgl:'11-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 2',        jamMulai:'10:00', jamSelesai:'12:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:100000, sisaBayar:100000, metode:'Transfer BCA', penyewa:'Lisa Halim',          hp:'0812-3001-007', status:'Selesai',    catatan:'' },
  { no:'BO-2026-0035', tgl:'10-05-2026', divisi:'Mini Soccer', lapangan:'Lapangan Mini Soccer A',  jamMulai:'09:00', jamSelesai:'11:00', durasi:2,   hargaPerJam:200000, totalHarga:400000, dp:200000, sisaBayar:200000, metode:'QRIS',         penyewa:'FC Bintang Jaya',     hp:'0812-3001-008', status:'Selesai',    catatan:'Turnamen kecil 14 orang' },
  { no:'BO-2026-0034', tgl:'10-05-2026', divisi:'Futsal',      lapangan:'Lapangan Futsal 1',       jamMulai:'14:00', jamSelesai:'16:00', durasi:2,   hargaPerJam:150000, totalHarga:300000, dp:300000, sisaBayar:     0, metode:'Transfer BCA', penyewa:'Gita Permadi',        hp:'0812-3001-009', status:'Selesai',    catatan:'' },
  { no:'BO-2026-0033', tgl:'09-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 1',        jamMulai:'08:00', jamSelesai:'10:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:100000, sisaBayar:100000, metode:'Transfer BRI', penyewa:'Andre Taulany',       hp:'0812-3001-010', status:'Selesai',    catatan:'' },
  { no:'BO-2026-0032', tgl:'09-05-2026', divisi:'Futsal',      lapangan:'Lapangan Futsal 2',       jamMulai:'20:00', jamSelesai:'22:00', durasi:2,   hargaPerJam:150000, totalHarga:300000, dp:150000, sisaBayar:150000, metode:'Transfer BCA', penyewa:'Juventus FC Indo',    hp:'0812-3001-011', status:'Batal',      catatan:'Dibatalkan, DP dikembalikan 50%' },
  { no:'BO-2026-0031', tgl:'13-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 1',        jamMulai:'10:00', jamSelesai:'12:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:     0, sisaBayar:200000, metode:'Belum Bayar',  penyewa:'Stevani Lee',         hp:'0812-3001-012', status:'Pending',    catatan:'Booking via WhatsApp' },
  { no:'BO-2026-0030', tgl:'13-05-2026', divisi:'Futsal',      lapangan:'Lapangan Futsal 1',       jamMulai:'15:00', jamSelesai:'17:00', durasi:2,   hargaPerJam:150000, totalHarga:300000, dp:150000, sisaBayar:150000, metode:'Transfer BCA', penyewa:'Komunitas Sehat',     hp:'0812-3001-013', status:'Pending',    catatan:'' },
  { no:'BO-2026-0029', tgl:'14-05-2026', divisi:'Padel',       lapangan:'Lapangan Padel 2',        jamMulai:'06:00', jamSelesai:'08:00', durasi:2,   hargaPerJam:100000, totalHarga:200000, dp:100000, sisaBayar:100000, metode:'QRIS',         penyewa:'Andika Firmansyah',   hp:'0812-3001-014', status:'Konfirmasi', catatan:'Booking rutin setiap Rabu' },
  { no:'BO-2026-0028', tgl:'14-05-2026', divisi:'Mini Soccer', lapangan:'Lapangan Mini Soccer A',  jamMulai:'13:00', jamSelesai:'15:00', durasi:2,   hargaPerJam:200000, totalHarga:400000, dp:200000, sisaBayar:200000, metode:'Transfer BCA', penyewa:'Tim Garuda Muda',     hp:'0812-3001-015', status:'Konfirmasi', catatan:'12 pemain hadir' },
];

// ─── Riwayat Bagi Hasil ───────────────────────────────────────────────────
const BAGI_HASIL = [
  { no:'BH-2026-0012', tgl:'30-04-2026', tenant:'Warung Kopi Lapangan',    pendapatanKotor:18500000, persenTenant:40, bagianTenant: 7400000, bagianPerusahaan:11100000, status:'Lunas'   },
  { no:'BH-2026-0011', tgl:'30-04-2026', tenant:'Toko Sport Corner',        pendapatanKotor:12400000, persenTenant:35, bagianTenant: 4340000, bagianPerusahaan: 8060000, status:'Lunas'   },
  { no:'BH-2026-0010', tgl:'29-04-2026', tenant:'Kantin Arena Segar',       pendapatanKotor:22000000, persenTenant:40, bagianTenant: 8800000, bagianPerusahaan:13200000, status:'Lunas'   },
  { no:'BH-2026-0009', tgl:'28-04-2026', tenant:'Rental Sepatu & Raket',    pendapatanKotor: 8750000, persenTenant:50, bagianTenant: 4375000, bagianPerusahaan: 4375000, status:'Lunas'   },
  { no:'BH-2026-0008', tgl:'27-04-2026', tenant:'Photo & Video Arena',      pendapatanKotor: 4200000, persenTenant:60, bagianTenant: 2520000, bagianPerusahaan: 1680000, status:'Pending' },
  { no:'BH-2026-0007', tgl:'25-04-2026', tenant:'Suplemen & Vitamin Sport', pendapatanKotor: 6800000, persenTenant:45, bagianTenant: 3060000, bagianPerusahaan: 3740000, status:'Lunas'   },
];

// ─── Purchase Orders ──────────────────────────────────────────────────────
const PO_LIST = [
  { no:'PO-2026-0031', date:'12-05-2026', supplier:'PT Sport Equipment Indonesia', ref:'REF-SE-2201', status:'Pending Approval', due:'26-05-2026', total: 12450000, items: 5 },
  { no:'PO-2026-0030', date:'12-05-2026', supplier:'PT Minuman Sehat Abadi',       ref:'REF-MA-1101', status:'Approved',         due:'25-05-2026', total:  5280000, items: 8 },
  { no:'PO-2026-0029', date:'11-05-2026', supplier:'CV Alat Olahraga Nusantara',   ref:'REF-AO-3301', status:'Realisasi',        due:'24-05-2026', total: 18750000, items: 6 },
  { no:'PO-2026-0028', date:'11-05-2026', supplier:'CV Raket Prima Jaya',          ref:'REF-RP-4401', status:'Realisasi',        due:'23-05-2026', total:  9800000, items: 4 },
  { no:'PO-2026-0027', date:'10-05-2026', supplier:'CV Snack Arena',               ref:'REF-SA-5501', status:'Draft',            due:'22-05-2026', total:  3450000, items:10 },
  { no:'PO-2026-0026', date:'10-05-2026', supplier:'PT Bola Mas',                  ref:'REF-BM-6601', status:'Approved',         due:'21-05-2026', total:  7200000, items: 3 },
  { no:'PO-2026-0025', date:'09-05-2026', supplier:'PT Perlengkapan Sport Raya',  ref:'REF-PS-7701', status:'Realisasi',        due:'20-05-2026', total: 14500000, items: 7 },
  { no:'PO-2026-0024', date:'09-05-2026', supplier:'CV Futsal Gear Indo',          ref:'REF-FG-8801', status:'Partial',          due:'19-05-2026', total:  6850000, items: 4 },
  { no:'PO-2026-0023', date:'08-05-2026', supplier:'PT Sport Equipment Indonesia', ref:'REF-SE-2200', status:'Cancelled',        due:'18-05-2026', total:  4200000, items: 2 },
  { no:'PO-2026-0022', date:'07-05-2026', supplier:'PT Minuman Sehat Abadi',       ref:'REF-MA-1100', status:'Realisasi',        due:'17-05-2026', total:  6700000, items: 9 },
  { no:'PO-2026-0021', date:'06-05-2026', supplier:'CV Alat Olahraga Nusantara',   ref:'REF-AO-3300', status:'Approved',         due:'16-05-2026', total: 22100000, items: 8 },
  { no:'PO-2026-0020', date:'05-05-2026', supplier:'PT Bola Mas',                  ref:'REF-BM-6600', status:'Realisasi',        due:'15-05-2026', total:  8950000, items: 5 },
];

// ─── Status ───────────────────────────────────────────────────────────────
const STATUSES = ['Draft', 'Pending Approval', 'Approved', 'Realisasi', 'Partial', 'Cancelled'];
const STATUS_CLASS = {
  'Draft':            'draft',
  'Pending Approval': 'pending',
  'Approved':         'approved',
  'Realisasi':        'realisasi',
  'Partial':          'partial',
  'Cancelled':        'cancelled',
};

// ─── Utilities ────────────────────────────────────────────────────────────
const fmtRp  = (n) => 'Rp ' + (n || 0).toLocaleString('id-ID');
const fmtNum = (n) => (n || 0).toLocaleString('id-ID');

Object.assign(window, {
  PERUSAHAAN, SUPPLIERS, TENANTS, ASET, BARANG,
  BOOKING_LIST, BAGI_HASIL, PO_LIST,
  STATUSES, STATUS_CLASS, fmtRp, fmtNum,
});
