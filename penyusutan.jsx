// Penyusutan module — perhitungan penyusutan aset olahraga

const PY_SUBS = [
  { id:'hitung', label:'Hitung Penyusutan' },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────

function PenyusutanDashboard({ onOpenSub, onNavigate }) {
  const asetData = window.ASET || [];
  const totalAkumulasi   = asetData.reduce((s,a)=>s+a.akumulasi, 0);
  const totalSusutTahun  = asetData.reduce((s,a)=>s+a.susutPerTahun, 0);
  const totalNilaiBuku   = asetData.reduce((s,a)=>s+a.nilaiBuku, 0);
  const totalPerolehan   = asetData.reduce((s,a)=>s+a.nilaiPerolehan, 0);

  return (
    <div className="page" data-screen-label="Penyusutan — Dashboard">
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a>
        <span className="sep">/</span><span className="current">Penyusutan</span>
      </div>
      <div className="page-head">
        <div><h1>Penyusutan Workspace</h1><div className="sub">Hitung penyusutan aset tetap dengan metode garis lurus per periode.</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-primary" onClick={()=>onOpenSub('hitung')}>{I.chart()} Hitung Penyusutan</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Total Aset</div><div className="val mono">{asetData.length}</div><div className="delta up">aset tetap terdaftar</div></div>
        <div className="kpi"><div className="lbl">Nilai Perolehan</div><div className="val mono">{fmtRp(totalPerolehan)}</div><div className="delta up">harga awal</div></div>
        <div className="kpi"><div className="lbl">Akm. Penyusutan</div><div className="val mono">{fmtRp(totalAkumulasi)}</div><div className="delta down">sd. periode berjalan</div></div>
        <div className="kpi"><div className="lbl">Nilai Buku Saat Ini</div><div className="val mono">{fmtRp(totalNilaiBuku)}</div><div className="delta up">setelah penyusutan</div></div>
      </div>

      <div className="tile-grid" style={{marginTop:8}}>
        <button className="tile" onClick={()=>onOpenSub('hitung')}>
          <div className="tile-head">
            <div className="tile-icon-wrap" style={{background:'#a1620714', color:'#a16207'}}>{I.chart(20)}</div>
            <span className="tile-badge">{asetData.length} aset</span>
          </div>
          <div><h3>Hitung Penyusutan</h3><p>Tampilkan tabel penyusutan per aset dengan filter kategori — Bangunan, Kendaraan, Perlengkapan. Metode garis lurus (straight line).</p></div>
        </button>
      </div>

      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16, marginTop:24}}>
        <div className="panel">
          <h3>Ringkasan Penyusutan per Kategori</h3>
          <div className="table-scroll">
            <table className="data" style={{fontSize:12.5}}>
              <thead>
                <tr><th>Kategori</th><th className="center">Jml Aset</th><th className="num">Nilai Perolehan</th><th className="num">Akm. Susut</th><th className="num">Nilai Buku</th></tr>
              </thead>
              <tbody>
                {['Bangunan','Kendaraan','Perlengkapan'].map(kat => {
                  const items = asetData.filter(a=>a.kategori===kat);
                  if (!items.length) return null;
                  return (
                    <tr key={kat}>
                      <td><span className={`pill ${kat==='Bangunan'?'realisasi':kat==='Kendaraan'?'pending':'draft'}`}>{kat}</span></td>
                      <td className="center mono">{items.length}</td>
                      <td className="num mono">{fmtRp(items.reduce((s,a)=>s+a.nilaiPerolehan,0))}</td>
                      <td className="num mono" style={{color:'var(--text-3)'}}>{fmtRp(items.reduce((s,a)=>s+a.akumulasi,0))}</td>
                      <td className="num mono" style={{fontWeight:600}}>{fmtRp(items.reduce((s,a)=>s+a.nilaiBuku,0))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <h3>Penyusutan / Tahun per Kategori</h3>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:8}}>
            {['Bangunan','Kendaraan','Perlengkapan'].map(kat => {
              const items = asetData.filter(a=>a.kategori===kat);
              const susut = items.reduce((s,a)=>s+a.susutPerTahun, 0);
              const col = kat==='Bangunan'?'#0369a1':kat==='Kendaraan'?'#7c3aed':'#0d9488';
              const maxSusut = Math.max(...['Bangunan','Kendaraan','Perlengkapan'].map(k=>asetData.filter(a=>a.kategori===k).reduce((s,a)=>s+a.susutPerTahun,0))) || 1;
              return (
                <div key={kat}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:4}}>
                    <span>{kat}</span><span className="mono muted">{fmtRp(susut)}/thn</span>
                  </div>
                  <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                    <div style={{height:'100%', width:Math.max(4,(susut/maxSusut)*100)+'%', background:col, borderRadius:999}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tabel Penyusutan ─────────────────────────────────────────────────────────

function PenyusutanHitung({ onNavigate }) {
  const asetData = window.ASET || [];
  const [katFilter, setKatFilter] = React.useState('Semua');
  const [periode, setPeriode] = React.useState('2026-05');
  const [showDetail, setShowDetail] = React.useState(false);

  const filtered = asetData.filter(a => katFilter === 'Semua' || a.kategori === katFilter);

  const susutBulanIni = (aset) => Math.round(aset.susutPerTahun / 12);
  const totalSusutBulan = filtered.reduce((s,a)=>s+susutBulanIni(a), 0);
  const totalNilaiBuku  = filtered.reduce((s,a)=>s+a.nilaiBuku, 0);

  return (
    <>
      <div className="page-head">
        <div><h1>Hitung Penyusutan</h1><div className="sub">Metode Garis Lurus (Straight Line) — {filtered.length} aset</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.download()} Export</button>
          <button className="btn btn-sm btn-primary" onClick={()=>window.__erpToast&&window.__erpToast('Penyusutan periode '+periode+' berhasil dihitung.')}>{I.check()} Posting Penyusutan</button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Kategori</label>
            <select className="select" value={katFilter} onChange={e=>setKatFilter(e.target.value)}>
              <option>Semua</option><option>Bangunan</option><option>Kendaraan</option><option>Perlengkapan</option>
            </select>
          </div>
          <div className="field"><label>Periode</label>
            <input className="input" type="month" value={periode} onChange={e=>setPeriode(e.target.value)}/>
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={()=>{setKatFilter('Semua');setPeriode('2026-05');}}>Reset</button>
          </div>
        </div>
      </div>

      <div className="kpi-strip" style={{marginBottom:16}}>
        <div className="kpi"><div className="lbl">Aset Dihitung</div><div className="val mono">{filtered.length}</div></div>
        <div className="kpi"><div className="lbl">Penyusutan Bulan Ini</div><div className="val mono">{fmtRp(totalSusutBulan)}</div><div className="delta down">periode {periode}</div></div>
        <div className="kpi"><div className="lbl">Total Nilai Buku</div><div className="val mono">{fmtRp(totalNilaiBuku)}</div></div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>{filtered.length}</b> aset · Penyusutan bulan ini: <b className="mono">{fmtRp(totalSusutBulan)}</b></div>
          <div style={{display:'flex', gap:8}}>
            <label style={{display:'flex', alignItems:'center', gap:6, fontSize:12.5, cursor:'pointer'}}>
              <input type="checkbox" className="cb" checked={showDetail} onChange={e=>setShowDetail(e.target.checked)}/> Detail kolom
            </label>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Kode</th>
                <th style={{width:'24%'}}>Nama Aset</th>
                <th>Kategori</th>
                <th>Tgl. Perolehan</th>
                {showDetail && <th className="center">Umur (Thn)</th>}
                <th className="num">Nilai Perolehan</th>
                <th className="num">Susut/Tahun</th>
                <th className="num">Susut/Bulan</th>
                <th className="num">Akm. Susut</th>
                <th className="num">Nilai Buku</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const susutBulan = susutBulanIni(a);
                const pctSusut   = a.nilaiPerolehan > 0 ? (a.akumulasi / a.nilaiPerolehan * 100).toFixed(1) : '0.0';
                return (
                  <tr key={a.kode}>
                    <td className="mono cell-link">{a.kode}</td>
                    <td>{a.nama}</td>
                    <td><span className={`pill ${a.kategori==='Bangunan'?'realisasi':a.kategori==='Kendaraan'?'pending':'draft'}`}>{a.kategori}</span></td>
                    <td className="mono">{a.tglBeli}</td>
                    {showDetail && <td className="center mono">{a.umurEkonomis}</td>}
                    <td className="num mono">{fmtRp(a.nilaiPerolehan)}</td>
                    <td className="num mono" style={{color:'var(--text-2)'}}>{fmtRp(a.susutPerTahun)}</td>
                    <td className="num mono" style={{color:'var(--accent)'}}>{fmtRp(susutBulan)}</td>
                    <td className="num mono" style={{color:'var(--text-3)'}}>
                      {fmtRp(a.akumulasi)}
                      <div style={{fontSize:10.5, marginTop:2, color:'var(--text-3)'}}>{pctSusut}%</div>
                    </td>
                    <td className="num mono" style={{fontWeight:600}}>{fmtRp(a.nilaiBuku)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{fontWeight:600, background:'var(--bg-sub)'}}>
                <td colSpan={showDetail?4:3} style={{padding:'10px 12px', textAlign:'right', fontSize:12, textTransform:'uppercase', letterSpacing:'.04em', color:'var(--text-2)'}}>Total</td>
                <td></td>
                <td className="num mono" style={{padding:'10px 8px'}}>{fmtRp(filtered.reduce((s,a)=>s+a.nilaiPerolehan,0))}</td>
                <td className="num mono" style={{padding:'10px 8px'}}>{fmtRp(filtered.reduce((s,a)=>s+a.susutPerTahun,0))}</td>
                <td className="num mono" style={{padding:'10px 8px', color:'var(--accent)'}}>{fmtRp(totalSusutBulan)}</td>
                <td className="num mono" style={{padding:'10px 8px', color:'var(--text-3)'}}>{fmtRp(filtered.reduce((s,a)=>s+a.akumulasi,0))}</td>
                <td className="num mono" style={{padding:'10px 8px'}}>{fmtRp(totalNilaiBuku)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="pager">
          <div>Jumlah: <b style={{color:'var(--text)'}}>{filtered.length}</b></div>
          <div className="pager-pages"><button className="active">1</button></div>
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PenyusutanPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <PenyusutanDashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;
  return (
    <div className="page" data-screen-label={`Penyusutan — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Penyusutan</a><span className="sep">/</span>
        <span className="current">{PY_SUBS.find(s=>s.id===activeSub)?.label || activeSub}</span>
      </div>
      {activeSub==='hitung' && <PenyusutanHitung onNavigate={onNavigate} />}
    </div>
  );
}

window.PenyusutanPage = PenyusutanPage;
