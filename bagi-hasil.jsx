// Bagi Hasil module — hitung dan riwayat bagi hasil tenant

const BH_SUBS = [
  { id:'hitung',  label:'Hitung Bagi Hasil' },
  { id:'riwayat', label:'Riwayat Bagi Hasil' },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────

function BagiHasilDashboard({ onOpenSub, onNavigate }) {
  const riwayat = window.BAGI_HASIL || [];
  const totalPendapatan = riwayat.reduce((s,r)=>s+r.pendapatanKotor, 0);
  const totalTenant     = riwayat.reduce((s,r)=>s+r.bagianTenant, 0);
  const totalPerusahaan = riwayat.reduce((s,r)=>s+r.bagianPerusahaan, 0);
  const tenants         = window.TENANTS || [];

  return (
    <div className="page" data-screen-label="Bagi Hasil — Dashboard">
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a>
        <span className="sep">/</span><span className="current">Bagi Hasil</span>
      </div>
      <div className="page-head">
        <div><h1>Bagi Hasil Workspace</h1><div className="sub">Hitung dan catat bagi hasil pendapatan dengan tenant lapangan.</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-primary" onClick={()=>onOpenSub('hitung')}>{I.plus()} Hitung Bagi Hasil</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Total Tenant</div><div className="val mono">{tenants.length}</div><div className="delta up">aktif berjalan</div></div>
        <div className="kpi"><div className="lbl">Total Pendapatan</div><div className="val mono">{fmtRp(totalPendapatan)}</div><div className="delta up">{riwayat.length} transaksi</div></div>
        <div className="kpi"><div className="lbl">Bagian Tenant</div><div className="val mono">{fmtRp(totalTenant)}</div><div className="delta down">dibayarkan ke tenant</div></div>
        <div className="kpi"><div className="lbl">Bagian Perusahaan</div><div className="val mono">{fmtRp(totalPerusahaan)}</div><div className="delta up">pendapatan bersih</div></div>
      </div>

      <div className="tile-grid" style={{gridTemplateColumns:'repeat(2,1fr)', marginTop:8}}>
        {[
          { id:'hitung',  icon:I.invoice(20), title:'Hitung Bagi Hasil',  desc:'Input pendapatan kotor dan persentase tenant — hasil dihitung otomatis secara real-time.', badge:null,                   accent:'#8b5cf6' },
          { id:'riwayat', icon:I.list(20),    title:'Riwayat Bagi Hasil', desc:'Lihat semua catatan pembagian hasil dengan detail tenant, nominal, dan status pembayaran.',  badge:`${riwayat.length} catatan`, accent:'#0d9488' },
        ].map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={{background:t.accent+'14', color:t.accent}}>{t.icon}</div>
              {t.badge && <span className="tile-badge">{t.badge}</span>}
            </div>
            <div><h3>{t.title}</h3><p>{t.desc}</p></div>
          </button>
        ))}
      </div>

      <div className="panel" style={{marginTop:24}}>
        <h3>Riwayat Terakhir</h3>
        <div className="table-scroll" style={{maxHeight:240}}>
          <table className="data" style={{fontSize:12.5}}>
            <thead>
              <tr><th>Tanggal</th><th>Tenant</th><th className="num">Pend. Kotor</th><th className="center">%</th><th className="num">Bag. Tenant</th><th className="num">Bag. Perusahaan</th><th>Status</th></tr>
            </thead>
            <tbody>
              {riwayat.slice(0,6).map((r,i) => (
                <tr key={i}>
                  <td className="mono">{r.tanggal}</td>
                  <td>{r.tenant}</td>
                  <td className="num mono">{fmtRp(r.pendapatanKotor)}</td>
                  <td className="center mono">{r.persenTenant}%</td>
                  <td className="num mono">{fmtRp(r.bagianTenant)}</td>
                  <td className="num mono">{fmtRp(r.bagianPerusahaan)}</td>
                  <td><span className={`pill ${r.status==='Lunas'?'realisasi':'pending'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Form Hitung Bagi Hasil ───────────────────────────────────────────────────

function BHHitungPage({ onSaved }) {
  const tenants = window.TENANTS || [];
  const [form, setForm] = React.useState({
    tenant: tenants[0]?.nama || '',
    pendapatanKotor: 0,
    persenTenant: 40,
  });
  const set = (k,v) => setForm(f => ({...f, [k]:v}));

  const persenPerusahaan = 100 - form.persenTenant;
  const bagianTenant     = Math.round(form.pendapatanKotor * form.persenTenant / 100);
  const bagianPerusahaan = form.pendapatanKotor - bagianTenant;

  const handleSimpan = () => {
    if (!form.tenant || form.pendapatanKotor <= 0) {
      window.__erpToast && window.__erpToast('Pilih tenant dan isi pendapatan kotor lebih dari 0.');
      return;
    }
    window.__erpToast && window.__erpToast('Bagi hasil berhasil disimpan.');
    onSaved && onSaved();
  };

  return (
    <>
      <div className="page-head">
        <div><h1>Hitung Bagi Hasil</h1><div className="sub">Input pendapatan dan persentase — hasil dihitung otomatis</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-primary" onClick={handleSimpan}>{I.check()} Simpan Bagi Hasil</button>
        </div>
      </div>

      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:900}}>
        <div className="form-section panel">
          <h4>Input Data</h4>
          <div className="field">
            <label>Tenant *</label>
            <select className="select" value={form.tenant} onChange={e=>set('tenant',e.target.value)}>
              {tenants.map(t=><option key={t.id} value={t.nama}>{t.nama}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Pendapatan Kotor (Rp) *</label>
            <input className="input mono" type="number" min={0} value={form.pendapatanKotor}
              onChange={e=>set('pendapatanKotor',+e.target.value)} placeholder="0"/>
          </div>
          <div className="form-row" style={{alignItems:'flex-end', gap:12}}>
            <div className="field" style={{flex:1}}>
              <label>% Tenant</label>
              <input className="input mono" type="number" min={0} max={100} value={form.persenTenant}
                onChange={e=>set('persenTenant',Math.min(100,Math.max(0,+e.target.value)))}/>
            </div>
            <div style={{padding:'0 4px 8px', color:'var(--text-3)', fontSize:13}}>+</div>
            <div className="field" style={{flex:1}}>
              <label>% Perusahaan</label>
              <div className="input mono" style={{background:'var(--bg-sub)', padding:'7px 10px', borderRadius:6, color:'var(--text-2)'}}>{persenPerusahaan}%</div>
            </div>
            <div style={{padding:'0 4px 8px', color:'var(--text-3)', fontSize:13}}>=</div>
            <div style={{padding:'0 4px 8px', color:'var(--realisasi)', fontWeight:700, fontSize:13}}>100%</div>
          </div>
        </div>

        <div className="panel" style={{background:'var(--bg-sub)'}}>
          <h4>Hasil Perhitungan</h4>
          <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:8}}>
            <div>
              <div style={{fontSize:11.5, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4}}>Pendapatan Kotor</div>
              <div style={{fontSize:22, fontWeight:700, fontFamily:'var(--font-mono)', color:'var(--text)'}}>{fmtRp(form.pendapatanKotor)}</div>
            </div>
            <div style={{height:1, background:'var(--border)'}} />
            <div>
              <div style={{fontSize:11.5, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4}}>
                Bagian Tenant ({form.tenant || '—'}) · {form.persenTenant}%
              </div>
              <div style={{fontSize:20, fontWeight:700, fontFamily:'var(--font-mono)', color:'#8b5cf6'}}>{fmtRp(bagianTenant)}</div>
            </div>
            <div>
              <div style={{fontSize:11.5, color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4}}>
                Bagian Perusahaan · {persenPerusahaan}%
              </div>
              <div style={{fontSize:20, fontWeight:700, fontFamily:'var(--font-mono)', color:'var(--realisasi)'}}>{fmtRp(bagianPerusahaan)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Riwayat ──────────────────────────────────────────────────────────────────

function BHRiwayatPage({ onAdd }) {
  const riwayat = window.BAGI_HASIL || [];
  const [tenantFilter, setTenantFilter] = React.useState('Semua');
  const tenants = window.TENANTS || [];
  const filtered = riwayat.filter(r => tenantFilter === 'Semua' || r.tenant === tenantFilter);

  return (
    <>
      <div className="page-head">
        <div><h1>Riwayat Bagi Hasil</h1><div className="sub">{filtered.length} dari {riwayat.length} catatan</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.download()} Export</button>
          <button className="btn btn-primary" onClick={onAdd}>{I.plus()} Hitung Baru</button>
        </div>
      </div>
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Tenant</label>
            <select className="select" value={tenantFilter} onChange={e=>setTenantFilter(e.target.value)}>
              <option>Semua</option>{tenants.map(t=><option key={t.id} value={t.nama}>{t.nama}</option>)}
            </select>
          </div>
          <div className="filter-actions"><button className="btn" onClick={()=>setTenantFilter('Semua')}>Reset</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            <b>{filtered.length}</b> catatan · Total pendapatan <b className="mono">{fmtRp(filtered.reduce((s,r)=>s+r.pendapatanKotor,0))}</b>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Tenant</th>
                <th className="num">Pend. Kotor (Rp)</th>
                <th className="center">% Tenant</th>
                <th className="num">Bagian Tenant (Rp)</th>
                <th className="num">Bagian Perusahaan (Rp)</th>
                <th>Status</th>
                <th style={{width:80}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r,i) => (
                <tr key={i}>
                  <td className="mono">{r.tanggal}</td>
                  <td>{r.tenant}</td>
                  <td className="num mono">{fmtRp(r.pendapatanKotor)}</td>
                  <td className="center mono">{r.persenTenant}%</td>
                  <td className="num mono" style={{color:'#8b5cf6'}}>{fmtRp(r.bagianTenant)}</td>
                  <td className="num mono" style={{color:'var(--realisasi)'}}>{fmtRp(r.bagianPerusahaan)}</td>
                  <td><span className={`pill ${r.status==='Lunas'?'realisasi':'pending'}`}>{r.status}</span></td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm">{I.print()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
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

function BagiHasilPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <BagiHasilDashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;
  return (
    <div className="page" data-screen-label={`Bagi Hasil — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Bagi Hasil</a><span className="sep">/</span>
        <span className="current">{BH_SUBS.find(s=>s.id===activeSub)?.label || activeSub}</span>
      </div>
      {activeSub==='hitung'  && <BHHitungPage  onSaved={()=>onSubChange('riwayat')} />}
      {activeSub==='riwayat' && <BHRiwayatPage onAdd={()=>onSubChange('hitung')} />}
    </div>
  );
}

window.BagiHasilPage = BagiHasilPage;
