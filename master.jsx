// Master Data (Katalog) module — 6 sub-screens

const MASTER_SALESMAN = [
  { nama:'Affan1',        kode:'SL000', alamat:'',              kota:'', telpon:'',           email:'',               target:0,       aktif:true,  ket:'' },
  { nama:'Bobby',         kode:'S08',   alamat:'Surabaya 123',  kota:'', telpon:'1234567890', email:'bobby@gmail.com', target:2000000, aktif:false, ket:'catatan gaada' },
  { nama:'S123',          kode:'S123',  alamat:'',              kota:'', telpon:'',           email:'',               target:0,       aktif:true,  ket:'' },
  { nama:'SL001',         kode:'SL001', alamat:'Sampang 123456',kota:'', telpon:'00872',      email:'Kosong Bro',      target:300,     aktif:true,  ket:'' },
  { nama:'SL002',         kode:'SL002', alamat:'',              kota:'', telpon:'122222',     email:'',               target:0,       aktif:true,  ket:'' },
];

const MASTER_GUDANG = [
  { nama:'Gudang Nyata Banget', kode:'G002',  ket:'',             aktif:true  },
  { nama:'GUDANG Kedua',        kode:'G00S',  ket:'123',          aktif:true  },
  { nama:'Gudang Laikannn',     kode:'G01',   ket:'baik 300',     aktif:true  },
  { nama:'Gudang Pilihan',      kode:'G02',   ket:'ada',          aktif:true  },
  { nama:'Gudang Smart',        kode:'GDB01', ket:'catatan aja',  aktif:false },
  { nama:'Gudang Kenjeran',     kode:'GG22',  ket:'',             aktif:true  },
  { nama:'Gudang Berantakan',   kode:'GR001', ket:'',             aktif:true  },
  { nama:'Gudang Utama',        kode:'GU500', ket:'',             aktif:true  },
];

const MASTER_SATUAN = [
  { nama:'PCS',  kode:'45', ket:'BAIK', aktif:true },
  { nama:'BTL',  kode:'47', ket:'BAIK', aktif:true },
  { nama:'LSN',  kode:'49', ket:'BAIK', aktif:true },
  { nama:'PACK', kode:'54', ket:'',     aktif:true },
];

const MASTER_USER = [
  { nama:'Kevin Honanta',    kode:'002',   grup:'Akunting Report',      email:'brandon@pdj.com',    aktif:true,  ket:'' },
  { nama:'Rifqi',            kode:'AM111', grup:'Akunting Penyesuaian', email:'Affan@gmail.com',    aktif:true,  ket:'Developer' },
  { nama:'Affan Maulana Z',  kode:'AMZ01', grup:'TOP User',             email:'amz99@gmail.com',    aktif:true,  ket:'' },
  { nama:'Brandon',          kode:'B01',   grup:'Akunting Report',      email:'brandon2@gmail.com', aktif:true,  ket:'' },
  { nama:'Mr. Kevin Pacific',kode:'K001',  grup:'Akunting Penyesuaian', email:'kevin@pdj.com',      aktif:false, ket:'Baru' },
  { nama:'Kevin',            kode:'K002',  grup:'Akunting Report',      email:'k002@pdj.com',       aktif:true,  ket:'' },
  { nama:'Kevin',            kode:'K003',  grup:'Akunting Penyesuaian', email:'k003@pdj.com',       aktif:true,  ket:'' },
  { nama:'Kevin',            kode:'K005',  grup:'Akunting Penyesuaian', email:'k005@pdj.com',       aktif:true,  ket:'' },
  { nama:'Kevin',            kode:'K006',  grup:'Akunting Penyesuaian', email:'k006@pdj.com',       aktif:true,  ket:'' },
  { nama:'Kevin Honanta',    kode:'K099',  grup:'Akunting Report',      email:'k099@pdj.com',       aktif:true,  ket:'' },
];

const MASTER_GRUP = [
  { nama:'Akunting Report',      kode:'ACC.001', aktif:true, ket:'baik' },
  { nama:'Akunting Penyesuaian', kode:'ACC.002', aktif:true, ket:'baik' },
  { nama:'TOP User',             kode:'ADMIN',   aktif:true, ket:'baik' },
];

const MASTER_MENU = [
  { nama:'Laporan',              kode:'LPR-001', kodeTx:'', induk:'',            tipe:'Laporan',  aktif:true },
  { nama:'Katalog Pemasok',      kode:'MS-001',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog Pelanggan',    kode:'MS-002',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog Salesman',     kode:'MS-003',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog Gudang',       kode:'MS-004',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog Satuan Produk',kode:'MS-005',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog User',         kode:'MS-006',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog Grup User',    kode:'MS-007',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
  { nama:'Katalog Menu',         kode:'MS-008',  kodeTx:'', induk:'Master Data', tipe:'Katalog',  aktif:true },
];

// ─── Shared header ──────────────────────────────────────────────────────────

function MstHeader({ title, sub, onAdd }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <div className="sub">{sub}</div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} Tambah</button>}
      </div>
    </div>
  );
}

function AktifCell({ v }) {
  return v
    ? <span style={{color:'var(--realisasi)'}}>{I.check(14)}</span>
    : <span className="muted">—</span>;
}

function SearchBar({ q, setQ, placeholder }) {
  return (
    <div className="filter-bar">
      <div className="filter-grid" style={{gridTemplateColumns:'1fr auto'}}>
        <div className="field">
          <label>Pencarian</label>
          <div className="input-w-icon">{I.search(14)}<input className="input" placeholder={placeholder} value={q} onChange={e=>setQ(e.target.value)}/></div>
        </div>
        <div className="filter-actions">
          <button className="btn" onClick={()=>setQ('')}>Reset</button>
          <button className="btn btn-primary">{I.filter()} Cari</button>
        </div>
      </div>
    </div>
  );
}

function TableWrap({ count, children }) {
  return (
    <div className="table-card">
      <div className="table-toolbar">
        <div className="table-toolbar-left"><b>{count}</b> baris</div>
        <div className="table-toolbar-right">
          <button className="btn btn-icon btn-sm">{I.refresh()}</button>
          <button className="btn btn-icon btn-sm">{I.settings(14)}</button>
        </div>
      </div>
      <div className="table-scroll">{children}</div>
      <div className="pager">
        <div>Menampilkan <b style={{color:'var(--text)'}}>1</b>–<b style={{color:'var(--text)'}}>{count}</b> dari <b style={{color:'var(--text)'}}>{count}</b></div>
        <div className="pager-pages"><button className="active">1</button></div>
        <div>Tampilkan <b style={{color:'var(--text)'}}>20</b> per halaman</div>
      </div>
    </div>
  );
}

// ─── 1. Katalog Salesman ─────────────────────────────────────────────────────

function KatalogSalesman() {
  const [q, setQ] = React.useState('');
  const filtered = MASTER_SALESMAN.filter(r =>
    !q || r.nama.toLowerCase().includes(q.toLowerCase()) || r.kode.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <MstHeader title="Katalog Salesman" sub={`${filtered.length} data · ${MASTER_SALESMAN.filter(r=>r.aktif).length} aktif`} onAdd={()=>{}} />
      <SearchBar q={q} setQ={setQ} placeholder="Nama atau kode salesman…" />
      <TableWrap count={filtered.length}>
        <table className="data">
          <thead>
            <tr>
              <th style={{width:38}}><input type="checkbox" className="cb"/></th>
              <th>Nama Sales</th>
              <th>Kode Sales</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Telpon</th>
              <th>Email</th>
              <th className="num">Target Sales</th>
              <th className="center">Aktif</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.kode}>
                <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                <td><span className="cell-link">{r.nama}</span></td>
                <td className="mono muted">{r.kode}</td>
                <td>{r.alamat || '—'}</td>
                <td>{r.kota || '—'}</td>
                <td>{r.telpon || '—'}</td>
                <td>{r.email || '—'}</td>
                <td className="num mono">{r.target ? fmtNum(r.target) : '—'}</td>
                <td className="center"><AktifCell v={r.aktif}/></td>
                <td className="muted">{r.ket || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}

// ─── 2. Katalog Gudang ───────────────────────────────────────────────────────

function KatalogGudang() {
  const [q, setQ] = React.useState('');
  const filtered = MASTER_GUDANG.filter(r =>
    !q || r.nama.toLowerCase().includes(q.toLowerCase()) || r.kode.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <MstHeader title="Katalog Gudang" sub={`${filtered.length} data · ${MASTER_GUDANG.filter(r=>r.aktif).length} aktif`} onAdd={()=>{}} />
      <SearchBar q={q} setQ={setQ} placeholder="Nama atau kode gudang…" />
      <TableWrap count={filtered.length}>
        <table className="data">
          <thead>
            <tr>
              <th style={{width:38}}><input type="checkbox" className="cb"/></th>
              <th>Nama Gudang</th>
              <th>Kode Gudang</th>
              <th>Keterangan</th>
              <th className="center">Aktif</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.kode}>
                <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                <td><span className="cell-link">{r.nama}</span></td>
                <td className="mono muted">{r.kode}</td>
                <td className="muted">{r.ket || '—'}</td>
                <td className="center"><AktifCell v={r.aktif}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}

// ─── 3. Katalog Satuan Produk ────────────────────────────────────────────────

function KatalogSatuan() {
  const [q, setQ] = React.useState('');
  const filtered = MASTER_SATUAN.filter(r =>
    !q || r.nama.toLowerCase().includes(q.toLowerCase()) || r.kode.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <MstHeader title="Katalog Satuan Produk" sub={`${filtered.length} data · ${MASTER_SATUAN.filter(r=>r.aktif).length} aktif`} onAdd={()=>{}} />
      <SearchBar q={q} setQ={setQ} placeholder="Nama atau kode satuan…" />
      <TableWrap count={filtered.length}>
        <table className="data">
          <thead>
            <tr>
              <th style={{width:38}}><input type="checkbox" className="cb"/></th>
              <th>Nama Satuan</th>
              <th>Kode Satuan</th>
              <th>Keterangan</th>
              <th className="center">Aktif</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.kode}>
                <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                <td><span className="cell-link">{r.nama}</span></td>
                <td className="mono muted">{r.kode}</td>
                <td className="muted">{r.ket || '—'}</td>
                <td className="center"><AktifCell v={r.aktif}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}

// ─── 4. Katalog User ─────────────────────────────────────────────────────────

function KatalogUser() {
  const [q, setQ] = React.useState('');
  const filtered = MASTER_USER.filter(r =>
    !q || r.nama.toLowerCase().includes(q.toLowerCase()) || r.kode.toLowerCase().includes(q.toLowerCase()) || r.email.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <MstHeader title="Katalog User" sub={`${filtered.length} data · ${MASTER_USER.filter(r=>r.aktif).length} aktif`} onAdd={()=>{}} />
      <SearchBar q={q} setQ={setQ} placeholder="Nama, kode, atau email user…" />
      <TableWrap count={filtered.length}>
        <table className="data">
          <thead>
            <tr>
              <th style={{width:38}}><input type="checkbox" className="cb"/></th>
              <th>Nama User</th>
              <th>Kode User</th>
              <th>Grup User</th>
              <th>Email</th>
              <th className="center">Aktif</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.kode}>
                <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                <td><span className="cell-link">{r.nama}</span></td>
                <td className="mono muted">{r.kode}</td>
                <td>{r.grup}</td>
                <td className="muted">{r.email || '—'}</td>
                <td className="center"><AktifCell v={r.aktif}/></td>
                <td className="muted">{r.ket || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}

// ─── 5. Katalog Grup User ────────────────────────────────────────────────────

function KatalogGrupUser() {
  const [q, setQ] = React.useState('');
  const filtered = MASTER_GRUP.filter(r =>
    !q || r.nama.toLowerCase().includes(q.toLowerCase()) || r.kode.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <MstHeader title="Katalog Grup User" sub={`${filtered.length} data · ${MASTER_GRUP.filter(r=>r.aktif).length} aktif`} onAdd={()=>{}} />
      <SearchBar q={q} setQ={setQ} placeholder="Nama atau kode grup…" />
      <TableWrap count={filtered.length}>
        <table className="data">
          <thead>
            <tr>
              <th style={{width:38}}><input type="checkbox" className="cb"/></th>
              <th>Nama Grup</th>
              <th>Kode Grup</th>
              <th className="center">Aktif</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.kode}>
                <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                <td><span className="cell-link">{r.nama}</span></td>
                <td className="mono muted">{r.kode}</td>
                <td className="center"><AktifCell v={r.aktif}/></td>
                <td className="muted">{r.ket || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}

// ─── 6. Katalog Menu ─────────────────────────────────────────────────────────

function KatalogMenu() {
  const [q, setQ] = React.useState('');
  const [tipe, setTipe] = React.useState('');
  const tipes = [...new Set(MASTER_MENU.map(r => r.tipe))];
  const filtered = MASTER_MENU.filter(r => {
    if (q && !r.nama.toLowerCase().includes(q.toLowerCase()) && !r.kode.toLowerCase().includes(q.toLowerCase())) return false;
    if (tipe && r.tipe !== tipe) return false;
    return true;
  });
  return (
    <>
      <MstHeader title="Katalog Menu" sub={`${filtered.length} data · ${MASTER_MENU.filter(r=>r.aktif).length} aktif`} onAdd={()=>{}} />
      <div className="filter-bar">
        <div className="filter-grid" style={{gridTemplateColumns:'1fr 160px auto'}}>
          <div className="field">
            <label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama atau kode menu…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="field">
            <label>Tipe Menu</label>
            <select className="select" value={tipe} onChange={e=>setTipe(e.target.value)}>
              <option value="">Semua</option>
              {tipes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={()=>{setQ('');setTipe('');}}>Reset</button>
            <button className="btn btn-primary">{I.filter()} Cari</button>
          </div>
        </div>
      </div>
      <TableWrap count={filtered.length}>
        <table className="data">
          <thead>
            <tr>
              <th style={{width:38}}><input type="checkbox" className="cb"/></th>
              <th>Nama Menu</th>
              <th>Kode Menu</th>
              <th>Kode Transaksi</th>
              <th>Menu Induk</th>
              <th>Tipe Menu</th>
              <th className="center">Aktif</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.kode}>
                <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                <td><span className="cell-link">{r.nama}</span></td>
                <td className="mono muted">{r.kode}</td>
                <td className="mono muted">{r.kodeTx || '—'}</td>
                <td>{r.induk || '—'}</td>
                <td>{r.tipe}</td>
                <td className="center"><AktifCell v={r.aktif}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

const MST_SUBS = [
  { id:'salesman', label:'Katalog Salesman',     desc:`${MASTER_SALESMAN.length} data salesman`,      icon:I.users(22) },
  { id:'gudang',   label:'Katalog Gudang',        desc:`${MASTER_GUDANG.length} lokasi gudang`,        icon:I.box(22)   },
  { id:'satuan',   label:'Katalog Satuan Produk', desc:`${MASTER_SATUAN.length} satuan produk`,        icon:I.invoice(22) },
  { id:'user',     label:'Katalog User',          desc:`${MASTER_USER.length} pengguna sistem`,        icon:I.users(22) },
  { id:'grup',     label:'Katalog Grup User',     desc:`${MASTER_GRUP.length} grup akses`,             icon:I.settings(22) },
  { id:'menu',     label:'Katalog Menu',          desc:`${MASTER_MENU.length} item menu`,              icon:I.list(22)  },
];

function MasterDashboard({ onOpenSub }) {
  return (
    <div className="page" data-screen-label="Master Data — Dashboard">
      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Total Salesman</div>
          <div className="val mono">{MASTER_SALESMAN.length}</div>
          <div className="delta">{MASTER_SALESMAN.filter(r=>r.aktif).length} aktif</div>
        </div>
        <div className="kpi">
          <div className="lbl">Total Gudang</div>
          <div className="val mono">{MASTER_GUDANG.length}</div>
          <div className="delta">{MASTER_GUDANG.filter(r=>r.aktif).length} aktif</div>
        </div>
        <div className="kpi">
          <div className="lbl">Total User</div>
          <div className="val mono">{MASTER_USER.length}</div>
          <div className="delta">{MASTER_USER.filter(r=>r.aktif).length} aktif</div>
        </div>
        <div className="kpi">
          <div className="lbl">Grup User</div>
          <div className="val mono">{MASTER_GRUP.length}</div>
          <div className="delta">kelompok akses</div>
        </div>
      </div>

      <h3 className="section-title">Modul Master Data <span className="count">{MST_SUBS.length}</span></h3>
      <div className="tile-grid">
        {MST_SUBS.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap">{t.icon}</div>
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

// ─── MasterPage (controlled) ─────────────────────────────────────────────────

function MasterPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <MasterDashboard onOpenSub={onSubChange} />;

  const subLabel = MST_SUBS.find(s => s.id === activeSub)?.label ?? activeSub;

  const content = () => {
    if (activeSub === 'salesman') return <KatalogSalesman />;
    if (activeSub === 'gudang')   return <KatalogGudang />;
    if (activeSub === 'satuan')   return <KatalogSatuan />;
    if (activeSub === 'user')     return <KatalogUser />;
    if (activeSub === 'grup')     return <KatalogGrupUser />;
    if (activeSub === 'menu')     return <KatalogMenu />;
    return null;
  };

  return (
    <div className="page" data-screen-label={`Master Data — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Master Data</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {content()}
    </div>
  );
}
