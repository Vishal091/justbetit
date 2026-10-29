import { NextStudio } from "next-sanity/studio";
import Link from "next/link";
import config from "../../../../sanity.config";
export const dynamic="force-dynamic";
export const metadata={title:"Just-Bet-It CMS"};
export default function StudioPage(){
 if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)return <main id="main" className="setup-page"><div className="setup-card"><div className="eyebrow">Content management</div><h1>Connect the CMS.</h1><p>The admin workspace is ready, but it needs a Sanity project before editors can sign in and publish content.</p><ol><li>Create a project at <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer">sanity.io/manage ↗</a>.</li><li>Configure NEXT_PUBLIC_SANITY_PROJECT_ID in your local environment and hosting provider.</li><li>Set NEXT_PUBLIC_SANITY_DATASET to production, redeploy, then sign in with an authorized Sanity account.</li></ol><p>See DYNAMIC_SETUP.md for the checklist.</p><Link className="btn btn-primary" href="/">Return to website</Link></div></main>;
 return <NextStudio config={config}/>;
}