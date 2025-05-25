import Questions from "@/components/Questions";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Feedback from "@/components/Feedback";
import Gallery from "@/components/Gallery";
import Recipes from "@/components/Recipes";
import Hero from "@/components/Hero";
import Cta from "@/components/Cta";
import Header from "@/components/Header";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

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
      <Header />
      <Hero />
      <Cta />
      <Benefits />
      <Recipes />
      <Gallery />
      <Cta />
      <Feedback />
      <About />
      <Questions />
      <Cta />
      <Footer />
    </main>
  );
}
