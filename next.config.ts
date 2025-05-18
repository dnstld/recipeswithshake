/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/espacogitoledo",
  assetPrefix: "/espacogitoledo/",
  images: {
    unoptimized: true,
  },
  distDir: "out",
};

module.exports = nextConfig;
