import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Domain configuration mapping
interface DomainConfig {
  DEFAULT_LOCALE: string;
  LOCALE_COOKIE_NAME: string;
  PAYMENT_URL: string;
  REGION: string;
}

const DOMAIN_CONFIG: Record<string, DomainConfig> = {
  'www.recipeswithshake.com': {
    DEFAULT_LOCALE: 'en',
    LOCALE_COOKIE_NAME: 'rws_locale',
    PAYMENT_URL: 'https://pay.hotmart.com/Q100425450K',
    REGION: 'US',
  },
  'www.receitascomshake.com.br': {
    DEFAULT_LOCALE: 'pt',
    LOCALE_COOKIE_NAME: 'rcs_locale',
    PAYMENT_URL: 'https://pay.hotmart.com/U100355618I',
    REGION: 'BR',
  },
};

// Default fallback configuration
const DEFAULT_CONFIG: DomainConfig = {
  DEFAULT_LOCALE: 'en',
  LOCALE_COOKIE_NAME: 'locale',
  PAYMENT_URL: 'https://pay.hotmart.com/Q100425450K',
  REGION: 'US',
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Get domain config with proper typing and fallback
  const domainConfig = DOMAIN_CONFIG[hostname] || DEFAULT_CONFIG;
  
  // Create response
  const response = NextResponse.next();
  
  // Set domain-specific environment variables as headers
  // These will be available in your app via headers
  response.headers.set('x-domain-config', JSON.stringify(domainConfig));
  response.headers.set('x-current-domain', hostname);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};