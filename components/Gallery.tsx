"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Box, Container } from "@mui/material";

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
    <Box component="section">
      <Container maxWidth="lg" className="my-8 lg:my-16">
        {!mounted ? (
          <div className="w-full bg-gray-300 animate-pulse rounded-lg h-36 sm:h-80 md:h-96"></div>
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
              },
              {
                src: "/images/recipes/iogurte-de-frutas.jpg",
                alt: t("yogurte"),
              },
              {
                src: "/images/recipes/overnight-oats.jpg",
                alt: t("overnight"),
              },
              {
                src: "/images/recipes/geladinho.jpg",
                alt: t("geladinho"),
              },
              {
                src: "/images/recipes/bombom-na-taca.jpg",
                alt: t("bombom"),
              },
              {
                src: "/images/recipes/panqueca.jpg",
                alt: t("panqueca"),
              },
              {
                src: "/images/recipes/brownie.jpg",
                alt: t("brownie"),
              },
              {
                src: "/images/recipes/bolo-de-caneca.jpg",
                alt: t("bolo"),
              },
              {
                src: "/images/recipes/mingau-de-aveia.jpg",
                alt: t("mingau"),
              },
              {
                src: "/images/recipes/chocolate-quente.jpg",
                alt: t("chocolate"),
              },
            ].map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.src}
                  width={800}
                  height={800}
                  alt={image.alt}
                  objectFit="cover"
                  className="rounded-lg"
                  loading="eager"
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
