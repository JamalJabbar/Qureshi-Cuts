import { motion, useReducedMotion } from "framer-motion";
import { interactiveLift } from "../../animations";

export function Badge({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/55 px-5 py-2.5 text-sm uppercase tracking-[0.32em] text-stone backdrop-blur-sm"
      initial="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      animate="rest"
      variants={interactiveLift}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-brass" />
      {children}
    </motion.div>
  );
}
