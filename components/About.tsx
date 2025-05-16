import { useTranslations } from "next-intl";
import Image from "next/image";

const About = () => {
  const t = useTranslations("about");

  return (
    <section className="p-4 bg-yellow-200 text-center leading-6 md:leading-8 md:text-xl">
      <h2>{t("title")}</h2>
      <Image
        src={"/images/gi-toledo.jpg"}
        width={200}
        height={200}
        alt={t("alt")}
      />
      <ul>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("me")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("family")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("entrepreneur")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("years")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("creator")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("sweet")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("shielded")}</p>
        </li>
      </ul>
    </section>
  );
};

export default About;
