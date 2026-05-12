// PO Detail page

function DetailHeader({ po, onBack }) {
  return (
    <div className="detail-head">
      <div style={{display:'flex', alignItems:'center', gap:14}}>
        <button className="btn btn-icon" onClick={onBack} title="Kembali">{I.arrowL()}</button>
        <div>
          <div className="title-row">
            <h2 className="mono">{po.no}</h2>
            <StatusPill s={po.status} />
          </div>
          <div className="meta">
            <span><b>Dibuat:</b> {po.date}</span>
            <span>·</span>
            <span><b>Jatuh tempo:</b> {po.due}</span>
            <span>·</span>
            <span><b>Supplier:</b> {po.supplier}</span>
          </div>
        </div>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn">{I.copy()} Duplikat</button>
        <button className="btn">{I.print()} Print</button>
        <button className="btn">{I.email()} Email Supplier</button>
        <button className="btn btn-primary">{I.edit()} Edit Order</button>
      </div>
    </div>
  );
}

function PODetail({ po, onBack }) {
  const [tab, setTab] = React.useState('details');
  const supp = SUPPLIERS.find(s => s.name === po.supplier) || SUPPLIERS[0];

  // Fabricate line items deterministically from po
  const seed = parseInt(po.no.slice(-2), 10) || 1;
  const lines = ITEMS.slice(seed % 4, (seed % 4) + Math.min(po.items, 5)).map((it, i) => {
    const qty = ((seed * (i+1)) % 6) + 2;
    const realized = po.status === 'Realisasi' ? qty : (po.status === 'Partial' ? Math.floor(qty/2) : 0);
    const disc = ((seed + i*3) % 4) * 2.5;
    const subtotal = qty * it.price;
    const discRp = subtotal * disc / 100;
    return { ...it, qty, realized, disc, total: subtotal - discRp };
  });
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const ppn = Math.round(subtotal * 0.11);

  return (
    <div className="page" data-screen-label="04 PO Detail">
      <div className="crumbs">
        <a>Home</a><span className="sep">/</span>
        <a>Purchase</a><span className="sep">/</span>
        <a onClick={onBack} style={{cursor:'pointer'}}>Purchase Orders</a>
        <span className="sep">/</span>
        <span className="current mono">{po.no}</span>
      </div>

      <DetailHeader po={po} onBack={onBack} />

      <div className="tabs-pills">
        {[
          {id:'details', l:'Detail Order'},
          {id:'activity', l:'Log Aktivitas'},
          {id:'docs', l:'Dokumen Terkait'},
          {id:'gr', l:'Goods Receipt'},
          {id:'inv', l:'Invoice & Pembayaran'},
        ].map(t => (
          <button key={t.id} className={tab===t.id ? 'active' : ''} onClick={()=>setTab(t.id)}>{t.l}</button>
        ))}
      </div>

      {tab === 'details' && (
        <div className="detail-grid">
          <div className="panel-row">
            <div className="panel">
              <h3>Detail Item</h3>
              <div className="line-items">
                <table>
                  <thead>
                    <tr>
                      <th style={{width:240}}>Nama Barang</th>
                      <th>Kode</th>
                      <th className="num">Jumlah</th>
                      <th className="realisasi-h num">Realisasi</th>
                      <th>Satuan</th>
                      <th className="num">Harga Rp</th>
                      <th className="num">Diskon %</th>
                      <th className="num">Total Rp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map(l => (
                      <tr key={l.code}>
                        <td style={{padding:'10px 10px'}}>{l.name}</td>
                        <td className="mono muted">{l.code}</td>
                        <td className="num mono">{l.qty}</td>
                        <td className="realisasi-cell">{l.realized}</td>
                        <td className="muted">{l.unit}</td>
                        <td className="num mono">{fmtNum(l.price)}</td>
                        <td className="num mono">{l.disc.toFixed(1)}%</td>
                        <td className="num mono" style={{fontWeight:500}}>{fmtNum(l.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <h3>Catatan & Term</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
                <div>
                  <div style={{color:'var(--text-3)', fontSize:12, marginBottom:6}}>Catatan Internal</div>
                  <div style={{fontSize:13, lineHeight:1.6}}>Order rutin bulanan untuk stok service. Mohon konfirmasi ketersediaan via WhatsApp sebelum pengiriman.</div>
                </div>
                <div>
                  <div style={{color:'var(--text-3)', fontSize:12, marginBottom:6}}>Term of Payment</div>
                  <div style={{fontSize:13, lineHeight:1.6}}><b>Net 14 hari</b> setelah penerimaan barang lengkap. Transfer ke rekening BCA terdaftar.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-row">
            <div className="panel">
              <h3>Informasi Supplier</h3>
              <dl className="kv-grid">
                <dt>Nama</dt><dd>{supp.name}</dd>
                <dt>Kode</dt><dd className="mono">{supp.code}</dd>
                <dt>Kota</dt><dd>{supp.city}</dd>
                <dt>Telepon</dt><dd className="mono">{supp.phone}</dd>
                <dt>No. Referensi</dt><dd className="mono">{po.ref}</dd>
              </dl>
            </div>

            <div className="panel">
              <h3>Detail Pengiriman</h3>
              <dl className="kv-grid">
                <dt>Gudang Tujuan</dt><dd>Gudang Pusat — Jakarta</dd>
                <dt>Alamat</dt><dd>Jl. Industri Raya Blok 12, Cakung</dd>
                <dt>Estimasi Tiba</dt><dd className="mono">{po.due}</dd>
                <dt>Metode</dt><dd>Truk Supplier</dd>
              </dl>
            </div>

            <div className="panel">
              <h3>Ringkasan Total</h3>
              <div style={{display:'flex', flexDirection:'column', gap:8, fontSize:13}}>
                <div style={{display:'flex', justifyContent:'space-between'}}><span className="muted">Subtotal DPP</span><span className="mono">{fmtRp(subtotal)}</span></div>
                <div style={{display:'flex', justifyContent:'space-between'}}><span className="muted">PPN 11%</span><span className="mono">{fmtRp(ppn)}</span></div>
                <div style={{borderTop:'1px dashed var(--border)', marginTop:6, paddingTop:10, display:'flex', justifyContent:'space-between', fontSize:15, fontWeight:600}}>
                  <span>Total</span><span className="mono" style={{color:'var(--primary)'}}>{fmtRp(subtotal + ppn)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'activity' && (
        <div className="panel">
          <h3>Log Aktivitas</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">30-04-2026 · 14:22</div>
              <div className="ti-what"><b className="ti-who">Andi P.</b> menyetujui order — status berubah dari <i>Pending Approval</i> menjadi <i>Approved</i></div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">30-04-2026 · 11:08</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> mengirim PO ke email supplier ({supp.name})</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">30-04-2026 · 10:45</div>
              <div className="ti-what"><b className="ti-who">Rini K.</b> mengirim ke approver — status menjadi <i>Pending Approval</i></div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">30-04-2026 · 09:30</div>
              <div className="ti-what"><b className="ti-who">Rini K.</b> menambah {po.items} item line</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">30-04-2026 · 09:12</div>
              <div className="ti-what"><b className="ti-who">Rini K.</b> membuat draft order ini</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'docs' && (
        <div className="panel">
          <h3>Dokumen Terkait</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:12}}>
            {[
              ['Quotation Q-2026-1108.pdf', 'PDF · 245 KB', '28-04-2026'],
              ['Email Konfirmasi Supplier.eml', 'Email · 12 KB', '29-04-2026'],
              ['Spec Sheet — Brake Pad.pdf', 'PDF · 1.2 MB', '28-04-2026'],
              ['Photo Realisasi Receive.jpg', 'Image · 2.4 MB', '30-04-2026'],
            ].map(([n,t,d]) => (
              <div key={n} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 14px', border:'1px solid var(--border)', borderRadius:8}}>
                <div style={{width:36, height:36, borderRadius:8, background:'var(--primary-50)', color:'var(--primary)', display:'grid', placeItems:'center'}}>{I.invoice(18)}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{n}</div>
                  <div style={{fontSize:11.5, color:'var(--text-3)'}}>{t} · {d}</div>
                </div>
                <button className="btn btn-icon btn-sm">{I.download()}</button>
              </div>
            ))}
            <button className="btn" style={{justifyContent:'center', minHeight:64, borderStyle:'dashed'}}>{I.plus()} Upload Dokumen</button>
          </div>
        </div>
      )}

      {tab === 'gr' && (
        <div className="panel">
          <h3>Goods Receipt</h3>
          {po.status === 'Realisasi' || po.status === 'Partial' ? (
            <div>Lihat tabel realisasi di tab <a className="cell-link" onClick={()=>setTab('details')}>Detail Order</a> — kolom <b>Realisasi</b> menunjukkan jumlah yang sudah diterima per line.</div>
          ) : (
            <div className="muted" style={{padding:'40px 0', textAlign:'center'}}>Belum ada penerimaan barang untuk order ini.</div>
          )}
        </div>
      )}

      {tab === 'inv' && (
        <div className="panel">
          <h3>Invoice & Pembayaran</h3>
          <div className="muted" style={{padding:'40px 0', textAlign:'center'}}>Belum ada invoice supplier yang di-match ke order ini.</div>
        </div>
      )}
    </div>
  );
}

window.PODetail = PODetail;
