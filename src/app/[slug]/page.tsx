import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {PortableText} from "@portabletext/react";
import {getSitePageBySlug,getSitePages} from "@/sanity/content";
type Props={params:Promise<{slug:string}>};
export const revalidate=60;
export async function generateStaticParams(){const pages=await getSitePages();return pages.map(page=>({slug:page.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const page=await getSitePageBySlug(slug);if(!page)return{title:"Page not found"};return{title:page.seoTitle||page.title,description:page.seoDescription||page.excerpt||"Just-Bet-It"};}
export default async function ContentPage({params}:Props){
 const{slug}=await params;const page=await getSitePageBySlug(slug);if(!page)notFound();
 return <main id="main" className="cms-page"><section className="page-hero"><div className="shell"><Link href="/" className="back-link">← Just-Bet-It home</Link><div className="eyebrow">Just-Bet-It</div><h1>{page.title}</h1>{page.excerpt&&<p>{page.excerpt}</p>}</div></section><section className="section"><div className="shell cms-body">{page.body?.length?<PortableText value={page.body as never}/>:<div className="legacy-page-note"><p>{page.excerpt||"This page is being prepared for the new website."}</p>{page.externalUrl&&<a className="btn btn-primary" href={page.externalUrl} target="_blank" rel="noopener noreferrer">{page.externalLabel||"Open original page"} ↗</a>}</div>}</div></section></main>;
}
