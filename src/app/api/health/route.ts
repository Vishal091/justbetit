import { NextRequest,NextResponse } from "next/server";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const oidc=request.headers.get("x-vercel-oidc-token");
 return NextResponse.json({status:"ok",oddsProviderConfigured:Boolean(process.env.THE_ODDS_API_KEY),aiGatewayConfigured:Boolean(process.env.AI_GATEWAY_API_KEY||process.env.VERCEL_OIDC_TOKEN||oidc),cmsConfigured:Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),environment:process.env.VERCEL_ENV||"local"},{headers:{"Cache-Control":"no-store"}});
}
