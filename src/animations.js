const smoothEase = [0.22, 1, 0.36, 1];

const smoothSpring = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 0.9,
};

export function createPageTransition(reduceMotion) {
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    animate: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            delay: 0.08,
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
          },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : 18,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.35,
            ease: smoothEase,
          },
    },
  };
}

export function createEntranceContainer(
  reduceMotion,
  { delayChildren = 0.22, staggerChildren = 0.14 } = {},
) {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
            delayChildren,
            staggerChildren,
          },
    },
    exit: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.04,
            staggerDirection: -1,
          },
    },
  };
}

export function createEntranceItem(reduceMotion, { distance = 36 } = {}) {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : distance,
      scale: reduceMotion ? 1 : 0.975,
      filter: reduceMotion ? "none" : "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 1.05,
            ease: [0.16, 1, 0.3, 1],
          },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : distance * 0.5,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.26,
            ease: smoothEase,
          },
    },
  };
}

export function createStaggerContainer(
  reduceMotion,
  { delayChildren = 0.1, staggerChildren = 0.08 } = {},
) {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
            delayChildren,
            staggerChildren,
          },
    },
    exit: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.04,
            staggerDirection: -1,
          },
    },
  };
}

export function createStaggerItem(reduceMotion, { distance = 28 } = {}) {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : distance,
      scale: reduceMotion ? 1 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            ...smoothSpring,
          },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : distance * 0.6,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.22,
            ease: smoothEase,
          },
    },
  };
}

export function createScrollStagger(
  reduceMotion,
  { amount = 0.18, delayChildren = 0.08, staggerChildren = 0.09 } = {},
) {
  return {
    initial: "hidden",
    whileInView: "visible",
    exit: "exit",
    viewport: reduceMotion
      ? undefined
      : {
          once: true,
          amount,
          margin: "0px 0px -80px 0px",
        },
    variants: createStaggerContainer(reduceMotion, {
      delayChildren,
      staggerChildren,
    }),
  };
}

export function createScrollItem(reduceMotion, { distance = 32 } = {}) {
  return {
    variants: createStaggerItem(reduceMotion, { distance }),
  };
}

export const interactiveLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.018,
    transition: {
      ...smoothSpring,
      stiffness: 320,
      damping: 20,
    },
  },
  tap: {
    y: 0,
    scale: 0.978,
    transition: {
      duration: 0.16,
      ease: smoothEase,
    },
  },
};

export const shimmerSweep = {
  rest: { x: "-140%" },
  hover: {
    x: "140%",
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};
