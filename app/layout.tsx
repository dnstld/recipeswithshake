import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import LocaleBar from "@/components/LocaleBar";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
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
          {/* <div className="mx-auto max-w-6xl flex flex-col min-h-screen px-4"> */}
          <div className="flex flex-col min-h-screen">
            <LocaleBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
