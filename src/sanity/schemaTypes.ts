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
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroPrimaryLabel", title: "Hero primary button label", type: "string" }),
    defineField({ name: "heroPrimaryHref", title: "Hero primary button URL", type: "string" }),
    defineField({ name: "heroSecondaryLabel", title: "Hero secondary button label", type: "string" }),
    defineField({ name: "heroSecondaryHref", title: "Hero secondary button URL", type: "string" }),
    defineField({ name: "storiesTitle", title: "Analysis section title", type: "string" }),
    defineField({ name: "storiesDescription", title: "Analysis section description", type: "text", rows: 2 }),
    defineField({ name: "sportsTitle", title: "Sports section title", type: "string" }),
    defineField({ name: "sportsDescription", title: "Sports section description", type: "text", rows: 2 }),
    defineField({ name: "toolsTitle", title: "Data suite title", type: "string" }),
    defineField({ name: "toolsDescription", title: "Data suite description", type: "text", rows: 2 }),
    defineField({ name: "propalyticsTitle", title: "Propalytics title", type: "string" }),
    defineField({ name: "propalyticsDescription", title: "Propalytics description", type: "text", rows: 3 }),
    defineField({ name: "aboutTitle", title: "About section title", type: "string" }),
    defineField({ name: "aboutDescription", title: "About section text", type: "text", rows: 4 }),
    defineField({ name: "principles", title: "Brand principles", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "description", title: "Description", type: "text", rows: 2 })] }] }),
    defineField({ name: "archiveTitle", title: "Archives title", type: "string" }),
    defineField({ name: "archiveDescription", title: "Archives description", type: "text", rows: 2 }),
    defineField({ name: "faqTitle", title: "FAQ title", type: "string" }),
    defineField({ name: "faqDescription", title: "FAQ description", type: "text", rows: 2 }),
    defineField({ name: "faqItems", title: "Frequently asked questions", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", title: "Question", type: "string", validation: rule => rule.required() }), defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: rule => rule.required() })] }] }),
    defineField({ name: "navLinks", title: "Main navigation links", type: "array", of: [{ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string", validation: rule => rule.required() }), defineField({ name: "href", title: "URL", type: "string", validation: rule => rule.required() }), defineField({ name: "external", title: "External link", type: "boolean", initialValue: false }), defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }), defineField({ name: "order", title: "Order", type: "number", initialValue: 10 })] }] }),
    defineField({ name: "footerLinks", title: "Footer links", type: "array", of: [{ type: "object", fields: [defineField({ name: "group", title: "Column", type: "string", options: { list: ["Explore", "Products", "Support & legal"] }, validation: rule => rule.required() }), defineField({ name: "label", title: "Label", type: "string", validation: rule => rule.required() }), defineField({ name: "href", title: "URL", type: "string", validation: rule => rule.required() }), defineField({ name: "external", title: "External link", type: "boolean", initialValue: false }), defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }), defineField({ name: "order", title: "Order", type: "number", initialValue: 10 })] }] }),
    defineField({ name: "socialLinks", title: "Official social links", type: "array", of: [{
      type: "object", fields: [
        defineField({ name: "network", title: "Network name", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "url", title: "Profile URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }) })
      ], preview: { select: { title: "network", subtitle: "url" } }
    }] })
  ]
});


const sitePage = defineType({
 name:"sitePage",title:"Website Page",type:"document",
 groups:[{name:"content",title:"Page content",default:true},{name:"publishing",title:"Publishing"},{name:"seo",title:"SEO"}],
 fields:[
  defineField({name:"title",title:"Page title",type:"string",group:"content",validation:rule=>rule.required()}),
  defineField({name:"slug",title:"URL slug",type:"slug",group:"content",options:{source:"title"},validation:rule=>rule.required()}),
  defineField({name:"excerpt",title:"Intro / summary",type:"text",rows:3,group:"content"}),
  defineField({name:"body",title:"Page body",type:"array",group:"content",of:[{type:"block",styles:[{title:"Normal",value:"normal"},{title:"Heading 2",value:"h2"},{title:"Heading 3",value:"h3"},{title:"Quote",value:"blockquote"}],marks:{decorators:[{title:"Strong",value:"strong"},{title:"Emphasis",value:"em"}],annotations:[{name:"link",type:"object",title:"Link",fields:[defineField({name:"href",title:"URL",type:"url",validation:rule=>rule.uri({scheme:["http","https","mailto"]})})]}]}}]}),
  defineField({name:"externalUrl",title:"Legacy external URL",type:"url",group:"publishing"}),
  defineField({name:"externalLabel",title:"Legacy link label",type:"string",group:"publishing"}),
  defineField({name:"status",title:"Status",type:"string",group:"publishing",initialValue:"draft",options:{list:[{title:"Draft",value:"draft"},{title:"Published",value:"published"}]}}),
  defineField({name:"seoTitle",title:"SEO title",type:"string",group:"seo"}),
  defineField({name:"seoDescription",title:"SEO description",type:"text",rows:2,group:"seo"})
 ],
 preview:{select:{title:"title",subtitle:"slug.current"}}
});

export default [article, author, category, siteSettings, tool, sitePage];