"use client";

import { useTranslations } from "next-intl";
import { Box, Container } from "@mui/material";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <Box component="section">
      <Container
        maxWidth="lg"
        className="grid lg:grid-cols-2 gap-8 lg:items-center my-8 lg:my-16"
      >
        <div>
          <h2>
            {t.rich("title", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </h2>
          <h3 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl grid my-2">
            {t.rich("subtitle", {
              span: (chuncks) => <span>{chuncks}</span>,
              highlight: (chunks) => (
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
                  {chunks}
                </span>
              ),
            })}
          </h3>
          <p>{t("description")}</p>
        </div>
        <div className="aspect-video flex justify-center relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mx-auto items-center bg-white">
          {process.env.NEXT_PUBLIC_APP_ENV === "production" ? (
            <p className="text-4xl font-bold tracking-tight">
              {t("coming-soon")}
            </p>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full bg-white shadow-lg"
              src="https://www.youtube.com/embed/19g66ezsKAg"
              allowFullScreen
            />
          )}
        </div>
      </Container>
    </Box>
  );
};

export default Hero;
