import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Timer from "@/components/Timer";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata() {
  const messages: AbstractIntlMessages = await getMessages();
  const title =
    typeof messages.meta === "object" && messages.meta
      ? messages.meta.title
      : "Doce vida - Gisele Stein";
  const description =
    typeof messages.meta === "object" && messages.meta
      ? messages.meta.description
      : "Descubra 10 receitas doces ricas em proteínas para diversificar seus cafés da manhã, lanches ou refeições pós-treino - apoiando seus objetivos de perda de peso ou ganho muscular";
  return { title, description };
}

export default function Home() {
  return (
    <main className="w-full">
      <Timer />
      <Hero />
      <Gallery />
    </main>
  );
}
