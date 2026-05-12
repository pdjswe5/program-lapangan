// Icon set + shared components

const I = {
  menu:    (s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  search:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/></svg>,
  bell:    (s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 1 0 4 0"/></svg>,
  help:    (s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7v.5"/><line x1="12" y1="17" x2="12" y2="17.01"/></svg>,
  settings:(s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
  chev:    (s=14, dir='down')=> {
    const r = {down:0, up:180, left:90, right:-90}[dir];
    return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform:`rotate(${r}deg)`}}><polyline points="6 9 12 15 18 9"/></svg>;
  },
  plus:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:       (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>,
  edit:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>,
  print:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  trash:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>,
  email:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  filter:  (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/></svg>,
  cal:     (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  download:(s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  refresh: (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  more:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="5"  cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  arrowL:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  copy:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  upload:  (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  // Module / nav icons
  home:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2V9z" /></svg>,
  cart:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4A2 2 0 0 0 9.7 16h9.4a2 2 0 0 0 2-1.6L23 6H6"/></svg>,
  truck:   (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="13" height="11" rx="1"/><polyline points="14 9 18 9 22 13 22 17 14 17"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/></svg>,
  box:     (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
  invoice: (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
  list:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  zoom:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  chart:   (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/></svg>,
  bank:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8 22 10 2 10 2 8 12 2"/><line x1="5" y1="10" x2="5" y2="20"/><line x1="9" y1="10" x2="9" y2="20"/><line x1="15" y1="10" x2="15" y2="20"/><line x1="19" y1="10" x2="19" y2="20"/><line x1="2" y1="22" x2="22" y2="22"/></svg>,
  users:   (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>,
  shield:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  check:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowR:  (s=12)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

// PDJ logo mark — abstract geometric (no Ford)
function BrandMark({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 8 L14 8 L20 16 L14 24 L6 24 L12 16 Z" fill={color} opacity=".95" />
      <path d="M16 8 L24 8 L26 12 L20 16 L18 12 Z" fill={color} opacity=".55" />
      <path d="M20 16 L26 20 L24 24 L18 24 Z" fill={color} opacity=".75" />
    </svg>
  );
}

// ---------- Notification data ----------
const NOTIFS_DATA = [
  { id:1, type:'approval', title:'Perlu Persetujuan',    msg:'PO-2026-0631 dari CV Bengkel Sentosa menunggu approval',   time:'14:22',          read:false },
  { id:2, type:'info',     title:'Stock Opname Selesai', msg:'SO26040002 di Gudang Utama telah selesai',                 time:'13:08',          read:false },
  { id:3, type:'warning',  title:'Stok Kritis',          msg:'4 item barang berada di bawah minimum stock',             time:'11:45',          read:false },
  { id:4, type:'approval', title:'Perlu Verifikasi',     msg:'Kas Masuk KM-2026-0412 perlu verifikasi oleh manager',    time:'09:30',          read:true  },
  { id:5, type:'info',     title:'PO Direalisasi',       msg:'PO-2026-0625 dari PT Indo Ban Prima sudah 100% diterima', time:'Kemarin · 17:30',read:true  },
  { id:6, type:'warning',  title:'Jatuh Tempo',          msg:'3 hutang supplier jatuh tempo dalam 3 hari',              time:'Kemarin · 09:12',read:true  },
];

// ---------- Top bar ----------
function TopBar({ onHome, onNavigate }) {
  // Burger menu
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const btnRef  = React.useRef(null);

  // User dropdown
  const [userOpen, setUserOpen] = React.useState(false);
  const userMenuRef = React.useRef(null);
  const userBtnRef  = React.useRef(null);

  // Notification dropdown
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [notifs, setNotifs] = React.useState(NOTIFS_DATA);
  const notifMenuRef = React.useRef(null);
  const notifBtnRef  = React.useRef(null);
  const unreadCount = notifs.filter(n => !n.read).length;

  // Smart search
  const [q, setQ]           = React.useState('');
  const [scope, setScope]   = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);

  // Outside-click: burger
  React.useEffect(() => {
    if (!menuOpen) return;
    const h = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          btnRef.current  && !btnRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  // Outside-click: user menu
  React.useEffect(() => {
    if (!userOpen) return;
    const h = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target) &&
          userBtnRef.current  && !userBtnRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [userOpen]);

  // Outside-click: notif menu
  React.useEffect(() => {
    if (!notifOpen) return;
    const h = (e) => {
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target) &&
          notifBtnRef.current  && !notifBtnRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [notifOpen]);

  // Outside-click: search
  React.useEffect(() => {
    if (!searchOpen) return;
    const h = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [searchOpen]);

  // Live search results
  const searchResults = React.useMemo(() => {
    if (q.length === 0) {
      const allMods = MODULES.filter(m => m.id !== 'home');
      return { mods: scope ? allMods.filter(m => m.id === scope) : allMods, subs: [], quick: true };
    }
    const ql = q.toLowerCase();
    const targetMods = scope ? MODULES.filter(m => m.id === scope) : MODULES;
    const mods = MODULES.filter(m => m.id !== 'home' && (!scope || m.id === scope) && m.label.toLowerCase().includes(ql));
    const subs = [];
    targetMods.forEach(m => {
      (MODULE_SUBS[m.id] || []).forEach(s => {
        if (s.label.toLowerCase().includes(ql)) {
          subs.push({ modId:m.id, subId:s.id, label:s.label, modLabel:m.label, icon:m.icon });
        }
      });
    });
    return { mods: mods.slice(0, 5), subs: subs.slice(0, 8), quick: false };
  }, [q, scope]);

  const hasResults = searchResults.mods.length > 0 || searchResults.subs.length > 0;

  const notifIcon  = t => t === 'approval' ? I.check(14)   : t === 'warning' ? I.bell(14) : I.invoice(14);
  const notifColor = t => t === 'approval' ? 'var(--realisasi)' : t === 'warning' ? 'var(--danger)' : 'var(--primary)';
  const markAllRead = () => setNotifs(prev => prev.map(n => ({...n, read:true})));

  return (
    <header className="topbar" data-screen-label="topbar">
      <div className="topbar-left" style={{position:'relative'}}>
        <button ref={btnRef} className={`menu-btn${menuOpen ? ' active' : ''}`} title="Menu" onClick={() => setMenuOpen(v => !v)}>
          {I.menu(20)}
        </button>

        {menuOpen && (
          <div className="burger-menu" ref={menuRef}>
            {MODULES.map(m => (
              <div key={m.id} className="burger-group">
                <button className="burger-module" onClick={() => { onNavigate(m.id); setMenuOpen(false); }}>
                  {m.icon(14)}<span>{m.label}</span>
                </button>
                {(MODULE_SUBS[m.id] || []).map(s => (
                  <button key={s.id} className="burger-sub" onClick={() => { onNavigate(m.id, s.id); setMenuOpen(false); }}>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        <button className="brand-mark" onClick={onHome} title="Program Lapangan — Home">
          <span className="brand-mark-glyph"><BrandMark size={18} /></span>
          <span className="brand-name">Program Lapangan<small>Manajemen Olahraga</small></span>
        </button>
      </div>

      {/* Smart search */}
      <div className="topbar-search" ref={searchRef} style={{position:'relative'}}>
        <select className="scope" value={scope} onChange={e => { setScope(e.target.value); setSearchOpen(true); }}>
          <option value="">Semua Modul</option>
          {MODULES.filter(m => m.id !== 'home').map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
        <input
          placeholder="Cari modul, sub menu…"
          value={q}
          onChange={e => { setQ(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
        />
        <button className="search-icon" title="Search">{I.search(15)}</button>

        {searchOpen && (
          <div className="search-results">
            {!hasResults && q.length > 0 && <div className="search-no-result">Tidak ada hasil untuk "<b>{q}</b>"</div>}
            {searchResults.mods.length > 0 && (
              <>
                <div className="search-result-group">{searchResults.quick ? 'Akses Cepat' : 'Modul'}</div>
                {searchResults.mods.map(m => (
                  <button key={m.id} className="search-result-item" onClick={() => { onNavigate(m.id); setQ(''); setSearchOpen(false); }}>
                    <span className="sri-icon" style={{color:'var(--primary)'}}>{m.icon(14)}</span>
                    <span className="sri-label">{m.label}</span>
                    <span className="sri-badge">Modul</span>
                  </button>
                ))}
              </>
            )}
            {searchResults.subs.length > 0 && (
              <>
                <div className="search-result-group">Sub Menu</div>
                {searchResults.subs.map((r,i) => (
                  <button key={i} className="search-result-item" onClick={() => { onNavigate(r.modId, r.subId); setQ(''); setSearchOpen(false); }}>
                    <span className="sri-icon" style={{color:'var(--text-3)'}}>{r.icon(14)}</span>
                    <span className="sri-label">{r.label}</span>
                    <span className="sri-badge">{r.modLabel}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <div className="topbar-right" style={{position:'relative'}}>
        <button className="icon-btn" title="Bantuan">{I.help()}</button>

        {/* Notification button + dropdown */}
        <button ref={notifBtnRef} className={`icon-btn${notifOpen ? ' active' : ''}`} title="Notifikasi"
          style={{position:'relative'}} onClick={() => setNotifOpen(v => !v)}>
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          {I.bell()}
        </button>

        {notifOpen && (
          <div className="notif-menu" ref={notifMenuRef}>
            <div className="notif-menu-header">
              <span style={{fontWeight:600, fontSize:13}}>Notifikasi</span>
              {unreadCount > 0 && (
                <button className="notif-mark-read" onClick={markAllRead}>Tandai semua dibaca</button>
              )}
            </div>
            <div className="notif-list">
              {notifs.map(n => (
                <div key={n.id} className={`notif-item${n.read ? '' : ' unread'}`}>
                  <div className="notif-item-icon" style={{color: notifColor(n.type)}}>{notifIcon(n.type)}</div>
                  <div className="notif-item-body">
                    <div className="notif-item-title">{n.title}</div>
                    <div className="notif-item-msg">{n.msg}</div>
                  </div>
                  <div className="notif-item-time">{n.time}</div>
                </div>
              ))}
            </div>
            <div className="notif-menu-footer">
              <button className="btn" style={{width:'100%', justifyContent:'center', fontSize:12.5}}>Lihat semua notifikasi</button>
            </div>
          </div>
        )}

        {/* Avatar + user menu */}
        <button ref={userBtnRef} className={`avatar-btn${userOpen ? ' active' : ''}`} title="Administrator"
          onClick={() => setUserOpen(v => !v)}>AD</button>

        {userOpen && (
          <div className="user-menu" ref={userMenuRef}>
            <div className="user-menu-header">
              <div style={{fontWeight:600, fontSize:13}}>Administrator</div>
              <div style={{fontSize:11.5, color:'var(--text-3)', marginTop:1}}>Program Lapangan</div>
            </div>
            <hr className="user-menu-divider" />
            <button className="user-menu-item" onClick={()=>{ onNavigate('admin','profil'); setUserOpen(false); }}>
              {I.settings(14)} Pengaturan Akun
            </button>
            <button className="user-menu-item" onClick={()=>{ window.__erpToast&&window.__erpToast('Fitur ubah password belum tersedia.'); setUserOpen(false); }}>
              {I.edit(14)} Ubah Password
            </button>
            <hr className="user-menu-divider" />
            <button className="user-menu-item user-menu-danger" onClick={()=>{ window.__erpToast&&window.__erpToast('Anda telah keluar.'); setUserOpen(false); }}>
              {I.arrowR(14)} Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// ---------- Module nav ----------
const MODULES = [
  { id: 'home',       label: 'Home',        icon: I.home   },
  { id: 'so',         label: 'Booking Order',          icon: I.cal    },
  { id: 'jual',       label: 'Jual',        icon: I.cart   },
  { id: 'beli',       label: 'Beli',        icon: I.truck  },
  { id: 'kasbank',    label: 'Kas Bank',    icon: I.bank   },
  { id: 'bagihasil',  label: 'Bagi Hasil',  icon: I.users  },
  { id: 'importayo',  label: 'Import AYO',  icon: I.upload },
  { id: 'opname',     label: 'Opname',      icon: I.box    },
  { id: 'aset',       label: 'Aset',        icon: I.invoice},
  { id: 'penyusutan', label: 'Penyusutan',  icon: I.chart  },
];

function ModuleNav({ active, onChange }) {
  return (
    <nav className="modnav">
      {MODULES.map(m => (
        <button key={m.id} className={active === m.id ? 'active' : ''} onClick={() => onChange(m.id)}>
          <span className="mod-icon">{m.icon(15)}</span>
          {m.label}
        </button>
      ))}
    </nav>
  );
}

// ---------- Multi-tab nav (Chrome-style tab groups) ----------
const MODULE_SUBS = {
  home:       [],
  so:         [
    { id:'list',  label:'Daftar Booking' },
    { id:'baru',  label:'Booking Baru'   },
  ],
  jual:       [
    { id:'order', label:'Order Penjualan' },
    { id:'nota',  label:'Nota Penjualan'  },
  ],
  beli:       [
    { id:'pemasok', label:'Katalog Pemasok' },
    { id:'order',   label:'Order Pembelian' },
    { id:'nota',    label:'Nota Pembelian'  },
  ],
  kasbank:    [
    { id:'kbg', label:'Kas, Bank & Giro' },
    { id:'km',  label:'Kas Masuk'        },
    { id:'kk',  label:'Kas Keluar'       },
    { id:'bm',  label:'Bank Masuk'       },
    { id:'bk',  label:'Bank Keluar'      },
    { id:'tm',  label:'Transfer Masuk'   },
    { id:'tk',  label:'Transfer Keluar'  },
    { id:'gm',  label:'Giro Masuk'       },
    { id:'gk',  label:'Giro Keluar'      },
    { id:'pp',  label:'Pelunasan Piutang'},
    { id:'ph',  label:'Pelunasan Hutang' },
  ],
  bagihasil:  [
    { id:'hitung',  label:'Hitung Bagi Hasil'  },
    { id:'riwayat', label:'Riwayat Bagi Hasil'  },
  ],
  importayo:  [],
  opname:     [
    { id:'stok',        label:'Katalog Stok'       },
    { id:'opname',      label:'Stock Opname'        },
    { id:'mutasi',      label:'Mutasi Barang'       },
    { id:'penyesuaian', label:'Penyesuaian Barang'  },
  ],
  aset:       [
    { id:'katalog', label:'Katalog Aset' },
  ],
  penyusutan: [
    { id:'hitung', label:'Hitung Penyusutan' },
  ],
};

const GROUP_COLORS = {
  home:'#6366f1', so:'#0ea5e9', jual:'#10b981', beli:'#f59e0b',
  kasbank:'#ec4899', bagihasil:'#8b5cf6', importayo:'#14b8a6',
  opname:'#64748b', aset:'#ef4444', penyusutan:'#a16207',
};

function MultiTabNav({ tabGroups, activeGroup, onGroupClick, onTabClick, onTabClose, onToggleCollapse, moduleOrder, onReorderGroups, onReorderSubTabs }) {
  const dragGroupRef = React.useRef(null);
  const dragSubRef   = React.useRef(null);

  const orderedModules = moduleOrder
    ? moduleOrder.map(id => MODULES.find(m => m.id === id)).filter(Boolean)
    : MODULES;

  return (
    <nav className="multitab-nav">
      {orderedModules.map(m => {
        const group = tabGroups[m.id] || { openSubs: [], activeSub: null, collapsed: false };
        const isActiveGroup = activeGroup === m.id;
        const color = GROUP_COLORS[m.id];
        const hasSubs = group.openSubs.length > 0;

        return (
          <div
            key={m.id}
            className={`tab-group${isActiveGroup ? ' active' : ''}${group.collapsed ? ' collapsed' : ''}`}
            draggable={true}
            onDragStart={e => {
              if (dragSubRef.current) { e.preventDefault(); return; }
              dragGroupRef.current = m.id;
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={e => {
              if (dragSubRef.current || !dragGroupRef.current || dragGroupRef.current === m.id) return;
              e.preventDefault();
              e.currentTarget.classList.add('drag-over');
            }}
            onDragLeave={e => { e.currentTarget.classList.remove('drag-over'); }}
            onDrop={e => {
              e.currentTarget.classList.remove('drag-over');
              if (dragSubRef.current || !dragGroupRef.current || dragGroupRef.current === m.id) return;
              e.preventDefault();
              onReorderGroups && onReorderGroups(dragGroupRef.current, m.id);
              dragGroupRef.current = null;
            }}
            onDragEnd={() => {
              dragGroupRef.current = null;
              document.querySelectorAll('.tab-group.drag-over').forEach(el => el.classList.remove('drag-over'));
            }}
          >
            <button
              className="tab-group-label"
              onClick={() => onGroupClick(m.id)}
              title={m.label}
            >
              <span className="mod-icon">{m.icon(13)}</span>
              <span>{m.label}</span>
              {hasSubs && group.collapsed && (
                <span style={{
                  fontSize:10, fontWeight:700, lineHeight:1,
                  background: 'var(--primary)', color:'#fff',
                  borderRadius:10, padding:'2px 5px', marginLeft:2,
                }}>
                  {group.openSubs.length}
                </span>
              )}
              {hasSubs && (
                <span
                  className="group-collapse-btn"
                  onClick={e => { e.stopPropagation(); onToggleCollapse(m.id); }}
                  title={group.collapsed ? 'Expand' : 'Collapse'}
                >
                  {I.chev(10, group.collapsed ? 'right' : 'down')}
                </span>
              )}
            </button>

            <div className={`tab-group-subs${group.openSubs.length === 0 ? ' empty' : ''}${group.collapsed ? ' collapsed' : ''}`}>
              {group.openSubs.map((subId, subIdx) => {
                const subs = MODULE_SUBS[m.id] || [];
                const sub = subs.find(s => s.id === subId);
                if (!sub) return null;
                const isActiveSub = isActiveGroup && group.activeSub === subId;
                return (
                  <button
                    key={subId}
                    className={`sub-tab${isActiveSub ? ' active' : ''}`}
                    draggable={true}
                    onClick={() => onTabClick(m.id, subId)}
                    style={{ '--group-color': color }}
                    onDragStart={e => {
                      e.stopPropagation();
                      dragSubRef.current = { modId: m.id, fromIdx: subIdx };
                      e.dataTransfer.effectAllowed = 'move';
                      e.currentTarget.classList.add('dragging');
                    }}
                    onDragOver={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      e.currentTarget.classList.add('drag-over');
                    }}
                    onDragLeave={e => { e.currentTarget.classList.remove('drag-over'); }}
                    onDrop={e => {
                      e.stopPropagation();
                      e.currentTarget.classList.remove('drag-over');
                      if (!dragSubRef.current || dragSubRef.current.modId !== m.id) return;
                      e.preventDefault();
                      const { fromIdx } = dragSubRef.current;
                      if (fromIdx !== subIdx) onReorderSubTabs && onReorderSubTabs(m.id, fromIdx, subIdx);
                      dragSubRef.current = null;
                    }}
                    onDragEnd={e => {
                      e.currentTarget.classList.remove('dragging');
                      document.querySelectorAll('.sub-tab.drag-over').forEach(el => el.classList.remove('drag-over'));
                      dragSubRef.current = null;
                    }}
                  >
                    <span>{sub.label}</span>
                    <span
                      className="tab-close"
                      onClick={e => { e.stopPropagation(); onTabClose(m.id, subId); }}
                      title="Tutup tab"
                    >
                      {I.x(10)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

// ---------- Toast ----------
function Toast({ msg, kind = 'success' }) {
  if (!msg) return null;
  return <div className={`toast ${kind}`}>{kind==='success' ? I.check() : null}{msg}</div>;
}

Object.assign(window, { I, BrandMark, TopBar, ModuleNav, MODULES, Toast, MultiTabNav, MODULE_SUBS, GROUP_COLORS });
