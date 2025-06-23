import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui/theme";
import { headers } from "next/headers";

import "./globals.css";
import { getDomainConfig } from "./lib/domain-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  weight: ["300", "400", "500", "700"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const headersList = await headers();
  const domainConfig = getDomainConfig(headersList);

  return (
    <html lang={domainConfig.DEFAULT_LOCALE} className="min-h-screen">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Inject domain config as a global variable for client-side access */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__DOMAIN_CONFIG__ = ${JSON.stringify(
              domainConfig
            )};`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <NextIntlClientProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">{children}</main>
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
