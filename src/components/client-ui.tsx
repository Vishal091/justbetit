"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import type {Article,FooterLink,NavLink,ResearchTool,SiteSettings,SportCategory} from "@/sanity/content";
import {formatDate} from "@/lib/format-date";
function SiteHref({item,children,className,onClick}:{item:NavLink|FooterLink;children:React.ReactNode;className?:string;onClick?:()=>void}){
 if(item.external||!item.href.startsWith("/"))return <a href={item.href} className={className} target={item.external?"_blank":undefined} rel={item.external?"noopener noreferrer":undefined} onClick={onClick}>{children}</a>;
 return <Link href={item.href} className={className} onClick={onClick}>{children}</Link>;
}
export function SiteHeader({sports,settings}:{sports:SportCategory[];settings:SiteSettings}){
 const[open,setOpen]=useState(false);
 return <header className="site-header"><div className="shell nav-wrap">
  <Link className="brand" href="/" aria-label={settings.siteName+" home"} onClick={()=>setOpen(false)}><span className="brand-mark">J<span>/</span></span><span className="brand-name">JUST<span>BET</span>IT</span></Link>
  <button type="button" className="menu-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={()=>setOpen(v=>!v)}>{open?"×":"☰"}</button>
  <nav id="primary-navigation" className={open?"nav open":"nav"} aria-label="Main navigation">
   {settings.navLinks.filter(x=>x.enabled!==false).sort((a,b)=>(a.order||0)-(b.order||0)).map(item=>item.label.toLowerCase()==="sports"?<div className="nav-sports" key={item.label}><SiteHref item={item} onClick={()=>setOpen(false)}>{item.label}</SiteHref><div className="sports-dropdown">{sports.map(s=><Link key={s._id} href={"/sports/"+s.slug} onClick={()=>setOpen(false)}>{s.title}</Link>)}</div></div>:<SiteHref item={item} key={item.label} onClick={()=>setOpen(false)}>{item.label}{item.external?" ↗":""}</SiteHref>)}
  </nav>
  <div className="nav-actions"><a className="btn btn-ghost" href={settings.propalyticsUrl} target="_blank" rel="noopener noreferrer">Log in ↗</a><a className="btn btn-primary" href={settings.propalyticsUrl} target="_blank" rel="noopener noreferrer">Explore Propalytics ↗</a></div>
 </div></header>;
}
export function ArticleGrid({articles,sports,showSearch=true}:{articles:Article[];sports:SportCategory[];showSearch?:boolean}){
 const[sport,setSport]=useState("all"),[query,setQuery]=useState("");
 const visible=useMemo(()=>articles.filter(a=>(sport==="all"||a.sportSlug===sport)&&[a.title,a.excerpt,a.sport,a.category,a.author].join(" ").toLowerCase().includes(query.trim().toLowerCase())),[articles,sport,query]);
 return <div className="article-browser"><div className="filter-row"><div className="filter-tabs" role="group" aria-label="Filter articles by sport">
  <button className={sport==="all"?"filter-tab active":"filter-tab"} aria-pressed={sport==="all"} type="button" onClick={()=>setSport("all")}>All coverage</button>
  {sports.map(s=><button className={sport===s.slug?"filter-tab active":"filter-tab"} aria-pressed={sport===s.slug} type="button" key={s._id} onClick={()=>setSport(s.slug)}>{s.title}</button>)}
 </div>{showSearch&&<label className="search-box"><span className="sr-only">Search articles</span><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search articles…"/></label>}</div>
 <div className="story-grid">{visible.map((a,i)=><Link className={"story-card"+(i===0?" featured":"")} href={"/articles/"+a.slug} key={a._id}>
  <div className={"story-art "+(a.sportSlug||"default")}><span className="art-word" aria-hidden="true">{(a.sport||"JBI").toUpperCase()}</span><div className="art-sport"><span/>{a.sport} / {(a.category||"ANALYSIS").toUpperCase()}</div></div>
  <div className="story-body"><div className="story-meta"><span className="badge">{a.accessLevel==="members"?"Member read":a.category||"Analysis"}</span><span>{formatDate(a.publishedAt)}</span></div><h3>{a.title}</h3><p>{a.excerpt}</p><div className="story-foot"><span className="byline">{a.author||"JUST-BET-IT STAFF"}</span><span className="arrow-circle">↗</span></div></div>
 </Link>)}</div>
 {!visible.length&&<div className="empty-state"><strong>No articles found.</strong><p>Try another sport or keyword, or publish new coverage in the CMS.</p></div>}
 </div>;
}
export function SiteFooter({settings,tools}:{settings:SiteSettings;tools:ResearchTool[]}){
 const groups=["Explore","Products","Support & legal"];
 return <footer className="site-footer"><div className="shell"><div className="footer-main">
  <div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark">J<span>/</span></span><span className="brand-name">JUST<span>BET</span>IT</span></Link><p>Sports analysis, matchup research and purpose-built data tools—organized around clarity, context and responsible use.</p><div className="social-row" aria-label="Official social profiles">{settings.socialLinks.filter(x=>x.url).map(x=><a className="social-link" key={x.network} href={x.url} target="_blank" rel="noopener noreferrer">{x.network} ↗</a>)}</div></div>
  {groups.map(group=><div className="footer-col" key={group}><h4>{group}</h4>{settings.footerLinks.filter(x=>x.group===group&&x.enabled!==false).sort((a,b)=>(a.order||0)-(b.order||0)).map(x=><SiteHref item={x} key={x.label}>{x.label}{x.external?" ↗":""}</SiteHref>)}{group==="Products"&&tools.filter(x=>x.status==="available"&&x.url).map(x=><a key={x._id} href={x.url} target="_blank" rel="noopener noreferrer">{x.title} ↗</a>)}</div>)}
 </div><div className="footer-bottom"><p className="disclaimer">{settings.disclaimer}</p><p className="copyright">© {new Date().getFullYear()} JUST-BET-IT</p></div></div></footer>;
}
