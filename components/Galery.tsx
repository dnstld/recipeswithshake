"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Gallery = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const images = [
    { src: "/images/geladinho.jpg", alt: "Frozen popsicle dessert" },
    { src: "/images/overnight.jpg", alt: "Overnight oats breakfast" },
    { src: "/images/smoothie.jpeg", alt: "Fruit smoothie" },
    { src: "/images/uva.jpg", alt: "Fresh grapes" },
    { src: "/images/yogurte.jpg", alt: "Yogurt with toppings" },
  ];

  if (!mounted) {
    return (
      <div className="w-full bg-gray-300 animate-pulse rounded-lg h-36 sm:h-80 md:h-96"></div>
    );
  }

  return (
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
          <Image src={image.src} width={500} height={500} alt={image.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Gallery;
