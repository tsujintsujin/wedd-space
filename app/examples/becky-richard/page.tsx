import type { Metadata } from "next";
import { Alex_Brush, Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Becky & Richard | Sample wedd.space Page",
  robots: "noindex, follow",
};

const script = Alex_Brush({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const sans = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-sans" });

const INK = "#2E2E2E";
const MUTED = "#8A8A8A";
const GREEN = "#7C9070";
const GREEN_DEEP = "#5E6F52";
const CREAM = "#FAF8F5";

function Img({ label, src, className }: { label: string; src?: string; className?: string }) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-neutral-400 bg-neutral-200 text-center font-sans text-[11px] uppercase tracking-[0.14em] text-neutral-500 ${className ?? ""}`}
    >
      {label}
    </div>
  );
}

const ourStory = [
  { title: "How It Started", text: "A farmers market, a stolen glance, and one very contested bag of tomatoes.", src: "/examples/becky-richard/story-3.jpg" },
  { title: "Still Just Friends", text: "Or so we told everyone, right up until we very obviously weren't.", src: "/examples/becky-richard/story-4.jpg" },
  { title: "The Proposal", text: "April 2011. He finally found the courage. We haven't stopped laughing since.", src: "/examples/becky-richard/story-1.jpg" },
  { title: "Every Day Since", text: "Two apartments, one stubborn cat, and a whole lot of inside jokes.", src: "/examples/becky-richard/story-2.jpg" },
];

const schedule = [
  { icon: "glass", time: "5:30 PM", title: "Cocktail Hour", body: "The cocktail hour will immediately follow the ceremony in the same location. Please enjoy a cocktail (or two!) and some savoury treats while we take professional group pictures with our attendees." },
  { icon: "food", time: "6:30 PM", title: "Dinner and Dance", body: "Join us for a three course meal followed by dance and late night surprises! We've arranged for a fabulous DJ and ensured that he would be catering to all of you but mainly us." },
  { icon: "car", time: "12:00 AM", title: "Drive Safe", body: "And that's a wrap! Thank you for celebrating with us on this wonderful day. Don't leave anything behind and remember to drive safe!" },
];

const motif = [
  { name: "Sage", hex: "#7C9070" },
  { name: "Olive", hex: "#5E6F52" },
  { name: "Blush", hex: "#E3C9C4" },
  { name: "Dusty Rose", hex: "#C48D8A" },
  { name: "Cream", hex: "#FAF8F5" },
];

export default function BeckyRichardPage() {
  return (
    <div className={`${script.variable} ${sans.variable} min-h-dvh bg-white font-sans`} style={{ color: INK }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 md:px-14">
        <span className="font-sans text-lg tracking-wide">
          <span style={{ fontFamily: "var(--font-script)" }} className="text-2xl">Bella</span>
          <span className="ml-1 text-xs uppercase tracking-[0.2em]" style={{ color: MUTED }}>in love</span>
        </span>
        <div className="hidden items-center gap-8 font-sans text-xs uppercase tracking-[0.18em] md:flex" style={{ color: MUTED }}>
          <a href="#about" className="hover:text-black">About Us</a>
          <a href="#party" className="hover:text-black">Our Story</a>
          <a href="#church" className="hover:text-black">Church</a>
          <a href="#venue" className="hover:text-black">Venue</a>
          <a href="#details" className="hover:text-black">Details</a>
        </div>
        <a
          href="#rsvp"
          className="px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: GREEN }}
        >
          RSVP
        </a>
      </nav>

      {/* Hero */}
      <header className="relative">
        <Img label="Hero photo — forest, couple embracing" src="/examples/becky-richard/hero.jpg" className="h-[560px] w-full md:h-[640px]" />
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 text-center text-white">
          <p style={{ fontFamily: "var(--font-script)" }} className="text-5xl leading-tight md:text-6xl">
            Becky <span className="text-2xl align-middle">&amp;</span>
            <br />
            Richard
          </p>
          <a
            href="#rsvp"
            className="mt-6 px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
            style={{ backgroundColor: GREEN }}
          >
            RSVP Now
          </a>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80">&#8964;</div>
      </header>

      {/* Getting married banner */}
      <section className="relative overflow-hidden py-24 text-center" style={{ backgroundColor: "#EDEDEA" }}>
        <p style={{ fontFamily: "var(--font-script)" }} className="text-4xl">We&apos;re Getting Married!</p>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed" style={{ color: MUTED }}>
          Hi, <strong style={{ color: INK }}>John</strong> we joyfully invite you to share our happiness as we unite
          in marriage on April 9th, 2016.
        </p>
      </section>

      {/* How we met */}
      <section id="about" className="px-8 py-24 text-center md:px-14">
        <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>About us</p>
        <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">How We Met</h2>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.4fr_1fr]">
          <Img label="Bride portrait" src="/examples/becky-richard/bride.jpg" className="aspect-[3/4] w-full" />
          <p className="font-sans text-sm leading-relaxed" style={{ color: MUTED }}>
            We met in the fall of 2010 working at Freshly Squeezed. There were two back to back locations at the
            Eaton&apos;s Centre and although we worked in different stores we found every reason to greet each other
            whenever we bumped into one another. One year during the holidays, the managers threw a Christmas party
            for both stores and that&apos;s when we really connected.
            <br />
            <br />
            He had the same weird sense of humour as me and we never had a problem making each other laugh. We
            started talking to each other more and more, sometimes even using our coworkers as an excuse to go and
            eat. In April 2011 as we grew closer, the little bugger finally found the courage to ask me to be his
            girlfriend. The rest is history :)
          </p>
          <Img label="Groom portrait" src="/examples/becky-richard/groom.jpg" className="aspect-[3/4] w-full" />
        </div>
      </section>

      {/* Our story gallery */}
      <section id="party" className="py-24 text-center" style={{ backgroundColor: CREAM }}>
        <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>Our story</p>
        <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">A Few Moments</h2>
        <p className="mt-3 font-sans text-sm" style={{ color: MUTED }}>The short version of how we got here.</p>
        <div className="mt-12 grid grid-cols-2 gap-1 sm:grid-cols-4">
          {ourStory.map((s) => (
            <div key={s.title} className="relative">
              <Img label={s.title} src={s.src} className="aspect-[3/4] w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-left">
                <p className="font-sans text-sm font-semibold text-white">{s.title}</p>
                <p className="mt-1 max-w-[9rem] font-sans text-xs leading-snug text-white/80">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Church */}
      <section id="church" className="px-8 py-24 text-center md:px-14">
        <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>Church</p>
        <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">St. Andrew&apos;s Presbyterian Church</h2>
        <p className="mt-3 font-sans text-sm" style={{ color: MUTED }}>
          73 Simcoe St, Richmond Hill, ON L4C 3J9 (
          <a href="#" className="underline">Google Map</a>)
        </p>
        <Img
          label="Church exterior"
          src="/examples/becky-richard/church.jpg"
          className="mx-auto mt-10 aspect-[16/9] w-full max-w-3xl"
        />
        <div className="mx-auto mt-14 max-w-md text-left">
          <div className="flex gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg"
              style={{ backgroundColor: "#E4E1DA", color: GREEN_DEEP }}
              aria-hidden="true"
            >
              &#9679;
            </span>
            <div>
              <p className="font-sans text-sm font-semibold">4:30 PM - Ceremony</p>
              <p className="mt-1 font-sans text-sm leading-relaxed" style={{ color: MUTED }}>
                The ceremony will be held at St. Andrew&apos;s, ten minutes from the Country Club. Please arrive 15
                minutes earlier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue */}
      <section id="venue" className="px-8 py-24 text-center md:px-14" style={{ backgroundColor: CREAM }}>
        <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>Venue</p>
        <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">Richmond Hill Country Club</h2>
        <p className="mt-3 font-sans text-sm" style={{ color: MUTED }}>
          8901 Bathurst St, Richmond Hill, ON L4C 0H4 (
          <a href="#" className="underline">Google Map</a>)
        </p>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-10 text-left sm:grid-cols-2">
          {schedule.map((s) => (
            <div key={s.title} className="flex gap-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg"
                style={{ backgroundColor: "#E4E1DA", color: GREEN_DEEP }}
                aria-hidden="true"
              >
                &#9679;
              </span>
              <div>
                <p className="font-sans text-sm font-semibold">{s.time} - {s.title}</p>
                <p className="mt-1 font-sans text-sm leading-relaxed" style={{ color: MUTED }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motif & dress code */}
      <section id="details" className="px-8 py-24 md:px-14">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 md:grid-cols-2">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>Color motif</p>
            <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">Our Palette</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed" style={{ color: MUTED }}>
              Sage, olive, and blush. Feel free to draw from these if you&apos;re picking an outfit.
            </p>
            <div className="mt-6 flex gap-3">
              {motif.map((m) => (
                <div key={m.name} className="text-center">
                  <span
                    className="block h-12 w-12 rounded-full border border-black/10"
                    style={{ backgroundColor: m.hex }}
                    aria-hidden="true"
                  />
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                    {m.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>Dress code</p>
            <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">Garden Formal</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed" style={{ color: MUTED }}>
              Cocktail dresses and suits, please. Think garden party, not black tie. Most of the evening is
              outdoors, so flat or block heels are your friend. And, kindly, no white or ivory.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section id="rsvp" className="px-8 py-24 text-center md:px-14" style={{ backgroundColor: CREAM }}>
        <p className="font-sans text-xs uppercase tracking-[0.24em]" style={{ color: MUTED }}>RSVP</p>
        <h2 style={{ fontFamily: "var(--font-script)" }} className="mt-3 text-4xl">What Are You Waiting For?</h2>
        <p className="mt-3 font-sans text-sm" style={{ color: MUTED }}>
          We would greatly appreciate it if you could respond before February 29th.
        </p>
        <a
          href="#rsvp"
          className="mt-6 inline-block px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: GREEN }}
        >
          RSVP Now
        </a>
      </section>

      {/* Gallery strip */}
      <section className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        <Img label="Gallery photo" src="/examples/becky-richard/gallery-1.jpg" className="aspect-[4/5] w-full" />
        <Img label="Gallery photo" src="/examples/becky-richard/gallery-2.jpg" className="aspect-[4/5] w-full" />
        <Img label="Gallery photo" src="/examples/becky-richard/gallery-3.jpg" className="aspect-[4/5] w-full" />
      </section>

      <footer className="px-8 py-10 text-center md:px-14">
        <p className="font-sans text-xs uppercase tracking-[0.16em]" style={{ color: MUTED }}>
          Bella in Love &middot; #BellaInLove2016
        </p>
      </footer>
    </div>
  );
}
