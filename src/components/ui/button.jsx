import { motion, useReducedMotion } from "framer-motion";
import { interactiveLift, shimmerSweep } from "../../animations";

export function Button({ href, children, variant = "primary" }) {
  const reduceMotion = useReducedMotion();
  const base =
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.28em] transition-[filter,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2";

  const styles = {
    primary:
      "bg-[linear-gradient(180deg,#eccf90_0%,#ddb15f_34%,#ca9446_70%,#b87e33_100%)] text-ink shadow-[0_16px_34px_rgba(182,136,61,0.2),0_6px_16px_rgba(120,84,39,0.1)] hover:brightness-[1.05] hover:shadow-[0_20px_40px_rgba(182,136,61,0.26),0_10px_18px_rgba(120,84,39,0.12)] focus:ring-offset-paper",
    brass:
      "bg-[linear-gradient(180deg,#eccf90_0%,#ddb15f_34%,#ca9446_70%,#b87e33_100%)] text-ink shadow-[0_16px_34px_rgba(182,136,61,0.2),0_6px_16px_rgba(120,84,39,0.1)] hover:brightness-[1.05] hover:shadow-[0_20px_40px_rgba(182,136,61,0.26),0_10px_18px_rgba(120,84,39,0.12)] focus:ring-offset-paper",
    paper:
      "border border-ink/10 bg-white/66 text-ink shadow-[0_14px_28px_rgba(22,18,15,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-sm hover:bg-white/78 hover:shadow-[0_18px_34px_rgba(22,18,15,0.12),inset_0_1px_0_rgba(255,255,255,0.86)] focus:ring-offset-paper",
    secondary:
      "border border-ink/10 bg-white/55 text-ink focus:ring-offset-paper",
  };

  return (
    <motion.a
      href={href}
      className={`${base} ${styles[variant]}`}
      initial="rest"
      whileHover={reduceMotion ? undefined : "hover"}
      whileTap={reduceMotion ? undefined : "tap"}
      animate="rest"
      variants={interactiveLift}
    >
      <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1)_18%,rgba(255,255,255,0)_54%)]" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.62)_32%,rgba(255,248,220,0.26)_44%,transparent_70%)]"
        initial="rest"
        whileHover={reduceMotion ? undefined : "hover"}
        variants={shimmerSweep}
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
