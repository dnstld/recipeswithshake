/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  trailingSlash: true,
  
  // Environment variables that should be available on the client side
  // These are fallbacks - actual values come from domain config
  env: {
    NEXT_PUBLIC_DEFAULT_LOCALE: 'en',
    NEXT_PUBLIC_LOCALE_COOKIE_NAME: 'locale',
    NEXT_PUBLIC_PAYMENT_URL: '',
  },
  
  // Rewrites for handling different domains (optional, handled by middleware)
  async rewrites() {
    return [];
  },
  
  // Headers for CORS if needed
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);