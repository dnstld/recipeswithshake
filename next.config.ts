/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  trailingSlash: true,
  basePath: "/espacogitoledo",
  assetPrefix: "/espacogitoledo/",
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
