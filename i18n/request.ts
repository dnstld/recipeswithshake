"use server";

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from "./constants";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  try {
    const cookieStore = await cookies();
    const headersList = await headers();

    const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

    const acceptLanguage = headersList.get("accept-language");
    const browserLocale = acceptLanguage
      ? acceptLanguage.split(",")[0].split(";")[0].split("-")[0]
      : null;

    const locale = cookieLocale || browserLocale || DEFAULT_LOCALE;

    const messages = (await import(`../messages/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error("Failed to load locale configuration:", error);

    const messages = (await import(`../messages/${DEFAULT_LOCALE}.json`))
      .default;
    return {
      locale: DEFAULT_LOCALE,
      messages,
    };
  }
});
