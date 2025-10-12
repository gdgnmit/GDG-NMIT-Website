"use client";
import React, { useState } from "react";

interface ImageData {
  base: string;
  hover: string;
  alt: string;
  w: number;
  h: number;
}

const Domain = (): JSX.Element => {
  const images: ImageData[] = [
    { base: "/assets/tech.webp", hover: "/assets/tech_exp.webp", alt: "tech", w: 310, h: 212 },
    { base: "/assets/operations.webp", hover: "/assets/operations_exp.webp", alt: "operations", w: 320, h: 160 },
    { base: "/assets/social.webp", hover: "/assets/social_exp.webp", alt: "social", w: 310, h: 120 },
    { base: "/assets/design.webp", hover: "/assets/design_exp.webp", alt: "design", w: 240, h: 130 },
    { base: "/assets/content.webp", hover: "/assets/content_exp.webp", alt: "content", w: 380, h: 170 },
    { base: "/assets/pr.webp", hover: "/assets/pr_exp.webp", alt: "pr", w: 320, h: 180 },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col z-[1] px-[40px] py-[20px] bg-white">
      <h1 className="text-[2.5rem] font-[400] mb-[20px] ml-[97px] text-black">Domain</h1>

      <div
        className="grid grid-cols-3 gap-[5px] mb-[20px]
                   max-[1024px]:grid-cols-2 max-[1024px]:gap-[15px]
                   max-[768px]:grid-cols-2 max-[768px]:gap-[10px]
                   max-[480px]:grid-cols-1 max-[480px]:gap-[10px]"
      >
        {images.map((img, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={idx}
              className="relative flex items-center justify-center overflow-hidden cursor-pointer
                         w-full max-w-[472px] h-[220px] mx-auto"
              onPointerEnter={() => setActiveIndex(idx)}
              onPointerLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(idx)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(prev => (prev === idx ? null : idx))}
              tabIndex={0}
            >
              {/* Base Image */}
              <img
                src={img.base}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className={`object-contain transition-opacity duration-[600ms] ease-in-out
                            ${isActive ? "opacity-0" : "opacity-100"}`}
                style={{
                  width: `${img.w}px`,
                  height: `${img.h}px`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />

              {/* Hover Div — responsive and inset from all sides */}
              <div
                className={`absolute inset-[5px] bg-center bg-no-repeat bg-contain transition-opacity duration-[600ms] ease-in-out
                            ${isActive ? "opacity-100" : "opacity-0"}`}
                style={{
                  backgroundImage: `url(${img.hover})`,
                  width: "calc(100% - 10px)",
                  height: "calc(100% - 10px)",
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Domain;
