"use client";

import { useTranslations } from "next-intl";
import Chip from "@mui/material/Chip";
import Cta from "@/components/Cta";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section>
      <div className="mx-auto max-w-full lg:max-w-4xl grid px-4 sm:px-8 lg:px-16 py-8 sm:py-16">
        <div className="">
          <h1 className="heading-1 inline-flex">
            {t("title")}
            <Chip label="E-book" />
          </h1>
          <h2 className="heading-2">{t("subtitle")}</h2>
          <p className="mb-16">{t("description")}</p>

          <Cta />
        </div>
      </div>
    </section>
  );
};

export default Hero;
