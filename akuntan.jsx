// Aset module — katalog aset lapangan olahraga

const AKUN_BB = [
  { name:'Kas Besar',          kode:'100.001', tipe:'K',    grup:'01', subgrup:'01',   ket:'',       aktif:true },
  { name:'Kas Kecil',          kode:'100.002', tipe:'K',    grup:'01', subgrup:'02',   ket:'Balik',  aktif:true },
  { name:'KAS BESAR',          kode:'1000.005', tipe:'KAS', grup:'10', subgrup:'1000', ket:'IMPORT', aktif:true },
  { name:'KAS KECIL 1',        kode:'1000.011', tipe:'KAS', grup:'10', subgrup:'1000', ket:'IMPORT', aktif:true },
  { name:'KAS KECIL 2',        kode:'1000.033', tipe:'KAS', grup:'10', subgrup:'1000', ket:'IMPORT', aktif:true },
  { name:'BANK BCA',           kode:'1005.000', tipe:'BANK',grup:'10', subgrup:'1005', ket:'IMPORT', aktif:true },
  { name:'BRI',                kode:'1005.001', tipe:'BANK',grup:'10', subgrup:'1005', ket:'IMPORT', aktif:true },
  { name:'MANDIRI',            kode:'1005.002', tipe:'BANK',grup:'10', subgrup:'1005', ket:'IMPORT', aktif:true },
  { name:'PIUTANG USAHA',      kode:'1015.000', tipe:'',    grup:'10', subgrup:'1015', ket:'IMPORT', aktif:true },
  { name:'PERSEDIAAN BARANG',  kode:'1030.000', tipe:'',    grup:'10', subgrup:'1030', ket:'IMPORT', aktif:true },
  { name:'AKTIVA TETAP',       kode:'1500.000', tipe:'',    grup:'15', subgrup:'1500', ket:'IMPORT', aktif:true },
  { name:'AKUMULASI PENYUSUTAN', kode:'1500.099', tipe:'',  grup:'15', subgrup:'1500', ket:'IMPORT', aktif:true },
  { name:'HUTANG USAHA',       kode:'2000.000', tipe:'',    grup:'20', subgrup:'2000', ket:'IMPORT', aktif:true },
  { name:'PPN KELUARAN',       kode:'2020.000', tipe:'',    grup:'20', subgrup:'2020', ket:'IMPORT', aktif:true },
  { name:'PENJUALAN',          kode:'4000.000', tipe:'',    grup:'40', subgrup:'4000', ket:'IMPORT', aktif:true },
  { name:'HPP',                kode:'5000.000', tipe:'',    grup:'50', subgrup:'5000', ket:'IMPORT', aktif:true },
  { name:'BIAYA OPERASIONAL',  kode:'6000.000', tipe:'',    grup:'60', subgrup:'6000', ket:'IMPORT', aktif:true },
];

Object.assign(window, { AKUN_BB });

const ASET_SUBS = [
  { id:'katalog', label:'Katalog Aset' },
];

function AsetSubNav({ active, onChange }) {
  return (
    <div className="tabs-pills" style={{marginBottom:18, marginTop:-4}}>
      {ASET_SUBS.map(s => (
        <button key={s.id} className={active===s.id?'active':''} onClick={()=>onChange(s.id)}>{s.label}</button>
      ))}
    </div>
  );
}

function AsetDashboard({ onOpenSub, onNavigate }) {
  const asetData = window.ASET || [];
  const asetAktif = asetData.filter(a=>a.aktif).length;
  const totalNilaiBuku = asetData.reduce((s,a)=>s+a.nilaiBuku, 0);
  const totalPerolehan = asetData.reduce((s,a)=>s+a.nilaiPerolehan, 0);
  const totalAkumulasi = asetData.reduce((s,a)=>s+a.akumulasi, 0);

  const kategoriCount = {};
  asetData.forEach(a => { kategoriCount[a.kategori] = (kategoriCount[a.kategori]||0)+1; });

  const tiles = [
    { id:'katalog', icon:I.box(20), title:'Katalog Aset', desc:'Daftar lengkap aset lapangan, kendaraan, dan perlengkapan olahraga beserta nilai buku.', badge:`${asetAktif} aset aktif`, accent:'#7c3aed' },
  ];

  return (
    <div className="page" data-screen-label="Aset — Dashboard">
      <div className="crumbs"><a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span><span className="current">Aset</span></div>
      <div className="page-head">
        <div><h1>Aset Workspace</h1><div className="sub">Kelola aset tetap lapangan olahraga — bangunan, kendaraan, dan perlengkapan.</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-sm btn-primary" onClick={()=>onOpenSub('katalog')}>{I.plus()} Tambah Aset</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Total Aset</div><div className="val mono">{asetData.length}</div><div className="delta up">{asetAktif} aset aktif</div></div>
        <div className="kpi"><div className="lbl">Nilai Perolehan</div><div className="val mono">{fmtRp(totalPerolehan)}</div><div className="delta up">{Object.keys(kategoriCount).length} kategori</div></div>
        <div className="kpi"><div className="lbl">Akm. Penyusutan</div><div className="val mono">{fmtRp(totalAkumulasi)}</div><div className="delta down">sd. periode berjalan</div></div>
        <div className="kpi"><div className="lbl">Nilai Buku</div><div className="val mono">{fmtRp(totalNilaiBuku)}</div><div className="delta up">setelah penyusutan</div></div>
      </div>

      <h3 className="section-title">Modul Aset <span className="count">{tiles.length}</span></h3>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={t.accent ? { background: t.accent + '14', color: t.accent } : null}>{t.icon}</div>
              {t.badge && <span className="tile-badge">{t.badge}</span>}
            </div>
            <div><h3>{t.title}</h3><p>{t.desc}</p></div>
          </button>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Komposisi Aset per Kategori</h3>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {[
              ['Bangunan',     (window.ASET||[]).filter(a=>a.kategori==='Bangunan').length,     '#0369a1'],
              ['Kendaraan',    (window.ASET||[]).filter(a=>a.kategori==='Kendaraan').length,    '#7c3aed'],
              ['Perlengkapan', (window.ASET||[]).filter(a=>a.kategori==='Perlengkapan').length, '#0d9488'],
            ].map(([nm, cnt, col]) => {
              const total = (window.ASET||[]).length || 1;
              const pct = (cnt / total) * 100;
              return (
                <div key={nm}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                    <span>{nm}</span><span className="mono muted">{cnt} aset · {fmtRp((window.ASET||[]).filter(a=>a.kategori===nm).reduce((s,a)=>s+a.nilaiBuku,0))}</span>
                  </div>
                  <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                    <div style={{height:'100%', width:Math.max(4,pct)+'%', background:col, borderRadius:999}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel">
          <h3>Aktivitas Aset Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 09:00</div>
              <div className="ti-what"><b className="ti-who">Admin</b> input aset baru <span className="cell-link mono">AS015</span> · Kamera CCTV</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Kemarin · 14:30</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> hitung penyusutan periode Mei 2026 untuk 15 aset</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">3 hari lalu · 10:15</div>
              <div className="ti-what"><b className="ti-who">Admin</b> update nilai buku <span className="cell-link mono">AS009</span> · Raket Padel Head</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AsetModalShell({ title, sub, onClose, onSave, children, saveLabel='Simpan', wide=false }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide?{maxWidth:900}:{maxWidth:680}}>
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

function AsetModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [form, setForm] = React.useState(data || {
    kode:'', nama:'', aktif:true, tglBeli:'', kategori:'Bangunan',
    nilaiPerolehan:0, umurEkonomis:20
  });
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const susutPerTahun = form.umurEkonomis > 0 ? Math.round(form.nilaiPerolehan / form.umurEkonomis) : 0;
  return (
    <AsetModalShell wide title={isEdit?`Edit Aset — ${data.kode}`:'Tambah Aset Baru'}
      sub={isEdit?data.nama:'Daftarkan aset tetap baru beserta nilai dan penyusutan'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit?'Simpan Perubahan':'Simpan Aset'}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div className="form-section">
          <h4>Identitas Aset</h4>
          <div className="form-row">
            <div className="field"><label>Kode Aset *</label><input className="input mono" value={form.kode} onChange={e=>set('kode',e.target.value)} placeholder="AS-XXX"/></div>
            <div className="field"><label>Kategori</label>
              <select className="select" value={form.kategori} onChange={e=>set('kategori',e.target.value)}>
                <option>Bangunan</option><option>Kendaraan</option><option>Perlengkapan</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Nama Aset *</label><input className="input" value={form.nama} onChange={e=>set('nama',e.target.value)} placeholder="Contoh: Lapangan Padel 1"/></div>
          <div className="field"><label>Tanggal Perolehan *</label><input className="input" type="date" value={form.tglBeli} onChange={e=>set('tglBeli',e.target.value)}/></div>
          <div className="field"><label>Status</label>
            <label style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:13, marginTop:6}}>
              <input type="checkbox" className="cb" checked={form.aktif} onChange={e=>set('aktif',e.target.checked)}/> Aset Aktif
            </label>
          </div>
        </div>
        <div className="form-section">
          <h4>Nilai & Penyusutan</h4>
          <div className="field"><label>Nilai Perolehan (Rp) *</label><input className="input mono" type="number" value={form.nilaiPerolehan} onChange={e=>set('nilaiPerolehan',+e.target.value)}/></div>
          <div className="field"><label>Umur Ekonomis (Tahun)</label><input className="input mono" type="number" value={form.umurEkonomis} onChange={e=>set('umurEkonomis',+e.target.value)}/></div>
          <div className="field"><label>Metode Penyusutan</label><select className="select"><option>Garis Lurus</option><option>Saldo Menurun</option></select></div>
          <div className="field">
            <label>Penyusutan / Tahun (otomatis)</label>
            <div className="input mono" style={{background:'var(--bg-sub)', padding:'7px 10px', borderRadius:6, fontSize:13, color:'var(--text-2)'}}>{fmtRp(susutPerTahun)}</div>
          </div>
        </div>
      </div>
    </AsetModalShell>
  );
}

function KatalogAset({ onAdd, onEdit }) {
  const [katFilter, setKatFilter] = React.useState('Semua');
  const [q, setQ] = React.useState('');
  const asetData = window.ASET || [];
  const filtered = asetData.filter(a => {
    const matchKat = katFilter === 'Semua' || a.kategori === katFilter;
    const matchQ = !q || a.nama.toLowerCase().includes(q.toLowerCase()) || a.kode.toLowerCase().includes(q.toLowerCase());
    return matchKat && matchQ;
  });
  const totalNilai = filtered.reduce((s,a)=>s+a.nilaiBuku, 0);
  return (
    <>
      <div className="page-head">
        <div><h1>Katalog Aset</h1><div className="sub">{filtered.length} dari {asetData.length} aset · Nilai buku: {fmtRp(totalNilai)}</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-sm">{I.download()} Export</button>
          <button className="btn btn-primary" onClick={onAdd}>{I.plus()} Tambah Aset</button>
        </div>
      </div>
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Kategori</label>
            <select className="select" value={katFilter} onChange={e=>setKatFilter(e.target.value)}>
              <option>Semua</option><option>Bangunan</option><option>Kendaraan</option><option>Perlengkapan</option>
            </select>
          </div>
          <div className="field"><label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Kode atau nama aset…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="filter-actions"><button className="btn" onClick={()=>{setKatFilter('Semua');setQ('');}}>Reset</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>{filtered.length}</b> aset · Total nilai buku <b className="mono">{fmtRp(totalNilai)}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Kode</th>
                <th style={{width:'28%'}}>Nama Aset</th>
                <th>Kategori</th>
                <th className="center" style={{width:60}}>Aktif</th>
                <th>Tgl. Perolehan</th>
                <th>Umur (Thn)</th>
                <th className="num">Nilai Perolehan</th>
                <th className="num">Akm. Penyusutan</th>
                <th className="num">Nilai Buku</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.kode} onClick={()=>onEdit(a)}>
                  <td className="mono cell-link">{a.kode}</td>
                  <td>{a.nama}</td>
                  <td><span className={`pill ${a.kategori==='Bangunan'?'realisasi':a.kategori==='Kendaraan'?'pending':'draft'}`}>{a.kategori}</span></td>
                  <td className="center">{a.aktif ? <span>{I.check(14)}</span> : <span className="muted">—</span>}</td>
                  <td className="mono">{a.tglBeli}</td>
                  <td className="center mono">{a.umurEkonomis}</td>
                  <td className="num mono">{fmtRp(a.nilaiPerolehan)}</td>
                  <td className="num mono" style={{color:'var(--text-3)'}}>{fmtRp(a.akumulasi)}</td>
                  <td className="num mono" style={{fontWeight:600}}>{fmtRp(a.nilaiBuku)}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" onClick={()=>onEdit(a)}>{I.edit()}</button>
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

function AkuntanPage({ activeSub, onSubChange, onNavigate }) {
  const [modal, setModal] = React.useState(null);
  const close = () => setModal(null);
  const onSave = () => { setModal(null); window.__erpToast && window.__erpToast('Data berhasil disimpan.'); };
  if (!activeSub) return <AsetDashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;
  return (
    <div className="page" data-screen-label={`Aset — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Aset</a><span className="sep">/</span>
        <span className="current">{ASET_SUBS.find(s=>s.id===activeSub)?.label || activeSub}</span>
      </div>
      {activeSub==='katalog' && <KatalogAset onAdd={()=>setModal({kind:'aset'})} onEdit={(d)=>setModal({kind:'aset', data:d})}/>}
      {modal?.kind==='aset' && <AsetModal data={modal.data} onClose={close} onSave={onSave}/>}
    </div>
  );
}

window.AkuntanPage = AkuntanPage;
window.AsetPage = AkuntanPage;
