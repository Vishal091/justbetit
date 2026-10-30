import type {MetadataRoute} from "next";
import {getArticles,getCategories,getSitePages} from "@/sanity/content";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://just-bet-it.com").replace(/\/$/,"");
 const[articles,sports,pages]=await Promise.all([getArticles({limit:100}),getCategories(),getSitePages()]);
 const entries:MetadataRoute.Sitemap=[{url:base,changeFrequency:"hourly",priority:1},{url:base+"/articles",changeFrequency:"hourly",priority:.9}];
 sports.forEach(sport=>{entries.push({url:base+"/sports/"+sport.slug,changeFrequency:"hourly",priority:.75});["articles","betting","dfs"].forEach(type=>entries.push({url:base+"/category/"+sport.slug+"-"+type,changeFrequency:"hourly",priority:.65}));});
 articles.filter(article=>!article.sourceUrl).forEach(article=>entries.push({url:base+"/articles/"+article.slug,lastModified:article.publishedAt?new Date(article.publishedAt):undefined,changeFrequency:"weekly",priority:article.featured?0.8:0.6}));
 pages.forEach(page=>entries.push({url:base+"/"+page.slug,changeFrequency:"monthly",priority:.45}));
 return entries;
}
