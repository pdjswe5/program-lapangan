// Dashboard / module selector

function Spark({ data, color = 'var(--accent)' }) {
  const w = 100, h = 28, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg className="spark" width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polygon points={area} fill={color} opacity=".12" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Tile({ icon, title, desc, badge, badgeKind = 'info', count, accentColor, onClick }) {
  return (
    <button className="tile" onClick={onClick}>
      <div className="tile-head">
        <div className="tile-icon-wrap" style={accentColor ? { background: accentColor + '14', color: accentColor } : null}>
          {icon}
        </div>
        {badge && <span className={`tile-badge ${badgeKind === 'pulse' ? 'pulse' : ''}`}>{badge}</span>}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      {count != null && (
        <div className="tile-foot"><b style={{color:'var(--text-2)', fontWeight:600}}>{count}</b> action items {I.arrowR(11)}</div>
      )}
    </button>
  );
}

function Dashboard({ onOpenList }) {
  return (
    <div className="page" data-screen-label="01 Dashboard">
      <div className="crumbs">
        <a>Home</a><span className="sep">/</span>
        <span className="current">Purchase</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Purchasing Workspace</h1>
          <div className="sub">Selamat datang kembali, Administrator. Berikut ringkasan pembelian Anda hari ini.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Open POs</div>
          <div className="val mono">63</div>
          <div className="delta up">▲ 8.4% <span className="muted" style={{marginLeft:4}}>vs last week</span></div>
          <Spark data={[12,14,11,18,16,22,19,24,21,28]} />
        </div>
        <div className="kpi">
          <div className="lbl">Goods Receipts pending</div>
          <div className="val mono">17</div>
          <div className="delta down">▼ 3.1%</div>
          <Spark data={[22,20,19,21,18,17,15,18,16,17]} color="var(--realisasi)" />
        </div>
        <div className="kpi">
          <div className="lbl">Outstanding to Suppliers</div>
          <div className="val mono">{fmtRp(1284500000)}</div>
          <div className="delta up">▲ 2.1%</div>
          <Spark data={[8,9,11,10,12,11,13,12,14,13]} color="#a16207" />
        </div>
        <div className="kpi">
          <div className="lbl">On-time Realisasi (30d)</div>
          <div className="val mono">94.2<span style={{fontSize:14, color:'var(--text-3)', fontWeight:500}}>%</span></div>
          <div className="delta up">▲ 1.8 pp</div>
          <Spark data={[88,90,89,91,92,90,93,94,93,94]} color="var(--realisasi)" />
        </div>
      </div>

      <h3 className="section-title">Modul Purchase <span className="count">4</span></h3>
      <div className="tile-grid">
        <Tile
          icon={I.list(20)}
          title="Purchase Orders"
          desc="Buat, kelola, dan setujui order pembelian ke supplier."
          badge="63 POs to review"
          badgeKind="pulse"
          count="63"
          onClick={onOpenList}
        />
        <Tile
          icon={I.truck(20)}
          title="Goods Receipt"
          desc="Catat penerimaan barang dari supplier dan reconcile dengan PO."
          badge="17 pending"
          badgeKind="pulse"
          count="17"
        />
        <Tile
          icon={I.invoice(20)}
          title="Supplier Invoices"
          desc="Match invoice ke GR & PO, kelola pembayaran dan jatuh tempo."
          badge="9 to match"
          accentColor="#0d9488"
        />
        <Tile
          icon={I.zoom(20)}
          title="Monitor PO Items"
          desc="Lacak status realisasi tiap item, identifikasi keterlambatan."
          accentColor="#7c3aed"
        />
        <Tile
          icon={I.users(20)}
          title="Supplier Catalog"
          desc="Master data pemasok, kontrak, syarat pembayaran."
          accentColor="#0369a1"
        />
        <Tile
          icon={I.refresh(20)}
          title="Returns / Retur"
          desc="Catat retur pembelian dan klaim ke supplier."
          accentColor="#b45309"
        />
        <Tile
          icon={I.chart(20)}
          title="Purchase Analytics"
          desc="Spend analysis, supplier performance, kategori."
          accentColor="#1d4ed8"
        />
        <Tile
          icon={I.settings(20)}
          title="Pengaturan Modul"
          desc="Workflow approval, kategori, penomoran dokumen."
          accentColor="#6b7280"
        />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Aktivitas Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Andi P.</b> menyetujui <a className="cell-link" onClick={onOpenList}>PO-2026-0631</a> · {fmtRp(18450000)}</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 13:08</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> menerima realisasi penuh untuk <a className="cell-link" onClick={onOpenList}>PO-2026-0625</a> dari PT Indo Ban Prima</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Hari ini · 11:45</div>
              <div className="ti-what"><b className="ti-who">Rini K.</b> membuat draft order untuk CV Bengkel Sentosa</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 17:30</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> mengirim 3 reminder jatuh tempo ke supplier</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Budi S.</b> mengupdate harga 14 item katalog</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Top Suppliers (30 Hari)</h3>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {[
              ['PT Indo Ban Prima',       182400000, 92],
              ['CV Sumber Mesin Jaya',    154200000, 78],
              ['PT Auto Parts Nusantara', 128900000, 65],
              ['PT Karya Otomotif',        91250000, 46],
              ['PT Mandiri Lighting',      54100000, 27],
            ].map(([name, val, pct]) => (
              <div key={name}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                  <span>{name}</span>
                  <span className="mono muted">{fmtRp(val)}</span>
                </div>
                <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                  <div style={{height:'100%', width:pct+'%', background:'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius:999}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home Dashboard (global analytics) ──────────────────────────────────────

const ALL_HOME_KPIS = [
  { id:'booking',   label:'Booking Bulan Ini',        val:'15',         delta:'▲ 5 vs bulan lalu',    up:true,  data:[6,8,7,9,10,11,10,12,13,15] },
  { id:'pendapatan',label:'Pendapatan Lapangan (30h)', val:'Rp 3,8 jt',  delta:'▲ 12.4%',              up:true,  data:[2,2.2,2.5,2.8,2.9,3.1,3.2,3.4,3.6,3.8], color:'var(--realisasi)' },
  { id:'dp',        label:'DP Terkumpul Bulan Ini',    val:'Rp 2,2 jt',  delta:'▲ 8.3%',               up:true,  data:[1,1.2,1.3,1.5,1.6,1.8,1.9,2.0,2.1,2.2], color:'#0369a1' },
  { id:'pending',   label:'Booking Belum Konfirmasi',  val:'3',          delta:'perlu tindakan',        up:false, data:[1,2,1,2,3,2,1,2,3,3], color:'#dc2626' },
  { id:'piutang',   label:'Piutang Outstanding (Jual)',val:'Rp 6,6 jt',  delta:'4 nota belum lunas',    up:false, data:[3,4,4.5,5,5.2,5.8,6,6.2,6.4,6.6], color:'#7c3aed' },
  { id:'opname',    label:'Item Stok Aktif',           val:'24',         delta:'3 di bawah min stok',   up:false, data:[20,21,21,22,22,23,23,24,24,24], color:'#a16207' },
  { id:'aset',      label:'Total Aset Tercatat',       val:'15',         delta:'Bangunan · Kendaraan · Perlengkapan', up:true, data:[12,12,13,13,14,14,14,15,15,15], color:'#0d9488' },
  { id:'bagihasil', label:'Bagi Hasil Bulan Ini',      val:'3',          delta:'Semua tenant aktif',    up:true,  data:[1,1,2,1,2,2,3,2,3,3], color:'#8b5cf6' },
];

function HomeDashboard({ onNavigate }) {
  const bookings = window.BOOKING_LIST || [];
  const totalBooking  = bookings.length;
  const pendingCount  = bookings.filter(b=>b.status==='Pending').length;
  const berjalanCount = bookings.filter(b=>b.status==='Berjalan').length;
  const totalDP       = bookings.reduce((s,b)=>s+(b.dp||0), 0);

  const [visibleKpis, setVisibleKpis] = React.useState(['booking','pendapatan','dp','pending']);
  const [kpiPickerOpen, setKpiPickerOpen] = React.useState(false);

  const modules = [
    { id:'so',         label:'Booking Order', icon:I.cal(22),     color:'#0ea5e9', kpi:`${totalBooking} booking aktif`,    desc:'Kelola booking lapangan Padel, Mini Soccer & Futsal' },
    { id:'jual',       label:'Jual',          icon:I.cart(22),    color:'#10b981', kpi:'10 order aktif',                   desc:'Order penjualan, nota, dan katalog pelanggan' },
    { id:'beli',       label:'Beli',          icon:I.truck(22),   color:'#0369a1', kpi:'6 nota pembelian',                 desc:'Order beli, nota pemasok, dan katalog supplier' },
    { id:'kasbank',    label:'Kas Bank',       icon:I.bank(22),    color:'#8b5cf6', kpi:'11 transaksi hari ini',            desc:'Mutasi kas, bank, giro, dan pelunasan' },
    { id:'bagihasil',  label:'Bagi Hasil',     icon:I.users(22),  color:'#ec4899', kpi:'3 tenant aktif',                   desc:'Hitung dan rekap bagi hasil dengan tenant' },
    { id:'importayo',  label:'Import AYO',     icon:I.upload(22), color:'#6366f1', kpi:'Integrasi ayo.co.id',              desc:'Import data booking dari platform AYO' },
    { id:'opname',     label:'Opname',         icon:I.box(22),     color:'#f59e0b', kpi:'24 item stok',                    desc:'Stok opname barang & perlengkapan olahraga' },
    { id:'aset',       label:'Aset',           icon:I.invoice(22),color:'#0d9488', kpi:'15 aset tercatat',                 desc:'Daftar aset lapangan, kendaraan & bangunan' },
    { id:'penyusutan', label:'Penyusutan',      icon:I.chart(22),  color:'#a16207', kpi:'Metode garis lurus',               desc:'Hitung penyusutan aset per kategori & periode' },
  ];

  const toggleKpi = (id) =>
    setVisibleKpis(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]);

  const shownKpis = ALL_HOME_KPIS.filter(k => visibleKpis.includes(k.id));

  return (
    <div className="page" data-screen-label="Home — Dashboard">
      <div className="page-head">
        <div>
          <h1>Selamat Datang, Administrator</h1>
          <div className="sub">Program Lapangan — ringkasan operasional hari ini, {new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</div>
        </div>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
      </div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 className="section-title" style={{margin:0}}>Ringkasan <span className="count">{shownKpis.length}/{ALL_HOME_KPIS.length}</span></h3>
        <div style={{position:'relative'}}>
          <button className="btn btn-sm" onClick={() => setKpiPickerOpen(v => !v)}>
            {I.settings(13)} Pilih Analitik
          </button>
          {kpiPickerOpen && (
            <div className="kpi-picker">
              <div className="kpi-picker-title">Tampilkan KPI</div>
              {ALL_HOME_KPIS.map(k => (
                <label key={k.id} className="kpi-picker-row">
                  <input type="checkbox" className="cb" checked={visibleKpis.includes(k.id)}
                    onChange={() => toggleKpi(k.id)} />
                  {k.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {shownKpis.length > 0 ? (
        <div className="kpi-strip">
          {shownKpis.map(k => (
            <div key={k.id} className="kpi">
              <div className="lbl">{k.label}</div>
              <div className="val mono">{k.val}</div>
              <div className={`delta${k.up ? ' up' : ''}`}>{k.delta}</div>
              <Spark data={k.data} color={k.color} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{background:'var(--bg-sub)', border:'1px dashed var(--border)', borderRadius:8, padding:'18px 20px', marginBottom:16, color:'var(--text-3)', fontSize:13}}>
          Tidak ada KPI yang ditampilkan. Klik "Pilih Analitik" untuk memilih.
        </div>
      )}

      <h3 className="section-title">Modul Utama <span className="count">{modules.length}</span></h3>
      <div className="tile-grid">
        {modules.map(m => (
          <button key={m.id} className="tile" onClick={()=>onNavigate(m.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={{background:m.color+'14', color:m.color}}>{m.icon}</div>
            </div>
            <div>
              <h3>{m.label}</h3>
              <p>{m.desc}</p>
            </div>
            <div className="tile-foot">
              <b style={{color:'var(--text-2)', fontWeight:600}}>{m.kpi}</b> {I.arrowR(11)}
            </div>
          </button>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Aktivitas Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Admin</b> konfirmasi booking <span className="cell-link mono">BO-2026-0042</span> · Reza Permana · Padel</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 13:08</div>
              <div className="ti-what"><b className="ti-who">Sales</b> menerbitkan nota <span className="cell-link mono">NJ-2026-0248</span> · Toko Sport Arena · {fmtRp(2365000)}</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:45</div>
              <div className="ti-what"><b className="ti-who">Admin</b> input kas masuk <span className="cell-link mono">KM-2026-0118</span> · DP Booking Padel · {fmtRp(100000)}</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 17:30</div>
              <div className="ti-what"><b className="ti-who">Admin</b> booking baru <span className="cell-link mono">BO-2026-0039</span> · Tim Matahari FC · Mini Soccer</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> opname stok selesai — 24 item diverifikasi · Gudang Utama</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Akses Cepat</h3>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {[
              { label:'Booking Baru',        action:()=>onNavigate('so',    'baru')    },
              { label:'Daftar Booking',      action:()=>onNavigate('so',    'list')    },
              { label:'Order Penjualan',     action:()=>onNavigate('jual',  'order')   },
              { label:'Opname Stok',         action:()=>onNavigate('opname','opname')  },
              { label:'Input Kas Masuk',     action:()=>onNavigate('kasbank','km')     },
              { label:'Hitung Bagi Hasil',   action:()=>onNavigate('bagihasil','hitung') },
            ].map(q => (
              <button key={q.label} className="btn" style={{justifyContent:'flex-start', gap:8}} onClick={q.action}>
                {I.arrowR(12)} {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
window.HomeDashboard = HomeDashboard;
