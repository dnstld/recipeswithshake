"use client";

import { useTranslations } from "next-intl";
import { Box, Container, Tooltip, IconButton } from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BentoIcon from "@mui/icons-material/Bento";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { red, blue } from "@mui/material/colors";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Recipes = () => {
  const t = useTranslations("recipes");

  return (
    <Box component="section">
      <Container
        maxWidth="lg"
        className="my-8 lg:my-16 flex flex-col gap-8 lg:gap-16"
      >
        <h2 className="text-4xl font-bold tracking-tight lg:leading-16 sm:text-5xl md:text-6xl text-center max-w-2xl mx-auto">
          <span>
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
                  {chunks}
                </span>
              ),
            })}
          </span>
          <Tooltip
            title={t("tooltip")}
            sx={{ marginLeft: 1, position: "absolute" }}
          >
            <IconButton>
              <InfoOutlineIcon />
            </IconButton>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:gap-8 max-w-lg mx-auto">
          <div className="flex flex-col items-end gap-2 text-right">
            <KitchenIcon fontSize="large" sx={{ color: blue[500] }} />
            <p className="text-xl font-bold tracking-tight">
              {t("cold-recipes.title")}
            </p>
            <p>{t("cold-recipes.description")}</p>
          </div>
          <div className="flex flex-col gap-2">
            <BentoIcon fontSize="large" sx={{ color: red[500] }} />
            <p className="text-xl font-bold tracking-tight">
              {t("hot-recipes.title")}
            </p>
            <p>{t("hot-recipes.description")}</p>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Recipes;
