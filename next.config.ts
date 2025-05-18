/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages deployment with custom repo name
  basePath: "/espacogitoledo",
  assetPrefix: "/espacogitoledo/",

  // Skip generation of files that require server-side rendering
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
