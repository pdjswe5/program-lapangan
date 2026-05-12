// PO List page

function StatusPill({ s }) {
  return <span className={`pill ${STATUS_CLASS[s] || 'draft'}`}>{s}</span>;
}

function POList({ onOpenDetail, onOpenNew, density }) {
  const [search, setSearch] = React.useState('');
  const [supplier, setSupplier] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [chips, setChips] = React.useState([]);
  const [selected, setSelected] = React.useState(new Set());
  const [page, setPage] = React.useState(1);
  const perPage = density === 'compact' ? 14 : (density === 'comfy' ? 8 : 10);

  const filtered = React.useMemo(() => {
    return PO_LIST.filter(po => {
      if (search) {
        const q = search.toLowerCase();
        if (!po.no.toLowerCase().includes(q) &&
            !po.supplier.toLowerCase().includes(q) &&
            !po.ref.toLowerCase().includes(q)) return false;
      }
      if (supplier && !po.supplier.toLowerCase().includes(supplier.toLowerCase())) return false;
      if (status && po.status !== status) return false;
      return true;
    });
  }, [search, supplier, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleAll = () => {
    if (selected.size === pageItems.length) setSelected(new Set());
    else setSelected(new Set(pageItems.map(p => p.no)));
  };
  const toggleOne = (no) => {
    const ns = new Set(selected);
    ns.has(no) ? ns.delete(no) : ns.add(no);
    setSelected(ns);
  };

  const addChip = (label) => {
    if (!chips.includes(label)) setChips([...chips, label]);
  };
  const onApplyFilter = () => {
    const c = [];
    if (supplier) c.push(`Supplier: ${supplier}`);
    if (status)   c.push(`Status: ${status}`);
    if (dateFrom || dateTo) c.push(`Date: ${dateFrom||'…'} → ${dateTo||'…'}`);
    setChips(c);
  };
  const clearAll = () => {
    setSearch(''); setSupplier(''); setStatus(''); setDateFrom(''); setDateTo(''); setChips([]);
  };

  const totalSum = filtered.reduce((s, p) => s + p.total, 0);

  return (
    <div className="page" data-screen-label="02 PO List">
      <div className="crumbs">
        <a>Home</a><span className="sep">/</span>
        <a>Purchase</a><span className="sep">/</span>
        <span className="current">Purchase Orders</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Daftar Order Pembelian</h1>
          <div className="sub">{filtered.length} order ditemukan · Total nilai {fmtRp(totalSum)}</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.upload()} Import</button>
          <button className="btn btn-sm">{I.download()} Export</button>
          <button className="btn btn-primary" onClick={onOpenNew}>{I.plus()} Tambah Order Baru</button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field">
            <label>Pencarian Cepat</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. Order, Supplier, atau No. Referensi…" value={search} onChange={e=>setSearch(e.target.value)} /></div>
          </div>
          <div className="field">
            <label>Supplier</label>
            <select className="select" value={supplier} onChange={e=>setSupplier(e.target.value)}>
              <option value="">Semua Supplier</option>
              {SUPPLIERS.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Rentang Tanggal</label>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
              <input className="input" type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
              <input className="input" type="date" value={dateTo}   onChange={e=>setDateTo(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Status</label>
            <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="">Semua Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={clearAll}>Reset</button>
            <button className="btn btn-primary" onClick={onApplyFilter}>{I.filter()} Cari</button>
          </div>
        </div>
        {chips.length > 0 && (
          <div className="chips">
            {chips.map((c, i) => (
              <span className="chip" key={i}>{c}<button onClick={()=>setChips(chips.filter((_,j)=>j!==i))}>{I.x(11)}</button></span>
            ))}
            <button className="btn btn-ghost btn-sm" onClick={clearAll}>Hapus semua filter</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            {selected.size > 0 ? (
              <>
                <b>{selected.size} dipilih</b>
                <button className="btn btn-sm">Approve Selected</button>
                <button className="btn btn-sm">Print Batch</button>
                <button className="btn btn-sm btn-danger">{I.trash()} Hapus</button>
              </>
            ) : (
              <>
                <b>{filtered.length}</b> baris · halaman <b>{page}</b> dari <b>{totalPages}</b>
              </>
            )}
          </div>
          <div className="table-toolbar-right">
            <button className="btn btn-icon btn-sm" title="Refresh">{I.refresh()}</button>
            <button className="btn btn-icon btn-sm" title="Settings">{I.settings(14)}</button>
            <button className="btn btn-icon btn-sm" title="More">{I.more()}</button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}>
                  <input type="checkbox" className="cb" checked={selected.size === pageItems.length && pageItems.length > 0} onChange={toggleAll}/>
                </th>
                <th>No. Order <span className="sort">↕</span></th>
                <th>Tgl. Bukti <span className="sort">↕</span></th>
                <th>Supplier</th>
                <th>No. Referensi</th>
                <th>Status</th>
                <th>Items</th>
                <th>Jth. Tempo</th>
                <th className="num">Total Rp</th>
                <th style={{width:120}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(po => (
                <tr key={po.no}
                    className={`${selected.has(po.no) ? 'selected' : ''} ${po.status === 'Realisasi' ? 'realisasi' : ''}`}
                    onClick={() => onOpenDetail(po)}>
                  <td onClick={e=>e.stopPropagation()}>
                    <input type="checkbox" className="cb" checked={selected.has(po.no)} onChange={()=>toggleOne(po.no)} />
                  </td>
                  <td className="no"><span className="cell-link mono">{po.no}</span></td>
                  <td className="mono">{po.date}</td>
                  <td>{po.supplier}</td>
                  <td className="mono muted">{po.ref}</td>
                  <td><StatusPill s={po.status} /></td>
                  <td className="mono">{po.items}</td>
                  <td className="mono">{po.due}</td>
                  <td className="num mono">{fmtRp(po.total)}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit">{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Print">{I.print()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr><td colSpan={10} style={{textAlign:'center', padding:'40px 16px', color:'var(--text-3)'}}>Tidak ada order yang cocok dengan filter Anda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <div>
            Menampilkan <b style={{color:'var(--text)'}}>{(page-1)*perPage + 1}</b>–<b style={{color:'var(--text)'}}>{Math.min(page*perPage, filtered.length)}</b> dari <b style={{color:'var(--text)'}}>{filtered.length}</b>
          </div>
          <div className="pager-pages">
            <button onClick={()=>setPage(Math.max(1, page-1))} disabled={page===1}>{I.chev(12, 'left')}</button>
            {Array.from({length: totalPages}, (_, i) => i+1).map(p => (
              <button key={p} className={p === page ? 'active' : ''} onClick={()=>setPage(p)}>{p}</button>
            ))}
            <button onClick={()=>setPage(Math.min(totalPages, page+1))} disabled={page===totalPages}>{I.chev(12, 'right')}</button>
          </div>
          <div>Tampilkan <b style={{color:'var(--text)'}}>{perPage}</b> per halaman</div>
        </div>
      </div>
    </div>
  );
}

window.POList = POList;
window.StatusPill = StatusPill;
