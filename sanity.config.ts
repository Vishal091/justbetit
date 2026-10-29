import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemaTypes from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "justbetit", title: "Just-Bet-It CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo1234",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure: (S) => S.list().title("Just-Bet-It").items([
    S.documentTypeListItem("article").title("Articles"),
    S.documentTypeListItem("category").title("Sports & Categories"),
    S.documentTypeListItem("author").title("Authors"),
    S.documentTypeListItem("tool").title("Data Tools"),
    S.listItem().title("Site Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings"))
  ]) })],
  schema: { types: schemaTypes }
});