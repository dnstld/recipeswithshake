import { useTranslations } from "next-intl";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Rating,
  Container,
  Box,
} from "@mui/material";

const Feedback = () => {
  const t = useTranslations("feedback");

  const customers = [
    {
      avatar: "/images/customers/giulia-vedovato.jpg",
      alt: t("customer-1.alt"),
      name: t("customer-1.name"),
      social: t("customer-1.social"),
      text: t("customer-1.text"),
    },
    {
      avatar: "/images/customers/felipe-augusto.jpg",
      alt: t("customer-2.alt"),
      name: t("customer-2.name"),
      social: t("customer-2.social"),
      text: t("customer-2.text"),
    },
    {
      avatar: "/images/customers/claudia-bassani.jpg",
      alt: t("customer-3.alt"),
      name: t("customer-3.name"),
      social: t("customer-3.social"),
      text: t("customer-3.text"),
    },
    {
      avatar: "/images/customers/rosangela-araujo.jpg",
      alt: t("customer-4.alt"),
      name: t("customer-4.name"),
      social: t("customer-4.social"),
      text: t("customer-4.text"),
    },
    {
      avatar: "/images/customers/mariele-aline.jpg",
      alt: t("customer-5.alt"),
      name: t("customer-5.name"),
      social: t("customer-5.social"),
      text: t("customer-5.text"),
    },
    {
      avatar: "/images/customers/thais-fernanda.jpg",
      alt: t("customer-6.alt"),
      name: t("customer-6.name"),
      social: t("customer-6.social"),
      text: t("customer-6.text"),
    },
  ];

  return (
    <Box component="section">
      <Container maxWidth="lg" className="my-8 lg:my-16">
        <h2 className="text-4xl font-bold tracking-tight lg:leading-16 sm:text-5xl md:text-6xl text-center max-w-2xl mx-auto mb-8">
          {t("title")}
        </h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-stretch">
          {customers.map((customer, index) => (
            <li key={index}>
              <Card key={index} className="flex flex-col h-full">
                <CardContent className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="flex items-center flex-grow gap-2 text-left">
                      <Avatar
                        src={customer.avatar}
                        alt={customer.alt}
                        sx={{
                          width: 56,
                          height: 56,
                        }}
                      />
                      <div className="flex flex-col flex-1">
                        <p className="font-bold">{customer.name}</p>
                        <p className="text-sm">{customer.social}</p>
                      </div>
                    </div>
                    <Rating
                      name="ead-only"
                      defaultValue={5}
                      size="small"
                      readOnly
                    />
                  </div>
                  <Divider />
                  <p>{customer.text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default Feedback;
