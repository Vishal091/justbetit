import { defineField, defineType } from "sanity";

const article = defineType({
  name: "article", title: "Article", type: "document",
  groups: [{ name: "content", title: "Content", default: true }, { name: "publishing", title: "Publishing" }, { name: "seo", title: "SEO" }],
  fields: [
    defineField({ name: "title", title: "Headline", type: "string", group: "content", validation: (rule) => rule.required().max(110) }),
    defineField({ name: "slug", title: "URL slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Card summary", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(260) }),
    defineField({ name: "sport", title: "Sport", type: "reference", to: [{ type: "category" }], group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "contentCategory", title: "Coverage type", type: "string", group: "content", options: { list: [
      { title: "Game preview", value: "Game preview" }, { title: "Player props", value: "Player props" },
      { title: "ATS / totals", value: "ATS / totals" }, { title: "DFS", value: "DFS" },
      { title: "Cheat sheet", value: "Cheat sheet" }, { title: "News & analysis", value: "News & analysis" }
    ] } }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }], group: "content" }),
    defineField({ name: "heroImage", title: "Cover image", type: "image", group: "content", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }),
    defineField({ name: "body", title: "Article body", type: "array", group: "content", of: [
      { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }, { title: "Quote", value: "blockquote" }],
        marks: { decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }, { title: "Underline", value: "underline" }], annotations: [{
          name: "link", type: "object", title: "Link", fields: [defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"] }) })]
        }] } },
      { type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }
    ] }),
    defineField({ name: "accessLevel", title: "Access", type: "string", group: "publishing", initialValue: "public", options: { list: [{ title: "Public", value: "public" }, { title: "Propalytics members", value: "members" }], layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", group: "publishing", initialValue: false }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", group: "publishing", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: "sourceUrl", title: "Legacy / external article URL", description: "Optional while this article still lives on the legacy site.", type: "url", group: "publishing", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: (rule) => rule.max(65) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2, group: "seo", validation: (rule) => rule.max(170) })
  ],
  preview: { select: { title: "title", subtitle: "sport.title", media: "heroImage" }, prepare({ title, subtitle, media }) { return { title: title || "Untitled article", subtitle: subtitle || "Unassigned sport", media }; } },
  orderings: [{ title: "Publication date, newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }]
});

const category = defineType({
  name: "category", title: "Sport / Category", type: "document",
  fields: [
    defineField({ name: "title", title: "Sport name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "sportKey", title: "Odds API sport key", type: "string", description: "Provider key e.g. americanfootball_nfl or basketball_nba." }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "navigationOrder", title: "Navigation order", type: "number", initialValue: 10 }),
    defineField({ name: "enabled", title: "Show on site", type: "boolean", initialValue: true })
  ],
  preview: { select: { title: "title", subtitle: "slug.current" }, prepare({ title, subtitle }) { return { title, subtitle: subtitle ? "/" + subtitle : "Create URL slug" }; } }
});

const author = defineType({
  name: "author", title: "Author", type: "document",
  fields: [
    defineField({ name: "name", title: "Display name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Author slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "bio", title: "Short biography", type: "text", rows: 3 }),
    defineField({ name: "avatar", title: "Profile image", type: "image", options: { hotspot: true } }),
    defineField({ name: "profileUrl", title: "Public profile URL", type: "url" })
  ],
  preview: { select: { title: "name", media: "avatar" } }
});

const tool = defineType({
  name: "tool", title: "Research Tool", type: "document",
  fields: [
    defineField({ name: "title", title: "Tool name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "sport", title: "Sport", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "url", title: "Destination URL", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "iconLabel", title: "Short icon label", type: "string", validation: (rule) => rule.max(3) }),
    defineField({ name: "status", title: "Availability", type: "string", initialValue: "available", options: { list: [{ title: "Available", value: "available" }, { title: "Coming soon", value: "coming-soon" }, { title: "Hidden", value: "hidden" }] } }),
    defineField({ name: "navigationOrder", title: "Display order", type: "number", initialValue: 10 })
  ],
  preview: { select: { title: "title", subtitle: "status" } }
});

const siteSettings = defineType({
  name: "siteSettings", title: "Site Settings", type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", initialValue: "Just-Bet-It", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", title: "Announcement line", type: "string" }),
    defineField({ name: "heroTitle", title: "Homepage headline", type: "string", initialValue: "Read the game. Not the hype.", validation: (rule) => rule.required() }),
    defineField({ name: "heroDescription", title: "Homepage description", type: "text", rows: 3 }),
    defineField({ name: "propalyticsUrl", title: "Propalytics URL", type: "url", initialValue: "https://propalytics.bet/", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "disclaimer", title: "Footer disclaimer", type: "text", rows: 4 }),
    defineField({ name: "socialLinks", title: "Official social links", type: "array", of: [{
      type: "object", fields: [
        defineField({ name: "network", title: "Network name", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "url", title: "Profile URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }) })
      ], preview: { select: { title: "network", subtitle: "url" } }
    }] })
  ]
});

export default [article, author, category, siteSettings, tool];