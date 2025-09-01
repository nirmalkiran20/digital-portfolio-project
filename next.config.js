// FILE: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net'], // adjust as needed
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: { ignoreBuildErrors: true },
};
