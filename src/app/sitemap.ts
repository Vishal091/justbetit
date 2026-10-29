import type { MetadataRoute } from "next";
import { getArticles,getCategories } from "@/sanity/content";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://just-bet-it.com").replace(/\/$/,"");
 const [articles,sports]=await Promise.all([getArticles({limit:100}),getCategories()]);
 const entries:MetadataRoute.Sitemap=[{url:base,changeFrequency:"hourly",priority:1},{url:base+"/articles",changeFrequency:"hourly",priority:.9}];
 sports.forEach(s=>entries.push({url:base+"/sports/"+s.slug,changeFrequency:"hourly",priority:.75}));
 articles.filter(a=>!a.sourceUrl).forEach(a=>entries.push({url:base+"/articles/"+a.slug,lastModified:a.publishedAt?new Date(a.publishedAt):undefined,changeFrequency:"weekly",priority:a.featured ? 0.8 : 0.65}));
 return entries;
}