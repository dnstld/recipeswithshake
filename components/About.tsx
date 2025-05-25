import { useTranslations } from "next-intl";
import Image from "next/image";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import GroupIcon from "@mui/icons-material/Group";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import CakeIcon from "@mui/icons-material/Cake";
import WomanIcon from "@mui/icons-material/Woman";
import { Box, Container } from "@mui/material";

const About = () => {
  const t = useTranslations("about");

  return (
    <Box component="section">
      <Container maxWidth="lg" className="my-8 lg:my-16">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
          <div className="relative aspect-3/2 rounded-r-2xl rounded-tl-2xl md:rounded-bl-2xl md:rounded-br-none overflow-hidden">
            <Image
              src={"/images/gi-toledo.jpg"}
              objectFit="cover"
              fill
              alt={t("alt")}
            />
          </div>
          <div className="text-left">
            <h2 className="text-4xl font-bold tracking-tight lg:leading-16 sm:text-5xl md:text-6xl mb-4">
              {t("title")}
            </h2>
            <p className="text-xl font-bold mb-4">{t("me")}</p>
            {[
              {
                text: t("family"),
                icon: <Diversity1Icon color="secondary" aria-hidden={true} />,
              },

              {
                text: t("entrepreneur"),
                icon: (
                  <MonitorWeightIcon color="secondary" aria-hidden={true} />
                ),
              },
              {
                text: t("years"),
                icon: <GroupIcon color="secondary" aria-hidden={true} />,
              },
              {
                text: t("creator"),
                icon: (
                  <PermDeviceInformationIcon
                    color="secondary"
                    aria-hidden={true}
                  />
                ),
              },
              {
                text: t("sweet"),
                icon: <CakeIcon color="secondary" aria-hidden={true} />,
              },
              {
                text: t("shielded"),
                icon: <WomanIcon color="secondary" aria-hidden={true} />,
              },
            ].map((item, index) => (
              <span key={index} className="flex gap-2 lg:gap-4 leading-8">
                {item.icon}
                <p>{item.text}</p>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default About;
