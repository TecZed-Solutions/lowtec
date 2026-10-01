"use client";

import { motion, useReducedMotion } from "framer-motion";

const paths = [
  "M-120 90C90 10 260 35 430 130C600 225 735 285 900 205C1065 125 1190 35 1370 70C1490 92 1580 120 1710 85",
  "M-100 245C80 160 245 150 390 220C535 290 650 390 835 370C1020 350 1120 225 1280 195C1440 165 1550 245 1700 275",
  "M-100 410C90 335 225 325 370 395C515 465 625 520 790 500C955 480 1080 370 1235 350C1390 330 1525 400 1700 455",
  "M-110 545C75 455 235 470 395 560C555 650 690 700 855 630C1020 560 1125 455 1290 475C1455 495 1570 570 1700 610",
  "M-100 675C70 585 225 600 370 675C515 750 645 815 810 770C975 725 1085 625 1240 645C1395 665 1535 760 1700 755",
  "M-120 825C70 750 220 770 375 835C530 900 680 930 835 865C990 800 1125 735 1280 780C1435 825 1570 900 1710 860",
  "M210 -100C310 60 295 185 245 315C195 445 205 555 330 650C455 745 530 790 595 930",
  "M760 -100C675 55 700 170 790 270C880 370 965 410 1060 445C1155 480 1210 565 1190 685C1170 805 1210 860 1295 930",
  "M1370 -100C1260 30 1280 145 1400 235C1520 325 1580 365 1535 485C1490 605 1460 675 1535 770C1590 840 1630 875 1710 910",
];

export default function HeroPattern() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-marca pointer-events-none absolute inset-0 -z-10 h-full w-full mask-[radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
    >
      <defs>
        <filter id="energy-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <g stroke="currentColor" strokeWidth="1.5" opacity="0.07">
        {paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </g>

      {!reduceMotion && (
        <g
          filter="url(#energy-blur)"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        >
          {paths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              pathLength={1}
              strokeDasharray="0.12 0.88"
              initial={{ strokeDashoffset: 1.12, opacity: 0 }}
              animate={{
                strokeDashoffset: [1.12, -0.12],
                opacity: [0, 0.18, 0.18, 0],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 3,
                delay: index * 4,
                times: [0, 0.08, 0.88, 1],
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
