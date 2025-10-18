"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    id: "1",
    color: "#FFD43B",
    imageSrc: "/team1.png",
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  {
    id: "2",
    color: "#74ACFF",
    imageSrc: "/team2.png",
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  {
    id: "3",
    color: "#27C5A1",
    imageSrc: "/team3.png",
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  {
    id: "4",
    color: "#FF9F68",
    imageSrc: "/team2.png",
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  {
    id: "5",
    color: "#FFD43B",
    imageSrc: "/team1.png",
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
];

export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nextSlide = () => {
    // Allow sliding until we can see the last card (projects.length - 3 because we show 3 cards)
    if (currentIndex < projects.length - 3) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-10 py-20 bg-grid overflow-hidden">
      <h1 className="text-4xl font-bold mb-16">Project</h1>

      {/* Carousel */}
      <div className="relative w-full max-w-9xl flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`absolute left-0 z-20 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow transition ${
            currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Track - Show 3 cards at a time */}
        <div className="overflow-visible w-full max-w-5xl px-8">
          <motion.div
            className="flex gap-10 transition-transform duration-300"
            animate={{ x: `-${currentIndex * 350}px` }}
          >
            {projects.map((p, index) => {
              // Calculate distance from the hovered/center index
              const distance =
                hoveredIndex !== null
                  ? Math.abs(index - hoveredIndex)
                  : Math.abs(index - currentIndex);

              // Define scale hierarchy (center biggest)
              let scale = 1;
              if (distance === 0) scale = 1.2;
              else if (distance === 1) scale = 1.05;
              else if (distance === 2) scale = 0.9;
              else scale = 0.8;

              // Define z-index (so center card stays on top)
              const zIndex = 10 - distance;

              return (
                <motion.div
                  key={p.id}
                  animate={{ scale }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ zIndex }}
                >
                  <ProjectCard
                    {...p}
                    isActive={hoveredIndex === index}
                    onHover={() => setHoveredIndex(index)}
                    onLeave={() => setHoveredIndex(null)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === projects.length - 3}
          className={`absolute right-0 z-20 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow transition ${
            currentIndex === projects.length - 3
              ? "opacity-40 cursor-not-allowed"
              : ""
          }`}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
