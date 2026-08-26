import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

export const metadata: Metadata = {
  title: "Marry Monday | Sample wedd.space Page",
  robots: "noindex, follow",
};

const serif = Fraunces({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mm-serif" });

const INK = "#1B2A22";
const MUTED = "#6E7A72";
const BG = "#F3F1EA";
const LINE = "#D8D4C6";

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
      className={`flex items-center justify-center border border-dashed border-neutral-400 bg-neutral-200 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500 ${className ?? ""}`}
    >
      {label}
    </div>
  );
}

function GhostNumeral({ n, className }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-mm-serif ${className ?? ""}`}
      style={{ fontFamily: "var(--font-mm-serif)", color: "transparent", WebkitTextStroke: `1px ${LINE}` }}
    >
      {n}
    </span>
  );
}

function Mountains({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 200"
      className={className}
      style={{ color: LINE }}
    >
      <path
        d="M0 180 L90 90 L150 140 L230 40 L310 150 L380 70 L460 170 L540 60 L620 160 L700 100 L800 180"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 190 L120 130 L200 175 L300 110 L400 185 L520 120 L620 185 L720 140 L800 190"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

const restaurants = [
  "Truckee Tavern & Grill",
  "Char Cristiano's",
  "River Grill",
  "Pizza N' Pasta",
  "Jax Woodie Beach Grill",
  "Log Cabin Caffe",
  "Full Belly Deli",
];

const activities = ["Hiking", "Paddleboarding", "Kayaking", "Boating", "Biking", "Fall Fishing"];

export default function MarryMondayPage() {
  return (
    <div className={`${serif.variable} min-h-dvh font-mono`} style={{ backgroundColor: BG, color: INK }}>
      {/* left rail */}
      <div className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col items-center justify-between border-r py-8 md:flex" style={{ borderColor: LINE }}>
        <span className="text-[10px]" style={{ color: MUTED }}>01</span>
        <div className="flex flex-col items-center gap-8 text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
          <span className="[writing-mode:vertical-rl]">Story</span>
          <span className="[writing-mode:vertical-rl]">Gallery</span>
          <span className="[writing-mode:vertical-rl]">Ceremony</span>
          <span className="[writing-mode:vertical-rl]">Details</span>
          <span className="[writing-mode:vertical-rl]">RSVP</span>
        </div>
        <span className="text-[10px]" style={{ color: MUTED }}>19</span>
      </div>

      <div className="mx-auto max-w-6xl md:pl-14">
        {/* hero */}
        <header id="top" className="relative overflow-hidden px-6 pt-16 md:px-16 md:pt-24">
          <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
            <span>Monday, October 14, 2019</span>
            <span>Alice &amp; Drew</span>
          </div>
          <div className="mt-10 grid grid-cols-1 items-end gap-10 pb-24 md:grid-cols-[1.3fr_1fr] md:gap-6">
            <div>
              <h1
                className="max-w-2xl text-6xl leading-[1.05] md:text-8xl"
                style={{ fontFamily: "var(--font-mm-serif)", fontWeight: 600 }}
              >
                Marry
                <br />
                Monday.
              </h1>
              <p className="relative z-10 mt-6 max-w-xs text-sm leading-relaxed" style={{ color: MUTED }}>
                Join the celebration as Alice and Drew tie the knot on the shores of beautiful Lake Tahoe,
                California.
              </p>
              <a href="#rsvp" className="relative z-10 mt-4 inline-block text-[11px] underline underline-offset-4">RSVP</a>
            </div>
            <Img label="Alice and Drew" src="/examples/marry-monday/hero.jpg" className="aspect-[4/5] w-full" />
          </div>
          <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-70" />
        </header>

        {/* story */}
        <section id="story" className="relative border-t px-6 py-20 md:px-16" style={{ borderColor: LINE }}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1fr_0.8fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Story</p>
              <p className="mt-3 text-3xl" style={{ fontFamily: "var(--font-mm-serif)" }}>
                Ten years,
                <br />
                one lake.
              </p>
            </div>
            <div>
              <p className="max-w-md text-sm leading-relaxed" style={{ color: MUTED }}>
                We met as camp counselors on the shore of Lake Tahoe the summer after college and spent the next
                decade finding our way back to it, one trip at a time. Drew proposed at Lake Louise on a hike that
                was supposed to be a shortcut. It was not a shortcut. Alice said yes anyway.
              </p>
              <div className="mt-8 flex gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Met</p>
                  <p className="mt-1 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>2009</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Engaged</p>
                  <p className="mt-1 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>2018</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Married</p>
                  <p className="mt-1 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>2019</p>
                </div>
              </div>
            </div>
            <Img label="Under the trees at camp" src="/examples/marry-monday/story.jpg" className="aspect-[3/4] w-full" />
          </div>
        </section>

        {/* gallery */}
        <section id="gallery" className="relative border-t px-6 py-20 md:px-16" style={{ borderColor: LINE }}>
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Gallery</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:h-[480px] sm:grid-cols-[2fr_1fr] sm:items-end">
            <Img label="Proposal photo — lakeside" src="/examples/marry-monday/proposal.jpg" className="aspect-[4/5] w-full sm:h-full sm:aspect-auto" />
            <Img label="Ring detail" src="/examples/marry-monday/ring.jpg" className="aspect-[3/4] w-full sm:h-[75%] sm:aspect-auto" />
          </div>
          <div className="mt-9 flex items-end justify-between sm:mt-3">
            <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: MUTED }}>Lake Louise &middot; The proposal</p>
            <GhostNumeral n="14" className="text-7xl md:text-9xl" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Img label="Couple by the lake" src="/examples/marry-monday/lake.jpg" className="aspect-[4/5] w-full" />
            <Img label="Candid close-up" src="/examples/marry-monday/candid.jpg" className="aspect-[4/5] w-full" />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: MUTED }}>Oct 14, 2019 &middot; Happy tears</p>
            <GhostNumeral n="19" className="text-7xl md:text-9xl" />
          </div>
        </section>

        {/* ceremony */}
        <section id="ceremony" className="relative border-t px-6 py-20 md:px-16" style={{ borderColor: LINE }}>
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Ceremony</p>
          <h2 className="mt-3 text-3xl" style={{ fontFamily: "var(--font-mm-serif)" }}>Sunset Point</h2>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Time</p>
              <p className="mt-2 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>4:00 PM</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Where</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed" style={{ color: MUTED }}>
                West Shore Trailhead, Lake Tahoe. Seating begins at 3:45 PM. It&apos;s a short walk from the
                parking area, wear real shoes.
              </p>
            </div>
          </div>
        </section>

        {/* details */}
        <section id="details" className="relative overflow-hidden border-t px-6 py-20 md:px-16" style={{ borderColor: LINE }}>
          <p className="relative z-10 text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Reception</p>
          <h2
            className="relative z-10 mt-3 text-6xl leading-[1.05] md:text-8xl"
            style={{ fontFamily: "var(--font-mm-serif)", fontWeight: 600 }}
          >
            Lake
            <br />
            Tahoe,
            <br />
            Ca
          </h2>
          <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-50" />
        </section>

        {/* details grid */}
        <section className="grid grid-cols-1 gap-x-10 gap-y-12 px-6 pb-24 md:grid-cols-3 md:px-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>The venue</p>
            <p className="mt-3 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>
              5160 W. Lake
              <br />
              Homewood,
              <br />
              CA 96141
            </p>
            <a href="#" className="mt-2 inline-block text-[11px] underline underline-offset-4">West Shore Cafe</a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>The airport</p>
            <p className="mt-3 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>
              Reno International
              <br />
              Airport
            </p>
            <a href="#" className="mt-2 inline-block text-[11px] underline underline-offset-4">Book A Flight</a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>The lodging</p>
            <p className="mt-3 max-w-[16rem] text-xs leading-relaxed" style={{ color: MUTED }}>
              We recommend the guests stay at King&apos;s Beach, CA on the northshore of Lake Tahoe near all of the
              venue.
            </p>
            <p className="mt-3 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>Tahoe Vistana Inn</p>
            <a href="#" className="mt-2 inline-block text-[11px] underline underline-offset-4">Book A Room</a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Food &amp; drink</p>
            <p className="mt-3 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>A Few Favorites</p>
            <ul className="mt-3 space-y-1 text-xs" style={{ color: MUTED }}>
              {restaurants.map((r) => (
                <li key={r}>
                  <a href="#" className="underline underline-offset-4">{r}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Activities</p>
            <p className="mt-3 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>Pack Layers</p>
            <ul className="mt-3 space-y-1 text-xs" style={{ color: MUTED }}>
              {activities.map((a) => (
                <li key={a}>
                  <a href="#" className="underline underline-offset-4">{a}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* footer repeat */}
        <footer id="rsvp" className="relative overflow-hidden border-t px-6 py-16 md:px-16" style={{ borderColor: LINE }}>
          <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full opacity-40" />
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>Events</p>
              <p className="mt-3 text-sm" style={{ color: MUTED }}>Rehearsal Dinner &middot; Vista Room</p>
              <p className="text-sm" style={{ color: MUTED }}>Reception &middot; Pool Deck</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>RSVP by</p>
              <p className="mt-3 text-xl" style={{ fontFamily: "var(--font-mm-serif)" }}>
                Monday October 14 2019
              </p>
              <a href="#" className="mt-2 inline-block text-[11px] underline underline-offset-4">RSVP</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
