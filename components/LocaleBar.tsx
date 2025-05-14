"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
} from "@/i18n/constants";
import { useTranslations } from "next-intl";

const LocaleBar = () => {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const router = useRouter();
  const t = useTranslations("locale");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
      ?.split("=")[1];

    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      const newLocale = SUPPORTED_LOCALES.includes(browserLocale)
        ? browserLocale
        : DEFAULT_LOCALE;

      setLocale(newLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    if (newLocale !== locale && SUPPORTED_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}`;
      router.refresh();
    }
  };

  return (
    <div className="flex gap-2 justify-end p-2">
      <button
        className={`border p-2 font-bold rounded-md text-xs ${
          locale === "en" && "bg-white text-black"
        }`}
        onClick={() => changeLocale("en")}
      >
        {t("en")}
      </button>
      <button
        className={`border p-2 font-bold rounded-md text-xs ${
          locale === "pt" && "bg-white text-black"
        }`}
        onClick={() => changeLocale("pt")}
      >
        {t("pt")}
      </button>
    </div>
  );
};

export default LocaleBar;
