import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Clock3,
  Compass,
  MapPin,
  MoonStar,
  Scissors,
  Sparkles,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { TestimonialShowcase } from "./components/ui/testimonial-showcase";
import {
  createEntranceContainer,
  createEntranceItem,
  createPageTransition,
  createScrollItem,
  createScrollStagger,
  createStaggerItem,
} from "./animations";

const offerings = [
  { label: "Signature Fade", detail: "Detailed blend, shape-up, and neckline finish." },
  { label: "Hair + Beard", detail: "Balanced beard sculpting with a softer, natural line." },
  { label: "Hot Towel Finish", detail: "A calm reset at the end of the appointment." },
];

const notes = [
  "Muslim-owned and neighborhood rooted",
  "Quiet room with intentional pacing",
  "Appointment-first, never assembly-line energy",
];

const standards = [
  {
    title: "Consult before clippers",
    detail:
      "Every appointment starts with a short read on head shape, beard density, and how sharp or soft the finish should feel.",
    icon: Compass,
  },
  {
    title: "A calmer room",
    detail:
      "Muted palette, low-volume atmosphere, and enough space to make the chair feel composed instead of frantic.",
    icon: MoonStar,
  },
  {
    title: "Finish that lasts",
    detail:
      "Temple work, beard transitions, and neckline cleanup are handled so the cut still reads clean several days later.",
    icon: Sparkles,
  },
];

function CalligraphyBackdrop({ reduceMotion, scrollY }) {
  const y = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 105]);
  const rotate = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -4]);
  const scale = useTransform(scrollY, [0, 700], [1, reduceMotion ? 1 : 1.06]);
  const opacity = useTransform(scrollY, [0, 500], [0.86, reduceMotion ? 0.86 : 0.34]);

  const drawTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.45, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      className="calligraphy-backdrop absolute inset-0 h-full w-full"
      style={{ y, rotate, scale, opacity }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, filter: "blur(18px)" }}
      animate={reduceMotion ? undefined : { opacity: 0.86, scale: 1, filter: "blur(0px)" }}
      transition={reduceMotion ? undefined : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.path
        d="M184 268c124-38 254-31 388 22 94 37 176 97 252 179 89 96 183 159 283 188 74 21 142 26 204 16"
        className="calligraphy-stroke soft"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ ...drawTransition, delay: 0.14 }}
      />
      <motion.path
        d="M232 542c121 33 239 36 355 10 108-24 209-76 302-156 85-73 172-118 262-136 78-15 153-11 225 13"
        className="calligraphy-stroke soft"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ ...drawTransition, delay: 0.22 }}
      />

      <motion.path
        d="M416 472c50-44 96-67 139-67 41 0 73 12 96 36 20 22 34 50 42 84 8 33 17 56 28 68 12 12 28 18 48 18 40 0 73-24 99-71"
        className="calligraphy-stroke"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ ...drawTransition, delay: 0.26 }}
      />
      <motion.path
        d="M902 540c22-79 56-134 101-163 31-21 69-31 112-31 54 0 100 17 136 49 37 33 55 75 55 125"
        className="calligraphy-stroke fine"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ ...drawTransition, delay: 0.34 }}
      />
      <motion.path
        d="M1128 404c-17 65-18 119-5 161 13 41 36 72 69 91"
        className="calligraphy-stroke fine"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ ...drawTransition, delay: 0.42 }}
      />
      <motion.circle
        cx="846"
        cy="366"
        r="8"
        className="calligraphy-dot"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={reduceMotion ? undefined : { delay: 0.64, duration: 0.42 }}
      />
      <motion.circle
        cx="878"
        cy="340"
        r="6"
        className="calligraphy-dot"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={reduceMotion ? undefined : { delay: 0.72, duration: 0.42 }}
      />
      <motion.circle
        cx="1228"
        cy="352"
        r="7"
        className="calligraphy-dot"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={reduceMotion ? undefined : { delay: 0.8, duration: 0.42 }}
      />
    </motion.svg>
  );
}

function FooterHeadlineLine({ label, progress, reduceMotion, start = 0, end = 1 }) {
  const midpoint = start + (end - start) * 0.48;
  const y = useTransform(progress, [start, end], [reduceMotion ? 0 : 92, 0]);
  const scale = useTransform(progress, [start, end], [reduceMotion ? 1 : 1.035, 1]);
  const opacity = useTransform(
    progress,
    [start, midpoint, end],
    reduceMotion ? [1, 1, 1] : [0.26, 0.52, 1],
  );
  const clipPath = useTransform(
    progress,
    [start, end],
    reduceMotion
      ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"]
      : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    <div className="relative overflow-hidden">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(4.6rem,16vw,11.75rem)] leading-[0.8] tracking-[-0.075em] text-ink/12"
      >
        {label}
      </p>
      <motion.p
        aria-hidden="true"
        className="absolute inset-0 font-display text-[clamp(4.6rem,16vw,11.75rem)] leading-[0.8] tracking-[-0.075em] text-ink"
        style={{ y, scale, opacity, clipPath }}
      >
        {label}
      </motion.p>
    </div>
  );
}

function InstagramGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.15" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const footerRef = useRef(null);
  const { scrollYProgress: footerScrollProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    let activeAnimation;

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const id = href?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      activeAnimation?.stop();

      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + window.scrollY;

      if (reduceMotion) {
        window.scrollTo(0, end);
      } else {
        activeAnimation = animate(start, end, {
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest) => window.scrollTo(0, latest),
        });
      }

      window.history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      activeAnimation?.stop();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [reduceMotion]);

  const pageMotion = createPageTransition(reduceMotion);
  const heroStagger = createEntranceContainer(reduceMotion, {
    delayChildren: 0.26,
    staggerChildren: 0.16,
  });
  const heroItem = createEntranceItem(reduceMotion, { distance: 42 });
  const servicesStagger = createScrollStagger(reduceMotion, {
    amount: 0.16,
    delayChildren: 0.06,
    staggerChildren: 0.1,
  });
  const serviceItem = createScrollItem(reduceMotion, { distance: 30 });
  const heroBackdropY = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : 85]);
  const heroBackdropOpacity = useTransform(scrollY, [0, 420], [1, reduceMotion ? 1 : 0.42]);
  const heroContentY = useTransform(scrollY, [0, 450], [0, reduceMotion ? 0 : -28]);
  const footerEyebrowY = useTransform(footerScrollProgress, [0, 1], [reduceMotion ? 0 : 24, 0]);
  const footerContentY = useTransform(footerScrollProgress, [0, 1], [reduceMotion ? 0 : 46, 0]);
  const footerContentOpacity = useTransform(
    footerScrollProgress,
    [0, 0.3, 1],
    reduceMotion ? [1, 1, 1] : [0.2, 0.52, 1],
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div key="qureshi-cuts-page" className="bg-paper text-ink" {...pageMotion}>
        <main className="relative z-10 mb-[100svh] bg-paper shadow-[0_28px_90px_rgba(22,18,15,0.12)]">
          <section className="relative flex min-h-[100svh] overflow-hidden">
            <motion.div
              style={{ y: heroBackdropY, opacity: heroBackdropOpacity }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,136,61,0.2),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(37,51,40,0.14),transparent_28%),linear-gradient(180deg,#f8f1e5_0%,#f1e4d2_100%)]" />
              <div className="absolute inset-0 bg-lattice bg-[length:24px_24px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
              <CalligraphyBackdrop reduceMotion={reduceMotion} scrollY={scrollY} />
              <div className="absolute right-[-8rem] top-[-4rem] h-80 w-80 rounded-full bg-brass/15 blur-3xl" />
              <div className="absolute bottom-[-8rem] left-[-6rem] h-96 w-96 rounded-full bg-olive/10 blur-3xl" />
            </motion.div>

            <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 py-12 sm:px-10 lg:px-14">
              <motion.div
                style={{ y: heroContentY }}
                className="max-w-5xl"
                variants={heroStagger}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div variants={heroItem} className="mb-6">
                  <Badge>Quiet chair • precise cuts • قريشي</Badge>
                </motion.div>

                <motion.h1
                  variants={heroItem}
                  className="max-w-4xl font-display text-6xl leading-[0.88] tracking-[-0.05em] text-ink sm:text-7xl lg:text-[7.2rem] xl:text-[8.2rem]"
                >
                  Qureshi Cuts
                </motion.h1>

                <motion.p
                  variants={heroItem}
                  className="mt-6 max-w-2xl text-base leading-7 text-stone sm:text-lg sm:leading-8 lg:text-[1.15rem]"
                >
                  Precision barbering in a composed room. Clean fades, beard work, and a
                  minimal Arabesque atmosphere built for appointments that feel intentional
                  from greeting to final mirror check.
                </motion.p>

                <motion.div variants={heroItem} className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button href="https://qureshicuts.setmore.com/zaid?utm_source=ig&utm_medium=social&utm_content=link_in_bio" variant="brass">
                    Book Now
                  </Button>
                  <Button href="#testimonials" variant="secondary">
                    Read Client Notes
                  </Button>
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3"
                >
                  <div className="rounded-[1.5rem] border border-ink/10 bg-white/50 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-stone">Approach</p>
                    <p className="mt-2 font-display text-2xl text-ink">Consult, then cut</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-ink/10 bg-white/50 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-stone">Atmosphere</p>
                    <p className="mt-2 font-display text-2xl text-ink">Quiet room</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-ink/10 bg-white/50 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-stone">Finish</p>
                    <p className="mt-2 font-display text-2xl text-ink">Sharp for days</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section
            id="services"
            className="relative border-t border-ink/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(241,232,219,0.96))]"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(182,136,61,0.14),transparent)]" />
            <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <motion.div {...servicesStagger} className="max-w-xl">
                  <motion.p
                    {...serviceItem}
                    className="text-xs uppercase tracking-[0.4em] text-stone"
                  >
                    Service Details
                  </motion.p>
                  <motion.h2
                    {...serviceItem}
                    className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] text-ink sm:text-5xl"
                  >
                    The practical details live below the fold so the landing page stays serene.
                  </motion.h2>
                  <motion.p
                    {...serviceItem}
                    className="mt-5 text-base leading-7 text-stone sm:text-lg"
                  >
                    Pricing and appointment rhythm matter, but the first impression should be the
                    shop's tone. This section carries the useful details without making the hero
                    feel transactional.
                  </motion.p>

                  <motion.div variants={heroStagger} className="mt-10 flex flex-col">
                    {notes.map((note) => (
                      <motion.div
                        key={note}
                        variants={createStaggerItem(reduceMotion, { distance: 24 })}
                        className="py-4"
                      >
                        <p className="text-sm leading-6 text-stone">{note}</p>
                        <Separator className="mt-4 bg-brass/12" />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div {...servicesStagger} className="relative">
                  <motion.div
                    {...serviceItem}
                    className="editorial-frame absolute inset-x-10 bottom-8 top-12 hidden rounded-[2.5rem] border border-brass/20 lg:block"
                  />
                  <motion.div
                    {...createScrollItem(reduceMotion, { distance: 18 })}
                    className="absolute left-8 top-0 size-20 rounded-full border border-brass/25 bg-white/45 backdrop-blur-sm"
                  />
                  <motion.div
                    {...createScrollItem(reduceMotion, { distance: 26 })}
                    className="absolute right-0 top-10 h-40 w-40 rounded-[2rem] bg-olive/10 blur-2xl"
                  />

                  <motion.div {...serviceItem}>
                    <Card className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/72 shadow-glow backdrop-blur-xl">
                      <motion.div
                        {...createScrollItem(reduceMotion, { distance: 16 })}
                        className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(182,136,61,0.22),rgba(182,136,61,0))]"
                      />
                      <motion.div
                        {...createScrollItem(reduceMotion, { distance: 28 })}
                        className="relative mx-auto mt-5 h-56 w-[82%] rounded-t-[8rem] border border-brass/30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(239,228,210,0.55)),linear-gradient(180deg,rgba(182,136,61,0.14),rgba(255,255,255,0.2))] p-4"
                      >
                        <div className="arabesque-grid flex h-full items-end rounded-t-[7rem] border border-ink/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.7))] p-5">
                          <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-stone">
                              Signature Session
                            </p>
                            <h3 className="mt-3 font-display text-[2rem] leading-none text-ink">
                              Fade + Beard Ritual
                            </h3>
                          </div>
                        </div>
                      </motion.div>

                      <CardContent className="relative px-6 pb-6 pt-7 sm:px-8">
                        <motion.div
                          {...createScrollStagger(reduceMotion, {
                            amount: 0.14,
                            delayChildren: 0.04,
                            staggerChildren: 0.08,
                          })}
                          className="mb-6 flex flex-wrap items-center justify-between gap-3"
                        >
                          <motion.div {...createScrollItem(reduceMotion, { distance: 18 })}>
                            <p className="text-xs uppercase tracking-[0.35em] text-stone">
                              Today
                            </p>
                            <p className="mt-2 font-display text-[1.8rem] text-ink">
                              8 AM - 7 PM
                            </p>
                          </motion.div>
                          <motion.div
                            {...createScrollItem(reduceMotion, { distance: 18 })}
                            className="rounded-full border border-ink/10 bg-paper px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone"
                          >
                            By Appointment
                          </motion.div>
                        </motion.div>

                        <motion.div
                          {...createScrollStagger(reduceMotion, {
                            amount: 0.14,
                            delayChildren: 0.08,
                            staggerChildren: 0.09,
                          })}
                          className="flex flex-col gap-3"
                        >
                          {offerings.map((item) => (
                            <motion.div
                              key={item.label}
                              variants={createStaggerItem(reduceMotion, { distance: 24 })}
                              className="flex items-start gap-4 rounded-[1.25rem] border border-ink/10 bg-white/55 px-4 py-3.5"
                            >
                              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brass" />
                              <div>
                                <p className="text-sm uppercase tracking-[0.28em] text-ink">
                                  {item.label}
                                </p>
                                <p className="mt-1.5 text-sm leading-5 text-stone">
                                  {item.detail}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          {...createScrollItem(reduceMotion, { distance: 24 })}
                          id="book"
                          className="mt-5 flex flex-col gap-4 rounded-[1.4rem] bg-ink px-5 py-5 text-paper sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-paper/65">
                              Reserve Your Chair
                            </p>
                            <p className="mt-2 text-sm leading-6 text-paper/80">
                              Book ahead for the calmest in-shop experience.
                            </p>
                          </div>
                          <Button
                            href="https://qureshicuts.setmore.com/zaid?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                            variant="brass"
                          >
                            Book Now
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative border-t border-ink/10 bg-[linear-gradient(180deg,rgba(246,240,229,1),rgba(244,236,224,1))]">
            <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <motion.div {...servicesStagger} className="max-w-lg">
                  <motion.p
                    {...serviceItem}
                    className="text-xs uppercase tracking-[0.4em] text-stone"
                  >
                    House Standard
                  </motion.p>
                  <motion.h2
                    {...serviceItem}
                    className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] text-ink sm:text-5xl"
                  >
                    Minimal on the surface. Exacting in the details.
                  </motion.h2>
                  <motion.p
                    {...serviceItem}
                    className="mt-5 text-base leading-7 text-stone sm:text-lg"
                  >
                    The theme is restrained, but the service should still feel memorable. These
                    are the parts clients notice without needing them announced out loud.
                  </motion.p>
                </motion.div>

                <motion.div
                  {...createScrollStagger(reduceMotion, {
                    amount: 0.12,
                    delayChildren: 0.06,
                    staggerChildren: 0.1,
                  })}
                  className="grid gap-4 md:grid-cols-3"
                >
                  {standards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        variants={createStaggerItem(reduceMotion, { distance: 22 })}
                      >
                        <Card className="h-full rounded-[1.8rem] border border-ink/10 bg-white/68 p-6 shadow-[0_20px_50px_rgba(22,18,15,0.06)] backdrop-blur-sm">
                          <CardContent className="p-0">
                            <div className="flex size-12 items-center justify-center rounded-full border border-brass/25 bg-brass/10 text-brass">
                              <Icon className="size-5" />
                            </div>
                            <h3 className="mt-6 font-display text-[2rem] leading-none text-ink">
                              {item.title}
                            </h3>
                            <p className="mt-4 text-sm leading-6 text-stone">{item.detail}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </section>

          <section
            id="testimonials"
            className="relative border-t border-ink/10 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(240,230,214,0.92))]"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(182,136,61,0.1),transparent)]" />
            <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
              <TestimonialShowcase />
            </div>
          </section>
        </main>

        <footer
          ref={footerRef}
          className="sticky bottom-0 min-h-[100svh] overflow-hidden border-t border-ink/10 bg-[linear-gradient(180deg,#fbf7ef_0%,#f4e8d7_54%,#eadcc8_100%)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(182,136,61,0.18),transparent_32%),radial-gradient(circle_at_84%_78%,rgba(37,51,40,0.12),transparent_26%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),transparent)]" />
          <div className="absolute inset-0 bg-lattice bg-[length:26px_26px] opacity-20 [mask-image:linear-gradient(180deg,transparent,black_18%,black_82%,transparent)]" />

          <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
            <motion.div
              style={{ y: footerEyebrowY, opacity: footerContentOpacity }}
              className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5 text-[11px] uppercase tracking-[0.36em] text-stone"
            >
              <span>Visit Intentionally</span>
              <span>North Dallas</span>
            </motion.div>

            <motion.div
              style={{ y: footerContentY, opacity: footerContentOpacity }}
              className="grid flex-1 items-end gap-12 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-14"
            >
              <div>
                <motion.p
                  style={{ y: footerEyebrowY }}
                  className="text-xs uppercase tracking-[0.4em] text-stone"
                >
                  Book ahead. Arrive settled. Leave sharp.
                </motion.p>
                <h2 className="sr-only">Visit intentionally. Book the chair that keeps the room quiet.</h2>
                <div className="mt-5">
                  <FooterHeadlineLine
                    label="Visit"
                    progress={footerScrollProgress}
                    reduceMotion={reduceMotion}
                    start={0}
                    end={0.82}
                  />
                  <FooterHeadlineLine
                    label="Intentionally"
                    progress={footerScrollProgress}
                    reduceMotion={reduceMotion}
                    start={0.12}
                    end={1}
                  />
                </div>
                <motion.p
                  style={{ y: footerContentY, opacity: footerContentOpacity }}
                  className="mt-6 max-w-xl text-base leading-7 text-stone sm:text-lg"
                >
                  The footer now closes the page like a final card. It stays pinned beneath the
                  main content, then takes over the full viewport at the end so the last thing
                  the visitor sees is the next action.
                </motion.p>
              </div>

              <motion.div
                {...createScrollStagger(reduceMotion, {
                  amount: 0.18,
                  delayChildren: 0.04,
                  staggerChildren: 0.08,
                })}
                className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
              >
                <motion.div
                  {...createScrollItem(reduceMotion, { distance: 18 })}
                  className="rounded-[1.45rem] border border-ink/10 bg-white/55 px-4 py-4 backdrop-blur-sm"
                >
                  <Clock3 className="size-5 text-brass" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.34em] text-stone/80">
                    Hours
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/82">8 AM - 7 PM</p>
                </motion.div>
                <motion.div
                  {...createScrollItem(reduceMotion, { distance: 20 })}
                  className="rounded-[1.45rem] border border-ink/10 bg-white/55 px-4 py-4 backdrop-blur-sm"
                >
                  <MapPin className="size-5 text-brass" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.34em] text-stone/80">
                    Location
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/82">North Dallas area</p>
                </motion.div>
                <motion.div
                  {...createScrollItem(reduceMotion, { distance: 22 })}
                  className="rounded-[1.45rem] border border-ink/10 bg-white/55 px-4 py-4 backdrop-blur-sm"
                >
                  <Scissors className="size-5 text-brass" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.34em] text-stone/80">
                    Finish
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/82">Fade, beard, ritual</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: footerContentY, opacity: footerContentOpacity }}
              className="flex flex-col gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="max-w-xl text-sm leading-6 text-stone">
                Appointments stay quiet by design. Instagram handles the day-to-day updates,
                Setmore handles the chair.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="https://www.instagram.com/cutsbyzaid/" variant="paper">
                  <span className="flex items-center gap-2.5">
                    <InstagramGlyph />
                    Instagram
                  </span>
                </Button>
                <Button
                  href="https://qureshicuts.setmore.com/zaid?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                  variant="brass"
                >
                  Book a seat
                </Button>
              </div>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
