"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Box, CircularProgress, Container } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Gallery = () => {
  const t = useTranslations("gallery");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // TODO: Handle a11y for the gallery
    <Box component="section" aria-hidden>
      <Container maxWidth="lg" className="my-8 lg:my-16">
        {!mounted ? (
          <Box
            component="div"
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label={t("loading")}
            sx={{
              p: 2,
              border: "1px dashed grey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <CircularProgress color="success" size={24} aria-hidden="true" />
            <span>{t("loading")}</span>
          </Box>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            navigation={true}
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            slidesPerView={2}
            centeredSlides={true}
            loop={true}
          >
            {[
              {
                src: "/images/recipes/smoothie-de-frutas.jpg",
                alt: t("smoothie"),
                loading: "eager",
              },
              {
                src: "/images/recipes/iogurte-de-frutas.jpg",
                alt: t("yogurte"),
                loading: "eager",
              },
              {
                src: "/images/recipes/overnight-oats.jpg",
                alt: t("overnight"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/geladinho.jpg",
                alt: t("geladinho"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/bombom-na-taca.jpg",
                alt: t("bombom"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/panqueca.jpg",
                alt: t("panqueca"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/brownie.jpg",
                alt: t("brownie"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/bolo-de-caneca.jpg",
                alt: t("bolo"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/mingau-de-aveia.jpg",
                alt: t("mingau"),
                loading: "lazy",
              },
              {
                src: "/images/recipes/chocolate-quente.jpg",
                alt: t("chocolate"),
                loading: "eager",
              },
            ].map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.src}
                  width={800}
                  height={800}
                  alt={image.alt}
                  style={{
                    objectFit: "cover",
                  }}
                  className="rounded-lg"
                  loading={image.loading as "eager" | "lazy"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </Box>
  );
};

export default Gallery;
