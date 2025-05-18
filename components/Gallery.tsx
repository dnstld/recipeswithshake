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
              { src: "/images/geladinho.jpg", alt: t("geladinho") },
              { src: "/images/overnight.jpg", alt: t("overnight") },
              { src: "/images/smoothie.jpeg", alt: t("smoothie") },
              { src: "/images/uva.jpg", alt: t("uva") },
              { src: "/images/yogurte.jpg", alt: t("yogurte") },
            ].map((image, index) => (
              <SwiperSlide key={index}>
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
