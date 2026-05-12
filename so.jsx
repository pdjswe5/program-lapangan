// SO (Sales Order / Booking Online) module

const DIVISI_LIST = ['Padel', 'Mini Soccer', 'Futsal'];

const LAPANGAN_MAP = {
  'Padel':       ['Lapangan Padel 1', 'Lapangan Padel 2'],
  'Mini Soccer': ['Lapangan Mini Soccer A'],
  'Futsal':      ['Lapangan Futsal 1', 'Lapangan Futsal 2'],
};

const SO_SUBS = [
  { id:'list',  label:'Daftar Booking' },
  { id:'baru',  label:'Booking Baru'   },
];

const STATUS_COLOR = {
  'Pending':    'draft',
  'Konfirmasi': 'pending',
  'Berjalan':   'realisasi',
  'Selesai':    'realisasi',
  'Batal':      'cancelled',
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

function SODashboard({ onOpenSub, onNavigate }) {
  const bookings = window.BOOKING_LIST || [];
  const totalSO       = bookings.length;
  const pending       = bookings.filter(b=>b.status==='Pending').length;
  const berjalan      = bookings.filter(b=>b.status==='Berjalan').length;
  const selesai       = bookings.filter(b=>b.status==='Selesai').length;

  return (
    <div className="page" data-screen-label="SO — Dashboard">
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a>
        <span className="sep">/</span><span className="current">SO / Booking</span>
      </div>
      <div className="page-head">
        <div><h1>SO / Booking Workspace</h1><div className="sub">Kelola booking lapangan padel, mini soccer, dan futsal secara online.</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-primary" onClick={()=>onOpenSub('baru')}>{I.plus()} Booking Baru</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Total SO</div><div className="val mono">{totalSO}</div><div className="delta up">periode berjalan</div></div>
        <div className="kpi"><div className="lbl">Pending</div><div className="val mono">{pending}</div><div className="delta down">menunggu konfirmasi</div></div>
        <div className="kpi"><div className="lbl">Berjalan</div><div className="val mono">{berjalan}</div><div className="delta up">sedang sewa</div></div>
        <div className="kpi"><div className="lbl">Selesai</div><div className="val mono">{selesai}</div><div className="delta up">bulan ini</div></div>
      </div>

      <div className="tile-grid" style={{gridTemplateColumns:'repeat(2,1fr)', marginTop:8}}>
        {[
          { id:'list', icon:I.list(20), title:'Daftar Booking', desc:'Lihat semua SO/booking aktif, filter per divisi dan tanggal, ubah status.', badge:`${totalSO} booking`, accent:'#0ea5e9' },
          { id:'baru', icon:I.plus(20), title:'Booking Baru', desc:'Buat SO booking baru — pilih divisi, lapangan, jam, dan data penyewa.', badge:null, accent:'#10b981' },
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

      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16, marginTop:24}}>
        <div className="panel">
          <h3>Booking Terkini</h3>
          <div className="table-scroll" style={{maxHeight:260}}>
            <table className="data" style={{fontSize:12.5}}>
              <thead>
                <tr>
                  <th>No. SO</th><th>Penyewa</th><th>Divisi</th><th>Lapangan</th><th>Tgl</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0,8).map(b=>(
                  <tr key={b.noSO} onClick={()=>onOpenSub('list')}>
                    <td className="mono cell-link">{b.noSO}</td>
                    <td>{b.namaPenyewa}</td>
                    <td><span className={`pill ${b.divisi==='Padel'?'realisasi':b.divisi==='Futsal'?'pending':'draft'}`}>{b.divisi}</span></td>
                    <td className="muted">{b.lapangan}</td>
                    <td className="mono">{b.tanggal}</td>
                    <td><span className={`pill ${STATUS_COLOR[b.status]||'draft'}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <h3>Booking per Divisi</h3>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:8}}>
            {DIVISI_LIST.map(div => {
              const cnt = bookings.filter(b=>b.divisi===div).length;
              const pct = bookings.length ? (cnt/bookings.length)*100 : 0;
              const col = div==='Padel'?'#10b981':div==='Futsal'?'#f59e0b':'#0ea5e9';
              return (
                <div key={div}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:4}}>
                    <span>{div}</span><span className="mono muted">{cnt} booking</span>
                  </div>
                  <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                    <div style={{height:'100%', width:Math.max(4,pct)+'%', background:col, borderRadius:999}} />
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

// ─── Daftar Booking ───────────────────────────────────────────────────────────

function SOListPage({ onAdd, onNavigate }) {
  const bookings = window.BOOKING_LIST || [];
  const [divisiFilter, setDivisiFilter] = React.useState('Semua');
  const [statusFilter, setStatusFilter] = React.useState('Semua');
  const [q, setQ] = React.useState('');

  const filtered = bookings.filter(b => {
    const matchDiv = divisiFilter === 'Semua' || b.divisi === divisiFilter;
    const matchSt  = statusFilter === 'Semua' || b.status === statusFilter;
    const matchQ   = !q || b.namaPenyewa.toLowerCase().includes(q.toLowerCase()) || b.noSO.includes(q);
    return matchDiv && matchSt && matchQ;
  });

  return (
    <>
      <div className="page-head">
        <div><h1>Daftar Booking</h1><div className="sub">{filtered.length} dari {bookings.length} booking</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.download()} Export</button>
          <button className="btn btn-primary" onClick={onAdd}>{I.plus()} Booking Baru</button>
        </div>
      </div>
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Divisi</label>
            <select className="select" value={divisiFilter} onChange={e=>setDivisiFilter(e.target.value)}>
              <option>Semua</option>{DIVISI_LIST.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="field"><label>Status</label>
            <select className="select" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option>Semua</option><option>Pending</option><option>Konfirmasi</option><option>Berjalan</option><option>Selesai</option><option>Batal</option>
            </select>
          </div>
          <div className="field"><label>Cari Penyewa / No. SO</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama penyewa atau no. SO…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={()=>{setDivisiFilter('Semua');setStatusFilter('Semua');setQ('');}}>Reset</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>{filtered.length}</b> booking</div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>No. SO</th>
                <th>Tanggal</th>
                <th>Divisi</th>
                <th>Lapangan</th>
                <th>Jam</th>
                <th>Nama Penyewa</th>
                <th>No. HP</th>
                <th className="num">Deposit (Rp)</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.noSO}>
                  <td className="mono cell-link">{b.noSO}</td>
                  <td className="mono">{b.tanggal}</td>
                  <td><span className={`pill ${b.divisi==='Padel'?'realisasi':b.divisi==='Futsal'?'pending':'draft'}`}>{b.divisi}</span></td>
                  <td>{b.lapangan}</td>
                  <td className="mono">{b.jamMulai} – {b.jamSelesai}</td>
                  <td>{b.namaPenyewa}</td>
                  <td className="mono muted">{b.noHp}</td>
                  <td className="num mono">{fmtRp(b.deposit)}</td>
                  <td><span className={`pill ${STATUS_COLOR[b.status]||'draft'}`}>{b.status}</span></td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm">{I.edit()}</button>
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
          <div>Tampilkan <b style={{color:'var(--text)'}}>25</b> per halaman</div>
        </div>
      </div>
    </>
  );
}

// ─── Form Booking Baru ────────────────────────────────────────────────────────

function SOFormBaru({ onSave, onCancel }) {
  const emptyForm = { divisi:'Padel', lapangan:'Lapangan Padel 1', tanggal:'', jamMulai:'08:00', jamSelesai:'10:00', namaPenyewa:'', noHp:'', deposit:0, catatan:'' };
  const [form, setForm] = React.useState(emptyForm);
  const set = (k,v) => setForm(f => ({...f, [k]:v}));

  const handleDivisi = (v) => {
    const lap = (LAPANGAN_MAP[v]||[])[0] || '';
    setForm(f => ({...f, divisi:v, lapangan:lap}));
  };

  const handleSubmit = () => {
    if (!form.tanggal || !form.namaPenyewa || !form.noHp) {
      window.__erpToast && window.__erpToast('Lengkapi tanggal, nama penyewa, dan no. HP terlebih dahulu.');
      return;
    }
    onSave(form);
  };

  return (
    <>
      <div className="page-head">
        <div><h1>Booking Baru</h1><div className="sub">Buat SO booking lapangan olahraga baru</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={onCancel}>Batal</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{I.check()} Simpan Booking</button>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:900}}>
        <div className="form-section panel">
          <h4>Detail Lapangan</h4>
          <div className="field"><label>Divisi *</label>
            <select className="select" value={form.divisi} onChange={e=>handleDivisi(e.target.value)}>
              {DIVISI_LIST.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="field"><label>Lapangan *</label>
            <select className="select" value={form.lapangan} onChange={e=>set('lapangan',e.target.value)}>
              {(LAPANGAN_MAP[form.divisi]||[]).map(l=><option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="field"><label>Tanggal Booking *</label>
            <input className="input" type="date" value={form.tanggal} onChange={e=>set('tanggal',e.target.value)}/>
          </div>
          <div className="form-row">
            <div className="field"><label>Jam Mulai</label>
              <input className="input mono" type="time" value={form.jamMulai} onChange={e=>set('jamMulai',e.target.value)}/>
            </div>
            <div className="field"><label>Jam Selesai</label>
              <input className="input mono" type="time" value={form.jamSelesai} onChange={e=>set('jamSelesai',e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="form-section panel">
          <h4>Data Penyewa</h4>
          <div className="field"><label>Nama Penyewa *</label>
            <input className="input" value={form.namaPenyewa} onChange={e=>set('namaPenyewa',e.target.value)} placeholder="Nama lengkap / tim…"/>
          </div>
          <div className="field"><label>No. HP *</label>
            <input className="input mono" value={form.noHp} onChange={e=>set('noHp',e.target.value)} placeholder="08xx-xxxx-xxxx"/>
          </div>
          <div className="field"><label>Deposit (Rp)</label>
            <input className="input mono" type="number" value={form.deposit} onChange={e=>set('deposit',+e.target.value)} min={0}/>
          </div>
          <div className="field"><label>Catatan</label>
            <textarea className="textarea" value={form.catatan} onChange={e=>set('catatan',e.target.value)} placeholder="Catatan tambahan…" rows={3}/>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SOPage({ activeSub, onSubChange, onNavigate }) {
  const onSaveBooking = (form) => {
    window.__erpToast && window.__erpToast('Booking berhasil disimpan.');
    onSubChange('list');
  };

  if (!activeSub) return <SODashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;

  return (
    <div className="page" data-screen-label={`SO — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>SO / Booking</a><span className="sep">/</span>
        <span className="current">{SO_SUBS.find(s=>s.id===activeSub)?.label || activeSub}</span>
      </div>
      {activeSub==='list' && <SOListPage onAdd={()=>onSubChange('baru')} onNavigate={onNavigate}/>}
      {activeSub==='baru' && <SOFormBaru onSave={onSaveBooking} onCancel={()=>onSubChange('list')}/>}
    </div>
  );
}

window.SOPage = SOPage;
