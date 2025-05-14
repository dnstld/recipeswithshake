"use client";

import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section className="p-4 bg-green-200 text-center leading-6 md:leading-8 md:text-xl">
      <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
      <h3 className="text-xl font-bold">{t("subtitle")}</h3>
      <p>{t("description")}</p>

      <button>{t("cta")}</button>
    </section>
  );
};

export default Hero;
