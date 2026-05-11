"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Scissors, Star } from "lucide-react";

const defaultTestimonials = [
  {
    name: "Bilal A.",
    quote:
      "Cleanest fade I have had in Dallas. The room stays calm, the line-up stays sharp, and you never feel rushed out of the chair.",
    service: "Skin Fade + Beard",
    visitLabel: "After Jumu'ah regular",
    accent: "Warm towel finish",
  },
  {
    name: "Yusuf K.",
    quote:
      "He listens before he cuts. I asked for a softer taper and beard balance, and it came out exactly how I pictured it.",
    service: "Taper + Shape Up",
    visitLabel: "Booked twice a month",
    accent: "Consult first",
  },
  {
    name: "Omar R.",
    quote:
      "The details are what keep me coming back. Crisp temple work, clean neckline, no loud shop energy, just precise work.",
    service: "Classic Cut",
    visitLabel: "Neighborhood client",
    accent: "Quiet chair",
  },
  {
    name: "Zayd S.",
    quote:
      "Best beard work I have found locally. The blend into the beard looks natural, and the finish still looks good days later.",
    service: "Hair + Beard Ritual",
    visitLabel: "Travelled in from Plano",
    accent: "Lasting finish",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-brass" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-3.5 fill-current" />
      ))}
    </div>
  );
}

export function TestimonialShowcase({
  items = defaultTestimonials,
  eyebrow = "Client Notes",
  heading = "Clients who sit once usually book again.",
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.14),
        y: lerp(prev.y, mousePosition.y, 0.14),
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, reduceMotion]);

  const activeItem = items[activeIndex] ?? items[0];

  const handleMouseMove = (event) => {
    if (!containerRef.current || reduceMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex w-full max-w-5xl flex-col gap-10"
    >
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.38em] text-stone">{eyebrow}</p>
        <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] text-ink sm:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-stone sm:text-lg">
          Short notes from clients who come in for a sharp cut, a cleaner beard,
          and a room that still feels composed.
        </p>
      </div>

      <motion.div
        className="rounded-[2rem] border border-ink/10 bg-white/70 p-5 shadow-glow backdrop-blur-xl sm:p-7 lg:hidden"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone">Featured Note</p>
            <p className="mt-2 font-display text-3xl text-ink">{activeItem.name}</p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass">
            <Quote className="size-5" />
          </div>
        </div>
        <p className="mt-5 text-base leading-7 text-stone">"{activeItem.quote}"</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Stars />
          <span className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-[11px] uppercase tracking-[0.26em] text-stone">
            {activeItem.service}
          </span>
          <span className="rounded-full border border-brass/20 bg-brass/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.26em] text-cedar">
            {activeItem.accent}
          </span>
        </div>
      </motion.div>

      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="flex flex-col">
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={`${item.name}-${item.service}`}
                type="button"
                onMouseEnter={() => handleMouseEnter(index)}
                onFocus={() => setActiveIndex(index)}
                className="group relative cursor-pointer rounded-[1.6rem] border-t border-ink/10 px-0 py-0 text-left focus:outline-none"
              >
                <div className="relative overflow-hidden rounded-[1.6rem] px-5 py-5 sm:px-6">
                  <div
                    className={`absolute inset-0 rounded-[1.6rem] border transition-all duration-300 ${isActive
                        ? "border-brass/25 bg-[linear-gradient(135deg,rgba(182,136,61,0.12),rgba(255,255,255,0.72))]"
                        : "border-transparent bg-white/0"
                      }`}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-[1.75rem] leading-none tracking-[-0.03em] text-ink sm:text-[2rem]">
                          {item.name}
                        </h3>
                        <span className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-stone">
                          {item.visitLabel}
                        </span>
                      </div>

                      <p
                        className={`mt-3 max-w-2xl text-sm leading-6 transition-colors duration-300 sm:text-base sm:leading-7 ${isActive ? "text-ink/78" : "text-stone"
                          }`}
                      >
                        "{item.quote}"
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-brass/20 bg-brass/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-cedar">
                          <Scissors className="size-3.5" />
                          {item.service}
                        </div>
                        <Stars />
                      </div>
                    </div>

                    <span
                      className={`pt-1 text-[11px] uppercase tracking-[0.38em] transition-colors duration-300 ${isActive ? "text-brass" : "text-stone/80"
                        }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}

          <div className="h-px w-full bg-ink/10" aria-hidden="true" />
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-24 min-h-[24rem]">
            <motion.div
              className="pointer-events-none absolute left-0 top-0 w-full"
              style={
                reduceMotion
                  ? undefined
                  : {
                    transform: `translate3d(${Math.min(
                      Math.max(smoothPosition.x * 0.08, 0),
                      36,
                    )}px, ${Math.min(Math.max(smoothPosition.y * 0.12, 0), 188)}px, 0)`,
                    opacity: isVisible ? 1 : 0.92,
                  }
              }
              animate={
                reduceMotion
                  ? { opacity: 1, y: activeIndex * 4 }
                  : { scale: isVisible ? 1 : 0.98 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-brass/20 bg-[linear-gradient(180deg,rgba(255,253,249,0.94),rgba(239,228,210,0.9))] p-6 shadow-[0_28px_80px_rgba(22,18,15,0.12)] backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(182,136,61,0.24),rgba(182,136,61,0))]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mt-3 font-arabic text-4xl leading-none text-cedar">قريشي</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-full border border-brass/30 bg-white/80 text-brass">
                      <Quote className="size-5" />
                    </div>
                  </div>

                  <p className="mt-6 font-display text-[1.85rem] leading-[1.05] tracking-[-0.03em] text-ink">
                    {activeItem.name}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-stone">"{activeItem.quote}"</p>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-stone">
                      {activeItem.service}
                    </span>
                    <span className="rounded-full border border-brass/20 bg-brass/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-cedar">
                      {activeItem.accent}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <Stars />
                    <span className="text-[10px] uppercase tracking-[0.38em] text-stone">
                      {activeItem.visitLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
