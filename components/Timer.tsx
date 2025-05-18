"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const Timer = () => {
  const t = useTranslations("timer");
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <section className="bg-rose-900 text-white">
      <div className="mx-auto max-w-full lg:max-w-7xl flex flex-col items-center p-2 md:p-4">
        <p className="font-bold mb-2">{t("title")}</p>

        <div className="flex justify-center gap-1 md:gap-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">
              {formattedHours}
            </span>
            <span className="text-xs md:text-sm">{t("hours")}</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">
              {formattedMinutes}
            </span>
            <span className="text-xs md:text-sm">{t("minutes")}</span>
          </div>
          <span className="text-2xl md:text-3xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">
              {formattedSeconds}
            </span>
            <span className="text-xs md:text-sm">{t("seconds")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timer;
