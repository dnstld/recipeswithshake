"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
} from "@/i18n/constants";
import { useTranslations } from "next-intl";
import { Button, ButtonGroup } from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

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

  const localeIcon = (loc: string) => {
    if (loc === locale) {
      return <TurnedInIcon fontSize="small" />;
    } else {
      return <TurnedInNotIcon fontSize="small" />;
    }
  };

  return (
    <nav>
      <div className="max-w-full flex justify-center lg:justify-end p-2">
        <ButtonGroup variant="outlined" color="secondary" size="small">
          {SUPPORTED_LOCALES.map((loc) => (
            <Button
              loading={false}
              loadingPosition="start"
              startIcon={localeIcon(loc)}
              key={loc}
              onClick={() => changeLocale(loc)}
            >
              {t(loc)}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </nav>
  );
};

export default LocaleBar;
