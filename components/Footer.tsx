import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="py-4 text-center text-sm text-gray-400">
      <p>{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
