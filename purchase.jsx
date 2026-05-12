// purchase.jsx — Purchase module (4 sub-screens)

// ─── Local dummy data ─────────────────────────────────────────────────────────
const GUDANG_LIST   = ['Gudang Utama', 'Gudang Cadangan', 'Gudang Bahan Baku'];
const AKUN_TUNAI_LIST = ['', 'Kas Kecil', 'Bank BCA - 123-456-789', 'Bank Mandiri - 456-789-123', 'Bank BRI - 789-123-456'];

const ALL_SUPPLIERS = [
  ...SUPPLIERS,
  { code:'S009', name:'PT Grosir Minuman Nusantara', city:'Jakarta',   phone:'021-5552009', addr:'Jl. Industri No. 45' },
  { code:'S010', name:'CV Sembako Sport Arena',      city:'Bandung',   phone:'022-5552010', addr:'Jl. Merdeka No. 12'  },
  { code:'S011', name:'PT Olahraga Jaya',            city:'Semarang',  phone:'024-5552011', addr:'Jl. Gajah No. 78'    },
  { code:'S012', name:'CV Mitra Lapangan',           city:'Surabaya',  phone:'031-5552012', addr:'Jl. Sudirman No. 22' },
];

const NOTA_LIST = [
  { no:'NP-2026-0006', date:'12-05-2026', notaDate:'11-05-2026', supplier:'PT Sport Equipment Indonesia', gudang:'Gudang Utama', total:12450000, status:'Approved'         },
  { no:'NP-2026-0005', date:'11-05-2026', notaDate:'10-05-2026', supplier:'CV Alat Olahraga Nusantara',  gudang:'Gudang Utama', total:18750000, status:'Realisasi'        },
  { no:'NP-2026-0004', date:'10-05-2026', notaDate:'09-05-2026', supplier:'PT Minuman Sehat Abadi',      gudang:'Gudang Utama', total: 5280000, status:'Approved'         },
  { no:'NP-2026-0003', date:'09-05-2026', notaDate:'08-05-2026', supplier:'CV Raket Prima Jaya',         gudang:'Gudang Utama', total: 9800000, status:'Pending Approval' },
  { no:'NP-2026-0002', date:'08-05-2026', notaDate:'07-05-2026', supplier:'PT Bola Mas',                 gudang:'Gudang Utama', total: 7200000, status:'Draft'            },
  { no:'NP-2026-0001', date:'07-05-2026', notaDate:'06-05-2026', supplier:'CV Snack Arena',              gudang:'Gudang Utama', total: 3450000, status:'Realisasi'        },
];


// ─── Shared helpers ────────────────────────────────────────────────────────────

function PurchTotalsCard({ lines }) {
  const [discPct,  setDiscPct]  = React.useState(0);
  const [ppnPct,   setPpnPct]   = React.useState(11);
  const [ppnMode,  setPpnMode]  = React.useState('Exclude');

  const subtotal = lines.reduce((s, l) => {
    const price = l.item ? l.item.price : 0;
    return s + l.qty * price * (1 - (l.disc || 0) / 100);
  }, 0);
  const discRp = Math.round(subtotal * discPct / 100);
  const dpp    = subtotal - discRp;
  const ppnRp  = ppnMode === 'Exclude' ? Math.round(dpp * ppnPct / 100) : 0;
  const total  = dpp + ppnRp;

  return (
    <div>
      <h4 style={{margin:'0 0 12px', fontSize:11.5, fontWeight:600, textTransform:'uppercase',
        letterSpacing:'.06em', color:'var(--text-3)', paddingBottom:8, borderBottom:'1px solid var(--border)'}}>
        Ringkasan
      </h4>
      <div className="totals-card">
        <div className="row"><span>Subtotal DPP</span><span className="v mono">{fmtRp(subtotal)}</span></div>
        <div className="row disc">
          <span style={{display:'flex', alignItems:'center', gap:8}}>
            Diskon
            <input className="input" type="number" value={discPct}
              onChange={e => setDiscPct(+e.target.value)}
              style={{width:62, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}} /> %
          </span>
          <span className="v mono">−{fmtRp(discRp)}</span>
        </div>
        <div className="row muted"><span>DPP</span><span className="v mono">{fmtRp(dpp)}</span></div>
        <div className="row">
          <span style={{display:'flex', alignItems:'center', gap:8}}>
            PPN
            <input className="input" type="number" value={ppnPct}
              onChange={e => setPpnPct(+e.target.value)}
              style={{width:50, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}} /> %
            <select className="select" value={ppnMode} onChange={e => setPpnMode(e.target.value)}
              style={{width:90, height:26, padding:'0 6px', fontSize:12.5}}>
              <option>Exclude</option><option>Include</option>
            </select>
          </span>
          <span className="v mono" style={{color:'var(--accent)'}}>{fmtRp(ppnRp)}</span>
        </div>
        <div className="row total"><span>Total</span><span className="v mono">{fmtRp(total)}</span></div>
        <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:14, fontSize:11.5, color:'var(--text-3)', borderTop:'1px solid var(--border)', paddingTop:12}}>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Item count</span><span>{lines.length}</span></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Total qty</span><span>{lines.reduce((s, l) => s + l.qty, 0)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Mata uang</span><span>IDR</span></div>
        </div>
      </div>
    </div>
  );
}

function PurchItemTable({ lines, setLines, hasRealisasi = false }) {
  const [tab, setTab] = React.useState('stock');
  const newLine = () => ({ id: Date.now(), item: null, qty: 1, realized: 0, disc: 0, desc: '' });
  const update  = (id, patch) => setLines(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
  const remove  = (id) => setLines(prev => prev.filter(l => l.id !== id));

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:0}}>
        <div className="tabs-pills" style={{marginBottom:0}}>
          <button className={tab === 'stock' ? 'active' : ''} onClick={() => setTab('stock')}>Stock / Barang</button>
          <button className={tab === 'biaya' ? 'active' : ''} onClick={() => setTab('biaya')}>Biaya Lain</button>
        </div>
        <span style={{fontSize:12.5, color:'var(--text-3)'}}>{lines.length} baris</span>
      </div>
      <div className="line-items">
        <table>
          <thead>
            <tr>
              <th style={{width:'24%'}}>Nama Barang</th>
              <th>Kode</th>
              <th className="num" style={{width:70}}>Jumlah</th>
              {hasRealisasi && <th className="realisasi-h num" style={{width:80}}>Realisasi</th>}
              <th style={{width:70}}>Satuan</th>
              <th className="num">Harga Rp</th>
              <th className="num" style={{width:70}}>Diskon%</th>
              <th className="num">Diskon Rp</th>
              <th className="num">Total Rp</th>
              <th className="num">DPP/0</th>
              <th>Deskripsi</th>
              <th style={{width:32}}></th>
            </tr>
          </thead>
          <tbody>
            {lines.length === 0 && (
              <tr><td colSpan={hasRealisasi ? 12 : 11} className="empty">Belum ada item. Klik "+ Tambah Item" untuk mulai.</td></tr>
            )}
            {lines.map(l => {
              const price  = l.item ? l.item.price : 0;
              const discRp = Math.round(l.qty * price * (l.disc || 0) / 100);
              const totalR = l.qty * price - discRp;
              const dpp0   = Math.round(totalR / 1.11);
              return (
                <tr key={l.id}>
                  <td>
                    <select className="cell"
                      style={{height:28, padding:'0 6px', border:'1px solid transparent', background:'transparent', borderRadius:4, width:'100%', fontSize:13}}
                      value={l.item?.code || ''}
                      onChange={e => update(l.id, { item: BARANG.find(it => it.code === e.target.value) || null })}>
                      <option value="">— Pilih Barang —</option>
                      {BARANG.map(it => <option key={it.code} value={it.code}>{it.name}</option>)}
                    </select>
                  </td>
                  <td className="mono muted" style={{fontSize:12.5}}>{l.item?.code || '—'}</td>
                  <td><input className="cell num" type="number" value={l.qty} min="0" onChange={e => update(l.id, { qty: +e.target.value })} /></td>
                  {hasRealisasi && <td className="realisasi-cell">{l.realized}</td>}
                  <td className="muted" style={{fontSize:12.5}}>{l.item?.unit || '—'}</td>
                  <td className="num mono" style={{fontSize:13}}>{l.item ? fmtNum(l.item.price) : '—'}</td>
                  <td><input className="cell num" type="number" value={l.disc} min="0" max="100" step="0.01" onChange={e => update(l.id, { disc: +e.target.value })} /></td>
                  <td className="num mono">{fmtNum(discRp)}</td>
                  <td className="num mono" style={{fontWeight:500}}>{fmtNum(totalR)}</td>
                  <td className="num mono">{fmtNum(dpp0)}</td>
                  <td><input className="cell" value={l.desc} placeholder="Deskripsi" onChange={e => update(l.id, { desc: e.target.value })} /></td>
                  <td><button className="btn btn-icon btn-sm del" onClick={() => remove(l.id)} style={{color:'var(--text-3)'}}>{I.trash()}</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="add-row">
          <button className="btn btn-ghost btn-sm" onClick={() => setLines(prev => [...prev, newLine()])}>{I.plus()} Tambah Item</button>
        </div>
      </div>
    </>
  );
}

// ─── Sub-screen 1: Katalog Pemasok ───────────────────────────────────────────

function KatalogPemasok({ onNavigate, onBack }) {
  const [kriteria, setKriteria] = React.useState('Semua');
  const [search,   setSearch]   = React.useState('');
  const [showAdd,  setShowAdd]  = React.useState(false);
  const [form, setForm] = React.useState({ name:'', code:'', addr:'', city:'', phone:'', email:'', npwp:'', top:14 });
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const filtered = ALL_SUPPLIERS.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    if (kriteria === 'Nama') return s.name.toLowerCase().includes(q);
    if (kriteria === 'Kode') return s.code.toLowerCase().includes(q);
    return s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || (s.city || '').toLowerCase().includes(q);
  });

  const handleSave = () => {
    setShowAdd(false);
    setForm({ name:'', code:'', addr:'', city:'', phone:'', email:'', npwp:'', top:14 });
    window.__erpToast && window.__erpToast('Pemasok berhasil ditambahkan.');
  };

  return (
    <div className="page" data-screen-label="Purchase — Katalog Pemasok">
      <div className="crumbs"><a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span><a onClick={onBack} style={{cursor:'pointer'}}>Beli</a><span className="sep">/</span><span className="current">Katalog Pemasok</span></div>
      <div className="page-head">
        <div><h1>Katalog Pemasok</h1><div className="sub">Master data pemasok dan syarat pembayaran</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>{I.plus()} Tambah Item</button>
          <button className="btn">{I.download()} Aksi Katalog {I.chev()}</button>
        </div>
      </div>

      <div style={{display:'flex', gap:10, marginBottom:14, alignItems:'flex-end'}}>
        <div className="field" style={{margin:0}}>
          <label>Kriteria</label>
          <select className="select" value={kriteria} onChange={e => setKriteria(e.target.value)} style={{width:160}}>
            {['Semua','Nama','Kode'].map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
        <div className="field" style={{margin:0, flex:1}}>
          <label>Pencarian</label>
          <input className="input" placeholder="Cari pemasok..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-sm">{I.filter()} Pilih Kolom</button>
      </div>

      <div className="panel" style={{padding:0, overflow:'hidden'}}>
        <table className="data">
          <thead>
            <tr>
              <th>Nama Perusahaan</th>
              <th>Kode</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Telepon</th>
              <th style={{width:80}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.code}>
                <td style={{fontWeight:500, color:'var(--primary)'}}>{s.name}</td>
                <td className="mono">{s.code}</td>
                <td>{s.addr || '—'}</td>
                <td>{s.city}</td>
                <td>{s.phone}</td>
                <td>
                  <span className="row-actions">
                    <button className="btn-icon" title="Edit">{I.edit()}</button>
                    <button className="btn-icon del" title="Hapus">{I.trash()}</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:'8px 12px', fontSize:12.5, color:'var(--text-3)', borderTop:'1px solid var(--border)'}}>
          Jumlah: {filtered.length}
        </div>
      </div>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" style={{maxWidth:560}} onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div><h2>Tambah Pemasok Baru</h2><div className="sub">Isi data master pemasok</div></div>
              <button className="btn btn-icon" onClick={() => setShowAdd(false)}>{I.x(16)}</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="field"><label>Nama Perusahaan</label><input className="input" value={form.name} onChange={e => setF('name', e.target.value)} /></div>
                <div className="field"><label>Kode</label><input className="input" value={form.code} onChange={e => setF('code', e.target.value)} placeholder="S5013" /></div>
              </div>
              <div className="field" style={{marginTop:10}}><label>Alamat</label><input className="input" value={form.addr} onChange={e => setF('addr', e.target.value)} /></div>
              <div className="form-row" style={{marginTop:10}}>
                <div className="field"><label>Kota</label><input className="input" value={form.city} onChange={e => setF('city', e.target.value)} /></div>
                <div className="field"><label>Telepon</label><input className="input" value={form.phone} onChange={e => setF('phone', e.target.value)} /></div>
              </div>
              <div className="form-row" style={{marginTop:10}}>
                <div className="field"><label>Email</label><input className="input" type="email" value={form.email} onChange={e => setF('email', e.target.value)} /></div>
                <div className="field"><label>NPWP</label><input className="input" value={form.npwp} onChange={e => setF('npwp', e.target.value)} /></div>
              </div>
              <div className="field" style={{marginTop:10, maxWidth:160}}><label>TOP [Hari]</label><input className="input" type="number" value={form.top} onChange={e => setF('top', +e.target.value)} /></div>
            </div>
            <div className="modal-foot">
              <span />
              <div className="right">
                <button className="btn" onClick={() => setShowAdd(false)}>Batal</button>
                <button className="btn btn-primary" onClick={handleSave}>{I.check()} Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-screen 2: Order Pembelian ────────────────────────────────────────────

function OrderPembelian({ onNavigate, onBack }) {
  const [search,       setSearch]       = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [showAdd,      setShowAdd]      = React.useState(false);

  const [date,     setDate]     = React.useState('2026-04-30');
  const [ref,      setRef]      = React.useState('');
  const [supplier, setSupplier] = React.useState('');
  const [top,      setTop]      = React.useState(14);
  const [due,      setDue]      = React.useState('2026-05-14');
  const [notes,    setNotes]    = React.useState('');
  const [lines,    setLines]    = React.useState([]);

  const filtered = PO_LIST.filter(p => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.no.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q);
    }
    return true;
  });

  const handleClose = () => { setShowAdd(false); setLines([]); };
  const handleSave  = () => { handleClose(); window.__erpToast && window.__erpToast('Order pembelian berhasil disimpan.'); };

  return (
    <div className="page" data-screen-label="Purchase — Order Pembelian">
      <div className="crumbs"><a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span><a onClick={onBack} style={{cursor:'pointer'}}>Beli</a><span className="sep">/</span><span className="current">Order Pembelian</span></div>
      <div className="page-head">
        <div><h1>Order Pembelian</h1><div className="sub">{PO_LIST.length} order terdaftar</div></div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>{I.plus()} Tambah Order</button>
      </div>

      <div style={{display:'flex', gap:8, marginBottom:14}}>
        <input className="input" style={{flex:1, maxWidth:340}} placeholder="Cari no. order, supplier, referensi..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{width:180}}>
          <option value="">Semua Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="panel" style={{padding:0, overflow:'hidden'}}>
        <table className="data">
          <thead>
            <tr>
              <th>No. Order {I.chev(10)}</th>
              <th>Tgl. Bukti</th>
              <th>Pemasok</th>
              <th>No. Referensi</th>
              <th>Status</th>
              <th>Jth. Tempo</th>
              <th className="num">Total Rp</th>
              <th style={{width:90}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.no}>
                <td><a className="cell-link">{p.no}</a></td>
                <td>{p.date}</td>
                <td>{p.supplier}</td>
                <td className="mono muted">{p.ref}</td>
                <td><span className={`pill ${STATUS_CLASS[p.status] || 'draft'}`}>{p.status}</span></td>
                <td>{p.due}</td>
                <td className="num mono">{fmtRp(p.total)}</td>
                <td>
                  <span className="row-actions">
                    <button className="btn-icon" title="Edit">{I.edit()}</button>
                    <button className="btn-icon" title="Print">{I.print()}</button>
                    <button className="btn-icon del" title="Hapus">{I.trash()}</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="modal-backdrop" onClick={handleClose}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div><h2>Tambah Order Pembelian</h2><div className="sub">Lengkapi informasi, tambahkan item, lalu simpan.</div></div>
              <button className="btn btn-icon" onClick={handleClose}>{I.x(16)}</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-section">
                  <h4>Informasi Umum</h4>
                  <div className="form-row">
                    <div className="field"><label>Tgl. Bukti</label><input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
                    <div className="field"><label>No. Referensi</label><input className="input" placeholder="REF-XXX-NNNN" value={ref} onChange={e => setRef(e.target.value)} /></div>
                  </div>
                  <div className="field">
                    <label>Pemasok</label>
                    <select className="select" value={supplier} onChange={e => setSupplier(e.target.value)}>
                      <option value="">— Pilih Pemasok —</option>
                      {ALL_SUPPLIERS.map(s => <option key={s.code} value={s.code}>{s.name} · {s.city}</option>)}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>TOP [Hari]</label><input className="input" type="number" value={top} onChange={e => setTop(+e.target.value)} /></div>
                    <div className="field"><label>Jth. Tempo</label><input className="input" type="date" value={due} onChange={e => setDue(e.target.value)} /></div>
                  </div>
                  <div className="field"><label>Catatan</label><textarea className="textarea" placeholder="Catatan order..." value={notes} onChange={e => setNotes(e.target.value)} /></div>
                </div>
                <PurchTotalsCard lines={lines} />
              </div>
              <div style={{marginTop:20}}>
                <PurchItemTable lines={lines} setLines={setLines} hasRealisasi={true} />
              </div>
            </div>
            <div className="modal-foot">
              <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
              <div className="right">
                <button className="btn" onClick={handleClose}>Batal</button>
                <button className="btn">Simpan sebagai Draft</button>
                <button className="btn btn-primary" onClick={handleSave}>{I.check()} Simpan Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-screen 3: Nota Pembelian ─────────────────────────────────────────────

function NotaPembelian({ onNavigate, onBack }) {
  const [search,  setSearch]  = React.useState('');
  const [showAdd, setShowAdd] = React.useState(false);

  const [dateBukti,    setDateBukti]    = React.useState('2026-04-30');
  const [noPO,         setNoPO]         = React.useState('');
  const [dateNota,     setDateNota]     = React.useState('2026-04-30');
  const [noNota,       setNoNota]       = React.useState('');
  const [datePajak,    setDatePajak]    = React.useState('2026-04-30');
  const [noPajak,      setNoPajak]      = React.useState('');
  const [supplier,     setSupplier]     = React.useState('');
  const [gudang,       setGudang]       = React.useState(GUDANG_LIST[0]);
  const [top,          setTop]          = React.useState(14);
  const [due,          setDue]          = React.useState('2026-05-14');
  const [catatan,      setCatatan]      = React.useState('');
  const [akunTunai,    setAkunTunai]    = React.useState('');
  const [lines,        setLines]        = React.useState([]);

  const filtered = NOTA_LIST.filter(n =>
    !search || n.no.toLowerCase().includes(search.toLowerCase()) || n.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const handleClose = () => { setShowAdd(false); setLines([]); };
  const handleSave  = () => { handleClose(); window.__erpToast && window.__erpToast('Nota pembelian berhasil disimpan.'); };

  return (
    <div className="page" data-screen-label="Purchase — Nota Pembelian">
      <div className="crumbs"><a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span><a onClick={onBack} style={{cursor:'pointer'}}>Beli</a><span className="sep">/</span><span className="current">Nota Pembelian</span></div>
      <div className="page-head">
        <div><h1>Nota Pembelian</h1><div className="sub">{NOTA_LIST.length} nota terdaftar</div></div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>{I.plus()} Tambah Nota</button>
      </div>

      <div style={{display:'flex', gap:8, marginBottom:14}}>
        <input className="input" style={{flex:1, maxWidth:340}} placeholder="Cari no. nota, supplier..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="panel" style={{padding:0, overflow:'hidden'}}>
        <table className="data">
          <thead>
            <tr>
              <th>No. Nota</th>
              <th>Tgl. Bukti</th>
              <th>Tgl. Nota / Sj</th>
              <th>Pemasok</th>
              <th>Gudang</th>
              <th>Status</th>
              <th className="num">Total Rp</th>
              <th style={{width:90}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(n => (
              <tr key={n.no} className={n.status === 'Realisasi' ? 'realisasi' : ''}>
                <td><a className="cell-link">{n.no}</a></td>
                <td>{n.date}</td>
                <td>{n.notaDate}</td>
                <td>{n.supplier}</td>
                <td>{n.gudang}</td>
                <td><span className={`pill ${STATUS_CLASS[n.status] || 'draft'}`}>{n.status}</span></td>
                <td className="num mono">{fmtRp(n.total)}</td>
                <td>
                  <span className="row-actions">
                    <button className="btn-icon" title="Edit">{I.edit()}</button>
                    <button className="btn-icon" title="Print">{I.print()}</button>
                    <button className="btn-icon del" title="Hapus">{I.trash()}</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="modal-backdrop" onClick={handleClose}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div><h2>Tambah Nota Pembelian</h2><div className="sub">Isi data nota dan item yang diterima.</div></div>
              <button className="btn btn-icon" onClick={handleClose}>{I.x(16)}</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-section">
                  <h4>Informasi Nota</h4>
                  <div className="form-row">
                    <div className="field"><label>Tgl. Bukti</label><input className="input" type="date" value={dateBukti} onChange={e => setDateBukti(e.target.value)} /></div>
                    <div className="field">
                      <label>No. PO</label>
                      <select className="select" value={noPO} onChange={e => setNoPO(e.target.value)}>
                        <option value="">— Pilih No. PO —</option>
                        {PO_LIST.map(p => <option key={p.no} value={p.no}>{p.no} · {p.supplier}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Tgl. Nota / Sj</label><input className="input" type="date" value={dateNota} onChange={e => setDateNota(e.target.value)} /></div>
                    <div className="field"><label>No. Nota / Sj</label><input className="input" placeholder="No. Nota" value={noNota} onChange={e => setNoNota(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Tgl. Kredit Pajak</label><input className="input" type="date" value={datePajak} onChange={e => setDatePajak(e.target.value)} /></div>
                    <div className="field"><label>No. Pajak</label><input className="input" placeholder="No. Pajak" value={noPajak} onChange={e => setNoPajak(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label>Pemasok</label>
                      <select className="select" value={supplier} onChange={e => setSupplier(e.target.value)}>
                        <option value="">— Pilih Pemasok —</option>
                        {ALL_SUPPLIERS.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Gudang</label>
                      <select className="select" value={gudang} onChange={e => setGudang(e.target.value)}>
                        {GUDANG_LIST.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>TOP [Hari]</label><input className="input" type="number" value={top} onChange={e => setTop(+e.target.value)} /></div>
                    <div className="field"><label>Jth. Tempo</label><input className="input" type="date" value={due} onChange={e => setDue(e.target.value)} /></div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label>Catatan</label><input className="input" value={catatan} onChange={e => setCatatan(e.target.value)} /></div>
                    <div className="field">
                      <label>Akun Tunai</label>
                      <select className="select" value={akunTunai} onChange={e => setAkunTunai(e.target.value)}>
                        {AKUN_TUNAI_LIST.map(a => <option key={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <PurchTotalsCard lines={lines} />
              </div>
              <div style={{marginTop:20}}>
                <PurchItemTable lines={lines} setLines={setLines} hasRealisasi={false} />
              </div>
            </div>
            <div className="modal-foot">
              <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
              <div className="right">
                <button className="btn" onClick={handleClose}>Batal</button>
                <button className="btn btn-primary" onClick={handleSave}>{I.check()} Simpan Nota</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Purchase Dashboard ────────────────────────────────────────────────────────

function PurchaseDashboard({ onSubChange, onNavigate }) {
  return (
    <div className="page" data-screen-label="Beli — Dashboard">
      <div className="crumbs"><a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span><span className="current">Beli</span></div>
      <div className="page-head">
        <div>
          <h1>Pembelian Workspace</h1>
          <div className="sub">Kelola order pembelian dan nota ke pemasok olahraga.</div>
        </div>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
      </div>

      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Open PO</div>
          <div className="val mono">{PO_LIST.filter(p=>p.status!=='Realisasi'&&p.status!=='Cancelled').length}</div>
          <div className="delta up">▲ 2 vs minggu lalu</div>
          <Spark data={[4,5,4,6,5,7,6,8,7,9]} />
        </div>
        <div className="kpi">
          <div className="lbl">Nota Pending</div>
          <div className="val mono">{NOTA_LIST.filter(n=>n.status==='Pending Approval'||n.status==='Draft').length}</div>
          <div className="delta down">▼ 1 vs kemarin</div>
          <Spark data={[3,4,3,5,4,3,4,5,4,2]} color="var(--realisasi)" />
        </div>
        <div className="kpi">
          <div className="lbl">Total Beli (Bulan Ini)</div>
          <div className="val mono">{fmtRp(PO_LIST.reduce((s,p)=>s+p.total,0))}</div>
          <div className="delta up">▲ 5.2%</div>
          <Spark data={[6,7,8,7,9,8,10,9,11,10]} color="#a16207" />
        </div>
        <div className="kpi">
          <div className="lbl">Realisasi (30 Hari)</div>
          <div className="val mono">{Math.round(PO_LIST.filter(p=>p.status==='Realisasi').length/PO_LIST.length*100)}<span style={{fontSize:14, color:'var(--text-3)', fontWeight:500}}>%</span></div>
          <div className="delta up">▲ 3 pp</div>
          <Spark data={[70,72,74,73,76,75,78,77,80,82]} color="var(--realisasi)" />
        </div>
      </div>

      <h3 className="section-title">Modul Beli <span className="count">3</span></h3>
      <div className="tile-grid">
        <Tile icon={I.users(20)}   title="Katalog Pemasok" desc="Master data pemasok, kontrak, syarat pembayaran."                  accentColor="#0369a1" onClick={() => onSubChange('pemasok')} />
        <Tile icon={I.list(20)}    title="Order Pembelian" desc="Buat, kelola, dan setujui order pembelian ke supplier."  badge="63 POs to review" badgeKind="pulse" count="63" onClick={() => onSubChange('order')} />
        <Tile icon={I.invoice(20)} title="Nota Pembelian"  desc="Match nota ke GR & PO, kelola pembayaran dan jatuh tempo." badge="6 pending" accentColor="#0d9488" onClick={() => onSubChange('nota')} />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Aktivitas Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done"><div className="ti-when">Hari ini · 14:22</div><div className="ti-what"><b className="ti-who">Admin</b> menyetujui <a className="cell-link">PO-2026-0031</a> · PT Sport Equipment · {fmtRp(12450000)}</div></div>
            <div className="timeline-item done"><div className="ti-when">Hari ini · 11:08</div><div className="ti-what"><b className="ti-who">Sistem</b> menerima nota NP-2026-0006 dari PT Sport Equipment Indonesia</div></div>
            <div className="timeline-item"><div className="ti-when">Kemarin · 09:12</div><div className="ti-what"><b className="ti-who">Sistem</b> mengirim 2 reminder jatuh tempo ke pemasok</div></div>
          </div>
        </div>
        <div className="panel">
          <h3>Top Pemasok (30 Hari)</h3>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {[['CV Alat Olahraga Nusantara',18750000,95],['PT Sport Equipment Indonesia',12450000,63],['CV Raket Prima Jaya',9800000,49],['PT Bola Mas',7200000,36],['PT Minuman Sehat Abadi',5280000,27]]
              .map(([name, val, pct]) => (
                <div key={name}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                    <span>{name}</span><span className="mono muted">{fmtRp(val)}</span>
                  </div>
                  <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                    <div style={{height:'100%', width:pct+'%', background:'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius:999}} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page router ─────────────────────────────────────────────────────────

function PurchasePage({ activeSub, onSubChange, onNavigate }) {
  const onBack = () => onSubChange(null);
  if (!activeSub)                return <PurchaseDashboard onSubChange={onSubChange} onNavigate={onNavigate} />;
  if (activeSub === 'pemasok')   return <KatalogPemasok onNavigate={onNavigate} onBack={onBack} />;
  if (activeSub === 'order')     return <OrderPembelian  onNavigate={onNavigate} onBack={onBack} />;
  if (activeSub === 'nota')      return <NotaPembelian   onNavigate={onNavigate} onBack={onBack} />;
  return null;
}

window.PurchasePage = PurchasePage;
