import { useTranslations } from "next-intl";
import Image from "next/image";

const Feedback = () => {
  const t = useTranslations("feedback");

  const customers = [
    {
      avatar: "/images/customers/giulia-vedovato.jpg",
      alt: t("alt"),
      name: t("customer-1.name"),
      social: t("customer-1.social"),
      text: t("customer-1.text"),
    },
    {
      avatar: "/images/customers/felipe-augusto.jpg",
      alt: t("alt"),
      name: t("customer-2.name"),
      social: t("customer-2.social"),
      text: t("customer-2.text"),
    },
    {
      avatar: "/images/customers/claudia-bassani.jpg",
      alt: t("alt"),
      name: t("customer-3.name"),
      social: t("customer-3.social"),
      text: t("customer-3.text"),
    },
    {
      avatar: "/images/customers/rosangela-araujo.jpg",
      alt: t("alt"),
      name: t("customer-4.name"),
      social: t("customer-4.social"),
      text: t("customer-4.text"),
    },
    {
      avatar: "/images/customers/mariele-aline.jpg",
      alt: t("yogurte"),
      name: t("customer-5.name"),
      social: t("customer-5.social"),
      text: t("customer-5.text"),
    },
    {
      avatar: "/images/customers/thais-fernanda.jpg",
      alt: t("alt"),
      name: t("customer-6.name"),
      social: t("customer-6.social"),
      text: t("customer-6.text"),
    },
    {
      avatar: "/images/customers/thais-fernanda.jpg",
      alt: t("yogurte"),
      name: t("customer-6.name"),
      social: t("customer-6.social"),
      text: t("customer-6.text"),
    },
  ];

  return (
    <section className="p-4 bg-purple-200 text-center leading-6 md:leading-8 md:text-xl">
      <h2>{t("title")}</h2>
      <ul>
        {customers.map((customer, index) => (
          <li key={index} className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-4 mx-auto max-w-6xl">
              <Image
                src={customer.avatar}
                width={100}
                height={100}
                alt={customer.alt}
              />
              <div>
                <h3 className="text-xl font-bold">{customer.name}</h3>
                <p>{customer.social}</p>
                <p>{customer.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Feedback;
