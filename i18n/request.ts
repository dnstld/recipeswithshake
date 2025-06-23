"use server";

import { getDomainConfig } from "@/app/lib/domain-config";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  try {
    const headersList = await headers();
    const cookieStore = await cookies();
    
    // Get domain-specific configuration
    const domainConfig = getDomainConfig(headersList);
    
    const cookieLocale = cookieStore.get(domainConfig.LOCALE_COOKIE_NAME)?.value;
    const locale = cookieLocale || domainConfig.DEFAULT_LOCALE;

    const messages = (await import(`../messages/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error("Failed to load locale configuration:", error);
    
    const headersList = await headers();
    const domainConfig = getDomainConfig(headersList);

    const messages = (await import(`../messages/${domainConfig.DEFAULT_LOCALE}.json`))
      .default;
    return {
      locale: domainConfig.DEFAULT_LOCALE,
      messages,
    };
  }
});