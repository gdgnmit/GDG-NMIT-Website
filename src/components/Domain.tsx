import React from "react";
import Image from "next/image";

const Domain = () => {
  const domains = [
    { src: "/assets/tech-domain.svg", alt: "Tech Domain", w: 440, h: 310.5 },
    { src: "/assets/design-domain.svg", alt: "Design Domain", w: 344, h: 142 },
    {
      src: "/assets/social-domain.svg",
      alt: "Social Media Domain",
      w: 500.5,
      h: 169,
    },
    {
      src: "/assets/content-domain.svg",
      alt: "Content Domain",
      w: 484,
      h: 212,
    },
    { src: "/assets/pr-domain.svg", alt: "PR Domain", w: 444, h: 212 },
    {
      src: "/assets/operations-domain.svg",
      alt: "Operations Domain",
      w: 474,
      h: 142,
    },
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-g-almost-black">
      <div className="pt-8 px-8 sm:pt-12 sm:px-12 lg:pt-16 lg:px-16 xl:px-20 mb-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Domains
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>
      </div>

      <div className="pt-6 pb-12 px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {domains.map((domain) => (
            <div
              key={domain.alt}
              className="flex items-center justify-center h-[220px] group cursor-pointer"
            >
              <Image
                src={domain.src}
                alt={domain.alt}
                width={domain.w}
                height={domain.h}
                className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Domain;
