"use server";

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from "./constants";

export default getRequestConfig(async () => {
  try {
    const cookieStore = await cookies();

    const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

    const locale = cookieLocale || DEFAULT_LOCALE;

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
