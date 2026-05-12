// System Admin (Pengaturan) module — 5 sub-screens

const ADMIN_PROFIL = {
  nama:'PT. Pacific Data Jaya', alamat:'Jl. Dharmahusada 162 E',
  kota:'Surabaya', kodePos:'60285', telpon:'+62811336336',
  email:'pdjsupport@gmail.com', namaTtd:'Brandon Honanta',
  jabatanTtd:'Direktur', npwp:'NPWP 1234567890', bank:'NIAGA : 506.048.3100',
};

const ADMIN_DEFAULT = {
  gudangBeli:'Gudang Laikannn', gudangJual:'Gudang Kenjeran',
  tempoHutang:30, plafon:10000000, tempoPiutang:60,
  ppn:11, satuan:'PCS', salesman:'SL002',
  pajakMasukan:'', pajakPengeluaran:'',
};

const ADMIN_CETAKAN = {
  faktur1:'Penting Sekali', faktur2:'Sangat Penting Sekali',
  returJual1:'Retur Jual penting1', returJual2:'Retur Jual penting2',
  tampilHeader:'Iya', tampilTtd:'Tidak',
};

const ADMIN_FITUR = [
  { menu:'Persediaan',                    v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Katalog Barang',                v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Katalog Pemasok',               v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Katalog Pelanggan',             v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Katalog Salesman',              v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Katalog Gudang',                v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Katalog Satuan Produk',         v:true,  a:true,  e:true,  d:true,  p:true,  c:true  },
  { menu:'Order Penjualan',               v:true,  a:true,  e:true,  d:false, p:true,  c:true  },
  { menu:'Nota Penjualan',                v:true,  a:true,  e:true,  d:false, p:true,  c:true  },
  { menu:'Jurnal Memorial',               v:true,  a:true,  e:true,  d:true,  p:true,  c:false },
  { menu:'Kas Masuk',                     v:true,  a:true,  e:true,  d:false, p:true,  c:true  },
  { menu:'Kas Keluar',                    v:true,  a:true,  e:true,  d:false, p:true,  c:true  },
];

const ADMIN_USERS = [
  { id:1, name:'Brandon Honanta', role:'Super Admin',   status:'active',   email:'brandon@pdj.co.id'  },
  { id:2, name:'Siti Rahayu',     role:'Akuntan',       status:'active',   email:'siti@pdj.co.id'     },
  { id:3, name:'Budi Santoso',    role:'Staff Gudang',  status:'active',   email:'budi@pdj.co.id'     },
  { id:4, name:'Dewi Kartika',    role:'Sales Manager', status:'inactive', email:'dewi@pdj.co.id'     },
];

const MENU_GROUPS = [
  { label:'Master Data', keys:['Persediaan','Katalog Barang','Katalog Pemasok','Katalog Pelanggan','Katalog Salesman','Katalog Gudang','Katalog Satuan Produk'] },
  { label:'Transaksi',   keys:['Order Penjualan','Nota Penjualan','Kas Masuk','Kas Keluar'] },
  { label:'Akuntansi',   keys:['Jurnal Memorial'] },
];

const ADMIN_SESI = [
  {
    username:'PDJService',
    sesi:'cfbea951-8fba-4fd0-8814-533189...',
    koneksi:'4zoap3tm5e3HWIAcOG984Q',
    lokasi:'Mozilla/5.0 (Windows NT 10.0; Wi...',
    device:'Win32',
    waktu:'1/5/2026',
  },
];

const ADM_SUBS = [
  { id:'profil',    label:'Profil Perusahaan',   desc:'Nama, alamat, NPWP, rekening bank',    icon:I.invoice(22) },
  { id:'default',   label:'Nilai Default',        desc:'Gudang, tempo, PPN, salesman default', icon:I.settings(22) },
  { id:'cetakan',   label:'Keterangan Cetakan',   desc:'Catatan faktur & retur, tampilan cetak',icon:I.print(22) },
  { id:'fitur',     label:'Fitur Administrator',  desc:`${ADMIN_FITUR.length} menu, 6 hak akses`,icon:I.shield(22) },
  { id:'sesi',      label:'Login Pengguna',       desc:'Sesi aktif & koneksi pengguna',        icon:I.users(22) },
  { id:'tampilan',  label:'Tampilan & Tema',      desc:'Warna, preset, dan densitas tampilan', icon:I.settings(22) },
];

// ─── Shared form helpers ─────────────────────────────────────────────────────

function AdmHeader({ title, onEdit }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        {onEdit && <button className="btn btn-primary" onClick={onEdit}>{I.edit()} Edit Profil</button>}
      </div>
    </div>
  );
}

function FormField({ label, value, span }) {
  return (
    <div style={span ? {gridColumn:'1 / -1'} : {}}>
      <label style={{display:'block', fontSize:12, color:'var(--text-3)', marginBottom:4}}>{label}</label>
      <div style={{
        padding:'8px 12px', background:'var(--bg-sub)', border:'1px solid var(--border)',
        borderRadius:6, fontSize:13.5, color:'var(--text)', minHeight:36,
      }}>{value || <span className="muted">—</span>}</div>
    </div>
  );
}

function FormGrid({ children }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:20}}>
      {children}
    </div>
  );
}

// ─── 1. Profil Perusahaan ────────────────────────────────────────────────────

function AdminProfil() {
  return (
    <>
      <AdmHeader title="Profil Perusahaan" onEdit={()=>{}} />
      <div className="panel" style={{marginTop:0}}>
        <FormGrid>
          <FormField label="Nama Perusahaan"   value={ADMIN_PROFIL.nama} />
          <FormField label="Alamat"             value={ADMIN_PROFIL.alamat} />
          <FormField label="Kota"               value={ADMIN_PROFIL.kota} />
          <FormField label="Kode Pos"           value={ADMIN_PROFIL.kodePos} />
          <FormField label="Telpon"             value={ADMIN_PROFIL.telpon} />
          <FormField label="Email"              value={ADMIN_PROFIL.email} />
          <FormField label="Nama Tanda Tangan"  value={ADMIN_PROFIL.namaTtd} />
          <FormField label="Jabatan Tanda Tangan" value={ADMIN_PROFIL.jabatanTtd} />
          <FormField label="No. NPWP"           value={ADMIN_PROFIL.npwp} />
          <FormField label="Rekening Bank"      value={ADMIN_PROFIL.bank} />
        </FormGrid>
      </div>
    </>
  );
}

// ─── 2. Nilai Default ────────────────────────────────────────────────────────

function AdminDefault() {
  const [d, setD] = React.useState(ADMIN_DEFAULT);
  const gudangOpts = ['Gudang Laikannn', 'Gudang Kenjeran', 'Gudang Utama', 'Gudang Smart'];
  const satuanOpts = ['PCS', 'BTL', 'LSN', 'PACK'];
  const salesOpts  = ['SL000', 'SL001', 'SL002', 'S08'];
  return (
    <>
      <AdmHeader title="Nilai Default" onEdit={()=>{}} />
      <div className="panel" style={{marginTop:0}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:20}}>
          <div className="field">
            <label>Gudang Pembelian</label>
            <select className="select" value={d.gudangBeli} onChange={e=>setD({...d, gudangBeli:e.target.value})}>
              {gudangOpts.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Gudang Penjualan</label>
            <select className="select" value={d.gudangJual} onChange={e=>setD({...d, gudangJual:e.target.value})}>
              {gudangOpts.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Tempo Hutang (hari)</label>
            <input className="input" type="number" value={d.tempoHutang} onChange={e=>setD({...d, tempoHutang:+e.target.value})} />
          </div>
          <div className="field">
            <label>Nominal Plafon</label>
            <input className="input" type="number" value={d.plafon} onChange={e=>setD({...d, plafon:+e.target.value})} />
          </div>
          <div className="field">
            <label>Tempo Piutang (hari)</label>
            <input className="input" type="number" value={d.tempoPiutang} onChange={e=>setD({...d, tempoPiutang:+e.target.value})} />
          </div>
          <div className="field">
            <label>Besaran PPN %</label>
            <input className="input" type="number" value={d.ppn} onChange={e=>setD({...d, ppn:+e.target.value})} />
          </div>
          <div className="field">
            <label>Satuan Barang</label>
            <select className="select" value={d.satuan} onChange={e=>setD({...d, satuan:e.target.value})}>
              {satuanOpts.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Salesman</label>
            <select className="select" value={d.salesman} onChange={e=>setD({...d, salesman:e.target.value})}>
              {salesOpts.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Pajak Masukan</label>
            <select className="select" value={d.pajakMasukan} onChange={e=>setD({...d, pajakMasukan:e.target.value})}>
              <option value="">— Pilih —</option>
              <option>PPN 11%</option>
            </select>
          </div>
          <div className="field">
            <label>Pajak Pengeluaran</label>
            <select className="select" value={d.pajakPengeluaran} onChange={e=>setD({...d, pajakPengeluaran:e.target.value})}>
              <option value="">— Pilih —</option>
              <option>PPN 11%</option>
            </select>
          </div>
        </div>
        <div style={{marginTop:20, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn">Reset</button>
          <button className="btn btn-primary" onClick={()=>window.__erpToast&&window.__erpToast('Nilai default berhasil disimpan.')}>Simpan</button>
        </div>
      </div>
    </>
  );
}

// ─── 3. Keterangan Cetakan ───────────────────────────────────────────────────

function AdminCetakan() {
  const [c, setC] = React.useState(ADMIN_CETAKAN);
  return (
    <>
      <AdmHeader title="Keterangan Cetakan" onEdit={()=>{}} />
      <div className="panel" style={{marginTop:0}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:20}}>
          <div className="field">
            <label>Catatan Cetakan Faktur (1)</label>
            <textarea className="input" rows={3} style={{resize:'vertical'}} value={c.faktur1} onChange={e=>setC({...c, faktur1:e.target.value})} />
          </div>
          <div className="field">
            <label>Catatan Retur Jual (1)</label>
            <textarea className="input" rows={3} style={{resize:'vertical'}} value={c.returJual1} onChange={e=>setC({...c, returJual1:e.target.value})} />
          </div>
          <div className="field">
            <label>Catatan Cetakan Faktur (2)</label>
            <textarea className="input" rows={3} style={{resize:'vertical'}} value={c.faktur2} onChange={e=>setC({...c, faktur2:e.target.value})} />
          </div>
          <div className="field">
            <label>Catatan Retur Jual (2)</label>
            <textarea className="input" rows={3} style={{resize:'vertical'}} value={c.returJual2} onChange={e=>setC({...c, returJual2:e.target.value})} />
          </div>
          <div className="field">
            <label>Tampilkan Header pada Trx Eksternal</label>
            <select className="select" value={c.tampilHeader} onChange={e=>setC({...c, tampilHeader:e.target.value})}>
              <option>Iya</option><option>Tidak</option>
            </select>
          </div>
          <div className="field">
            <label>Tampilkan Tanda Tangan pada Trx Eksternal</label>
            <select className="select" value={c.tampilTtd} onChange={e=>setC({...c, tampilTtd:e.target.value})}>
              <option>Tidak</option><option>Iya</option>
            </select>
          </div>
        </div>
        <p style={{fontSize:12, color:'var(--danger)', marginTop:12}}>*Trx Eksternal = PO, SO, Pembelian, Penjualan, Retur Beli &amp; Retur Jual</p>
        <div style={{marginTop:16, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn">Reset</button>
          <button className="btn btn-primary" onClick={()=>window.__erpToast&&window.__erpToast('Keterangan cetakan berhasil disimpan.')}>Simpan</button>
        </div>
      </div>
    </>
  );
}

// ─── 4. Fitur Administrator (permission matrix) ──────────────────────────────

const FITUR_COLS = [
  { key:'v', label:'Lihat',  icon:(s)=>I.zoom(s)   },
  { key:'a', label:'Tambah', icon:(s)=>I.plus(s)   },
  { key:'e', label:'Edit',   icon:(s)=>I.edit(s)   },
  { key:'d', label:'Hapus',  icon:(s)=>I.trash(s)  },
  { key:'p', label:'Cetak',  icon:(s)=>I.print(s)  },
  { key:'c', label:'Salin',  icon:(s)=>I.copy(s)   },
];

function AdminFitur() {
  const [q, setQ] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState(ADMIN_USERS[0].id);

  const initPerms = () => {
    const map = {};
    ADMIN_USERS.forEach(u => { map[u.id] = ADMIN_FITUR.map(r => ({...r})); });
    return map;
  };
  const [permissions, setPerms] = React.useState(initPerms);
  const [dirty, setDirty] = React.useState({});

  const userRows = permissions[selectedUser] || [];

  const toggle = (rowIdx, col) => {
    setPerms(prev => {
      const rows = prev[selectedUser].map((r, i) => i === rowIdx ? {...r, [col]: !r[col]} : r);
      return {...prev, [selectedUser]: rows};
    });
    setDirty(d => ({...d, [selectedUser]: true}));
  };

  const toggleRow = (rowIdx) => {
    const row = userRows[rowIdx];
    const allOn = FITUR_COLS.every(c => row[c.key]);
    setPerms(prev => {
      const rows = prev[selectedUser].map((r, i) => {
        if (i !== rowIdx) return r;
        const upd = {...r};
        FITUR_COLS.forEach(c => { upd[c.key] = !allOn; });
        return upd;
      });
      return {...prev, [selectedUser]: rows};
    });
    setDirty(d => ({...d, [selectedUser]: true}));
  };

  const toggleCol = (col) => {
    const allOn = userRows.every(r => r[col]);
    setPerms(prev => {
      const rows = prev[selectedUser].map(r => ({...r, [col]: !allOn}));
      return {...prev, [selectedUser]: rows};
    });
    setDirty(d => ({...d, [selectedUser]: true}));
  };

  const resetRow = (rowIdx) => {
    const def = ADMIN_FITUR[rowIdx];
    setPerms(prev => {
      const rows = prev[selectedUser].map((r, i) => i === rowIdx ? {...def} : r);
      return {...prev, [selectedUser]: rows};
    });
    setDirty(d => ({...d, [selectedUser]: true}));
  };

  const resetUser = () => {
    setPerms(prev => ({...prev, [selectedUser]: ADMIN_FITUR.map(r => ({...r}))}));
    setDirty(d => ({...d, [selectedUser]: false}));
  };

  const save = () => {
    window.__erpToast && window.__erpToast('Hak akses berhasil disimpan.');
    setDirty(d => ({...d, [selectedUser]: false}));
  };

  const curUser = ADMIN_USERS.find(u => u.id === selectedUser);
  const initials = (name) => name.split(' ').slice(0, 2).map(w => w[0]).join('');

  const filteredGrouped = MENU_GROUPS.map(g => ({
    ...g,
    rows: userRows
      .map((r, idx) => ({...r, _idx: idx}))
      .filter(r => g.keys.includes(r.menu) && (!q || r.menu.toLowerCase().includes(q.toLowerCase()))),
  })).filter(g => g.rows.length > 0);

  const totalVisible = filteredGrouped.reduce((s, g) => s + g.rows.length, 0);

  const colW = 64;

  return (
    <>
      <div className="page-head">
        <div><h1>Fitur Administrator</h1></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
        </div>
      </div>

      <div className="table-card" style={{padding:0, overflow:'hidden'}}>
        <div style={{display:'flex', minHeight:480}}>

          {/* ── Panel Kiri: Daftar Pengguna ───────────────────────────── */}
          <div style={{width:220, flexShrink:0, borderRight:'1px solid var(--border)', background:'var(--bg-sub)'}}>
            <div style={{padding:'10px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:6}}>
              <span style={{fontSize:11, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--text-3)'}}>Pengguna</span>
              <span className="count" style={{marginLeft:4}}>{ADMIN_USERS.length}</span>
            </div>
            {ADMIN_USERS.map(u => {
              const active = u.id === selectedUser;
              const hasDirty = dirty[u.id];
              return (
                <button key={u.id} onClick={() => setSelectedUser(u.id)}
                  style={{width:'100%', textAlign:'left', padding:'10px 14px',
                    background: active ? 'var(--primary-50)' : 'transparent',
                    borderLeft: `3px solid ${active ? 'var(--primary)' : 'transparent'}`,
                    border:'none', borderTop:'1px solid var(--border)',
                    cursor:'pointer', display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:34, height:34, borderRadius:'50%', flexShrink:0,
                    background: active ? 'var(--primary)' : 'var(--border)',
                    color: active ? '#fff' : 'var(--text-2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:700}}>
                    {initials(u.name)}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight: active ? 600 : 400,
                      color: active ? 'var(--primary)' : 'var(--text)',
                      display:'flex', alignItems:'center', gap:4}}>
                      <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{u.name}</span>
                      {hasDirty && <span style={{color:'var(--warn)', fontSize:16, lineHeight:1, flexShrink:0}}>•</span>}
                    </div>
                    <div style={{fontSize:11, color:'var(--text-3)', marginTop:1}}>{u.role}</div>
                  </div>
                  <span style={{fontSize:11, flexShrink:0,
                    color: u.status === 'active' ? 'var(--realisasi)' : 'var(--text-3)'}}>●</span>
                </button>
              );
            })}
          </div>

          {/* ── Panel Kanan: Permission Matrix ────────────────────────── */}
          <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column'}}>

            {/* Sub-header user aktif */}
            <div style={{padding:'10px 16px', borderBottom:'1px solid var(--border)',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              background:'var(--bg-sub)'}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{width:34, height:34, borderRadius:'50%', background:'var(--primary)',
                  color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:700, flexShrink:0}}>
                  {initials(curUser.name)}
                </div>
                <div>
                  <div style={{fontWeight:600, fontSize:13}}>{curUser.name}</div>
                  <div style={{fontSize:11, color:'var(--text-3)'}}>{curUser.role} · {curUser.email}</div>
                </div>
              </div>
              <span style={{fontSize:11, padding:'3px 10px', borderRadius:20,
                background: curUser.status === 'active' ? '#d1fae5' : 'var(--border)',
                color: curUser.status === 'active' ? '#065f46' : 'var(--text-3)',
                fontWeight:600}}>
                {curUser.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>

            {/* Search bar */}
            <div style={{padding:'10px 16px', borderBottom:'1px solid var(--border)'}}>
              <div className="input-w-icon" style={{maxWidth:320}}>
                {I.search(14)}
                <input className="input" placeholder="Cari menu…" value={q}
                  onChange={e => setQ(e.target.value)} style={{height:32}} />
              </div>
            </div>

            {/* Tabel */}
            <div className="table-scroll" style={{flex:1}}>
              <table className="data" style={{tableLayout:'fixed', width:'100%'}}>
                <colgroup>
                  <col style={{width:'auto'}} />
                  {FITUR_COLS.map(c => <col key={c.key} style={{width:colW}} />)}
                  <col style={{width:36}} />
                </colgroup>
                <thead>
                  <tr>
                    <th style={{background:'var(--primary)', color:'#fff', textAlign:'left', padding:'8px 16px', fontSize:12}}>
                      Nama Menu
                    </th>
                    {FITUR_COLS.map(c => {
                      const allOn = userRows.length > 0 && userRows.every(r => r[c.key]);
                      return (
                        <th key={c.key} className="center"
                          style={{background:'var(--primary)', color:'#fff', width:colW, padding:'6px 4px'}}>
                          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:3}}>
                            <span style={{fontSize:10, fontWeight:600, letterSpacing:'.02em'}}>{c.label}</span>
                            <input type="checkbox" className="cb" title={`Toggle semua ${c.label}`}
                              checked={allOn} onChange={() => toggleCol(c.key)}
                              style={{width:14, height:14, cursor:'pointer'}} />
                          </div>
                        </th>
                      );
                    })}
                    <th style={{background:'var(--primary)', width:36}} />
                  </tr>
                </thead>
                <tbody>
                  {filteredGrouped.map(g => (
                    <React.Fragment key={g.label}>
                      {/* Group header row */}
                      <tr>
                        <td colSpan={FITUR_COLS.length + 2}
                          style={{background:'var(--bg-sub)', padding:'6px 16px',
                            fontSize:10, fontWeight:700, letterSpacing:'.08em',
                            textTransform:'uppercase', color:'var(--text-3)',
                            borderBottom:'1px solid var(--border)'}}>
                          {g.label}
                          <span style={{marginLeft:6, fontWeight:400, letterSpacing:0,
                            textTransform:'none', fontSize:11, color:'var(--text-3)'}}>
                            ({g.rows.length})
                          </span>
                        </td>
                      </tr>
                      {g.rows.map(r => {
                        const allRowOn = FITUR_COLS.every(c => r[c.key]);
                        const origRow  = ADMIN_FITUR.find(x => x.menu === r.menu);
                        const rowChanged = origRow && FITUR_COLS.some(c => r[c.key] !== origRow[c.key]);
                        return (
                          <tr key={r.menu}>
                            <td style={{fontWeight:500, padding:'8px 16px'}}>
                              <div style={{display:'flex', alignItems:'center', gap:6}}>
                                {rowChanged && <span style={{color:'var(--warn)', fontSize:14, lineHeight:1}}>•</span>}
                                <input type="checkbox" className="cb" title="Toggle semua hak akses baris ini"
                                  checked={allRowOn} onChange={() => toggleRow(r._idx)}
                                  style={{width:14, height:14, cursor:'pointer', flexShrink:0}} />
                                <span>{r.menu}</span>
                              </div>
                            </td>
                            {FITUR_COLS.map(c => (
                              <td key={c.key} className="center" style={{padding:'8px 4px'}}>
                                <input type="checkbox" className="cb"
                                  checked={r[c.key]} onChange={() => toggle(r._idx, c.key)}
                                  style={{width:15, height:15, cursor:'pointer'}} />
                              </td>
                            ))}
                            <td className="center" style={{padding:'4px'}}>
                              <button title="Reset baris ke default"
                                onClick={() => resetRow(r._idx)}
                                style={{background:'none', border:'none', cursor:'pointer',
                                  color:'var(--text-3)', padding:4, borderRadius:4,
                                  display:'flex', alignItems:'center', justifyContent:'center'}}
                                onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
                                onMouseLeave={e => e.currentTarget.style.color='var(--text-3)'}>
                                {I.refresh(12)}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={FITUR_COLS.length + 2}
                      style={{padding:'8px 16px', fontSize:12, color:'var(--text-3)'}}>
                      Menampilkan {totalVisible} dari {ADMIN_FITUR.length} menu
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer aksi */}
            <div style={{padding:'12px 16px', borderTop:'1px solid var(--border)',
              display:'flex', justifyContent:'flex-end', gap:8, background:'var(--bg-sub)'}}>
              <button className="btn" onClick={resetUser}>Reset Semua</button>
              <button className="btn btn-primary"
                disabled={!dirty[selectedUser]} onClick={save}
                style={{opacity: dirty[selectedUser] ? 1 : 0.45}}>
                Simpan Perubahan
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── 5. Login Pengguna ───────────────────────────────────────────────────────

function AdminSesi() {
  return (
    <>
      <div className="page-head">
        <div><h1>Login Pengguna</h1></div>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
      </div>
      <div className="table-card">
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr style={{background:'var(--primary)'}}>
                <th style={{color:'#fff'}}>Username</th>
                <th style={{color:'#fff'}}>Id Sesi</th>
                <th style={{color:'#fff'}}>Id Koneksi</th>
                <th style={{color:'#fff'}}>Lokasi</th>
                <th style={{color:'#fff'}}>Device</th>
                <th style={{color:'#fff'}}>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_SESI.map((r, i) => (
                <tr key={i}>
                  <td><span className="cell-link">{r.username}</span></td>
                  <td className="mono muted" style={{fontSize:12}}>{r.sesi}</td>
                  <td className="mono muted" style={{fontSize:12}}>{r.koneksi}</td>
                  <td className="muted" style={{fontSize:12, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis'}}>{r.lokasi}</td>
                  <td>{r.device}</td>
                  <td>{r.waktu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Tampilan & Tema ─────────────────────────────────────────────────────────

const THEME_PRESETS = [
  { key:'default',  label:'Navy',     primary:'#003366', accent:'#3399cc' },
  { key:'teal',     label:'Teal',     primary:'#0f766e', accent:'#14b8a6' },
  { key:'graphite', label:'Graphite', primary:'#1f2937', accent:'#6366f1' },
  { key:'rust',     label:'Rust',     primary:'#9a3412', accent:'#f59e0b' },
];

function AdminTampilan({ theme, setTheme }) {
  if (!theme) return <div className="muted" style={{padding:24}}>Tema tidak tersedia.</div>;
  return (
    <div style={{display:'flex', flexDirection:'column', gap:16}}>
      <div className="panel">
        <h3>Warna Tema</h3>
        <div className="field">
          <label>Preset Warna</label>
          <div style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:6}}>
            {THEME_PRESETS.map(p => (
              <button key={p.key} onClick={() => setTheme({primaryColor:p.primary, accentColor:p.accent, primaryAlt:p.key})}
                style={{display:'flex', alignItems:'center', gap:8, padding:'7px 14px',
                  border:`2px solid ${theme.primaryAlt===p.key ? p.primary : 'var(--border)'}`,
                  borderRadius:8, background:'var(--bg-elev)', cursor:'pointer',
                  fontFamily:'inherit', fontSize:12.5, fontWeight:500,
                  color: theme.primaryAlt===p.key ? p.primary : 'var(--text-2)'}}>
                <span style={{display:'flex', gap:3}}>
                  <span style={{width:12, height:12, borderRadius:'50%', background:p.primary, display:'inline-block'}} />
                  <span style={{width:12, height:12, borderRadius:'50%', background:p.accent, display:'inline-block'}} />
                </span>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex', gap:20, marginTop:14}}>
          <div className="field" style={{flex:1}}>
            <label>Warna Utama</label>
            <div style={{display:'flex', alignItems:'center', gap:8, marginTop:4}}>
              <input type="color" value={theme.primaryColor}
                onChange={e => setTheme({primaryColor:e.target.value, primaryAlt:'custom'})}
                style={{width:36, height:32, border:'1px solid var(--border)', borderRadius:6, padding:2, cursor:'pointer', background:'var(--bg-elev)'}} />
              <span className="mono" style={{fontSize:12.5, color:'var(--text-3)'}}>{theme.primaryColor}</span>
            </div>
          </div>
          <div className="field" style={{flex:1}}>
            <label>Warna Aksen</label>
            <div style={{display:'flex', alignItems:'center', gap:8, marginTop:4}}>
              <input type="color" value={theme.accentColor}
                onChange={e => setTheme({accentColor:e.target.value, primaryAlt:'custom'})}
                style={{width:36, height:32, border:'1px solid var(--border)', borderRadius:6, padding:2, cursor:'pointer', background:'var(--bg-elev)'}} />
              <span className="mono" style={{fontSize:12.5, color:'var(--text-3)'}}>{theme.accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Layout</h3>
        <div className="field">
          <label>Densitas Tampilan</label>
          <div style={{display:'flex', gap:8, marginTop:6}}>
            {['compact','regular','comfy'].map(d => (
              <button key={d} onClick={() => setTheme({density:d})}
                style={{padding:'7px 20px',
                  border:`2px solid ${theme.density===d ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius:8,
                  background: theme.density===d ? 'var(--primary)' : 'var(--bg-elev)',
                  color: theme.density===d ? '#fff' : 'var(--text-2)',
                  cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:500}}>
                {d.charAt(0).toUpperCase()+d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function AdminDashboard({ onOpenSub }) {
  return (
    <div className="page" data-screen-label="System Admin — Dashboard">
      <div className="page-head">
        <div>
          <h1>System Admin</h1>
          <div className="sub">Kelola pengaturan perusahaan, hak akses, dan sesi pengguna.</div>
        </div>
      </div>
      <h3 className="section-title">Pengaturan <span className="count">{ADM_SUBS.length}</span></h3>
      <div className="tile-grid">
        {ADM_SUBS.map(t => (
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

// ─── AdminPage (controlled) ──────────────────────────────────────────────────

function AdminPage({ activeSub, onSubChange, onNavigate, theme, setTheme }) {
  if (!activeSub) return <AdminDashboard onOpenSub={onSubChange} />;

  const subLabel = ADM_SUBS.find(s => s.id === activeSub)?.label ?? activeSub;

  const content = () => {
    if (activeSub === 'profil')    return <AdminProfil />;
    if (activeSub === 'default')   return <AdminDefault />;
    if (activeSub === 'cetakan')   return <AdminCetakan />;
    if (activeSub === 'fitur')     return <AdminFitur />;
    if (activeSub === 'sesi')      return <AdminSesi />;
    if (activeSub === 'tampilan')  return <AdminTampilan theme={theme} setTheme={setTheme} />;
    return null;
  };

  return (
    <div className="page" data-screen-label={`System Admin — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>System Admin</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {content()}
    </div>
  );
}
