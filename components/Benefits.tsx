import { useTranslations } from "next-intl";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CakeIcon from "@mui/icons-material/Cake";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import { Avatar, Card, CardContent } from "@mui/material";

const Benefits = () => {
  const t = useTranslations("benefits");

  return (
    <section>
      <div className="mx-auto max-w-full lg:max-w-7xl flex flex-col px-4 sm:px-8 lg:px-16 py-8 sm:py-16">
        <h2 className="heading-2">{t("title")}</h2>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 text-xl items-stretch">
          {[
            {
              icon: <FamilyRestroomIcon fontSize="large" />,
              text: t("benefit-1"),
            },
            { icon: <CakeIcon fontSize="large" />, text: t("benefit-2") },
            {
              icon: <FitnessCenterIcon fontSize="large" />,
              text: t("benefit-3"),
            },
            {
              icon: <HealthAndSafetyIcon fontSize="large" />,
              text: t("benefit-4"),
            },
            {
              icon: <KebabDiningIcon fontSize="large" />,
              text: t("benefit-5"),
            },
          ].map((item, index) => (
            <li key={index} className="h-full">
              <Card variant="outlined" className="h-full">
                <CardContent className="flex sm:flex-col items-center flex-grow gap-4 text-left sm:text-center">
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "#ffccd3",
                      color: "secondary.main",
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  {item.text}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
