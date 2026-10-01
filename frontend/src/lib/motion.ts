import type { Variants } from "framer-motion";

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.25,
      ease: "easeOut",
    },
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
    },
  },
};
