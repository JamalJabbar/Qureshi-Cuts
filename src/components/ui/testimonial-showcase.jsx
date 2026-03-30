import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad R.",
    text: "Cleanest fade I’ve had in Dallas. The room feels calm and the cut grows out well.",
    rating: 5,
  },
  {
    name: "Yusuf M.",
    text: "Booked ahead, walked in, and the whole appointment felt deliberate and efficient.",
    rating: 5,
  },
  {
    name: "Omar K.",
    text: "The beard line and neckline stay sharp longer than anywhere else I’ve tried.",
    rating: 5,
  },
];

function TestimonialCard({ name, text, rating, index, reducedMotion }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionTemplate`${y}deg`;
  const rotateY = useMotionTemplate`${x}deg`;

  return (
    <motion.div
      className="group relative rounded-[1.5rem] border border-ink/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(22,18,15,0.05)] backdrop-blur-sm"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={reducedMotion ? undefined : { x: rotateX, y: rotateY }}
    >
      <div className="flex items-center gap-1 text-brass">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-stone">{text}</p>
      <p className="mt-5 text-xs uppercase tracking-[0.32em] text-ink">{name}</p>
    </motion.div>
  );
}

export function TestimonialShowcase() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((item, index) => (
        <TestimonialCard key={item.name} index={index} reducedMotion={reducedMotion} {...item} />
      ))}
    </div>
  );
}
