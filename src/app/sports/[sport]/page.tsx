import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArticleGrid} from "@/components/client-ui";
import {getArticles,getCategories} from "@/sanity/content";
type Props={params:Promise<{sport:string}>};
export const revalidate=60;
export async function generateMetadata({params}:Props):Promise<Metadata>{const{sport:slug}=await params;const sports=await getCategories();const sport=sports.find(x=>x.slug===slug);if(!sport)return{title:"Sport not found"};return{title:sport.title+" Analysis",description:sport.description||"Matchup previews and research for "+sport.title+"."};}
export default async function SportPage({params}:Props){
 const{sport:slug}=await params;const sports=await getCategories();const sport=sports.find(x=>x.slug===slug);if(!sport)notFound();const articles=await getArticles({sportSlug:slug,limit:100});
 return <main id="main" className="page-main"><section className="page-hero"><div className="shell"><Link href="/#sports" className="back-link">← All sports</Link><div className="eyebrow">{sport.title} research</div><h1>{sport.title} <span className="accent">coverage.</span></h1><p>{sport.description||"Game previews, player props, DFS coverage and matchup context."}</p><div className="archive-links sport-archive-nav"><Link href={"/category/"+slug+"-articles"}>Articles ↗</Link><Link href={"/category/"+slug+"-betting"}>Betting ↗</Link><Link href={"/category/"+slug+"-dfs"}>DFS ↗</Link></div></div></section><section className="section"><div className="shell"><ArticleGrid articles={articles} sports={sports}/>{!articles.length&&<p className="archive-note">Publish articles for this sport in the CMS to populate this archive.</p>}</div></section></main>;
}
