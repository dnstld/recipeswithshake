"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

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

  const images = [
    { src: "/images/geladinho.jpg", alt: t("geladinho") },
    { src: "/images/overnight.jpg", alt: t("overnight") },
    { src: "/images/smoothie.jpeg", alt: t("smoothie") },
    { src: "/images/uva.jpg", alt: t("uva") },
    { src: "/images/yogurte.jpg", alt: t("yogurte") },
  ];

  return (
    <section className="p-4 bg-amber-200 text-center leading-6 md:leading-8 md:text-xl">
      <div className="flex flex-col gap-4 mx-auto max-w-6xl">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>
          <p>{t("sweet-recipes")}</p>
          <p>{t("cold-recipes")}</p>
          <p>{t("hot-recipes")}</p>
        </div>

        <h3 className="text-xl font-bold">{t("swiper-title")}</h3>

        <div>
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
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.src}
                    width={500}
                    height={500}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <button>{t("cta")}</button>
    </section>
  );
};

export default Gallery;
