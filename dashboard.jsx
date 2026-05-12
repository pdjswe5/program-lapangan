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
  { id:'po',       label:'Total PO Bulan Ini',       val:'63',         unit:'',  delta:'▲ 8.4% vs bulan lalu', up:true,  data:[40,45,42,50,48,55,52,58,60,63] },
  { id:'pelanggan',label:'Pelanggan Aktif',           val:'148',        unit:'',  delta:'▲ 3.2%',               up:true,  data:[130,133,135,138,140,142,144,145,147,148], color:'var(--realisasi)' },
  { id:'barang',   label:'Total Barang Aktif',        val:'15',         unit:'',  delta:'4 di bawah min stock', up:false, data:[14,14,15,15,14,15,15,15,15,15], color:'#a16207' },
  { id:'kas',      label:'Transaksi Kas Hari Ini',    val:'11',         unit:'',  delta:'▲ 2 vs kemarin',       up:true,  data:[6,8,7,9,8,10,9,11,9,11], color:'var(--realisasi)' },
  { id:'hutang',   label:'Hutang Jatuh Tempo (7d)',   val:'Rp 48,5 jt', unit:'', delta:'3 supplier',           up:false, data:[20,25,22,30,28,35,40,45,42,48], color:'#dc2626' },
  { id:'piutang',  label:'Piutang Outstanding',       val:'Rp 126 jt',  unit:'', delta:'12 pelanggan',         up:false, data:[80,90,95,100,105,110,115,120,123,126], color:'#7c3aed' },
  { id:'mutasi',   label:'Mutasi Barang (30d)',        val:'9',          unit:'', delta:'2 pending',            up:false, data:[5,6,7,6,8,7,9,8,10,9], color:'#0369a1' },
  { id:'jurnal',   label:'Jurnal Memorial Bulan Ini', val:'3',          unit:'', delta:'Semua approved',       up:true,  data:[1,1,2,1,2,2,3,2,3,3], color:'#8b5cf6' },
];

function HomeDashboard({ onNavigate }) {
  const [visibleKpis, setVisibleKpis] = React.useState(['po','pelanggan','barang','kas']);
  const [kpiPickerOpen, setKpiPickerOpen] = React.useState(false);

  const modules = [
    { id:'purchase',  label:'Purchase',   icon:I.truck(22), color:'#0ea5e9', kpi:'63 PO aktif',           desc:'Order pembelian & supplier' },
    { id:'sales',     label:'Pelanggan',  icon:I.users(22), color:'#10b981', kpi:'148 pelanggan aktif',   desc:'Order penjualan & nota' },
    { id:'inventory', label:'Inventory',  icon:I.box(22),   color:'#f59e0b', kpi:'15 produk aktif',       desc:'Barang, mutasi & stock opname' },
    { id:'finance',   label:'Akuntan',    icon:I.bank(22),  color:'#8b5cf6', kpi:'3 jurnal bulan ini',    desc:'Akun buku besar & aktiva' },
    { id:'cashbank',  label:'Cash & Bank',icon:I.bank(22),  color:'#ec4899', kpi:'11 transaksi hari ini', desc:'Kas, bank, giro & pelunasan' },
    { id:'master',    label:'Master Data',icon:I.users(22), color:'#64748b', kpi:'10 user aktif',         desc:'Salesman, gudang, satuan' },
  ];

  const toggleKpi = (id) =>
    setVisibleKpis(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]);

  const shownKpis = ALL_HOME_KPIS.filter(k => visibleKpis.includes(k.id));

  return (
    <div className="page" data-screen-label="Home — Dashboard">
      <div className="page-head">
        <div>
          <h1>Selamat Datang, Administrator</h1>
          <div className="sub">PT. Pacific Data Jaya — ringkasan operasional hari ini, {new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</div>
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
          <h3>Aktivitas Terkini (Semua Modul)</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Andi P.</b> menyetujui PO-2026-0631 · Purchase</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 13:08</div>
              <div className="ti-what"><b className="ti-who">Rini K.</b> memulai stock opname SO26040002 · Inventory</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:45</div>
              <div className="ti-what"><b className="ti-who">Kevin H.</b> input kas masuk KM-2026-0412 · Cash &amp; Bank</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 17:30</div>
              <div className="ti-what"><b className="ti-who">Brandon</b> membuat nota penjualan NJ-2026-0388 · Pelanggan</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> mendeteksi 4 item barang di bawah min stock · Inventory</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Akses Cepat</h3>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {[
              { label:'Buat PO Baru',         action:()=>onNavigate('purchase') },
              { label:'Lihat PO List',         action:()=>onNavigate('purchase') },
              { label:'Stock Opname',          action:()=>onNavigate('inventory') },
              { label:'Input Kas Masuk',       action:()=>onNavigate('cashbank') },
              { label:'Katalog Pelanggan',     action:()=>onNavigate('sales') },
              { label:'Fitur Administrator',   action:()=>onNavigate('admin') },
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
