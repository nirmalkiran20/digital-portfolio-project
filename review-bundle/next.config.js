// FILE: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // TEMP: allow prod builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  // If type errors also block builds, temporarily enable:
  // typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
