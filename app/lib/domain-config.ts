interface DomainConfig {
  DEFAULT_LOCALE: string;
  LOCALE_COOKIE_NAME: string;
  PAYMENT_URL: string;
  REGION: string;
}

// Server-side function to get domain config
export function getDomainConfig(headers?: Headers): DomainConfig {
  // Default fallback config
  const defaultConfig: DomainConfig = {
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'en',
    LOCALE_COOKIE_NAME: process.env.LOCALE_COOKIE_NAME || 'locale',
    PAYMENT_URL: process.env.PAYMENT_URL || '',
    REGION: 'US',
  };

  if (!headers) {
    return defaultConfig;
  }

  try {
    const configHeader = headers.get('x-domain-config');
    if (configHeader) {
      return JSON.parse(configHeader) as DomainConfig;
    }
  } catch (error) {
    console.error('Failed to parse domain config:', error);
  }

  return defaultConfig;
}

// Client-side function to get domain config
export function getClientDomainConfig(): DomainConfig {
  // On client, we'll use a global variable set by the server
  if (typeof window !== 'undefined' && window.__DOMAIN_CONFIG__) {
    return window.__DOMAIN_CONFIG__;
  }

  // Fallback to environment variables (these will be the build-time defaults)
  return {
    DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
    LOCALE_COOKIE_NAME: process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME || 'locale',
    PAYMENT_URL: process.env.NEXT_PUBLIC_PAYMENT_URL || '',
    REGION: 'US',
  };
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    __DOMAIN_CONFIG__: DomainConfig;
  }
}