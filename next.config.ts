import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // AGENTS.md is the team's rulebook; stop `next dev` from appending its own block to it.
  agentRules: false,
};

export default nextConfig;
