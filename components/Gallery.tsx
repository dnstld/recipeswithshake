"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Chip from "@mui/material/Chip";

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
    <section>
      <div className="mx-auto max-w-full lg:max-w-7xl lg:px-16 py-8 sm:py-16 space-y-8">
        <h3 className="heading-2">{t("swiper-title")}</h3>
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
                alt: t("recipies.smoothie"),
              },
              {
                src: "/images/recipes/iogurte-de-frutas.jpg",
                alt: t("recipies.yogurte"),
              },
              {
                src: "/images/recipes/overnight-oats.jpg",
                alt: t("recipies.overnight"),
              },
              {
                src: "/images/recipes/geladinho.jpg",
                alt: t("recipies.geladinho"),
              },
              {
                src: "/images/recipes/bombom-na-taca.jpg",
                alt: t("recipies.bombom"),
              },
              {
                src: "/images/recipes/panqueca.jpg",
                alt: t("recipies.panqueca"),
              },
              {
                src: "/images/recipes/brownie.jpg",
                alt: t("recipies.brownie"),
              },
              {
                src: "/images/recipes/bolo-de-caneca.jpg",
                alt: t("recipies.bolo"),
              },
              {
                src: "/images/recipes/mingau-de-aveia.jpg",
                alt: t("recipies.mingau"),
              },
              {
                src: "/images/recipes/chocolate-quente.jpg",
                alt: t("recipies.chocolate"),
              },
            ].map((image, index) => (
              <SwiperSlide key={index}>
                <Chip
                  label={image.alt}
                  className="absolute top-4 right-4"
                  color="primary"
                  size="medium"
                />
                <Image
                  src={image.src}
                  width={800}
                  height={800}
                  alt={image.alt}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Gallery;
