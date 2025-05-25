import { useTranslations } from "next-intl";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CakeIcon from "@mui/icons-material/Cake";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import { Avatar, Card, CardContent, Box, Container } from "@mui/material";

const Benefits = () => {
  const t = useTranslations("benefits");

  return (
    <Box component="section">
      <Container maxWidth="lg" className="my-8 lg:my-16">
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
              <Card className="h-full">
                <CardContent className="flex sm:flex-col flex-grow gap-4">
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "secondary.light",
                      color: "primary.main",
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
      </Container>
    </Box>
  );
};

export default Benefits;
