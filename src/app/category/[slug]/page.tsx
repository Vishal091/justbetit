import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArticleGrid} from "@/components/client-ui";
import {getArticles,getCategories} from "@/sanity/content";
type Props={params:Promise<{slug:string}>};
export const revalidate=60;
function typeOf(slug:string){return slug.endsWith("-articles")?"articles":slug.endsWith("-betting")?"betting":slug.endsWith("-dfs")?"dfs":null;}
function filters(type:string){if(type==="dfs")return["DFS"];if(type==="betting")return["ATS / totals","Player props"];return undefined;}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const sports=await getCategories();const type=typeOf(slug);const sport=sports.find(x=>type&&slug===x.slug+"-"+type);if(!sport||!type)return{title:"Archive not found"};return{title:sport.title+" "+(type==="articles"?"Articles":type==="betting"?"Betting coverage":"DFS"),description:"Sport-specific editorial archive for "+sport.title+"."};}
export default async function CategoryArchive({params}:Props){
 const{slug}=await params;const sports=await getCategories();const type=typeOf(slug);const sport=sports.find(x=>type&&slug===x.slug+"-"+type);if(!sport||!type)notFound();
 const selected=filters(type);const result=selected?await Promise.all(selected.map(category=>getArticles({sportSlug:sport.slug,contentCategory:category,limit:100}))):[await getArticles({sportSlug:sport.slug,limit:100})];
 const articles=result.flat().sort((a,b)=>(b.publishedAt||"").localeCompare(a.publishedAt||""));const label=type==="articles"?"Articles":type==="betting"?"Betting coverage":"DFS";
 return <main id="main" className="page-main"><section className="page-hero"><div className="shell"><Link href={"/sports/"+sport.slug} className="back-link">← {sport.title}</Link><div className="eyebrow">{sport.title} archive</div><h1>{label} <span className="accent">archive.</span></h1><p>{label} for {sport.title}, including current stories and editorial archives.</p><div className="archive-links sport-archive-nav"><Link href={"/category/"+sport.slug+"-articles"}>Articles ↗</Link><Link href={"/category/"+sport.slug+"-betting"}>Betting ↗</Link><Link href={"/category/"+sport.slug+"-dfs"}>DFS ↗</Link></div></div></section><section className="section"><div className="shell"><ArticleGrid articles={articles} sports={sports}/>{!articles.length&&<p className="archive-note">No items in this archive have been migrated yet. The original category destination is still available on the legacy website.</p>}</div></section></main>;
}
