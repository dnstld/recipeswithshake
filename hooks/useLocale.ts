"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
} from "@/i18n/constants";

interface UseLocaleReturn {
  locale: string;
  changeLocale: (newLocale: string) => void;
  isLoading: boolean;
  error: string | null;
  isNonDefaultLocale: boolean;
  clearError: () => void;
}

/**
 * Custom hook for managing locale state and browser/cookie synchronization
 * Extracted from Header component for reusability
 */
export const useLocale = (): UseLocaleReturn => {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Validate if a locale is supported
   */
  const isValidLocale = useCallback((locale: string): boolean => {
    return (
      SUPPORTED_LOCALES.includes(locale) &&
      /^[a-z]{2}(-[A-Z]{2})?$/.test(locale)
    );
  }, []);

  /**
   * Get locale from cookie with better error handling
   */
  const getLocaleFromCookie = useCallback((): string | null => {
    if (typeof document === "undefined") {
      return null; // SSR safety
    }

    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1];

      if (!cookieValue) {
        return null;
      }

      // Decode URI component in case locale was encoded
      const decodedValue = decodeURIComponent(cookieValue);
      return isValidLocale(decodedValue) ? decodedValue : null;
    } catch (err) {
      console.warn("Failed to read locale from cookie:", err);
      return null;
    }
  }, [isValidLocale]);

  /**
   * Get locale from browser with fallback chain
   */
  const getLocaleFromBrowser = useCallback((): string => {
    if (typeof navigator === "undefined") {
      return DEFAULT_LOCALE; // SSR safety
    }

    try {
      // Try multiple browser locale sources
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

      return DEFAULT_LOCALE;
    } catch (err) {
      console.warn("Failed to get browser locale:", err);
      return DEFAULT_LOCALE;
    }
  }, [isValidLocale]);

  /**
   * Set locale in cookie with proper encoding and error handling
   */
  const setLocaleCookie = useCallback((newLocale: string): boolean => {
    if (typeof document === "undefined") {
      return false; // SSR safety
    }

    try {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry

      const encodedLocale = encodeURIComponent(newLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${encodedLocale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure=${
        location.protocol === "https:"
      }`;

      return true;
    } catch (err) {
      console.error("Failed to set locale cookie:", err);
      return false;
    }
  }, []);

  /**
   * Initialize locale on component mount
   */
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

          // Only refresh if we're in browser and locale changed
          if (
            typeof window !== "undefined" &&
            browserLocale !== DEFAULT_LOCALE
          ) {
            router.refresh();
          }
        }
      } catch (err) {
        console.error("Failed to initialize locale:", err);
        setError("Failed to load language settings");
        setLocale(DEFAULT_LOCALE);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocale();
  }, [router, getLocaleFromCookie, getLocaleFromBrowser, setLocaleCookie]);

  /**
   * Change locale with improved validation and error handling
   */
  const changeLocale = useCallback(
    (newLocale: string): void => {
      // Input validation
      if (!newLocale || typeof newLocale !== "string") {
        setError("Invalid language selection");
        return;
      }

      const trimmedLocale = newLocale.trim();

      if (trimmedLocale === locale) {
        return; // No change needed
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
          // Revert on cookie failure
          setLocale(previousLocale);
          setError("Failed to save language preference");
          return;
        }

        // Only refresh if we're in browser
        if (typeof window !== "undefined") {
          router.refresh();
        }
      } catch (err) {
        console.error("Failed to change locale:", err);
        setError("Failed to change language");
        // Don't revert locale state here - let the user try again
      }
    },
    [locale, isValidLocale, setLocaleCookie, router]
  );

  // Memoize isNonDefaultLocale to recalculate when locale changes
  const isNonDefaultLocale = useMemo(() => {
    return locale !== DEFAULT_LOCALE;
  }, [locale]);

  return {
    locale,
    changeLocale,
    isLoading,
    error,
    isNonDefaultLocale,
    clearError,
  };
};
