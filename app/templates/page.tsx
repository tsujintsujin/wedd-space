import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import TemplatesGrid from "./TemplatesGrid";

export const metadata: Metadata = {
  title: "Templates | wedd.space",
  description: "Browse wedding website templates built with wedd.space.",
};

export default function TemplatesPage() {
  return (
    <>
      <Header showNavLinks={false} />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-[calc(var(--header-height,72px)+3rem)] md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-wine">Templates</p>
        <h1 className="mt-4 font-display text-4xl italic leading-[1.05] text-ink md:text-5xl">
          Every page starts as one of these.
        </h1>
        <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-muted">
          Real, live wedd.space pages &mdash; not mockups. Click any thumbnail to open the full site.
        </p>

        <div className="mt-14">
          <TemplatesGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
