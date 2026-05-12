// BO (Booking Order) module

const DIVISI_LIST = ['Padel', 'Mini Soccer', 'Futsal'];

const LAPANGAN_MAP = {
  'Padel':       ['Lapangan Padel 1', 'Lapangan Padel 2'],
  'Mini Soccer': ['Lapangan Mini Soccer A'],
  'Futsal':      ['Lapangan Futsal 1', 'Lapangan Futsal 2'],
};

const HARGA_PER_JAM = { 'Padel': 100000, 'Mini Soccer': 200000, 'Futsal': 150000 };
const METODE_LIST   = ['Transfer BCA', 'Transfer BRI', 'Tunai', 'QRIS', 'Belum Bayar'];

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

function calcDurasi(mulai, selesai) {
  if (!mulai || !selesai) return 0;
  const [h1,m1] = mulai.split(':').map(Number);
  const [h2,m2] = selesai.split(':').map(Number);
  return Math.max(0, ((h2*60+m2) - (h1*60+m1)) / 60);
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function SODashboard({ onOpenSub, onNavigate }) {
  const bookings = window.BOOKING_LIST || [];
  const totalSO  = bookings.length;
  const pending  = bookings.filter(b=>b.status==='Pending').length;
  const berjalan = bookings.filter(b=>b.status==='Berjalan').length;
  const selesai  = bookings.filter(b=>b.status==='Selesai').length;
  const totalDP  = bookings.reduce((s,b)=>s+(b.dp||0), 0);

  return (
    <div className="page" data-screen-label="Booking Order — Dashboard">
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a>
        <span className="sep">/</span><span className="current">Booking Order</span>
      </div>
      <div className="page-head">
        <div><h1>Booking Order — Lapangan Olahraga</h1><div className="sub">Kelola booking order lapangan padel, mini soccer, dan futsal secara online.</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-primary" onClick={()=>onOpenSub('baru')}>{I.plus()} Booking Baru</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Total Booking Order</div><div className="val mono">{totalSO}</div><div className="delta up">periode berjalan</div></div>
        <div className="kpi"><div className="lbl">Pending</div><div className="val mono">{pending}</div><div className="delta down">menunggu konfirmasi</div></div>
        <div className="kpi"><div className="lbl">Berjalan</div><div className="val mono">{berjalan}</div><div className="delta up">sedang sewa</div></div>
        <div className="kpi"><div className="lbl">Total DP Masuk</div><div className="val mono">{fmtRp(totalDP)}</div><div className="delta up">{selesai} selesai</div></div>
      </div>

      <div className="tile-grid" style={{marginTop:8}}>
        {[
          { id:'list', icon:I.list(20), title:'Daftar Booking', desc:'Lihat semua booking order aktif, filter per divisi dan tanggal, ubah status.', badge:`${totalSO} booking`, accent:'#0ea5e9' },
          { id:'baru', icon:I.plus(20), title:'Booking Baru',   desc:'Buat booking order baru — pilih divisi, lapangan, jam, dan data penyewa.',    badge:null,            accent:'#10b981' },
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

      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16, marginTop:24}}>
        <div className="panel">
          <h3>Booking Terkini</h3>
          <div className="table-scroll" style={{maxHeight:260}}>
            <table className="data" style={{fontSize:12.5}}>
              <thead>
                <tr>
                  <th>No. Booking</th><th>Penyewa</th><th>Divisi</th><th>Lapangan</th><th>Tgl</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0,8).map(b=>(
                  <tr key={b.no} onClick={()=>onOpenSub('list')}>
                    <td className="mono cell-link">{b.no}</td>
                    <td>{b.penyewa}</td>
                    <td><span className={`pill ${b.divisi==='Padel'?'realisasi':b.divisi==='Futsal'?'pending':'draft'}`}>{b.divisi}</span></td>
                    <td className="muted">{b.lapangan}</td>
                    <td className="mono">{b.tgl}</td>
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
    const matchQ   = !q || b.penyewa.toLowerCase().includes(q.toLowerCase()) || b.no.includes(q);
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
          <div className="field"><label>Cari Penyewa / No. Booking</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama penyewa atau no. BO…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={()=>{setDivisiFilter('Semua');setStatusFilter('Semua');setQ('');}}>Reset</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            <b>{filtered.length}</b> booking &nbsp;·&nbsp; Total DP {fmtRp(filtered.reduce((s,b)=>s+(b.dp||0),0))}
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>No. Booking</th>
                <th>Tanggal</th>
                <th>Divisi</th>
                <th>Lapangan</th>
                <th>Jam</th>
                <th>Nama Penyewa</th>
                <th>No. HP</th>
                <th>Metode</th>
                <th className="num">Total (Rp)</th>
                <th className="num">DP (Rp)</th>
                <th className="num">Sisa Bayar</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.no}>
                  <td className="mono cell-link">{b.no}</td>
                  <td className="mono">{b.tgl}</td>
                  <td><span className={`pill ${b.divisi==='Padel'?'realisasi':b.divisi==='Futsal'?'pending':'draft'}`}>{b.divisi}</span></td>
                  <td>{b.lapangan}</td>
                  <td className="mono">{b.jamMulai} – {b.jamSelesai}</td>
                  <td>{b.penyewa}</td>
                  <td className="mono muted">{b.hp}</td>
                  <td className="muted" style={{fontSize:12}}>{b.metode}</td>
                  <td className="num mono">{fmtRp(b.totalHarga)}</td>
                  <td className="num mono">{fmtRp(b.dp)}</td>
                  <td className="num mono" style={{color: b.sisaBayar > 0 ? 'var(--warn)' : 'var(--realisasi)'}}>
                    {fmtRp(b.sisaBayar)}
                  </td>
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
  const today = new Date().toISOString().slice(0,10);
  const emptyForm = { divisi:'Padel', lapangan:'Lapangan Padel 1', tgl:today, jamMulai:'08:00', jamSelesai:'10:00', penyewa:'', hp:'', dp:0, metode:'Transfer BCA', catatan:'' };
  const [form, setForm] = React.useState(emptyForm);
  const set = (k,v) => setForm(f => ({...f, [k]:v}));

  const hargaPerJam = HARGA_PER_JAM[form.divisi] || 0;
  const durasi      = calcDurasi(form.jamMulai, form.jamSelesai);
  const totalHarga  = durasi * hargaPerJam;
  const sisaBayar   = Math.max(0, totalHarga - (form.dp || 0));

  const handleDivisi = (v) => {
    const lap = (LAPANGAN_MAP[v]||[])[0] || '';
    setForm(f => ({...f, divisi:v, lapangan:lap}));
  };

  const handleSubmit = () => {
    if (!form.tgl || !form.penyewa || !form.hp) {
      window.__erpToast && window.__erpToast('Lengkapi tanggal, nama penyewa, dan no. HP terlebih dahulu.');
      return;
    }
    onSave({ ...form, hargaPerJam, durasi, totalHarga, sisaBayar, status:'Pending' });
  };

  return (
    <>
      <div className="page-head">
        <div><h1>Booking Baru</h1><div className="sub">Buat booking order lapangan olahraga baru</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={onCancel}>Batal</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{I.check()} Simpan Booking</button>
        </div>
      </div>

      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:960}}>
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
            <input className="input" type="date" value={form.tgl} onChange={e=>set('tgl',e.target.value)}/>
          </div>
          <div className="form-row">
            <div className="field"><label>Jam Mulai</label>
              <input className="input mono" type="time" value={form.jamMulai} onChange={e=>set('jamMulai',e.target.value)}/>
            </div>
            <div className="field"><label>Jam Selesai</label>
              <input className="input mono" type="time" value={form.jamSelesai} onChange={e=>set('jamSelesai',e.target.value)}/>
            </div>
          </div>
          <div style={{background:'var(--bg-sub)', borderRadius:8, padding:'10px 14px', fontSize:13, color:'var(--text-2)'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
              <span>Harga / Jam:</span><span className="mono">{fmtRp(hargaPerJam)}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
              <span>Durasi:</span><span className="mono">{durasi > 0 ? durasi + ' jam' : '—'}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontWeight:600, color:'var(--text)'}}>
              <span>Total Harga:</span><span className="mono">{fmtRp(totalHarga)}</span>
            </div>
          </div>
        </div>

        <div className="form-section panel">
          <h4>Data Penyewa &amp; Pembayaran</h4>
          <div className="field"><label>Nama Penyewa *</label>
            <input className="input" value={form.penyewa} onChange={e=>set('penyewa',e.target.value)} placeholder="Nama lengkap / nama tim…"/>
          </div>
          <div className="field"><label>No. HP *</label>
            <input className="input mono" value={form.hp} onChange={e=>set('hp',e.target.value)} placeholder="08xx-xxxx-xxxx"/>
          </div>
          <div className="field"><label>Metode Pembayaran</label>
            <select className="select" value={form.metode} onChange={e=>set('metode',e.target.value)}>
              {METODE_LIST.map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="field"><label>Down Payment / DP (Rp)</label>
            <input className="input mono" type="number" value={form.dp} onChange={e=>set('dp',+e.target.value)} min={0}/>
          </div>
          <div style={{background:'var(--bg-sub)', borderRadius:8, padding:'10px 14px', fontSize:13}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:4, color:'var(--text-2)'}}>
              <span>Total Harga:</span><span className="mono">{fmtRp(totalHarga)}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:4, color:'var(--text-2)'}}>
              <span>DP:</span><span className="mono">−{fmtRp(form.dp||0)}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontWeight:600, color: sisaBayar > 0 ? 'var(--warn)' : 'var(--realisasi)'}}>
              <span>Sisa Bayar:</span><span className="mono">{fmtRp(sisaBayar)}</span>
            </div>
          </div>
          <div className="field" style={{marginTop:8}}><label>Catatan</label>
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
    <div className="page" data-screen-label={`BO — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Booking Order</a><span className="sep">/</span>
        <span className="current">{SO_SUBS.find(s=>s.id===activeSub)?.label || activeSub}</span>
      </div>
      {activeSub==='list' && <SOListPage onAdd={()=>onSubChange('baru')} onNavigate={onNavigate}/>}
      {activeSub==='baru' && <SOFormBaru onSave={onSaveBooking} onCancel={()=>onSubChange('list')}/>}
    </div>
  );
}

window.SOPage = SOPage;
