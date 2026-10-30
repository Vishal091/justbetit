import { createClient } from "next-sanity";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const isSanityConfigured = Boolean(projectId);
export const sanityClient = createClient({
  projectId: projectId || "demo1234",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-30",
  useCdn: true, perspective: "published"
});