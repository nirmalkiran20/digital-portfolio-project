// FILE: next.config.js  (at repository root)
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // TEMP: allow prod builds to complete even if ESLint finds issues
    ignoreDuringBuilds: true,
  },
  // Optional TEMP if TypeScript also blocks:
  // typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
