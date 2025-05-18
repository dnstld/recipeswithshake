"use client";

import { useTranslations } from "next-intl";
import { Chip, Card, CardContent } from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BentoIcon from "@mui/icons-material/Bento";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Recipes = () => {
  const t = useTranslations("gallery");

  return (
    <section>
      <div className="mx-auto max-w-full lg:max-w-7xl px-4 sm:px-8 lg:px-16 py-8 sm:py-16 space-y-8">
        <div>
          <h2 className="heading-2">{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-8">
          <Card variant="outlined">
            <CardContent>
              <Chip
                label={t("cold-recipes.title")}
                icon={<KitchenIcon fontSize="small" />}
                sx={{
                  bgcolor: "#f0f9ff",
                }}
                className="mb-2"
              />
              <p>{t("cold-recipes.description")}</p>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Chip
                label={t("hot-recipes.title")}
                icon={<BentoIcon fontSize="small" />}
                sx={{
                  bgcolor: "#fef2f2",
                }}
                className="mb-2"
              />
              <p>{t("hot-recipes.description")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Recipes;
