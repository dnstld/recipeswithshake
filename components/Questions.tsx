import { useTranslations } from "next-intl";

const Questions = () => {
  const t = useTranslations("questions");

  return (
    <section className="p-4 bg-blue-200 text-center leading-6 md:leading-8 md:text-xl">
      <h2>{t("title")}</h2>
      <ul>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("question-1.question")}</p>
          <p>{t("question-1.answer")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("question-2.question")}</p>
          <p>{t("question-2.answer")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("question-3.question")}</p>
          <p>{t("question-3.answer")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("question-4.question")}</p>
          <p>{t("question-4.answer")}</p>
        </li>
        <li className="flex flex-col gap-4 mb-4">
          <p>{t("question-5.question")}</p>
          <p>{t("question-5.answer")}</p>
        </li>
      </ul>
    </section>
  );
};

export default Questions;
