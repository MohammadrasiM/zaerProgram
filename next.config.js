const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.kianmetronic.ir",
      },
    ],
  },
  reactStrictMode: false,
  output: "standalone",
});

module.exports = nextConfig;
