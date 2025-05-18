import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer>
      <div className="mx-auto max-w-full lg:max-w-7xl flex flex-col px-4 sm:px-8 lg:px-16 py-8 sm:py-16">
        <p className="text-sm text-center">{t("copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
