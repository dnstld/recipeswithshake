"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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
   * Validate if a locale is supported
   */
  const isValidLocale = useCallback((locale: string): boolean => {
    return (
      SUPPORTED_LOCALES.includes(locale) &&
      /^[a-z]{2}(-[A-Z]{2})?$/.test(locale)
    );
  }, []);

  /**
   * Get locale from cookie
   */
  const getLocaleFromCookie = useCallback((): string | null => {
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1];

      return cookieValue && isValidLocale(cookieValue) ? cookieValue : null;
    } catch (err) {
      console.warn("Failed to read locale from cookie:", err);
      return null;
    }
  }, [isValidLocale]);

  /**
   * Get locale from browser
   */
  const getLocaleFromBrowser = useCallback((): string => {
    try {
      const browserLocale = navigator.language.slice(0, 2);
      return isValidLocale(browserLocale) ? browserLocale : DEFAULT_LOCALE;
    } catch (err) {
      console.warn("Failed to get browser locale:", err);
      return DEFAULT_LOCALE;
    }
  }, [isValidLocale]);

  /**
   * Set locale in cookie with proper options
   */
  const setLocaleCookie = useCallback((newLocale: string): void => {
    try {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry

      document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    } catch (err) {
      console.error("Failed to set locale cookie:", err);
      setError("Failed to save language preference");
    }
  }, []);

  /**
   * Initialize locale on component mount
   */
  useEffect(() => {
    const initializeLocale = () => {
      setIsLoading(true);
      setError(null);

      try {
        const cookieLocale = getLocaleFromCookie();

        if (cookieLocale) {
          setLocale(cookieLocale);
        } else {
          const browserLocale = getLocaleFromBrowser();
          setLocale(browserLocale);
          setLocaleCookie(browserLocale);

          router.refresh();
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
   * Change locale with validation and error handling
   */
  const changeLocale = useCallback(
    (newLocale: string): void => {
      if (!newLocale || newLocale === locale) {
        return;
      }

      if (!isValidLocale(newLocale)) {
        console.warn(`Invalid locale: ${newLocale}`);
        setError("Invalid language selection");
        return;
      }

      try {
        setError(null);
        setLocale(newLocale);
        setLocaleCookie(newLocale);

        router.refresh();
      } catch (err) {
        console.error("Failed to change locale:", err);
        setError("Failed to change language");

        setLocale(locale);
      }
    },
    [locale, isValidLocale, setLocaleCookie, router]
  );

  return {
    locale,
    changeLocale,
    isLoading,
    error,
  };
};
