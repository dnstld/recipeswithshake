import { useTranslations } from "next-intl";

const Benefits = () => {
  const t = useTranslations("benefits");

  return (
    <section className="p-4 bg-blue-200 text-center leading-6 md:leading-8 md:text-xl">
      <h2>{t("title")}</h2>
      <ul>
        <li>{t("benefit-1")}</li>
        <li>{t("benefit-2")}</li>
        <li>{t("benefit-3")}</li>
        <li>{t("benefit-4")}</li>
        <li>{t("benefit-5")}</li>
      </ul>
    </section>
  );
};

export default Benefits;
