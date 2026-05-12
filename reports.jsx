// Reports module — 4 report sub-screens with filter + print preview layout

const RPT_SUBS = [
  { id:'persediaan', label:'Laporan Persediaan',               desc:'Kartu, posisi, dan rekap persediaan barang' },
  { id:'spk',        label:'Surat Perintah Kerja',             desc:'Laporan SPK dan status penyelesaian' },
  { id:'produksi',   label:'Hasil Produksi & Pemakaian Barang',desc:'Rekap hasil produksi dan bahan yang dipakai' },
  { id:'pemakaian',  label:'Pemakaian Bahan',                  desc:'Detail pemakaian bahan per periode' },
];

// ─── Shared two-pane layout ──────────────────────────────────────────────────

function ReportLayout({ title, children }) {
  return (
    <>
      <div className="page-head">
        <div><h1>{title}</h1></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
        </div>
      </div>
      <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
        {/* Filter panel */}
        <div className="panel" style={{width:280, flexShrink:0}}>
          {children}
          <button className="btn btn-primary" style={{width:'100%', marginTop:16}}>
            {I.print()} Cetak / Preview
          </button>
        </div>

        {/* Print preview pane */}
        <div className="panel" style={{flex:1, minHeight:480, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, color:'var(--text-3)'}}>
          <div style={{opacity:0.35}}>{I.invoice(40)}</div>
          <p style={{fontSize:13, textAlign:'center', maxWidth:260}}>
            Atur filter dan klik <b>Cetak / Preview</b> untuk melihat pratinjau laporan.
          </p>
          <div style={{display:'flex', gap:8, marginTop:8, opacity:0.5}}>
            <button className="btn btn-icon btn-sm" title="Pertama">|◀</button>
            <button className="btn btn-icon btn-sm" title="Sebelumnya">◀</button>
            <select className="select" style={{width:80, fontSize:12}}><option>(none)</option></select>
            <button className="btn btn-icon btn-sm" title="Berikutnya">▶</button>
            <button className="btn btn-icon btn-sm" title="Terakhir">▶|</button>
          </div>
        </div>
      </div>
    </>
  );
}

function DateField({ label, id }) {
  const today = '2026-05-01';
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" type="date" defaultValue={today} />
    </div>
  );
}

// ─── 1. Laporan Persediaan ───────────────────────────────────────────────────

function LaporanPersediaan() {
  const [jenis, setJenis] = React.useState('Kartu Persediaan');
  return (
    <ReportLayout title="Laporan Persediaan">
      <div className="field">
        <label>Jenis Laporan</label>
        <select className="select" value={jenis} onChange={e=>setJenis(e.target.value)}>
          <option>Kartu Persediaan</option>
          <option>Posisi Persediaan</option>
          <option>Rekap Persediaan</option>
        </select>
      </div>
      <DateField label="Tgl Awal" />
      <DateField label="Tgl Akhir" />
      <div className="field">
        <label>Barang</label>
        <select className="select"><option>SEMUA</option></select>
      </div>
      <div className="field">
        <label>Gudang</label>
        <select className="select">
          <option>SEMUA</option>
          <option>Gudang Utama</option>
          <option>Gudang Kenjeran</option>
          <option>Gudang Laikannn</option>
        </select>
      </div>
      <div className="field">
        <label>Tampilan</label>
        <select className="select"><option>Qty</option><option>Nilai</option><option>Qty &amp; Nilai</option></select>
      </div>
    </ReportLayout>
  );
}

// ─── 2. Surat Perintah Kerja ─────────────────────────────────────────────────

function LaporanSPK() {
  return (
    <ReportLayout title="Surat Perintah Kerja">
      <DateField label="Tgl Awal" />
      <DateField label="Tgl Akhir" />
      <div className="field">
        <label>Nomor SPK</label>
        <input className="input" placeholder="Semua / cari nomor…" />
      </div>
      <div className="field">
        <label>Status</label>
        <select className="select">
          <option>Semua</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>
    </ReportLayout>
  );
}

// ─── 3. Hasil Produksi & Pemakaian Barang ────────────────────────────────────

function LaporanProduksi() {
  return (
    <ReportLayout title="Hasil Produksi & Pemakaian Barang">
      <DateField label="Tgl Awal" />
      <DateField label="Tgl Akhir" />
      <div className="field">
        <label>Produk</label>
        <select className="select"><option>SEMUA</option></select>
      </div>
      <div className="field">
        <label>Gudang</label>
        <select className="select"><option>SEMUA</option></select>
      </div>
    </ReportLayout>
  );
}

// ─── 4. Pemakaian Bahan ──────────────────────────────────────────────────────

function LaporanPemakaian() {
  return (
    <ReportLayout title="Pemakaian Bahan">
      <DateField label="Tgl Awal" />
      <DateField label="Tgl Akhir" />
      <div className="field">
        <label>Bahan / Barang</label>
        <select className="select"><option>SEMUA</option></select>
      </div>
      <div className="field">
        <label>Gudang</label>
        <select className="select"><option>SEMUA</option></select>
      </div>
      <div className="field">
        <label>Tampilan</label>
        <select className="select"><option>Qty</option><option>Nilai</option></select>
      </div>
    </ReportLayout>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function ReportsDashboard({ onOpenSub }) {
  return (
    <div className="page" data-screen-label="Reports — Dashboard">
      <div className="page-head">
        <div>
          <h1>Laporan</h1>
          <div className="sub">Buat dan cetak laporan persediaan, produksi, dan pemakaian bahan.</div>
        </div>
      </div>
      <h3 className="section-title">Jenis Laporan <span className="count">{RPT_SUBS.length}</span></h3>
      <div className="tile-grid">
        {RPT_SUBS.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap">{I.invoice(22)}</div>
            </div>
            <div>
              <h3>{t.label}</h3>
              <p>{t.desc}</p>
            </div>
            <div className="tile-foot"><b style={{color:'var(--text-2)', fontWeight:600}}>Buka</b> {I.arrowR(11)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ReportsPage (controlled) ────────────────────────────────────────────────

function ReportsPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <ReportsDashboard onOpenSub={onSubChange} />;

  const subLabel = RPT_SUBS.find(s => s.id === activeSub)?.label ?? activeSub;

  const content = () => {
    if (activeSub === 'persediaan') return <LaporanPersediaan />;
    if (activeSub === 'spk')        return <LaporanSPK />;
    if (activeSub === 'produksi')   return <LaporanProduksi />;
    if (activeSub === 'pemakaian')  return <LaporanPemakaian />;
    return null;
  };

  return (
    <div className="page" data-screen-label={`Reports — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Laporan</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {content()}
    </div>
  );
}
