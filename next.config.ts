import type { NextConfig } from 'next';

import { securityHeaders } from './src/lib/security/headers';

const nextConfig: NextConfig = {
  // AGENTS.md is the team's rulebook; stop `next dev` from appending its own block to it.
  agentRules: false,
  poweredByHeader: false,
  images: {
    // No remote images yet. Add the CDN host here when clan logos and avatars can be uploaded.
    remotePatterns: [],
  },
  // The proxy adds the CSP to pages; these reach every response, static files included.
  headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const headers = Object.entries(securityHeaders({ isProduction })).map(([key, value]) => ({
      key,
      value,
    }));
    return Promise.resolve([{ source: '/:path*', headers }]);
  },
};

export default nextConfig;
