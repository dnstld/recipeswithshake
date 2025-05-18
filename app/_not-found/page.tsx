export const dynamic = "force-dynamic";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("not-found");
  return <h1>{t("message")}</h1>;
}
