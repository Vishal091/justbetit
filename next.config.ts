import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/nfl-week-8-sunday-slate-game-previews", destination: "/articles/nfl-week-8-sunday-slate-game-previews", permanent: true },
      { source: "/cfb-week-8-top-ats-total-picks", destination: "/articles/cfb-week-8-top-ats-total-picks", permanent: true },
      { source: "/10-29-26-nba-game-previews", destination: "/articles/10-29-26-nba-game-previews", permanent: true },
      { source: "/10-27-26-nba-top-prop-picks", destination: "/articles/10-27-26-nba-top-prop-picks", permanent: true }
    ];
  }, images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] } };
export default nextConfig;