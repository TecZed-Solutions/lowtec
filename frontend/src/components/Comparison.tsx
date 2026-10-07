"use client";

import { useState, type CSSProperties } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ComparisonProps {
  imageOne: string;
  imageTwo: string;
}

export default function Comparison({ imageOne, imageTwo }: ComparisonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactCompareSlider
        changePositionOnHover
        defaultPosition={50}
        transition="0.2s ease-out"
        className="h-full"
        handle={
          <ReactCompareSliderHandle
            style={{ "--rcs-handle-color": "var(--marca)" } as CSSProperties}
            linesStyle={{ boxShadow: "0 0 12px rgba(73, 229, 16, 0.7)" }}
            buttonStyle={{
              width: "3rem",
              height: "3rem",
              color: "var(--marca)",
              backgroundColor: "rgba(5, 5, 5, 0.6)",
              boxShadow: "0 0 24px rgba(73, 229, 16, 0.5)",
            }}
          />
        }
        itemOne={<ReactCompareSliderImage src={imageOne} alt="Antes" />}
        itemTwo={<ReactCompareSliderImage src={imageTwo} alt="Depois" />}
      />

      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 transition-opacity duration-200 ${isHovered ? "opacity-0" : "opacity-100"} `}
      >
        <span className="bg-fundo/70 font-ui text-text1 rounded-sm px-3 py-1 text-xs font-bold tracking-widest uppercase ring-1 ring-white/15 backdrop-blur-sm">
          Antes
        </span>

        <span className="bg-marca font-ui text-fundo rounded-sm px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(73,229,16,0.5)]">
          Depois
        </span>
      </div>
    </div>
  );
}
