import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/mui/theme";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
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
  const locale = await getLocale();

  return (
    <html lang={locale} className="min-h-screen">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
