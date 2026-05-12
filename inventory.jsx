// Inventory module — 5 sub-screens + Add/Edit modals

const KATEGORI = [
  { name: 'Minuman',       code: 'KAT001', active: true,  note: 'Air mineral, minuman isotonik, energi' },
  { name: 'Makanan',       code: 'KAT002', active: true,  note: 'Snack, mi instan, makanan ringan' },
  { name: 'Perlengkapan',  code: 'KAT003', active: true,  note: 'Bola, raket, sepatu, aksesoris sport' },
  { name: 'Promo',         code: 'KAT099', active: false, note: 'Item promo / non-stock' },
];

const GUDANG = ['Gudang Utama', 'Gudang Cadangan', 'Gudang Mini Bar Padel', 'Gudang Kantin'];

const MUTASI = [
  { tgl:'12-05-2026', no:'MB26050010', asal:'Gudang Cadangan',    tujuan:'Gudang Utama',         item:'Cleo 600ml',               qty:100, status:'Approved' },
  { tgl:'12-05-2026', no:'MB26050009', asal:'Gudang Utama',       tujuan:'Gudang Mini Bar Padel',item:'Isoplus 350ml',             qty: 48, status:'Approved' },
  { tgl:'11-05-2026', no:'MB26050008', asal:'Gudang Utama',       tujuan:'Gudang Kantin',        item:'Snack Ring Ubi 75g',        qty: 60, status:'Approved' },
  { tgl:'10-05-2026', no:'MB26050007', asal:'Gudang Cadangan',    tujuan:'Gudang Utama',         item:'Pocari Sweat 350ml',        qty: 48, status:'Pending'  },
  { tgl:'10-05-2026', no:'MB26050006', asal:'Gudang Utama',       tujuan:'Gudang Mini Bar Padel',item:'Bola Padel Head Pro S',     qty:  10, status:'Approved' },
  { tgl:'09-05-2026', no:'MB26050005', asal:'Gudang Utama',       tujuan:'Gudang Kantin',        item:'Kopi Good Day Sachet',      qty: 50, status:'Approved' },
  { tgl:'08-05-2026', no:'MB26050004', asal:'Gudang Cadangan',    tujuan:'Gudang Utama',         item:'Aqua 600ml',                qty:120, status:'Approved' },
];

const PENYESUAIAN = [
  { tgl:'12-05-2026', no:'PS26050005', gudang:'Gudang Utama', item:'Cleo 600ml',               tipe:'Plus',  qty:  12, alasan:'Selisih opname fisik', status:'Approved' },
  { tgl:'11-05-2026', no:'PS26050004', gudang:'Gudang Utama', item:'Bola Futsal Penalty Size 4', tipe:'Minus', qty: 1, alasan:'Hilang/rusak',         status:'Approved' },
  { tgl:'10-05-2026', no:'PS26050003', gudang:'Gudang Utama', item:'Pocari Sweat 350ml',       tipe:'Minus', qty:   6, alasan:'Expired',              status:'Pending'  },
  { tgl:'09-05-2026', no:'PS26050002', gudang:'Gudang Kantin',item:'Snack Ring Ubi 75g',       tipe:'Plus',  qty:  24, alasan:'Hasil opname',         status:'Approved' },
  { tgl:'07-05-2026', no:'PS26050001', gudang:'Gudang Utama', item:'Grip Raket Overgrip',      tipe:'Minus', qty:   3, alasan:'Rusak dalam penyimpanan', status:'Approved' },
];

const OPNAME = [
  { tgl:'12-05-2026', no:'OP26050002', gudang:'Gudang Utama',         periode:'Mei 2026',   items: BARANG.length, selisih: 3, status:'In Progress', pic:'Admin' },
  { tgl:'30-04-2026', no:'OP26040002', gudang:'Gudang Utama',         periode:'April 2026', items: BARANG.length, selisih: 5, status:'Completed',   pic:'Admin' },
  { tgl:'30-04-2026', no:'OP26040001', gudang:'Gudang Mini Bar Padel',periode:'April 2026', items:  8, selisih: 1, status:'Completed',   pic:'Admin' },
  { tgl:'31-03-2026', no:'OP26030002', gudang:'Gudang Utama',         periode:'Maret 2026', items: BARANG.length, selisih: 4, status:'Completed',   pic:'Admin' },
  { tgl:'31-03-2026', no:'OP26030001', gudang:'Gudang Kantin',        periode:'Maret 2026', items:  6, selisih: 2, status:'Completed',   pic:'Admin' },
];

Object.assign(window, { KATEGORI, GUDANG, MUTASI, PENYESUAIAN, OPNAME });

// ─── Generic helpers ────────────────────────────────────────────────────────

const INV_SUBS = [
  { id: 'barang',       label: 'Katalog Barang' },
  { id: 'kategori',     label: 'Katalog Kategori Produk' },
  { id: 'mutasi',       label: 'Mutasi Barang' },
  { id: 'penyesuaian',  label: 'Penyesuaian Barang' },
  { id: 'opname',       label: 'Stock Opname' },
];

function InvSubNav({ active, onChange }) {
  return (
    <div className="tabs-pills" style={{marginBottom:18, marginTop:-4}}>
      {INV_SUBS.map(s => (
        <button key={s.id} className={active===s.id?'active':''} onClick={()=>onChange(s.id)}>{s.label}</button>
      ))}
    </div>
  );
}

function InvHeader({ title, sub, onAdd, addLabel = 'Tambah Item', extra }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <div className="sub">{sub}</div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {extra}
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

// ─── 1. Katalog Barang ──────────────────────────────────────────────────────

function KatalogBarang({ onEdit, onAdd }) {
  const [q, setQ] = React.useState('');
  const [kat, setKat] = React.useState('');
  const filtered = BARANG.filter(b => {
    if (q && !b.name.toLowerCase().includes(q.toLowerCase()) && !b.code.toLowerCase().includes(q.toLowerCase())) return false;
    if (kat && b.kategori !== kat) return false;
    return true;
  });
  return (
    <>
      <InvHeader title="Katalog Barang" sub={`${filtered.length} produk · ${BARANG.filter(b=>b.active).length} aktif · ${BARANG.filter(b=>b.stock < b.minQty).length} di bawah min stock`}
        onAdd={onAdd} addLabel="Tambah Barang" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field">
            <label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama atau kode barang…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="field">
            <label>Kategori</label>
            <select className="select" value={kat} onChange={e=>setKat(e.target.value)}>
              <option value="">Semua kategori</option>
              {KATEGORI.map(k => <option key={k.code}>{k.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Status Stock</label>
            <select className="select"><option>Semua</option><option>Di bawah min</option><option>Habis</option><option>Normal</option></select>
          </div>
          <div className="field">
            <label>Gudang</label>
            <select className="select"><option>Semua gudang</option>{GUDANG.map(g=><option key={g}>{g}</option>)}</select>
          </div>
          <div className="filter-actions">
            <button className="btn">Reset</button>
            <button className="btn btn-primary">{I.filter()} Cari</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>{filtered.length}</b> baris</div>
          <div className="table-toolbar-right">
            <button className="btn btn-icon btn-sm">{I.refresh()}</button>
            <button className="btn btn-icon btn-sm">{I.settings(14)}</button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Nama Barang</th>
                <th>Kode</th>
                <th>Kategori</th>
                <th className="center">Aktif</th>
                <th className="num">Min Qty</th>
                <th className="num">Stock</th>
                <th className="num">Harga Beli</th>
                <th className="num">HPP Standar</th>
                <th>Catatan</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.code} onClick={()=>onEdit(b)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td><span className="cell-link">{b.name}</span></td>
                  <td className="mono muted">{b.code}</td>
                  <td>{b.kategori}</td>
                  <td className="center">{b.active ? <span>{I.check(14)}</span> : <span className="muted">—</span>}</td>
                  <td className="num mono">{fmtNum(b.minQty)}</td>
                  <td className="num mono">{fmtNum(b.stock)}{b.stock < b.minQty && <span className="pill pending" style={{marginLeft:6, fontSize:10, padding:'1px 5px'}}>Rendah</span>}</td>
                  <td className="num mono">{fmtNum(b.hargaBeli)}</td>
                  <td className="num mono">{fmtNum(b.hpp)}</td>
                  <td className="muted" style={{maxWidth:160, overflow:'hidden', textOverflow:'ellipsis'}}>{b.note || '—'}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(b)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Duplicate">{I.copy()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <div>Menampilkan <b style={{color:'var(--text)'}}>1</b>–<b style={{color:'var(--text)'}}>{filtered.length}</b> dari <b style={{color:'var(--text)'}}>{filtered.length}</b></div>
          <div className="pager-pages"><button className="active">1</button></div>
          <div>Tampilkan <b style={{color:'var(--text)'}}>20</b> per halaman</div>
        </div>
      </div>
    </>
  );
}

// ─── 2. Katalog Kategori ────────────────────────────────────────────────────

function KatalogKategori({ onEdit, onAdd }) {
  const [q, setQ] = React.useState('');
  const filtered = KATEGORI.filter(k => !q || k.name.toLowerCase().includes(q.toLowerCase()) || k.code.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <InvHeader title="Katalog Kategori Produk" sub={`${filtered.length} kategori · ${KATEGORI.filter(k=>k.active).length} aktif`}
        onAdd={onAdd} addLabel="Tambah Kategori" />
      <div className="filter-bar">
        <div className="filter-grid" style={{gridTemplateColumns:'1fr auto'}}>
          <div className="field">
            <label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama atau kode kategori…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>{filtered.length}</b> baris</div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th style={{width:'30%'}}>Nama Kategori</th>
                <th>Kode Kategori</th>
                <th className="center">Aktif</th>
                <th className="num">Jumlah Produk</th>
                <th>Keterangan</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(k => {
                const cnt = BARANG.filter(b => b.kategori === k.name).length;
                return (
                  <tr key={k.code} onClick={()=>onEdit(k)}>
                    <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                    <td><span className="cell-link">{k.name}</span></td>
                    <td className="mono muted">{k.code}</td>
                    <td className="center">{k.active ? <span>{I.check(14)}</span> : <span className="muted">—</span>}</td>
                    <td className="num mono">{cnt}</td>
                    <td className="muted">{k.note || '—'}</td>
                    <td onClick={e=>e.stopPropagation()}>
                      <div className="row-actions">
                        <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(k)}>{I.edit()}</button>
                        <button className="btn btn-icon btn-sm del" title="Hapus">{I.trash()}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── 3. Mutasi Barang ───────────────────────────────────────────────────────

function MutasiBarang({ onEdit, onAdd }) {
  return (
    <>
      <InvHeader title="Mutasi Barang" sub={`${MUTASI.length} mutasi tercatat · ${MUTASI.filter(m=>m.status==='Pending').length} menunggu approval`}
        onAdd={onAdd} addLabel="Mutasi Baru" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. mutasi, item…"/></div></div>
          <div className="field"><label>Gudang Asal</label><select className="select"><option>Semua</option>{GUDANG.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Gudang Tujuan</label><select className="select"><option>Semua</option>{GUDANG.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Status</label><select className="select"><option>Semua</option><option>Pending</option><option>Approved</option><option>Cancelled</option></select></div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>{MUTASI.length}</b> mutasi</div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Tanggal</th>
                <th>No. Mutasi</th>
                <th>Gudang Asal</th>
                <th>Gudang Tujuan</th>
                <th>Item</th>
                <th className="num">Qty</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {MUTASI.map(m => (
                <tr key={m.no} onClick={()=>onEdit(m)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td className="mono">{m.tgl}</td>
                  <td className="no"><span className="cell-link mono">{m.no}</span></td>
                  <td>{m.asal}</td>
                  <td>{m.tujuan}</td>
                  <td>{m.item}</td>
                  <td className="num mono">{fmtNum(m.qty)}</td>
                  <td><span className={`pill ${m.status==='Approved'?'realisasi':m.status==='Pending'?'pending':'cancelled'}`}>{m.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(m)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Print">{I.print()}</button>
                      <button className="btn btn-icon btn-sm del" title="Batal">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── 4. Penyesuaian Barang ──────────────────────────────────────────────────

function PenyesuaianBarang({ onEdit, onAdd }) {
  return (
    <>
      <InvHeader title="Penyesuaian Barang" sub={`${PENYESUAIAN.length} penyesuaian · ${PENYESUAIAN.filter(p=>p.tipe==='Plus').length} plus, ${PENYESUAIAN.filter(p=>p.tipe==='Minus').length} minus`}
        onAdd={onAdd} addLabel="Penyesuaian Baru" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. atau item…"/></div></div>
          <div className="field"><label>Gudang</label><select className="select"><option>Semua</option>{GUDANG.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Tipe</label><select className="select"><option>Semua</option><option>Plus (+)</option><option>Minus (−)</option></select></div>
          <div className="field"><label>Status</label><select className="select"><option>Semua</option><option>Pending</option><option>Approved</option></select></div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>{PENYESUAIAN.length}</b> baris</div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Tanggal</th>
                <th>No. Dokumen</th>
                <th>Gudang</th>
                <th>Item</th>
                <th className="center">Tipe</th>
                <th className="num">Qty</th>
                <th>Alasan</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {PENYESUAIAN.map(p => (
                <tr key={p.no} onClick={()=>onEdit(p)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td className="mono">{p.tgl}</td>
                  <td><span className="cell-link mono">{p.no}</span></td>
                  <td>{p.gudang}</td>
                  <td>{p.item}</td>
                  <td className="center">
                    <span style={{display:'inline-flex', alignItems:'center', justifyContent:'center', width:24, height:24, borderRadius:6,
                      background: 'var(--bg-sub)', color: 'var(--text-2)', fontWeight:700, fontSize:14}}>
                      {p.tipe==='Plus' ? '+' : '−'}
                    </span>
                  </td>
                  <td className="num mono" style={{fontWeight:600}}>
                    {p.tipe==='Plus' ? '+' : '−'}{fmtNum(p.qty)}
                  </td>
                  <td className="muted">{p.alasan}</td>
                  <td><span className={`pill ${p.status==='Approved'?'realisasi':'pending'}`}>{p.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(p)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── 5. Stock Opname ────────────────────────────────────────────────────────

function StockOpname({ onEdit, onAdd }) {
  return (
    <>
      <InvHeader title="Stock Opname" sub={`${OPNAME.length} sesi · ${OPNAME.filter(o=>o.status==='In Progress').length} sedang berjalan`}
        onAdd={onAdd} addLabel="Mulai Opname Baru" />

      <div className="kpi-strip" style={{gridTemplateColumns:'repeat(4, 1fr)', marginBottom:18}}>
        <div className="kpi"><div className="lbl">Total Sesi (YTD)</div><div className="val mono">{OPNAME.length}</div></div>
        <div className="kpi"><div className="lbl">In Progress</div><div className="val mono">{OPNAME.filter(o=>o.status==='In Progress').length}</div></div>
        <div className="kpi"><div className="lbl">Total Item Dihitung</div><div className="val mono">{fmtNum(OPNAME.reduce((s,o)=>s+o.items,0))}</div></div>
        <div className="kpi"><div className="lbl">Total Selisih</div><div className="val mono">{OPNAME.reduce((s,o)=>s+o.selisih,0)}</div><div className="delta down">selisih audit</div></div>
      </div>

      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. atau gudang…"/></div></div>
          <div className="field"><label>Gudang</label><select className="select"><option>Semua</option>{GUDANG.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Periode</label><input className="input" type="month"/></div>
          <div className="field"><label>Status</label><select className="select"><option>Semua</option><option>In Progress</option><option>Completed</option></select></div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>{OPNAME.length}</b> sesi opname</div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Tanggal</th>
                <th>No. Opname</th>
                <th>Gudang</th>
                <th>Periode</th>
                <th>PIC</th>
                <th className="num">Item Dihitung</th>
                <th className="num">Selisih</th>
                <th>Status</th>
                <th style={{width:140}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {OPNAME.map(o => (
                <tr key={o.no} onClick={()=>onEdit(o)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td className="mono">{o.tgl}</td>
                  <td><span className="cell-link mono">{o.no}</span></td>
                  <td>{o.gudang}</td>
                  <td>{o.periode}</td>
                  <td>{o.pic}</td>
                  <td className="num mono">{fmtNum(o.items)}</td>
                  <td className="num mono">{o.selisih}{o.selisih > 5 && <span className="pill pending" style={{marginLeft:6, fontSize:10, padding:'1px 5px'}}>Selisih</span>}</td>
                  <td><span className={`pill ${o.status==='Completed'?'realisasi':'pending'}`}>{o.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Lanjutkan" onClick={()=>onEdit(o)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Print">{I.print()}</button>
                      <button className="btn btn-icon btn-sm" title="Export">{I.download()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Modals ─────────────────────────────────────────────────────────────────

function ModalShell({ title, sub, onClose, onSave, children, saveLabel = 'Simpan', wide = false }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide ? {maxWidth: 980} : {maxWidth: 640}}>
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            {sub && <div className="sub">{sub}</div>}
          </div>
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

function BarangModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [form, setForm] = React.useState(data || { name:'', code:'', kategori:'', active:true, minQty:0, hargaBeli:0, hpp:0, gudang:'Gudang Utama', note:'' });
  const set = (k,v) => setForm(f => ({...f, [k]: v}));
  return (
    <ModalShell wide title={isEdit ? `Edit Barang — ${data.code}` : 'Tambah Barang Baru'}
      sub={isEdit ? data.name : 'Lengkapi informasi master barang'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit ? 'Simpan Perubahan' : 'Simpan Barang'}>
      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div className="form-section">
          <h4>Identitas</h4>
          <div className="field"><label>Nama Barang *</label><input className="input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Contoh: Brake Pad Set Front — Ranger"/></div>
          <div className="form-row">
            <div className="field"><label>Kode *</label><input className="input mono" value={form.code} onChange={e=>set('code',e.target.value)} placeholder="P-XX0000"/></div>
            <div className="field"><label>Satuan</label><select className="select"><option>pcs</option><option>set</option><option>btl</option><option>liter</option><option>kg</option></select></div>
          </div>
          <div className="field">
            <label>Kategori *</label>
            <select className="select" value={form.kategori} onChange={e=>set('kategori',e.target.value)}>
              <option value="">— Pilih kategori —</option>
              {KATEGORI.filter(k=>k.active).map(k=><option key={k.code}>{k.name}</option>)}
            </select>
          </div>
          <div className="field"><label>Catatan</label><textarea className="textarea" value={form.note} onChange={e=>set('note',e.target.value)} placeholder="Catatan internal"/></div>
        </div>

        <div className="form-section">
          <h4>Stock & Harga</h4>
          <div className="form-row">
            <div className="field"><label>Min. Qty</label><input className="input mono" type="number" value={form.minQty} onChange={e=>set('minQty',+e.target.value)}/></div>
            <div className="field"><label>Gudang Default</label><select className="select" value={form.gudang} onChange={e=>set('gudang',e.target.value)}>{GUDANG.map(g=><option key={g}>{g}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Harga Beli (Rp)</label><input className="input mono" type="number" value={form.hargaBeli} onChange={e=>set('hargaBeli',+e.target.value)}/></div>
            <div className="field"><label>HPP Standar (Rp)</label><input className="input mono" type="number" value={form.hpp} onChange={e=>set('hpp',+e.target.value)}/></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Pajak</label><select className="select"><option>PPN 11% (Default)</option><option>PPN 0% (Bebas)</option><option>Non-PPN</option></select></div>
            <div className="field"><label>Status</label>
              <div style={{display:'flex', alignItems:'center', height:32, gap:10}}>
                <label style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13}}>
                  <input type="checkbox" className="cb" checked={form.active} onChange={e=>set('active',e.target.checked)}/> Aktif
                </label>
              </div>
            </div>
          </div>
          <div className="field"><label>Supplier Default</label><select className="select"><option value="">— Pilih supplier —</option>{SUPPLIERS.map(s=><option key={s.code}>{s.name}</option>)}</select></div>
        </div>
      </div>
    </ModalShell>
  );
}

function KategoriModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [form, setForm] = React.useState(data || { name:'', code:'', active:true, note:'' });
  const set = (k,v) => setForm(f => ({...f, [k]: v}));
  return (
    <ModalShell title={isEdit ? `Edit Kategori — ${data.code}` : 'Tambah Kategori Produk'}
      sub={isEdit ? data.name : 'Buat kategori baru untuk pengelompokan produk'}
      onClose={onClose} onSave={onSave}>
      <div className="form-section">
        <div className="form-row">
          <div className="field"><label>Nama Kategori *</label><input className="input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Contoh: Sparepart Mesin"/></div>
          <div className="field"><label>Kode *</label><input className="input mono" value={form.code} onChange={e=>set('code',e.target.value)} placeholder="KAT00X"/></div>
        </div>
        <div className="field"><label>Keterangan</label><textarea className="textarea" value={form.note} onChange={e=>set('note',e.target.value)} placeholder="Deskripsi singkat kategori ini"/></div>
        <div className="field">
          <label>Status</label>
          <label style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:13, marginTop:4}}>
            <input type="checkbox" className="cb" checked={form.active} onChange={e=>set('active',e.target.checked)}/> Kategori Aktif
          </label>
        </div>
      </div>
    </ModalShell>
  );
}

function MutasiModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [lines, setLines] = React.useState(isEdit ? [{ id:1, item: data.item, qty: data.qty }] : [{ id:1, item:'', qty:1 }]);
  const addLine = () => setLines(ls => [...ls, { id:Date.now(), item:'', qty:1 }]);
  const removeLine = id => setLines(ls => ls.filter(l => l.id !== id));
  const update = (id, patch) => setLines(ls => ls.map(l => l.id===id ? {...l, ...patch} : l));
  return (
    <ModalShell wide title={isEdit ? `Edit Mutasi — ${data.no}` : 'Mutasi Barang Baru'}
      sub={isEdit ? `Status: ${data.status}` : 'Pindahkan stock antar gudang'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit ? 'Simpan Perubahan' : 'Simpan Mutasi'}>
      <div className="form-section">
        <h4>Header Mutasi</h4>
        <div className="form-row-3">
          <div className="field"><label>Tanggal *</label><input className="input" type="date" defaultValue="2026-04-30"/></div>
          <div className="field"><label>No. Mutasi</label><input className="input mono" defaultValue={isEdit ? data.no : 'MB26050001'} readOnly/></div>
          <div className="field"><label>Status</label><span className={`pill ${isEdit && data.status==='Approved'?'realisasi':'draft'}`} style={{alignSelf:'center'}}>{isEdit ? data.status : 'Draft'}</span></div>
        </div>
        <div className="form-row">
          <div className="field"><label>Gudang Asal *</label>
            <select className="select" defaultValue={isEdit ? data.asal : ''}>
              <option value="">— Pilih gudang —</option>
              {GUDANG.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="field"><label>Gudang Tujuan *</label>
            <select className="select" defaultValue={isEdit ? data.tujuan : ''}>
              <option value="">— Pilih gudang —</option>
              {GUDANG.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div className="field"><label>Catatan</label><textarea className="textarea" placeholder="Alasan mutasi, referensi…"/></div>

        <h4 style={{marginTop:14}}>Item yang Dimutasi <span style={{float:'right', fontWeight:400, fontSize:11.5, textTransform:'none', letterSpacing:0, color:'var(--text-3)'}}>{lines.length} baris</span></h4>
        <div className="line-items">
          <table>
            <thead>
              <tr>
                <th style={{width:'45%'}}>Nama Barang</th>
                <th>Kode</th>
                <th>Satuan</th>
                <th className="num" style={{width:80}}>Qty</th>
                <th className="num">Stock Asal</th>
                <th style={{width:38}}></th>
              </tr>
            </thead>
            <tbody>
              {lines.map(l => {
                const it = typeof l.item === 'string' ? BARANG.find(b => b.name === l.item) : null;
                return (
                  <tr key={l.id}>
                    <td>
                      <select className="cell" style={{height:28, padding:'0 6px', border:'1px solid transparent', background:'transparent', borderRadius:4, width:'100%', fontSize:13}}
                        value={l.item || ''} onChange={e=>update(l.id, { item: e.target.value })}>
                        <option value="">— Pilih barang —</option>
                        {BARANG.map(b => <option key={b.code}>{b.name}</option>)}
                      </select>
                    </td>
                    <td className="mono muted" style={{padding:'0 8px', fontSize:12.5}}>{it?.code || '—'}</td>
                    <td className="muted" style={{padding:'0 8px', fontSize:12.5}}>—</td>
                    <td><input className="cell num" type="number" value={l.qty} onChange={e=>update(l.id, { qty: +e.target.value })}/></td>
                    <td className="num mono" style={{padding:'0 8px', fontSize:13, color:'var(--text-3)'}}>{it?.stock ?? '—'}</td>
                    <td><button className="btn btn-icon btn-sm del" onClick={()=>removeLine(l.id)} style={{color:'var(--text-3)'}}>{I.trash()}</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="add-row">
            <button className="btn btn-ghost btn-sm" onClick={addLine}>{I.plus()} Tambah Barang</button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function PenyesuaianModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [tipe, setTipe] = React.useState(data?.tipe || 'Plus');
  return (
    <ModalShell title={isEdit ? `Edit Penyesuaian — ${data.no}` : 'Penyesuaian Barang Baru'}
      sub={isEdit ? data.alasan : 'Sesuaikan stock barang (plus / minus)'}
      onClose={onClose} onSave={onSave}>
      <div className="form-section">
        <div className="form-row">
          <div className="field"><label>Tanggal *</label><input className="input" type="date" defaultValue="2026-04-30"/></div>
          <div className="field"><label>No. Dokumen</label><input className="input mono" defaultValue={isEdit ? data.no : 'PS26050001'} readOnly/></div>
        </div>
        <div className="field">
          <label>Gudang *</label>
          <select className="select" defaultValue={isEdit ? data.gudang : ''}>
            <option value="">— Pilih gudang —</option>
            {GUDANG.map(g=><option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Item *</label>
          <select className="select" defaultValue={isEdit ? data.item : ''}>
            <option value="">— Pilih barang —</option>
            {BARANG.map(b => <option key={b.code}>{b.name}</option>)}
          </select>
        </div>
        <div className="form-row">
          <div className="field"><label>Tipe Penyesuaian *</label>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
              <button type="button" className={`btn ${tipe==='Plus'?'btn-primary':''}`} onClick={()=>setTipe('Plus')} style={tipe==='Plus' ? {background:'var(--realisasi)', borderColor:'var(--realisasi)'} : null}>+ Plus (Tambah)</button>
              <button type="button" className={`btn ${tipe==='Minus'?'btn-primary':''}`} onClick={()=>setTipe('Minus')} style={tipe==='Minus' ? {background:'var(--danger)', borderColor:'var(--danger)'} : null}>− Minus (Kurang)</button>
            </div>
          </div>
          <div className="field"><label>Qty *</label><input className="input mono" type="number" defaultValue={isEdit ? data.qty : 0}/></div>
        </div>
        <div className="field"><label>Alasan *</label>
          <select className="select" defaultValue={isEdit ? data.alasan : ''}>
            <option value="">— Pilih alasan —</option>
            <option>Selisih audit fisik</option>
            <option>Rusak dalam transit</option>
            <option>Cacat produksi</option>
            <option>Hasil opname</option>
            <option>Pecah saat handling</option>
            <option>Hilang</option>
            <option>Lain-lain</option>
          </select>
        </div>
        <div className="field"><label>Catatan tambahan</label><textarea className="textarea"/></div>
      </div>
    </ModalShell>
  );
}

function OpnameModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const items = BARANG.slice(0, 6).map((b, i) => ({ ...b, fisik: b.stock + (i % 3 === 0 ? -1 : i % 3 === 1 ? 0 : 1) }));
  return (
    <ModalShell wide title={isEdit ? `Stock Opname — ${data.no}` : 'Mulai Opname Baru'}
      sub={isEdit ? `${data.gudang} · ${data.periode} · PIC: ${data.pic}` : 'Hitung fisik stock dan bandingkan dengan sistem'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit ? 'Simpan & Submit' : 'Mulai Opname'}>
      <div className="form-section">
        <h4>Header Opname</h4>
        <div className="form-row-3">
          <div className="field"><label>Tanggal *</label><input className="input" type="date" defaultValue="2026-04-30"/></div>
          <div className="field"><label>Periode *</label><input className="input" type="month" defaultValue="2026-04"/></div>
          <div className="field"><label>No. Opname</label><input className="input mono" defaultValue={isEdit ? data.no : 'SO26050001'} readOnly/></div>
        </div>
        <div className="form-row">
          <div className="field"><label>Gudang *</label>
            <select className="select" defaultValue={isEdit ? data.gudang : ''}>
              <option value="">— Pilih gudang —</option>
              {GUDANG.map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="field"><label>PIC *</label><input className="input" defaultValue={isEdit ? data.pic : ''} placeholder="Penanggung jawab"/></div>
        </div>

        {isEdit && (
          <>
            <h4 style={{marginTop:14}}>Hasil Opname <span style={{float:'right', fontWeight:400, fontSize:11.5, textTransform:'none', letterSpacing:0, color:'var(--text-3)'}}>{items.length} dari {data.items} item</span></h4>
            <div className="line-items">
              <table>
                <thead>
                  <tr>
                    <th style={{width:'30%'}}>Nama Barang</th>
                    <th>Kode</th>
                    <th>Lokasi</th>
                    <th className="num">Stock Sistem</th>
                    <th className="num" style={{width:90}}>Stock Fisik</th>
                    <th className="num">Selisih</th>
                    <th>Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(it => {
                    const selisih = it.fisik - it.stock;
                    return (
                      <tr key={it.code}>
                        <td style={{padding:'8px 10px'}}>{it.name}</td>
                        <td className="mono muted" style={{padding:'0 8px', fontSize:12.5}}>{it.code}</td>
                        <td className="muted" style={{padding:'0 8px', fontSize:12.5}}>{it.gudang}</td>
                        <td className="num mono" style={{padding:'0 8px'}}>{fmtNum(it.stock)}</td>
                        <td><input className="cell num" type="number" defaultValue={it.fisik}/></td>
                        <td className="num mono" style={{padding:'0 8px', color: selisih===0 ? 'var(--text-3)' : selisih<0 ? 'var(--danger)' : 'var(--realisasi)', fontWeight: selisih===0?400:600}}>
                          {selisih > 0 ? '+' : ''}{selisih}
                        </td>
                        <td><input className="cell" placeholder="—" style={{padding:'0 8px'}}/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="add-row" style={{justifyContent:'space-between', alignItems:'center'}}>
                <span className="muted" style={{fontSize:12}}>Tampilkan 6 dari {data.items} item — gunakan filter untuk navigasi.</span>
                <button className="btn btn-ghost btn-sm">Lihat Semua Item →</button>
              </div>
            </div>
          </>
        )}

        {!isEdit && (
          <div style={{padding:'14px 16px', background:'var(--primary-50)', border:'1px solid var(--primary-100)', borderRadius:8, fontSize:13, color:'var(--primary)', marginTop:8}}>
            Setelah memulai opname, sistem akan membuat snapshot stock dari gudang yang dipilih. Anda dapat menghitung fisik dan input hasilnya secara bertahap.
          </div>
        )}
      </div>
    </ModalShell>
  );
}

// ─── Inventory page wrapper ─────────────────────────────────────────────────

// Spark sub-component for inventory KPIs
function InvSpark({ data, color = 'var(--accent)' }) {
  const w = 100, h = 28, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg className="spark" width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity=".12" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function InventoryDashboard({ onOpenSub, onNavigate }) {
  const lowStock  = BARANG.filter(b => b.stock < b.minQty).length;
  const totalSku  = BARANG.length;
  const activeSku = BARANG.filter(b => b.active).length;
  const totalNilai = BARANG.reduce((s, b) => s + b.stock * b.hpp, 0);
  const pendingMut = MUTASI.filter(m => m.status === 'Pending').length;
  const pendingAdj = PENYESUAIAN.filter(p => p.status === 'Pending').length;
  const opnameRun  = OPNAME.filter(o => o.status === 'In Progress').length;

  const tiles = [
    { id:'barang',      icon:I.box(20),     title:'Katalog Barang',          desc:'Master data produk, kode, harga, stock minimum, dan kategori.', badge:`${lowStock} stock kritis`, badgeKind:'pulse', count:`${totalSku} SKU`, accent:null },
    { id:'kategori',    icon:I.list(20),    title:'Katalog Kategori Produk', desc:'Kelompokkan produk berdasarkan jenis untuk pelaporan dan filter.', badge:`${KATEGORI.length} kategori`, accent:'#7c3aed' },
    { id:'mutasi',      icon:I.truck(20),   title:'Mutasi Barang',           desc:'Pindahkan stock antar gudang dengan dokumen mutasi resmi.', badge: pendingMut > 0 ? `${pendingMut} pending` : null, badgeKind:'pulse', accent:'#0d9488' },
    { id:'penyesuaian', icon:I.refresh(20), title:'Penyesuaian Barang',      desc:'Stock adjustment plus/minus dengan alasan dan approval.', badge: pendingAdj > 0 ? `${pendingAdj} pending` : null, accent:'#b45309' },
    { id:'opname',      icon:I.zoom(20),    title:'Stock Opname',            desc:'Hitung fisik stock dan rekonsiliasi dengan data sistem.', badge: opnameRun > 0 ? `${opnameRun} berjalan` : null, badgeKind:'pulse', accent:'#0369a1' },
  ];

  return (
    <div className="page" data-screen-label="Opname — Dashboard">
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <span className="current">Opname</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Opname Workspace</h1>
          <div className="sub">Kelola master barang, kategori, mutasi gudang, penyesuaian stock, dan opname.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-sm btn-primary" onClick={()=>onOpenSub('barang')}>{I.plus()} Tambah Barang</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Total SKU</div>
          <div className="val mono">{fmtNum(totalSku)}</div>
          <div className="delta up">{activeSku} aktif</div>
          <InvSpark data={[14,15,15,16,16,17,17,18,18,totalSku]} />
        </div>
        <div className="kpi">
          <div className="lbl">Nilai Inventory</div>
          <div className="val mono">{fmtRp(totalNilai)}</div>
          <div className="delta up">▲ 3.4% vs bulan lalu</div>
          <InvSpark data={[78,82,85,88,90,92,95,98,100,104]} color="var(--realisasi)" />
        </div>
        <div className="kpi">
          <div className="lbl">Stock Kritis</div>
          <div className="val mono" style={{color: lowStock > 0 ? 'var(--danger)' : 'var(--text)'}}>{lowStock}</div>
          <div className="delta down">{lowStock} item perlu reorder</div>
          <InvSpark data={[2,3,2,4,3,5,4,5,6,lowStock]} color="#dc2626" />
        </div>
        <div className="kpi">
          <div className="lbl">Mutasi & Penyesuaian (30d)</div>
          <div className="val mono">{MUTASI.length + PENYESUAIAN.length}</div>
          <div className="delta">{pendingMut + pendingAdj} menunggu approval</div>
          <InvSpark data={[8,10,9,11,12,11,13,14,13,15]} color="#a16207" />
        </div>
      </div>

      <h3 className="section-title">Modul Opname <span className="count">{tiles.length}</span></h3>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={t.accent ? { background: t.accent + '14', color: t.accent } : null}>{t.icon}</div>
              {t.badge && <span className={`tile-badge ${t.badgeKind === 'pulse' ? 'pulse' : ''}`}>{t.badge}</span>}
            </div>
            <div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
            {t.count && <div className="tile-foot"><b style={{color:'var(--text-2)', fontWeight:600}}>{t.count}</b> {I.arrowR(11)}</div>}
          </button>
        ))}
      </div>

      <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Stock Kritis (Perlu Reorder)</h3>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {BARANG.filter(b => b.stock < b.minQty).slice(0, 6).map(b => (
              <div key={b.code} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--border)'}}>
                <div>
                  <div style={{fontSize:13, fontWeight:500}}>{b.name}</div>
                  <div style={{fontSize:11.5, color:'var(--text-3)'}} className="mono">{b.code} · {b.kategori}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="mono" style={{fontSize:13, color:'var(--danger)', fontWeight:600}}>{b.stock} / {b.minQty}</div>
                  <div style={{fontSize:11, color:'var(--text-3)'}}>stock / min</div>
                </div>
              </div>
            ))}
            {BARANG.filter(b => b.stock < b.minQty).length === 0 && (
              <div className="muted" style={{padding:'20px 0', textAlign:'center'}}>Semua stock dalam batas aman ✓</div>
            )}
          </div>
        </div>

        <div className="panel">
          <h3>Aktivitas Inventory Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Andi P.</b> menyetujui mutasi <span className="mono cell-link">MB26040007</span> · 50 pcs</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:45</div>
              <div className="ti-what"><b className="ti-who">Rini K.</b> memulai opname <span className="mono cell-link">SO26040002</span> di Gudang Utama</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 16:30</div>
              <div className="ti-what"><b className="ti-who">Budi S.</b> input penyesuaian +5 pcs Engine Oil Filter</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> mendeteksi 3 item turun di bawah min stock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryPage({ activeSub, onSubChange, onNavigate }) {
  const [modal, setModal] = React.useState(null);

  const close = () => setModal(null);
  const onSave = () => { setModal(null); window.__erpToast && window.__erpToast('Data berhasil disimpan.'); };

  if (!activeSub) return <InventoryDashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;

  return (
    <div className="page" data-screen-label={`Opname — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Opname</a><span className="sep">/</span>
        <span className="current">{INV_SUBS.find(s=>s.id===activeSub)?.label}</span>
      </div>

      {activeSub === 'barang'      && <KatalogBarang onAdd={()=>setModal({kind:'barang'})} onEdit={(d)=>setModal({kind:'barang', data:d})} />}
      {activeSub === 'kategori'    && <KatalogKategori onAdd={()=>setModal({kind:'kategori'})} onEdit={(d)=>setModal({kind:'kategori', data:d})} />}
      {activeSub === 'mutasi'      && <MutasiBarang onAdd={()=>setModal({kind:'mutasi'})} onEdit={(d)=>setModal({kind:'mutasi', data:d})} />}
      {activeSub === 'penyesuaian' && <PenyesuaianBarang onAdd={()=>setModal({kind:'penyesuaian'})} onEdit={(d)=>setModal({kind:'penyesuaian', data:d})} />}
      {activeSub === 'opname'      && <StockOpname onAdd={()=>setModal({kind:'opname'})} onEdit={(d)=>setModal({kind:'opname', data:d})} />}

      {modal?.kind === 'barang'      && <BarangModal      data={modal.data} onClose={close} onSave={onSave} />}
      {modal?.kind === 'kategori'    && <KategoriModal    data={modal.data} onClose={close} onSave={onSave} />}
      {modal?.kind === 'mutasi'      && <MutasiModal      data={modal.data} onClose={close} onSave={onSave} />}
      {modal?.kind === 'penyesuaian' && <PenyesuaianModal data={modal.data} onClose={close} onSave={onSave} />}
      {modal?.kind === 'opname'      && <OpnameModal      data={modal.data} onClose={close} onSave={onSave} />}
    </div>
  );
}

window.InventoryPage = InventoryPage;
