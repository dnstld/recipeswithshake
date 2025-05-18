"use client";

import { useTranslations } from "next-intl";
import Fab from "@mui/material/Fab";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";

const Cta = () => {
  const t = useTranslations("hero");

  return (
    <section className="flex justify-center">
      <Fab className="block mx-auto">
        <BookmarkAdd sx={{ mr: 1 }} />
        {t("cta")}
      </Fab>
    </section>
  );
};

export default Cta;
