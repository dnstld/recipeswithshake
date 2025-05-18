import { useTranslations } from "next-intl";
import Image from "next/image";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import GroupIcon from "@mui/icons-material/Group";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import CakeIcon from "@mui/icons-material/Cake";
import WomanIcon from "@mui/icons-material/Woman";

const About = () => {
  const t = useTranslations("about");

  const aboutItems = [
    {
      text: t("family"),
      icon: <Diversity1Icon />,
    },

    {
      text: t("entrepreneur"),
      icon: <MonitorWeightIcon />,
    },
    {
      text: t("years"),
      icon: <GroupIcon />,
    },
    {
      text: t("creator"),
      icon: <PermDeviceInformationIcon />,
    },
    {
      text: t("sweet"),
      icon: <CakeIcon />,
    },
    {
      text: t("shielded"),
      icon: <WomanIcon />,
    },
  ];

  return (
    <section className="bg-rose-800 text-white">
      <div className="mx-auto max-w-full lg:max-w-7xl flex flex-col px-4 sm:px-8 lg:px-16 py-8 sm:py-16">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
          <div className="relative aspect-3/2 rounded-r-2xl rounded-tl-2xl md:rounded-bl-2xl md:rounded-br-none overflow-hidden">
            <Image
              src={"/images/gi-toledo.jpg"}
              objectFit="cover"
              fill
              alt={t("alt")}
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <h2 className="heading-2">{t("title")}</h2>
            <p className="text-xl font-bold mb-4">{t("me")}</p>
            {aboutItems.map((item, index) => (
              <span key={index} className="flex gap-2 lg:gap-4">
                {item.icon}
                <p>{item.text}</p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
