// Pelanggan (Customer) module — dashboard + 4 sub-screens + modals

const PELANGGAN = [
  { name:'Andika Firmansyah',      code:'C001', alamat:'Jl. Raya Gubeng No. 12',     kota:'Surabaya', tel:'0812-3001-014', pemilik:'Andika',     nik:'3578011201900001', email:'andika.firmansyah@gmail.com',   kontak:'0812-3001-014', flag:null },
  { name:'Lisa Halim',             code:'C002', alamat:'Jl. Dharmahusada No. 5',     kota:'Surabaya', tel:'0812-3001-007', pemilik:'Lisa',        nik:'3578014504980002', email:'lisa.halim@gmail.com',          kontak:'0812-3001-007', flag:null },
  { name:'Kevin Sanjaya',          code:'C003', alamat:'Jl. Diponegoro No. 88',      kota:'Surabaya', tel:'0812-3001-006', pemilik:'Kevin',       nik:'3578012008990003', email:'kevin.sanjaya@email.com',       kontak:'0812-3001-006', flag:'pink' },
  { name:'Reza Permana',           code:'C004', alamat:'Jl. Mulyosari No. 34',       kota:'Surabaya', tel:'0812-3001-001', pemilik:'Reza',        nik:'3578011905950004', email:'reza.permana@gmail.com',        kontak:'0812-3001-001', flag:null },
  { name:'Diana Putri',            code:'C005', alamat:'Jl. Kertajaya Indah No. 9',  kota:'Surabaya', tel:'0812-3001-003', pemilik:'Diana',       nik:'3578016206010005', email:'diana.putri@gmail.com',         kontak:'0812-3001-003', flag:null },
  { name:'Bima Sakti',             code:'C006', alamat:'Jl. Ahmad Yani No. 200',     kota:'Surabaya', tel:'0812-3001-002', pemilik:'Bima',        nik:'3578010307980006', email:'bima.sakti@gmail.com',          kontak:'0812-3001-002', flag:null },
  { name:'Gita Permadi',           code:'C007', alamat:'Jl. Rungkut Industri No. 7', kota:'Surabaya', tel:'0812-3001-009', pemilik:'Gita',        nik:'3578012102000007', email:'gita.permadi@gmail.com',        kontak:'0812-3001-009', flag:null },
  { name:'Stevani Lee',            code:'C008', alamat:'Jl. Pakuwon City Blok B2',   kota:'Surabaya', tel:'0812-3001-012', pemilik:'Stevani',     nik:'3578015506030008', email:'stevani.lee@gmail.com',         kontak:'0812-3001-012', flag:'pink' },
  { name:'Andre Taulany',          code:'C009', alamat:'Jl. Manyar Kertoadi No. 3',  kota:'Surabaya', tel:'0812-3001-010', pemilik:'Andre',       nik:'3578011201880009', email:'andre.taulany@gmail.com',       kontak:'0812-3001-010', flag:null },
  { name:'FC Bintang Jaya',        code:'T001', alamat:'Jl. Semolowaru No. 15',      kota:'Surabaya', tel:'0821-9001-001', pemilik:'Coach Agus',  nik:'',                 email:'fcbintangjaya@gmail.com',       kontak:'0821-9001-001', flag:null },
  { name:'Komunitas Futsal SBY',   code:'T002', alamat:'Jl. Ngagel Jaya No. 22',     kota:'Surabaya', tel:'0812-3001-005', pemilik:'Pak Rizal',   nik:'',                 email:'komunitas.futsal@gmail.com',    kontak:'0812-3001-005', flag:null },
  { name:'Tim Matahari FC',        code:'T003', alamat:'Jl. Ketintang No. 77',       kota:'Surabaya', tel:'0812-3001-004', pemilik:'Coach Hendra',nik:'',                 email:'timmataharifc@gmail.com',       kontak:'0812-3001-004', flag:null },
  { name:'Komunitas Sehat',        code:'T004', alamat:'Jl. Wonokromo No. 50',       kota:'Surabaya', tel:'0812-3001-013', pemilik:'Bu Retno',    nik:'',                 email:'komunitassehat@gmail.com',      kontak:'0812-3001-013', flag:null },
  { name:'Tim Garuda Muda',        code:'T005', alamat:'Jl. Kendangsari No. 18',     kota:'Surabaya', tel:'0812-3001-015', pemilik:'Pak Wahyu',   nik:'',                 email:'timolahraga.garuda@gmail.com',  kontak:'0812-3001-015', flag:null },
  { name:'Juventus FC Indo',       code:'T006', alamat:'Jl. Dukuh Kupang No. 101',   kota:'Surabaya', tel:'0812-3001-011', pemilik:'Pak Doni',    nik:'',                 email:'juventusindofutsal@gmail.com',  kontak:'0812-3001-011', flag:null },
  { name:'Akademi Padel Surabaya', code:'T007', alamat:'Jl. Darmo No. 45',           kota:'Surabaya', tel:'0878-5001-001', pemilik:'Coach Ferdi', nik:'',                 email:'akademipadel.sby@gmail.com',    kontak:'0878-5001-001', flag:'pink' },
  { name:'Club Padel Eastside',    code:'T008', alamat:'Jl. Galaxy Bumi Permai B7',  kota:'Surabaya', tel:'0878-5001-002', pemilik:'Ivan Halim',  nik:'',                 email:'padel.eastside@gmail.com',      kontak:'0878-5001-002', flag:null },
  { name:'Nisa Ramadhani',         code:'C010', alamat:'Jl. Keputih Tegal No. 12',   kota:'Surabaya', tel:'0857-0010-001', pemilik:'Nisa',        nik:'3578014807020010', email:'nisa.ramadhani@gmail.com',      kontak:'0857-0010-001', flag:null },
  { name:'Fauzan Hakim',           code:'C011', alamat:'Jl. Kalibokor No. 33',       kota:'Surabaya', tel:'0857-0010-002', pemilik:'Fauzan',      nik:'3578011502990011', email:'fauzan.hakim@gmail.com',        kontak:'0857-0010-002', flag:null },
  { name:'Toko Sport Arena',       code:'S001', alamat:'Jl. Pemuda No. 20',          kota:'Surabaya', tel:'031-5678-9000',  pemilik:'Pak Arief',   nik:'',                 email:'toko.sportarena@gmail.com',     kontak:'0812-8001-001', flag:null },
];

const ORDER_PENJUALAN = [
  { tgl:'12-05-2026', no:'OP-2026-0158', pelanggan:'Toko Sport Arena',        divisi:'Futsal',      ref:'BO-2026-0042', sales:'Sales Senior', top: 7, due:'19-05-2026', items:8, total: 2150000, status:'Approved'  },
  { tgl:'12-05-2026', no:'OP-2026-0157', pelanggan:'Akademi Padel Surabaya',  divisi:'Padel',       ref:'BO-2026-0041', sales:'Sales Baru 2', top: 0, due:'12-05-2026', items:5, total:  850000, status:'Pending'   },
  { tgl:'11-05-2026', no:'OP-2026-0156', pelanggan:'FC Bintang Jaya',         divisi:'Futsal',      ref:'BO-2026-0040', sales:'Sales Senior', top:14, due:'25-05-2026', items:3, total:  450000, status:'Realisasi' },
  { tgl:'11-05-2026', no:'OP-2026-0155', pelanggan:'Reza Permana',            divisi:'Padel',       ref:'BO-2026-0039', sales:'Sales Baru 2', top: 0, due:'11-05-2026', items:4, total:  620000, status:'Realisasi' },
  { tgl:'10-05-2026', no:'OP-2026-0154', pelanggan:'Tim Matahari FC',         divisi:'Mini Soccer', ref:'BO-2026-0038', sales:'Sales Senior', top:14, due:'24-05-2026', items:6, total: 1200000, status:'Approved'  },
  { tgl:'10-05-2026', no:'OP-2026-0153', pelanggan:'Club Padel Eastside',     divisi:'Padel',       ref:'BO-2026-0037', sales:'Sales Baru 2', top: 7, due:'17-05-2026', items:3, total:  380000, status:'Draft'     },
  { tgl:'09-05-2026', no:'OP-2026-0152', pelanggan:'Kevin Sanjaya',           divisi:'Padel',       ref:'BO-2026-0036', sales:'Sales Senior', top: 0, due:'09-05-2026', items:2, total:  250000, status:'Realisasi' },
  { tgl:'09-05-2026', no:'OP-2026-0151', pelanggan:'Komunitas Futsal SBY',    divisi:'Futsal',      ref:'BO-2026-0035', sales:'Sales Baru 2', top:14, due:'23-05-2026', items:4, total:  690000, status:'Approved'  },
  { tgl:'08-05-2026', no:'OP-2026-0150', pelanggan:'Tim Garuda Muda',         divisi:'Mini Soccer', ref:'BO-2026-0034', sales:'Sales Senior', top: 7, due:'15-05-2026', items:5, total:  950000, status:'Realisasi' },
  { tgl:'08-05-2026', no:'OP-2026-0149', pelanggan:'Diana Putri',             divisi:'Padel',       ref:'BO-2026-0033', sales:'Sales Baru 2', top: 0, due:'08-05-2026', items:2, total:  200000, status:'Realisasi' },
];

const NOTA_PENJUALAN = [
  { tgl:'12-05-2026', no:'NJ-2026-0248', pelanggan:'Toko Sport Arena',        refSO:'OP-2026-0158', gudang:'Gudang Utama',          sales:'Sales Senior', total: 2365000, status:'Outstanding' },
  { tgl:'12-05-2026', no:'NJ-2026-0247', pelanggan:'Reza Permana',            refSO:'OP-2026-0155', gudang:'Gudang Mini Bar Padel',  sales:'Sales Baru 2', total:  682000, status:'Lunas'       },
  { tgl:'11-05-2026', no:'NJ-2026-0246', pelanggan:'FC Bintang Jaya',         refSO:'OP-2026-0156', gudang:'Gudang Kantin Arena',   sales:'Sales Senior', total:  495000, status:'Lunas'       },
  { tgl:'11-05-2026', no:'NJ-2026-0245', pelanggan:'Tim Matahari FC',         refSO:'OP-2026-0154', gudang:'Gudang Perlengkapan',   sales:'Sales Senior', total: 1320000, status:'Outstanding' },
  { tgl:'10-05-2026', no:'NJ-2026-0244', pelanggan:'Akademi Padel Surabaya',  refSO:'OP-2026-0157', gudang:'Gudang Mini Bar Padel',  sales:'Sales Baru 2', total:  935000, status:'Outstanding' },
  { tgl:'09-05-2026', no:'NJ-2026-0243', pelanggan:'Kevin Sanjaya',           refSO:'OP-2026-0152', gudang:'Gudang Mini Bar Padel',  sales:'Sales Senior', total:  275000, status:'Lunas'       },
  { tgl:'09-05-2026', no:'NJ-2026-0242', pelanggan:'Komunitas Futsal SBY',    refSO:'OP-2026-0151', gudang:'Gudang Kantin Arena',   sales:'Sales Baru 2', total:  759000, status:'Lunas'       },
  { tgl:'08-05-2026', no:'NJ-2026-0241', pelanggan:'Tim Garuda Muda',         refSO:'OP-2026-0150', gudang:'Gudang Perlengkapan',   sales:'Sales Senior', total: 1045000, status:'Outstanding' },
  { tgl:'08-05-2026', no:'NJ-2026-0240', pelanggan:'Diana Putri',             refSO:'OP-2026-0149', gudang:'Gudang Mini Bar Padel',  sales:'Sales Baru 2', total:  220000, status:'Lunas'       },
];


const SALES_LIST = ['Sales Baru 2', 'Sales Senior', 'Sales Junior 1', 'Sales Junior 2'];
const AKUN_TUNAI = ['Kas Besar — IDR', 'Bank BCA 8810-99', 'Bank Mandiri 1212', 'Kas Kecil Cabang'];
const GUDANG_PJ = ['Gudang Mini Bar Padel', 'Gudang Kantin Arena', 'Gudang Utama', 'Gudang Perlengkapan'];

Object.assign(window, { PELANGGAN, ORDER_PENJUALAN, NOTA_PENJUALAN, SALES_LIST, AKUN_TUNAI, GUDANG_PJ });

const PJ_SUBS = [
  { id:'katalog', label:'Katalog Pelanggan' },
  { id:'order',   label:'Order Penjualan' },
  { id:'nota',    label:'Nota Penjualan' },
];

function PjSubNav({ active, onChange }) {
  return (
    <div className="tabs-pills" style={{marginBottom:18, marginTop:-4}}>
      {PJ_SUBS.map(s => (
        <button key={s.id} className={active===s.id?'active':''} onClick={()=>onChange(s.id)}>{s.label}</button>
      ))}
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────

function PelangganDashboard({ onOpenSub, onNavigate }) {
  const totalPel = PELANGGAN.length;
  const aktifPel = PELANGGAN.filter(p => p.email).length;
  const pendingOrd = ORDER_PENJUALAN.filter(o => o.status === 'Pending' || o.status === 'Draft').length;
  const outstanding = NOTA_PENJUALAN.filter(n => n.status === 'Outstanding').reduce((s,n) => s+n.total, 0);
  const omzet30 = NOTA_PENJUALAN.reduce((s,n)=>s+n.total, 0);

  const tiles = [
    { id:'katalog', icon:I.users(20),   title:'Katalog Pelanggan', desc:'Master data pelanggan, kontak, alamat, dan info perusahaan.', badge:`${totalPel} pelanggan`, count:`${aktifPel} aktif`, accent:null },
    { id:'order',   icon:I.cart(20),    title:'Order Penjualan',   desc:'Buat dan kelola order penjualan, approval, hingga realisasi.', badge: pendingOrd > 0 ? `${pendingOrd} perlu approval` : null, badgeKind:'pulse', accent:'#0d9488' },
    { id:'nota',    icon:I.invoice(20), title:'Nota Penjualan',    desc:'Penerbitan nota/invoice untuk pelanggan dan tracking pembayaran.', badge:`${NOTA_PENJUALAN.filter(n=>n.status==='Outstanding').length} outstanding`, accent:'#7c3aed' },
  ];

  return (
    <div className="page" data-screen-label="Jual — Dashboard">
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <span className="current">Jual</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Jual Workspace</h1>
          <div className="sub">Kelola penjualan, order, dan nota produk & persewaan lapangan.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-sm btn-primary" onClick={()=>onOpenSub('order')}>{I.plus()} Order Baru</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Total Pelanggan</div>
          <div className="val mono">{totalPel}</div>
          <div className="delta up">{aktifPel} aktif (kontak lengkap)</div>
        </div>
        <div className="kpi">
          <div className="lbl">Omzet (30 Hari)</div>
          <div className="val mono">{fmtRp(omzet30)}</div>
          <div className="delta up">▲ 6.2% vs bulan lalu</div>
        </div>
        <div className="kpi">
          <div className="lbl">Outstanding Piutang</div>
          <div className="val mono" style={{color: outstanding > 50000000 ? 'var(--warn)' : 'var(--text)'}}>{fmtRp(outstanding)}</div>
          <div className="delta down">{NOTA_PENJUALAN.filter(n=>n.status==='Outstanding').length} nota belum lunas</div>
        </div>
        <div className="kpi">
          <div className="lbl">Order Aktif</div>
          <div className="val mono">{ORDER_PENJUALAN.length}</div>
          <div className="delta">{pendingOrd} menunggu tindakan</div>
        </div>
      </div>

      <h3 className="section-title">Modul Jual <span className="count">{tiles.length}</span></h3>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={t.accent ? { background: t.accent + '14', color: t.accent } : null}>{t.icon}</div>
              {t.badge && <span className={`tile-badge ${t.badgeKind === 'pulse' ? 'pulse' : ''}`}>{t.badge}</span>}
            </div>
            <div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
            {t.count && <div className="tile-foot"><b style={{color:'var(--text-2)', fontWeight:600}}>{t.count}</b> {I.arrowR(11)}</div>}
          </button>
        ))}
      </div>

      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Top Pelanggan (30 Hari)</h3>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {[
              ['FC Bintang Jaya',    12500000, 95],
              ['Komunitas Futsal SBY', 8750000, 66],
              ['Tim Matahari',       6300000, 48],
              ['Sari Mart',          4675000, 35],
              ['Kevin Sanjaya',      3200000, 24],
            ].map(([nm, val, pct]) => (
              <div key={nm}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                  <span>{nm}</span><span className="mono muted">{fmtRp(val)}</span>
                </div>
                <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                  <div style={{height:'100%', width:pct+'%', background:'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius:999}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Aktivitas Penjualan Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Sales</b> menerbitkan nota <span className="cell-link mono">NJ-2026-0231</span> · FC Bintang Jaya</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:08</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> order penjualan <span className="cell-link mono">OP-2026-0142</span> disetujui · Padel</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 16:30</div>
              <div className="ti-what"><b className="ti-who">Sales</b> membuat order <span className="cell-link mono">OP-2026-0141</span> · Futsal — Komunitas SBY</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Admin</b> menambah pelanggan baru: Tim Matahari</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Header helper ──────────────────────────────────────────────────────────

function PjHeader({ title, sub, onAdd, addLabel='Tambah', extra }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {extra}
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

// ─── 1. Katalog Pelanggan ───────────────────────────────────────────────────

function KatalogPelanggan({ onAdd, onEdit }) {
  const [q, setQ] = React.useState('');
  const [kota, setKota] = React.useState('');
  const filtered = PELANGGAN.filter(p => {
    if (q) {
      const s = q.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.code.toLowerCase().includes(s) && !(p.pemilik||'').toLowerCase().includes(s)) return false;
    }
    if (kota && p.kota !== kota) return false;
    return true;
  });
  const kotas = [...new Set(PELANGGAN.map(p => p.kota).filter(Boolean))];

  return (
    <>
      <PjHeader title="Katalog Pelanggan" sub={`Jumlah: ${filtered.length} pelanggan`} onAdd={onAdd} addLabel="Tambah Pelanggan" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field">
            <label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama, kode, atau pemilik…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="field">
            <label>Kriteria</label>
            <select className="select"><option>Semua</option><option>Aktif</option><option>Non-aktif</option><option>VIP</option></select>
          </div>
          <div className="field">
            <label>Kota</label>
            <select className="select" value={kota} onChange={e=>setKota(e.target.value)}>
              <option value="">Semua kota</option>
              {kotas.map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn">Pilih Kolom</button>
            <button className="btn btn-primary">{I.filter()} Cari</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div>
          <div className="table-toolbar-right">
            <button className="btn btn-sm">Aksi Katalog {I.chev(11)}</button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Nama Perusahaan</th>
                <th>Kode</th>
                <th>Alamat</th>
                <th>Kota</th>
                <th>Telepon</th>
                <th>Nama Pemilik</th>
                <th>NIK</th>
                <th>Email</th>
                <th>Kontak</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.code} onClick={()=>onEdit(p)} style={p.flag === 'pink' ? { background: '#fde4ec' } : null}>
                  <td><span className="cell-link">{p.name}</span></td>
                  <td className="mono muted">{p.code}</td>
                  <td>{p.alamat || <span className="muted">—</span>}</td>
                  <td>{p.kota || <span className="muted">—</span>}</td>
                  <td className="mono">{p.tel || <span className="muted">—</span>}</td>
                  <td>{p.pemilik || <span className="muted">—</span>}</td>
                  <td className="mono">{p.nik || <span className="muted">—</span>}</td>
                  <td className={p.email ? 'cell-link' : ''}>{p.email || <span className="muted">—</span>}</td>
                  <td>{p.kontak || <span className="muted">—</span>}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(p)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Email">{I.email()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <div>Menampilkan <b style={{color:'var(--text)'}}>1</b>–<b style={{color:'var(--text)'}}>{filtered.length}</b> dari <b style={{color:'var(--text)'}}>{filtered.length}</b></div>
          <div className="pager-pages"><button className="active">1</button></div>
          <div>Tampilkan <b style={{color:'var(--text)'}}>25</b> per halaman</div>
        </div>
      </div>
    </>
  );
}

// ─── 2. Order Penjualan list ────────────────────────────────────────────────

function OrderPenjualan({ onAdd, onEdit }) {
  return (
    <>
      <PjHeader title="Order Penjualan" sub={`${ORDER_PENJUALAN.length} order · ${ORDER_PENJUALAN.filter(o=>o.status==='Pending'||o.status==='Draft').length} perlu tindakan`} onAdd={onAdd} addLabel="Order Baru" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. order, pelanggan, ref…"/></div></div>
          <div className="field"><label>Divisi</label><select className="select"><option value="">Semua Divisi</option><option>Padel</option><option>Mini Soccer</option><option>Futsal</option></select></div>
          <div className="field"><label>Pelanggan</label><select className="select"><option>Semua</option>{PELANGGAN.slice(0,12).map(p=><option key={p.code}>{p.name}</option>)}</select></div>
          <div className="field"><label>Status</label><select className="select"><option>Semua</option><option>Draft</option><option>Pending</option><option>Approved</option><option>Realisasi</option></select></div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>{ORDER_PENJUALAN.length}</b> order · Total {fmtRp(ORDER_PENJUALAN.reduce((s,o)=>s+o.total, 0))}</div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Tgl. Bukti</th>
                <th>No. Order</th>
                <th>Pelanggan</th>
                <th>No. Ref</th>
                <th>Sales</th>
                <th className="num">TOP</th>
                <th>Jth. Tempo</th>
                <th className="num">Items</th>
                <th className="num">Total Rp</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ORDER_PENJUALAN.map(o => (
                <tr key={o.no} onClick={()=>onEdit(o)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td className="mono">{o.tgl}</td>
                  <td><span className="cell-link mono">{o.no}</span></td>
                  <td>{o.pelanggan}</td>
                  <td className="mono muted">{o.ref}</td>
                  <td>{o.sales}</td>
                  <td className="num mono">{o.top}</td>
                  <td className="mono">{o.due}</td>
                  <td className="num mono">{o.items}</td>
                  <td className="num mono">{fmtRp(o.total)}</td>
                  <td><span className={`pill ${STATUS_CLASS[o.status] || 'draft'}`}>{o.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" onClick={()=>onEdit(o)} title="Edit">{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Print">{I.print()}</button>
                      <button className="btn btn-icon btn-sm del" title="Batal">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── 3. Nota Penjualan list ─────────────────────────────────────────────────

function NotaPenjualan({ onAdd, onEdit }) {
  return (
    <>
      <PjHeader title="Nota Penjualan" sub={`${NOTA_PENJUALAN.length} nota · ${NOTA_PENJUALAN.filter(n=>n.status==='Outstanding').length} outstanding`} onAdd={onAdd} addLabel="Nota Baru" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. nota, pelanggan…"/></div></div>
          <div className="field"><label>Pelanggan</label><select className="select"><option>Semua</option>{PELANGGAN.slice(0,12).map(p=><option key={p.code}>{p.name}</option>)}</select></div>
          <div className="field"><label>Gudang</label><select className="select"><option>Semua</option>{GUDANG_PJ.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Status</label><select className="select"><option>Semua</option><option>Lunas</option><option>Outstanding</option><option>Partial</option></select></div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>{NOTA_PENJUALAN.length}</b> nota · Total {fmtRp(NOTA_PENJUALAN.reduce((s,n)=>s+n.total,0))}</div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Tgl. Bukti</th>
                <th>No. Nota</th>
                <th>Pelanggan</th>
                <th>Ref. Booking</th>
                <th>Gudang</th>
                <th>Sales</th>
                <th className="num">Total Rp</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {NOTA_PENJUALAN.map(n => (
                <tr key={n.no} onClick={()=>onEdit(n)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td className="mono">{n.tgl}</td>
                  <td><span className="cell-link mono">{n.no}</span></td>
                  <td>{n.pelanggan}</td>
                  <td className="mono muted">{n.refSO}</td>
                  <td>{n.gudang}</td>
                  <td>{n.sales}</td>
                  <td className="num mono">{fmtRp(n.total)}</td>
                  <td><span className={`pill ${n.status==='Lunas'?'realisasi':n.status==='Outstanding'?'pending':'draft'}`}>{n.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" onClick={()=>onEdit(n)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm">{I.print()}</button>
                      <button className="btn btn-icon btn-sm">{I.email()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Modals ─────────────────────────────────────────────────────────────────

function PjModalShell({ title, sub, onClose, onSave, children, saveLabel = 'Simpan', wide = false }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide ? {maxWidth: 1100} : {maxWidth: 700}}>
        <div className="modal-head">
          <div><h2>{title}</h2>{sub && <div className="sub">{sub}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} {saveLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PelangganModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [form, setForm] = React.useState(data || { name:'', code:'', alamat:'', kota:'', tel:'', pemilik:'', nik:'', email:'', kontak:'' });
  const [tab, setTab] = React.useState('umum');
  const set = (k,v) => setForm(f => ({...f, [k]: v}));
  return (
    <PjModalShell wide title={isEdit ? `Edit Pelanggan — ${data.code}` : 'Tambah Pelanggan Baru'}
      sub={isEdit ? data.name : 'Lengkapi informasi master pelanggan'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit ? 'Simpan Perubahan' : 'Simpan Pelanggan'}>
      <div className="tabs-pills" style={{marginBottom:14}}>
        <button className={tab==='umum'?'active':''} onClick={()=>setTab('umum')}>Informasi Umum</button>
        <button className={tab==='kontak'?'active':''} onClick={()=>setTab('kontak')}>Kontak & Alamat</button>
        <button className={tab==='term'?'active':''} onClick={()=>setTab('term')}>Term & Kredit</button>
      </div>

      {tab === 'umum' && (
        <div className="form-section">
          <div className="form-row">
            <div className="field"><label>Nama Perusahaan *</label><input className="input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Contoh: PT Sari Mart"/></div>
            <div className="field"><label>Kode *</label><input className="input mono" value={form.code} onChange={e=>set('code',e.target.value)} placeholder="C001"/></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Nama Pemilik</label><input className="input" value={form.pemilik} onChange={e=>set('pemilik',e.target.value)}/></div>
            <div className="field"><label>NIK / NPWP</label><input className="input mono" value={form.nik} onChange={e=>set('nik',e.target.value)}/></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Kategori</label><select className="select"><option>Reseller</option><option>End User</option><option>Korporat</option><option>VIP</option></select></div>
            <div className="field"><label>Status</label>
              <label style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:13, marginTop:8}}>
                <input type="checkbox" className="cb" defaultChecked/> Pelanggan Aktif
              </label>
            </div>
          </div>
        </div>
      )}

      {tab === 'kontak' && (
        <div className="form-section">
          <div className="field"><label>Alamat</label><textarea className="textarea" value={form.alamat} onChange={e=>set('alamat',e.target.value)} placeholder="Jl. ..."/></div>
          <div className="form-row-3">
            <div className="field"><label>Kota</label><input className="input" value={form.kota} onChange={e=>set('kota',e.target.value)}/></div>
            <div className="field"><label>Provinsi</label><input className="input"/></div>
            <div className="field"><label>Kode Pos</label><input className="input mono"/></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Telepon</label><input className="input mono" value={form.tel} onChange={e=>set('tel',e.target.value)}/></div>
            <div className="field"><label>Kontak Person</label><input className="input" value={form.kontak} onChange={e=>set('kontak',e.target.value)}/></div>
          </div>
          <div className="field"><label>Email</label><input className="input" type="email" value={form.email} onChange={e=>set('email',e.target.value)}/></div>
        </div>
      )}

      {tab === 'term' && (
        <div className="form-section">
          <div className="form-row">
            <div className="field"><label>TOP Default (Hari)</label><input className="input mono" type="number" defaultValue={14}/></div>
            <div className="field"><label>Limit Kredit (Rp)</label><input className="input mono" type="number" defaultValue={0}/></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Sales Default</label><select className="select">{SALES_LIST.map(s=><option key={s}>{s}</option>)}</select></div>
            <div className="field"><label>Diskon Default %</label><input className="input mono" type="number" defaultValue={0}/></div>
          </div>
          <div className="field"><label>Catatan</label><textarea className="textarea" placeholder="Catatan internal tentang pelanggan ini"/></div>
        </div>
      )}
    </PjModalShell>
  );
}

// Reusable item-table for Order/Nota/Retur
function ItemTable({ kind, lines, setLines }) {
  const update = (id, patch) => setLines(ls => ls.map(l => l.id===id ? {...l, ...patch} : l));
  const removeLine = id => setLines(ls => ls.filter(l => l.id !== id));
  const addLine = () => setLines(ls => [...ls, { id:Date.now(), item:'', qty:1, disc:0, desc:'' }]);

  return (
    <div className="line-items">
      <table>
        <thead>
          <tr>
            <th style={{width:'24%'}}>Nama Barang</th>
            <th>Kode</th>
            <th className="num" style={{width:70}}>Jumlah</th>
            {kind === 'order' && <th className="realisasi-h num" style={{width:80}}>Realisasi</th>}
            <th style={{width:70}}>Satuan</th>
            <th className="num">Harga Rp</th>
            <th className="num" style={{width:70}}>Disc %</th>
            <th className="num">Disc Rp</th>
            <th className="num">Total Rp</th>
            <th style={{width:80}}>DPP/0</th>
            <th>Deskripsi</th>
            <th style={{width:38}}></th>
          </tr>
        </thead>
        <tbody>
          {lines.length === 0 && (
            <tr><td colSpan={12} className="empty" style={{padding:'40px 16px', textAlign:'center', color:'var(--text-3)'}}>Belum ada item. Klik "+ Tambah Item" untuk mulai.</td></tr>
          )}
          {lines.map(l => {
            const it = BARANG.find(b => b.name === l.item);
            const harga = it?.price || it?.hpp || 0;
            const sub = (l.qty||0) * harga;
            const discRp = sub * (l.disc||0)/100;
            const total = sub - discRp;
            return (
              <tr key={l.id}>
                <td>
                  <select className="cell" style={{height:28, padding:'0 6px', border:'1px solid transparent', background:'transparent', borderRadius:4, width:'100%', fontSize:13}}
                    value={l.item} onChange={e=>update(l.id, { item: e.target.value })}>
                    <option value="">— Pilih —</option>
                    {BARANG.map(b=><option key={b.code}>{b.name}</option>)}
                  </select>
                </td>
                <td className="mono muted" style={{padding:'0 8px', fontSize:12.5}}>{it?.code || '—'}</td>
                <td><input className="cell num" type="number" value={l.qty} onChange={e=>update(l.id, { qty: +e.target.value })}/></td>
                {kind === 'order' && <td className="realisasi-cell">0</td>}
                <td className="muted" style={{padding:'0 8px', fontSize:12.5}}>{it?.unit || '—'}</td>
                <td className="num mono" style={{padding:'0 8px', fontSize:13}}>{fmtNum(harga)}</td>
                <td><input className="cell num" type="number" value={l.disc} onChange={e=>update(l.id, { disc: +e.target.value })}/></td>
                <td className="num mono" style={{padding:'0 8px', fontSize:13}}>{fmtNum(Math.round(discRp))}</td>
                <td className="num mono" style={{padding:'0 8px', fontSize:13, fontWeight:500}}>{fmtNum(Math.round(total))}</td>
                <td className="mono muted" style={{padding:'0 8px', fontSize:12.5}}>DPP</td>
                <td><input className="cell" placeholder="—" value={l.desc||''} onChange={e=>update(l.id,{desc:e.target.value})} style={{padding:'0 8px'}}/></td>
                <td><button className="btn btn-icon btn-sm del" onClick={()=>removeLine(l.id)} style={{color:'var(--text-3)'}}>{I.trash()}</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="add-row">
        <button className="btn btn-ghost btn-sm" onClick={addLine}>{I.plus()} Tambah Item</button>
      </div>
    </div>
  );
}

function TotalsCard({ subtotal, discPct, setDiscPct, ppn, setPpn, ppnMode, setPpnMode }) {
  const discRp = subtotal * (discPct||0) / 100;
  const dpp = subtotal - discRp;
  const ppnRp = ppnMode === 'Exclude' ? Math.round(dpp * (ppn||0)/100) : 0;
  const total = dpp + ppnRp;
  return (
    <div className="totals-card">
      <div className="row"><span>Subtotal DPP</span><span className="v mono">{fmtRp(Math.round(subtotal))}</span></div>
      <div className="row disc">
        <span style={{display:'flex', alignItems:'center', gap:8}}>
          Diskon
          <input className="input" type="number" value={discPct} onChange={e=>setDiscPct(+e.target.value)} style={{width:62, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}}/> %
        </span>
        <span className="v mono">−{fmtRp(Math.round(discRp))}</span>
      </div>
      <div className="row muted"><span>DPP</span><span className="v mono">{fmtRp(Math.round(dpp))}</span></div>
      <div className="row">
        <span style={{display:'flex', alignItems:'center', gap:8}}>
          PPN
          <input className="input" type="number" value={ppn} onChange={e=>setPpn(+e.target.value)} style={{width:50, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}}/> %
          <select className="select" value={ppnMode} onChange={e=>setPpnMode(e.target.value)} style={{width:90, height:26, padding:'0 6px', fontSize:12.5}}>
            <option>Include</option><option>Exclude</option>
          </select>
        </span>
        <span className="v mono" style={{color:'var(--accent)'}}>{fmtRp(ppnRp)}</span>
      </div>
      <div className="row total"><span>Total</span><span className="v mono">{fmtRp(Math.round(total))}</span></div>
    </div>
  );
}

function OrderModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [tab, setTab] = React.useState('pelanggan');
  const [itemTab, setItemTab] = React.useState('stock');
  const [lines, setLines] = React.useState([]);
  const [discPct, setDiscPct] = React.useState(0);
  const [ppn, setPpn] = React.useState(0);
  const [ppnMode, setPpnMode] = React.useState('Include');
  const subtotal = lines.reduce((s,l) => {
    const it = BARANG.find(b => b.name === l.item);
    const harga = it?.price || it?.hpp || 0;
    return s + (l.qty||0) * harga * (1 - (l.disc||0)/100);
  }, 0);

  return (
    <PjModalShell wide title={isEdit ? `Edit Order — ${data.no}` : 'Order Penjualan'}
      sub={isEdit ? `${data.pelanggan} · ${data.tgl}` : 'Buat order penjualan baru'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit ? 'Simpan Perubahan' : 'Simpan Order'}>
      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:18, marginBottom:16}}>
        <div className="form-section" style={{margin:0}}>
          <div className="tabs-pills" style={{marginBottom:12}}>
            <button className={tab==='pelanggan'?'active':''} onClick={()=>setTab('pelanggan')}>Pelanggan</button>
            <button className={tab==='kirim'?'active':''} onClick={()=>setTab('kirim')}>Pengiriman</button>
          </div>
          {tab === 'pelanggan' && (
            <>
              <div className="form-row">
                <div className="field"><label>Tgl. Bukti</label><input className="input" type="date" defaultValue="2026-05-12"/></div>
                <div className="field"><label>No. Referensi</label><input className="input mono" defaultValue={data?.ref || ''}/></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Divisi *</label>
                  <select className="select" defaultValue={data?.divisi || ''}>
                    <option value="">— Pilih Divisi —</option>
                    <option>Padel</option>
                    <option>Mini Soccer</option>
                    <option>Futsal</option>
                  </select>
                </div>
                <div className="field"><label>Pelanggan *</label>
                  <select className="select" defaultValue={data?.pelanggan || ''}>
                    <option value="">— Pilih pelanggan —</option>
                    {PELANGGAN.map(p=><option key={p.code}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field"><label>Sales</label>
                  <select className="select" defaultValue={data?.sales || 'Sales Baru 2'}>
                    {SALES_LIST.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field"><label>TOP (Hari)</label><input className="input mono" type="number" defaultValue={data?.top ?? 0}/></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Jth. Tempo</label><input className="input" type="date" defaultValue="2026-05-26"/></div>
                <div className="field"><label>Catatan</label><input className="input" placeholder="Opsional…"/></div>
              </div>
            </>
          )}
          {tab === 'kirim' && (
            <>
              <div className="field"><label>Alamat Pengiriman</label><textarea className="textarea" placeholder="Alamat tujuan pengiriman"/></div>
              <div className="form-row">
                <div className="field"><label>Kota Tujuan</label><input className="input"/></div>
                <div className="field"><label>Estimasi Tiba</label><input className="input" type="date"/></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Metode</label><select className="select"><option>Diantar Sales</option><option>Ekspedisi</option><option>Diambil Pelanggan</option></select></div>
                <div className="field"><label>Biaya Kirim Rp</label><input className="input mono" type="number" defaultValue={0}/></div>
              </div>
            </>
          )}
        </div>

        <TotalsCard subtotal={subtotal} discPct={discPct} setDiscPct={setDiscPct} ppn={ppn} setPpn={setPpn} ppnMode={ppnMode} setPpnMode={setPpnMode} />
      </div>

      <div className="tabs-pills" style={{marginBottom:0}}>
        <button className={itemTab==='stock'?'active':''} onClick={()=>setItemTab('stock')}>Stock</button>
        <button className={itemTab==='lain'?'active':''} onClick={()=>setItemTab('lain')}>Pendapatan Lain</button>
      </div>
      <ItemTable kind="order" lines={lines} setLines={setLines}/>
    </PjModalShell>
  );
}

function NotaModal({ data, onClose, onSave }) {
  const [tab, setTab] = React.useState('pelanggan');
  const [itemTab, setItemTab] = React.useState('stock');
  const [lines, setLines] = React.useState([]);
  const [discPct, setDiscPct] = React.useState(0);
  const [ppn, setPpn] = React.useState(0);
  const [ppnMode, setPpnMode] = React.useState('Include');
  const subtotal = lines.reduce((s,l) => {
    const it = BARANG.find(b => b.name === l.item);
    const harga = it?.price || it?.hpp || 0;
    return s + (l.qty||0) * harga * (1 - (l.disc||0)/100);
  }, 0);
  const isEdit = !!data;

  return (
    <PjModalShell wide title={isEdit ? `Edit Nota — ${data.no}` : 'Nota Penjualan'}
      sub={isEdit ? `${data.pelanggan} · ${data.tgl}` : 'Terbitkan nota penjualan ke pelanggan'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit ? 'Simpan Perubahan' : 'Terbitkan Nota'}>
      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:18, marginBottom:16}}>
        <div className="form-section" style={{margin:0}}>
          <div className="tabs-pills" style={{marginBottom:12}}>
            <button className={tab==='pelanggan'?'active':''} onClick={()=>setTab('pelanggan')}>Pelanggan</button>
            <button className={tab==='kirim'?'active':''} onClick={()=>setTab('kirim')}>Pengiriman</button>
          </div>
          {tab === 'pelanggan' && (
            <>
              <div className="form-row">
                <div className="field"><label>Tgl. Bukti</label><input className="input" type="date" defaultValue="2026-04-30"/></div>
                <div className="field"><label>No. BO</label><select className="select" defaultValue={data?.refSO || ''}><option value="">— Pilih Booking —</option>{ORDER_PENJUALAN.map(o=><option key={o.no}>{o.no}</option>)}</select></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Pelanggan *</label>
                  <select className="select" defaultValue={data?.pelanggan || ''}>
                    <option value="">— Pilih —</option>
                    {PELANGGAN.map(p=><option key={p.code}>{p.name}</option>)}
                  </select>
                </div>
                <div className="field"><label>Gudang</label>
                  <select className="select" defaultValue={data?.gudang || 'Gudang Konjoran'}>
                    {GUDANG_PJ.map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field"><label>TOP (Hari)</label><input className="input mono" type="number" defaultValue={0}/></div>
                <div className="field"><label>Jth. Tempo</label><input className="input" type="date" defaultValue="2026-04-30"/></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Sales</label><select className="select" defaultValue={data?.sales || 'Sales Baru 2'}>{SALES_LIST.map(s=><option key={s}>{s}</option>)}</select></div>
                <div className="field"><label>Akun Tunai</label><select className="select"><option value="">— Pilih akun —</option>{AKUN_TUNAI.map(a=><option key={a}>{a}</option>)}</select></div>
              </div>
              <div className="field"><label>Catatan</label><textarea className="textarea"/></div>
            </>
          )}
          {tab === 'kirim' && (
            <>
              <div className="field"><label>Alamat Pengiriman</label><textarea className="textarea"/></div>
              <div className="form-row">
                <div className="field"><label>Metode</label><select className="select"><option>Diantar Sales</option><option>Ekspedisi</option><option>Diambil Pelanggan</option></select></div>
                <div className="field"><label>Biaya Kirim Rp</label><input className="input mono" type="number" defaultValue={0}/></div>
              </div>
            </>
          )}
        </div>

        <TotalsCard subtotal={subtotal} discPct={discPct} setDiscPct={setDiscPct} ppn={ppn} setPpn={setPpn} ppnMode={ppnMode} setPpnMode={setPpnMode} />
      </div>

      <div className="tabs-pills" style={{marginBottom:0}}>
        <button className={itemTab==='stock'?'active':''} onClick={()=>setItemTab('stock')}>Stock</button>
        <button className={itemTab==='lain'?'active':''} onClick={()=>setItemTab('lain')}>Pendapatan Lain</button>
      </div>
      <ItemTable kind="nota" lines={lines} setLines={setLines}/>
    </PjModalShell>
  );
}

// ─── Page wrapper ───────────────────────────────────────────────────────────

function PelangganPage({ activeSub, onSubChange, onNavigate }) {
  const [modal, setModal] = React.useState(null);

  const close = () => setModal(null);
  const onSave = () => { setModal(null); window.__erpToast && window.__erpToast('Data berhasil disimpan.'); };

  if (!activeSub) return <PelangganDashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;

  return (
    <div className="page" data-screen-label={`Jual — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Jual</a><span className="sep">/</span>
        <span className="current">{PJ_SUBS.find(s=>s.id===activeSub)?.label}</span>
      </div>
      {activeSub === 'katalog' && <KatalogPelanggan onAdd={()=>setModal({kind:'pel'})} onEdit={(d)=>setModal({kind:'pel', data:d})}/>}
      {activeSub === 'order'   && <OrderPenjualan   onAdd={()=>setModal({kind:'order'})} onEdit={(d)=>setModal({kind:'order', data:d})}/>}
      {activeSub === 'nota'    && <NotaPenjualan    onAdd={()=>setModal({kind:'nota'})}  onEdit={(d)=>setModal({kind:'nota',  data:d})}/>}

      {modal?.kind === 'pel'   && <PelangganModal data={modal.data} onClose={close} onSave={onSave}/>}
      {modal?.kind === 'order' && <OrderModal     data={modal.data} onClose={close} onSave={onSave}/>}
      {modal?.kind === 'nota'  && <NotaModal      data={modal.data} onClose={close} onSave={onSave}/>}
    </div>
  );
}

window.PelangganPage = PelangganPage;
window.JualPage = PelangganPage;
