import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Showcase />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
