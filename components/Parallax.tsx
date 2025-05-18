"use client";

import { useEffect, useRef } from "react";

interface ParallaxSectionProps {
  backgroundImage: string;
  height?: string;
  speed?: number;
  children?: React.ReactNode;
  className?: string;
}

const Parallax = ({
  backgroundImage,
  height = "h-96",
  speed = 0.5,
  children,
  className = "",
}: ParallaxSectionProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;

      const element = parallaxRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const windowHeight = window.innerHeight;

      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const scrolled = scrollTop - elementTop + windowHeight;
        const parallaxOffset = scrolled * speed;

        // Apply transform to the background
        element.style.backgroundPosition = `center ${-parallaxOffset}px`;
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Trigger initial calculation
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={parallaxRef}
      className={`w-full ${height} bg-cover bg-no-repeat bg-center overflow-hidden relative ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "scroll",
      }}
    >
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default Parallax;
