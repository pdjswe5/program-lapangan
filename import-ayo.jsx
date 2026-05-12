// Import AYO module — import data dari platform AYO (ayo.co.id)

const IAYO_SUBS = [
  { id:'upload', label:'Upload & Import' },
];

const AYO_PREVIEW_COLS = ['No. Transaksi', 'Tanggal', 'Lapangan', 'Divisi', 'Nama Penyewa', 'No. HP', 'Durasi (Jam)', 'Harga (Rp)', 'Status'];

const AYO_PREVIEW_DUMMY = [
  { no:'AYO-20260501-001', tgl:'01-05-2026', lapangan:'Lapangan Padel 1',    divisi:'Padel',       nama:'Andika Pratama',  hp:'0812-3456-7890', durasi:2, harga:200000, status:'Selesai'    },
  { no:'AYO-20260501-002', tgl:'01-05-2026', lapangan:'Lapangan Futsal 1',   divisi:'Futsal',      nama:'Tim Garuda FC',   hp:'0821-9876-5432', durasi:1, harga:150000, status:'Selesai'    },
  { no:'AYO-20260502-001', tgl:'02-05-2026', lapangan:'Lapangan Padel 2',    divisi:'Padel',       nama:'Komunitas Padel', hp:'0857-1122-3344', durasi:2, harga:200000, status:'Selesai'    },
  { no:'AYO-20260502-002', tgl:'02-05-2026', lapangan:'Lapangan Mini Soccer', divisi:'Mini Soccer', nama:'Bintang Muda',   hp:'0899-5566-7788', durasi:1, harga:180000, status:'Selesai'    },
  { no:'AYO-20260503-001', tgl:'03-05-2026', lapangan:'Lapangan Futsal 2',   divisi:'Futsal',      nama:'FC Nusantara',    hp:'0813-4455-6677', durasi:2, harga:300000, status:'Konfirmasi' },
  { no:'AYO-20260503-002', tgl:'03-05-2026', lapangan:'Lapangan Padel 1',    divisi:'Padel',       nama:'Reza Kurniawan',  hp:'0878-9900-1122', durasi:1, harga:100000, status:'Pending'    },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────

function ImportAYODashboard({ onOpenSub, onNavigate }) {
  return (
    <div className="page" data-screen-label="Import AYO — Dashboard">
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a>
        <span className="sep">/</span><span className="current">Import AYO</span>
      </div>
      <div className="page-head">
        <div>
          <h1>Import AYO Workspace</h1>
          <div className="sub">Import data booking dari platform AYO (ayo.co.id) ke Program Lapangan.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-primary" onClick={()=>onOpenSub('upload')}>{I.upload()} Upload File</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Terakhir Import</div><div className="val mono">01-05-2026</div><div className="delta up">berhasil</div></div>
        <div className="kpi"><div className="lbl">Total Diimport</div><div className="val mono">142</div><div className="delta up">transaksi AYO</div></div>
        <div className="kpi"><div className="lbl">Status</div><div className="val mono">Sync</div><div className="delta up">data terkini</div></div>
      </div>

      <div className="tile-grid" style={{gridTemplateColumns:'1fr', marginTop:8}}>
        <button className="tile" onClick={()=>onOpenSub('upload')}>
          <div className="tile-head">
            <div className="tile-icon-wrap" style={{background:'#14b8a614', color:'#14b8a6'}}>{I.upload(20)}</div>
            <span className="tile-badge">AYO Platform</span>
          </div>
          <div>
            <h3>Upload & Import File Excel</h3>
            <p>Drag & drop atau pilih file Excel (.xlsx/.xls) yang diunduh dari dashboard AYO — preview data sebelum import ke sistem.</p>
          </div>
        </button>
      </div>

      <div className="panel" style={{marginTop:24}}>
        <h3>Panduan Import dari AYO</h3>
        <div className="grid-responsive" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:12}}>
          {[
            { step:'1', title:'Download dari AYO', desc:'Login ke ayo.co.id → menu Laporan → Export Excel. Pilih rentang tanggal dan klik Download.', color:'#0ea5e9' },
            { step:'2', title:'Upload ke Sini',    desc:'Klik tombol "Upload File" di atas, lalu drag & drop atau pilih file .xlsx yang baru diunduh dari AYO.', color:'#8b5cf6' },
            { step:'3', title:'Validasi & Import', desc:'Preview data tampil otomatis. Klik "Validasi Data" untuk cek format, lalu "Import" untuk masukkan ke sistem.', color:'#10b981' },
          ].map(s => (
            <div key={s.step} style={{display:'flex', gap:12, alignItems:'flex-start'}}>
              <div style={{minWidth:32, height:32, borderRadius:'50%', background:s.color+'22', color:s.color, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14}}>{s.step}</div>
              <div>
                <div style={{fontWeight:600, fontSize:13, marginBottom:4}}>{s.title}</div>
                <div style={{fontSize:12.5, color:'var(--text-2)', lineHeight:1.5}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Upload & Import ──────────────────────────────────────────────────────────

function ImportAYOUpload({ onNavigate }) {
  const [dragOver, setDragOver] = React.useState(false);
  const [fileName, setFileName] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [log, setLog] = React.useState([]);
  const [importing, setImporting] = React.useState(false);
  const fileRef = React.useRef();

  const handleFile = (file) => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['xlsx','xls','csv'].includes(ext)) {
      window.__erpToast && window.__erpToast('Format tidak didukung. Gunakan file .xlsx atau .xls dari AYO.');
      return;
    }
    setFileName(file.name);
    setPreview(AYO_PREVIEW_DUMMY);
    setLog([]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleValidasi = () => {
    if (!preview) return;
    const newLog = preview.map((r,i) => ({
      row: i+2,
      no: r.no,
      status: r.status === 'Pending' ? 'warning' : 'ok',
      msg: r.status === 'Pending' ? 'Booking masih Pending — akan diimport sebagai Draft' : 'OK',
    }));
    setLog(newLog);
    window.__erpToast && window.__erpToast('Validasi selesai: ' + newLog.filter(l=>l.status==='ok').length + ' OK, ' + newLog.filter(l=>l.status==='warning').length + ' peringatan.');
  };

  const handleImport = () => {
    if (!preview) return;
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      window.__erpToast && window.__erpToast('Import berhasil! ' + preview.length + ' data dari AYO berhasil dimasukkan.');
      setLog(prev => [...prev, { row:0, no:'—', status:'ok', msg:'✓ Import selesai: ' + preview.length + ' transaksi berhasil.' }]);
    }, 1200);
  };

  const handleReset = () => {
    setFileName(null);
    setPreview(null);
    setLog([]);
    setImporting(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <>
      <div className="page-head">
        <div><h1>Upload & Import File AYO</h1><div className="sub">Import data booking dari platform AYO (ayo.co.id)</div></div>
        <div style={{display:'flex', gap:8}}>
          {preview && <button className="btn" onClick={handleReset}>Reset</button>}
        </div>
      </div>

      {!preview && (
        <div
          onDragOver={e=>{e.preventDefault();setDragOver(true);}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={handleDrop}
          onClick={()=>fileRef.current?.click()}
          style={{
            border:`2px dashed ${dragOver?'var(--accent)':'var(--border)'}`,
            borderRadius:12,
            background: dragOver ? 'var(--accent-soft)' : 'var(--bg-sub)',
            padding:'56px 32px',
            textAlign:'center',
            cursor:'pointer',
            transition:'all .15s',
            marginBottom:24,
          }}
        >
          <div style={{fontSize:36, marginBottom:12, color:'var(--text-3)'}}>{I.upload(36)}</div>
          <div style={{fontWeight:600, fontSize:15, marginBottom:6}}>Drag & drop file Excel di sini</div>
          <div style={{color:'var(--text-3)', fontSize:13, marginBottom:16}}>atau klik untuk memilih file .xlsx / .xls dari AYO</div>
          <div style={{display:'inline-flex', gap:8, alignItems:'center', background:'var(--primary)', color:'#fff', padding:'8px 18px', borderRadius:6, fontSize:13, fontWeight:600}}>
            {I.upload(14)} Pilih File
          </div>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>
        </div>
      )}

      {preview && (
        <>
          <div className="panel" style={{marginBottom:16, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{color:'var(--realisasi)'}}>{I.check(18)}</div>
              <div>
                <div style={{fontWeight:600, fontSize:13}}>{fileName}</div>
                <div style={{fontSize:12, color:'var(--text-3)'}}>{preview.length} baris data ditemukan</div>
              </div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-sm" onClick={handleValidasi}>{I.filter()} Validasi Data</button>
              <button className="btn btn-sm btn-primary" onClick={handleImport} disabled={importing}>
                {importing ? '...' : <>{I.upload()} Import</>}
              </button>
            </div>
          </div>

          <div className="table-card" style={{marginBottom:16}}>
            <div className="table-toolbar"><div className="table-toolbar-left"><b>Preview Data</b> — {preview.length} transaksi dari AYO</div></div>
            <div className="table-scroll" style={{maxHeight:280}}>
              <table className="data" style={{fontSize:12.5}}>
                <thead>
                  <tr>
                    {AYO_PREVIEW_COLS.map(c=><th key={c}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((r,i)=>(
                    <tr key={i}>
                      <td className="mono cell-link">{r.no}</td>
                      <td className="mono">{r.tgl}</td>
                      <td>{r.lapangan}</td>
                      <td><span className={`pill ${r.divisi==='Padel'?'realisasi':r.divisi==='Futsal'?'pending':'draft'}`}>{r.divisi}</span></td>
                      <td>{r.nama}</td>
                      <td className="mono muted">{r.hp}</td>
                      <td className="center mono">{r.durasi} jam</td>
                      <td className="num mono">{fmtRp(r.harga)}</td>
                      <td><span className={`pill ${r.status==='Selesai'?'realisasi':r.status==='Konfirmasi'?'pending':'draft'}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {log.length > 0 && (
            <div className="panel">
              <h3>Log Validasi / Import</h3>
              <div style={{fontFamily:'var(--font-mono)', fontSize:12, display:'flex', flexDirection:'column', gap:4, marginTop:8, maxHeight:180, overflowY:'auto'}}>
                {log.map((l,i)=>(
                  <div key={i} style={{display:'flex', gap:10, color: l.status==='ok'?'var(--realisasi)':l.status==='warning'?'#d97706':'var(--danger)'}}>
                    <span style={{minWidth:60}}>Baris {l.row||'—'}</span>
                    <span style={{minWidth:180, color:'var(--text-2)'}}>{l.no}</span>
                    <span>{l.status==='ok'?'✓':l.status==='warning'?'⚠':'✗'} {l.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ImportAYOPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <ImportAYODashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;
  return (
    <div className="page" data-screen-label={`Import AYO — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={()=>onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Import AYO</a><span className="sep">/</span>
        <span className="current">{IAYO_SUBS.find(s=>s.id===activeSub)?.label || activeSub}</span>
      </div>
      {activeSub==='upload' && <ImportAYOUpload onNavigate={onNavigate} />}
    </div>
  );
}

window.ImportAYOPage = ImportAYOPage;
