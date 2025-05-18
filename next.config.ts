/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/espacogitoledo",
  assetPrefix: "/espacogitoledo/",
  images: {
    unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  distDir: "out",
};

module.exports = nextConfig;
