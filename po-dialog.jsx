// "Tambah Order Baru" dialog

function NewPODialog({ onClose, onSave }) {
  const today = '30-04-2026';
  const [date, setDate] = React.useState('2026-04-30');
  const [supplier, setSupplier] = React.useState('');
  const [ref, setRef] = React.useState('');
  const [top, setTop] = React.useState(14);
  const [due, setDue] = React.useState('2026-05-14');
  const [notes, setNotes] = React.useState('');
  const [ppn, setPpn] = React.useState(11);
  const [ppnMode, setPpnMode] = React.useState('Exclude');
  const [discPct, setDiscPct] = React.useState(0);
  const [tab, setTab] = React.useState('stock');

  const [lines, setLines] = React.useState([
    { id: 1, item: ITEMS[1], qty: 4, realized: 0, disc: 0, desc: '' },
    { id: 2, item: ITEMS[4], qty: 6, realized: 0, disc: 5, desc: '' },
  ]);

  const addLine = () => {
    setLines(ls => [...ls, { id: Date.now(), item: null, qty: 1, realized: 0, disc: 0, desc: '' }]);
  };
  const updateLine = (id, patch) => {
    setLines(ls => ls.map(l => l.id === id ? { ...l, ...patch } : l));
  };
  const removeLine = (id) => setLines(ls => ls.filter(l => l.id !== id));

  const lineTotal = (l) => {
    if (!l.item) return 0;
    return l.qty * l.item.price * (1 - l.disc/100);
  };
  const subtotal = lines.reduce((s, l) => s + lineTotal(l), 0);
  const discRp = subtotal * discPct / 100;
  const dpp = subtotal - discRp;
  const ppnRp = ppnMode === 'Exclude' ? Math.round(dpp * ppn/100) : 0;
  const total = dpp + ppnRp;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>Tambah Order Pembelian Baru</h2>
            <div className="sub">Lengkapi informasi general, tambahkan item, lalu simpan order.</div>
          </div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="form-section">
              <h4>Informasi Umum</h4>
              <div className="form-row">
                <div className="field">
                  <label>Tanggal Bukti</label>
                  <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
                </div>
                <div className="field">
                  <label>No. Referensi</label>
                  <input className="input" placeholder="REF-XXX-NNNN" value={ref} onChange={e=>setRef(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>Supplier (Pemasok)</label>
                <select className="select" value={supplier} onChange={e=>setSupplier(e.target.value)}>
                  <option value="">— Pilih Supplier —</option>
                  {SUPPLIERS.map(s => <option key={s.code} value={s.code}>{s.name} · {s.city}</option>)}
                </select>
              </div>
              <div className="form-row-3">
                <div className="field">
                  <label>TOP (Hari)</label>
                  <input className="input" type="number" value={top} onChange={e=>setTop(+e.target.value)} />
                </div>
                <div className="field" style={{gridColumn:'span 2'}}>
                  <label>Jatuh Tempo</label>
                  <input className="input" type="date" value={due} onChange={e=>setDue(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>Catatan</label>
                <textarea className="textarea" placeholder="Catatan internal untuk order ini…" value={notes} onChange={e=>setNotes(e.target.value)} />
              </div>

              <h4 style={{marginTop:18}}>Item Order
                <span style={{float:'right', fontWeight:400, fontSize:11.5, textTransform:'none', letterSpacing:0, color:'var(--text-3)'}}>{lines.length} baris</span>
              </h4>

              <div className="tabs-pills" style={{marginBottom:0}}>
                <button className={tab==='stock' ? 'active' : ''} onClick={()=>setTab('stock')}>Stock / Sparepart</button>
                <button className={tab==='other' ? 'active' : ''} onClick={()=>setTab('other')}>Biaya Lain</button>
              </div>

              <div className="line-items">
                <table>
                  <thead>
                    <tr>
                      <th style={{width:'26%'}}>Nama Barang</th>
                      <th>Kode</th>
                      <th className="num" style={{width:70}}>Jumlah</th>
                      <th className="realisasi-h num" style={{width:80}}>Realisasi</th>
                      <th style={{width:70}}>Satuan</th>
                      <th className="num">Harga Rp</th>
                      <th className="num" style={{width:70}}>Disc %</th>
                      <th className="num">Total Rp</th>
                      <th style={{width:38}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.length === 0 && (
                      <tr><td colSpan={9} className="empty">Belum ada item. Klik "+ Tambah Barang" untuk mulai.</td></tr>
                    )}
                    {lines.map(l => (
                      <tr key={l.id}>
                        <td>
                          <select className="cell" style={{height:28, padding:'0 6px', border:'1px solid transparent', background:'transparent', borderRadius:4, width:'100%', fontSize:13}}
                                  value={l.item?.code || ''}
                                  onChange={e=>updateLine(l.id, { item: ITEMS.find(it=>it.code===e.target.value) })}>
                            <option value="">— Pilih Barang —</option>
                            {ITEMS.map(it => <option key={it.code} value={it.code}>{it.name}</option>)}
                          </select>
                        </td>
                        <td className="mono muted" style={{padding:'0 8px', fontSize:12.5}}>{l.item?.code || '—'}</td>
                        <td><input className="cell num" type="number" value={l.qty} onChange={e=>updateLine(l.id, { qty: +e.target.value })}/></td>
                        <td className="realisasi-cell">{l.realized}</td>
                        <td className="muted" style={{padding:'0 8px', fontSize:12.5}}>{l.item?.unit || '—'}</td>
                        <td className="num mono" style={{padding:'0 8px', fontSize:13}}>{l.item ? fmtNum(l.item.price) : '—'}</td>
                        <td><input className="cell num" type="number" value={l.disc} onChange={e=>updateLine(l.id, { disc: +e.target.value })}/></td>
                        <td className="num mono" style={{padding:'0 8px', fontSize:13, fontWeight:500}}>{fmtNum(Math.round(lineTotal(l)))}</td>
                        <td><button className="btn btn-icon btn-sm del" onClick={()=>removeLine(l.id)} style={{color:'var(--text-3)'}}>{I.trash()}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="add-row">
                  <button className="btn btn-ghost btn-sm" onClick={addLine}>{I.plus()} Tambah Barang</button>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div>
              <h4 style={{margin:'0 0 12px', fontSize:11.5, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--text-3)', paddingBottom:8, borderBottom:'1px solid var(--border)'}}>Ringkasan</h4>
              <div className="totals-card">
                <div className="row">
                  <span>Subtotal DPP</span>
                  <span className="v mono">{fmtRp(subtotal)}</span>
                </div>
                <div className="row disc">
                  <span style={{display:'flex', alignItems:'center', gap:8}}>
                    Diskon
                    <input className="input" type="number" value={discPct} onChange={e=>setDiscPct(+e.target.value)}
                           style={{width:62, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}} /> %
                  </span>
                  <span className="v mono">−{fmtRp(Math.round(discRp))}</span>
                </div>
                <div className="row muted">
                  <span>DPP</span>
                  <span className="v mono">{fmtRp(Math.round(dpp))}</span>
                </div>
                <div className="row">
                  <span style={{display:'flex', alignItems:'center', gap:8}}>
                    PPN
                    <input className="input" type="number" value={ppn} onChange={e=>setPpn(+e.target.value)}
                           style={{width:50, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}} /> %
                    <select className="select" value={ppnMode} onChange={e=>setPpnMode(e.target.value)}
                            style={{width:90, height:26, padding:'0 6px', fontSize:12.5}}>
                      <option>Exclude</option>
                      <option>Include</option>
                    </select>
                  </span>
                  <span className="v mono" style={{color:'var(--accent)'}}>{fmtRp(ppnRp)}</span>
                </div>
                <div className="row total">
                  <span>Total</span>
                  <span className="v mono">{fmtRp(Math.round(total))}</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:14, fontSize:11.5, color:'var(--text-3)', borderTop:'1px solid var(--border)', paddingTop:12}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}><span>Item count</span><span>{lines.length}</span></div>
                  <div style={{display:'flex', justifyContent:'space-between'}}><span>Total qty</span><span>{lines.reduce((s,l)=>s+l.qty,0)}</span></div>
                  <div style={{display:'flex', justifyContent:'space-between'}}><span>Mata uang</span><span>IDR</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}>
            <kbd>⌘</kbd> + <kbd>S</kbd> untuk simpan · <kbd>Esc</kbd> untuk batal
          </div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn">Simpan sebagai Draft</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} Simpan Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.NewPODialog = NewPODialog;
