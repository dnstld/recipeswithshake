"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SUPPORTED_LOCALES } from "@/i18n/constants";
import { getClientDomainConfig } from "@/app/lib/domain-config";

interface UseLocaleReturn {
  locale: string;
  changeLocale: (newLocale: string) => void;
  isLoading: boolean;
  error: string | null;
  isNonDefaultLocale: boolean;
  clearError: () => void;
}

export const useLocale = (): UseLocaleReturn => {
  const domainConfig = getClientDomainConfig();
  const [locale, setLocale] = useState(domainConfig.DEFAULT_LOCALE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isValidLocale = useCallback((locale: string): boolean => {
    return (
      SUPPORTED_LOCALES.includes(locale) &&
      /^[a-z]{2}(-[A-Z]{2})?$/.test(locale)
    );
  }, []);

  const getLocaleFromCookie = useCallback((): string | null => {
    if (typeof document === "undefined") {
      return null;
    }

    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${domainConfig.LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1];

      if (!cookieValue) {
        return null;
      }

      const decodedValue = decodeURIComponent(cookieValue);
      return isValidLocale(decodedValue) ? decodedValue : null;
    } catch (err) {
      console.warn("Failed to read locale from cookie:", err);
      return null;
    }
  }, [isValidLocale, domainConfig.LOCALE_COOKIE_NAME]);

  const getLocaleFromBrowser = useCallback((): string => {
    if (typeof navigator === "undefined") {
      return domainConfig.DEFAULT_LOCALE;
    }

    try {
      const browserLanguages = [
        navigator.language,
        ...(navigator.languages || []),
      ];

      for (const lang of browserLanguages) {
        const shortLocale = lang.slice(0, 2);
        if (isValidLocale(shortLocale)) {
          return shortLocale;
        }
      }

      return domainConfig.DEFAULT_LOCALE;
    } catch (err) {
      console.warn("Failed to get browser locale:", err);
      return domainConfig.DEFAULT_LOCALE;
    }
  }, [isValidLocale, domainConfig.DEFAULT_LOCALE]);

  const setLocaleCookie = useCallback((newLocale: string): boolean => {
    if (typeof document === "undefined") {
      return false;
    }

    try {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);

      const encodedLocale = encodeURIComponent(newLocale);
      document.cookie = `${domainConfig.LOCALE_COOKIE_NAME}=${encodedLocale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${
        location.protocol === "https:"
      }`;

      return true;
    } catch (err) {
      console.error("Failed to set locale cookie:", err);
      return false;
    }
  }, [domainConfig.LOCALE_COOKIE_NAME]);

  useEffect(() => {
    const initializeLocale = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const cookieLocale = getLocaleFromCookie();

        if (cookieLocale) {
          setLocale(cookieLocale);
        } else {
          const browserLocale = getLocaleFromBrowser();
          setLocale(browserLocale);

          const cookieSet = setLocaleCookie(browserLocale);
          if (!cookieSet) {
            console.warn("Failed to save initial locale preference");
          }

          if (
            typeof window !== "undefined" &&
            browserLocale !== domainConfig.DEFAULT_LOCALE
          ) {
            router.refresh();
          }
        }
      } catch (err) {
        console.error("Failed to initialize locale:", err);
        setError("Failed to load language settings");
        setLocale(domainConfig.DEFAULT_LOCALE);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocale();
  }, [router, getLocaleFromCookie, getLocaleFromBrowser, setLocaleCookie, domainConfig.DEFAULT_LOCALE]);

  const changeLocale = useCallback(
    (newLocale: string): void => {
      if (!newLocale || typeof newLocale !== "string") {
        setError("Invalid language selection");
        return;
      }

      const trimmedLocale = newLocale.trim();

      if (trimmedLocale === locale) {
        return;
      }

      if (!isValidLocale(trimmedLocale)) {
        console.warn(`Invalid locale: ${trimmedLocale}`);
        setError("Unsupported language selection");
        return;
      }

      try {
        setError(null);
        const previousLocale = locale;

        setLocale(trimmedLocale);
        const cookieSet = setLocaleCookie(trimmedLocale);

        if (!cookieSet) {
          setLocale(previousLocale);
          setError("Failed to save language preference");
          return;
        }

        if (typeof window !== "undefined") {
          router.refresh();
        }
      } catch (err) {
        console.error("Failed to change locale:", err);
        setError("Failed to change language");
      }
    },
    [locale, isValidLocale, setLocaleCookie, router]
  );

  const isNonDefaultLocale = useMemo(() => {
    return locale !== domainConfig.DEFAULT_LOCALE;
  }, [locale, domainConfig.DEFAULT_LOCALE]);

  return {
    locale,
    changeLocale,
    isLoading,
    error,
    isNonDefaultLocale,
    clearError,
  };
};
