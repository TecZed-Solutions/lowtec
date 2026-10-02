"use client";

import { useState } from "react";
import {
  ReactCompareSlider,
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
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactCompareSlider
        changePositionOnHover
        defaultPosition={50}
        transition="0.2s ease-out"
        itemOne={<ReactCompareSliderImage src={imageOne} alt="Antes" />}
        itemTwo={<ReactCompareSliderImage src={imageTwo} alt="Depois" />}
      />

      <div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-4 transition-opacity duration-200 ${isHovered ? "opacity-0" : "opacity-100"} `}
      >
        <span className="rounded-md bg-black/70 px-3 py-1 text-sm font-medium text-white">
          Antes
        </span>

        <span className="rounded-md bg-black/70 px-3 py-1 text-sm font-medium text-white">
          Depois
        </span>
      </div>
    </div>
  );
}
