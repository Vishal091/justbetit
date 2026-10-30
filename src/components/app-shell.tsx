"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
const NAV=[
 {href:"/",label:"Overview",icon:"◫",section:"Workspace"},
 {href:"/daily-board",label:"Daily board",icon:"✳"},
 {href:"/edge-finder",label:"Edge finder",icon:"⌁"},
 {href:"/props",label:"Player props",icon:"◎"},
 {href:"/chat",label:"Research chat",icon:"✧",section:"Research"},
 {href:"/bankroll",label:"Bankroll lab",icon:"▥"},
 {href:"/articles",label:"Editorial",icon:"▤",section:"Content"},
 {href:"/studio",label:"CMS admin",icon:"⚙"}
];
export function AppShell({children}:{children:React.ReactNode}){
 const pathname=usePathname();const[menuOpen,setMenuOpen]=useState(false);
 const[status,setStatus]=useState<{oddsProviderConfigured:boolean;aiGatewayConfigured:boolean}|null>(null);
 useEffect(()=>{let active=true;fetch("/api/health",{cache:"no-store"}).then(r=>r.json()).then(data=>{if(active)setStatus(data);}).catch(()=>{if(active)setStatus(null);});return()=>{active=false;};},[]);
 const nav=<>{NAV.map(item=><div key={item.href}>{item.section&&<div className="sidebar-section-label">{item.section}</div>}<Link href={item.href} className={"sidebar-link"+(pathname===item.href||(item.href!=="/"&&pathname.startsWith(item.href+"/"))?" active":"")} onClick={()=>setMenuOpen(false)}><span className="sidebar-icon">{item.icon}</span><span>{item.label}</span>{item.href==="/edge-finder"&&<span className="sidebar-live-dot"/>}</Link></div>)}</>;
 return <div className="product-frame">
  <aside className="desktop-sidebar"><Link className="app-brand" href="/"><span className="app-brand-mark">J<span>.</span></span><span><strong>JUSTBETIT</strong><small>SPORTS INTELLIGENCE</small></span></Link>
   <div className="sidebar-workspace"><div className="workspace-avatar">JB</div><div><strong>Research workspace</strong><small>Markets &amp; analytics</small></div><span>⌄</span></div>
   <nav className="sidebar-nav" aria-label="Workspace navigation">{nav}</nav>
   <div className="sidebar-bottom"><div className="connection-card"><div className="connection-title"><span className={status?.oddsProviderConfigured?"connection-dot online":"connection-dot"}/>Data connections</div><div className="connection-row"><span>Odds feed</span><b>{status?status.oddsProviderConfigured?"Connected":"Setup needed":"Checking"}</b></div><div className="connection-row"><span>AI research</span><b>{status?status.aiGatewayConfigured?"Connected":"Setup needed":"Checking"}</b></div></div><div className="sidebar-footer"><span>JBI RESEARCH DESK · 2026</span><Link href="/studio">Manage site ↗</Link></div></div>
  </aside>
  {menuOpen&&<button className="mobile-overlay" aria-label="Close navigation" onClick={()=>setMenuOpen(false)}/>}
  <aside className={"mobile-sidebar"+(menuOpen?" open":"")}><div className="mobile-sidebar-head"><Link className="app-brand" href="/"><span className="app-brand-mark">J<span>.</span></span><span><strong>JUSTBETIT</strong><small>SPORTS INTELLIGENCE</small></span></Link><button type="button" onClick={()=>setMenuOpen(false)} aria-label="Close menu">×</button></div><nav className="sidebar-nav">{nav}</nav></aside>
  <div className="app-main"><header className="app-topbar"><div className="topbar-left"><button className="mobile-menu-button" onClick={()=>setMenuOpen(true)} aria-label="Open navigation">☰</button><span className="breadcrumb">Research desk <span>/</span> <b>{NAV.find(item=>item.href===pathname)?.label||"Workspace"}</b></span></div><div className="topbar-right"><span className="topbar-date">SPORTS RESEARCH / LIVE DATA</span><span className="topbar-avatar">J</span></div></header>
   <main id="main" className="app-content">{children}</main><footer className="app-footer"><span>JUST-BET-IT · Sports research and analytics</span><span>Informational tools only · No bets are placed through this site</span></footer></div>
 </div>;
}
