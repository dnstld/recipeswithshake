import { useTranslations } from "next-intl";
import { Avatar, Box, Container } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

const About = () => {
  const t = useTranslations("about");

  return (
    <Box
      component="section"
      className="py-8 lg:py-16 bg-gradient-to-r from-yellow-500 to-pink-500"
    >
      <Container maxWidth="lg" className="my-4">
        <div className="max-w-sm lg:max-w-md mx-auto gap-4">
          <div className="flex flex-col items-center text-center gap-4">
            <Avatar
              src={"/images/gi-toledo.jpg"}
              alt={t("alt")}
              sx={{ width: 100, height: 100 }}
            />
            <div>
              <p className="text-4xl font-bold tracking-tight">{t("name")}</p>
              <p>{t("from")}</p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/receitascomshake/"
                target="_blank"
                className="transform transition duration-300 hover:scale-150"
              >
                <Instagram />
              </a>
              <a
                href="https://www.instagram.com/receitascomshake/"
                target="_blank"
                className="transform transition duration-300 hover:scale-150"
              >
                <Facebook />
              </a>
            </div>

            <p className="text-xl inline-flex flex-col gap-2">
              {t.rich("bio", {
                span: (chuncks) => <span>{chuncks}</span>,
              })}
            </p>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default About;
