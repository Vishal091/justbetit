import type { Metadata } from "next";
import { ArticleGrid } from "@/components/client-ui";
import { getArticles,getCategories } from "@/sanity/content";
export const metadata:Metadata={title:"All Sports Analysis",description:"Browse matchup previews, player props, DFS coverage and sports research from Just-Bet-It."};
export const revalidate=60;
export default async function ArticlesPage(){const [articles,sports]=await Promise.all([getArticles({limit:100}),getCategories()]);return <main id="main" className="page-main"><section className="page-hero"><div className="shell"><div className="eyebrow">Research archive</div><h1>All <span className="accent">analysis.</span></h1><p>Search the editorial archive, filter by sport and open the research you need.</p></div></section><section className="section"><div className="shell"><ArticleGrid articles={articles} sports={sports}/></div></section></main>;}