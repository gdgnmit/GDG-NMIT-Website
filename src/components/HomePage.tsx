"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaInstagram, FaLinkedin, FaFacebookSquare } from "react-icons/fa";

// Constants
const JUMP_HEIGHT = -80;
const JUMP_DURATION = 0.5;
const OBSTACLE_MIN_DELAY = 3000;
const OBSTACLE_MAX_DELAY = 5000;
const CLOUD_SPAWN_CHANCE = 0.2;
const BIRD_SPAWN_CHANCE = 0.4;
const BIRD_SPACING = 30;
const GRID_ANIMATION_DURATION = 8;

export default function HomeScreen() {
  const dinoRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const activeBirds = useRef<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Subtle floating animation for grid background
    gsap.to(gridRef.current, {
      backgroundPosition: "200px 200px",
      duration: GRID_ANIMATION_DURATION,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Dino idle bounce
    const idleTween = gsap.to(dinoRef.current, {
      y: "-=2",
      duration: 0.3,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    const dinoJump = () => {
      if (isJumping.current || !dinoRef.current) return;

      isJumping.current = true;
      idleTween.pause();

      gsap.to(dinoRef.current, {
        y: JUMP_HEIGHT,
        duration: JUMP_DURATION,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          isJumping.current = false;
          idleTween.resume();
        },
      });
    };

    const spawnObstacle = () => {
      const obstacle = document.createElement("div");
      obstacle.className = "absolute";
      obstaclesRef.current?.appendChild(obstacle);

      const rand = Math.random();
      let imgSrc = "";
      let width = 40;
      let height = 64;
      let bottomPos = 0;
      let isBird = false;
      let isCloud = false;

      if (rand < CLOUD_SPAWN_CHANCE) {
        // Cloud (20%)
        imgSrc = "/assets/cloud.png";
        width = 100 + Math.random() * 50;
        height = 60;
        bottomPos = 200 + Math.random() * 50;
        isCloud = true;
      } else if (rand < BIRD_SPAWN_CHANCE) {
        // Bird (20%)
        imgSrc = "/assets/bird.png";
        width = 64;
        height = 40;
        isBird = true;

        let tries = 0;
        do {
          bottomPos = 60 + Math.random() * 30;
          tries++;
        } while (
          activeBirds.current.some(
            (b) => Math.abs(b - bottomPos) < BIRD_SPACING
          ) &&
          tries < 10
        );
        activeBirds.current.push(bottomPos);
      } else {
        // Cactus/obstacle (60%)
        imgSrc = "/assets/vector_light.png";
        width = 40;
        height = 64;
      }

      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.width = "100%";
      img.style.height = "100%";
      obstacle.appendChild(img);

      obstacle.style.width = `${width}px`;
      obstacle.style.height = `${height}px`;
      obstacle.style.left = `${window.innerWidth}px`;
      obstacle.style.bottom = `${bottomPos}px`;

      // Determine duration (clouds move slower)
      const duration = isCloud ? 12 + Math.random() * 3 : 5;

      gsap.to(obstacle, {
        left: -200,
        duration: duration,
        ease: "linear",
        onUpdate: () => {
          if (!isBird && !isCloud && dinoRef.current) {
            const dinoLeft = dinoRef.current.offsetLeft;
            const obstacleLeft = obstacle.offsetLeft;
            if (
              !isJumping.current &&
              obstacleLeft < dinoLeft + 120 &&
              obstacleLeft > dinoLeft + 50
            ) {
              dinoJump();
            }
          }
        },
        onComplete: () => {
          if (isBird) {
            activeBirds.current = activeBirds.current.filter(
              (b) => b !== bottomPos
            );
          }
          obstacle.remove();
        },
      });

      // Schedule next obstacle spawn
      setTimeout(
        spawnObstacle,
        Math.random() * (OBSTACLE_MAX_DELAY - OBSTACLE_MIN_DELAY) +
          OBSTACLE_MIN_DELAY
      );
    };

    spawnObstacle();
  }, []);

  return (
    <main className="w-full relative">
      {/* Dino Game Section - Self-contained with its own background */}
      <section className="relative w-full overflow-hidden">
        {/* Grid Background - contained within section */}
        <div
          ref={gridRef}
          className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none
                    bg-white dark:bg-g-almost-black
                    [background-image:linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]
                    dark:[background-image:linear-gradient(to_right,#555_1px,transparent_1px),linear-gradient(to_bottom,#555_1px,transparent_1px)]"
          style={{ backgroundSize: "40px 40px", opacity: 0.7 }}
        />

        {/* Game Container - Responsive heights for all screen sizes */}
        <div className="relative w-full h-80 sm:h-96 md:h-[26rem] lg:h-[28rem]">
          {/* Hero Image - Centered independently with higher z-index */}
          <div className="absolute inset-0 flex items-center justify-around z-30 pointer-events-none">
            <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-4 pt-16">
              <Image
                src="/assets/hero_image.svg"
                alt="GDG Hero"
                width={416}
                height={307}
                priority
                className="w-full h-auto"
              />
            </div>
            <div></div>
          </div>

          {/* Dino - Position at the very bottom to align with content section border */}
          <div
            ref={dinoRef}
            className="absolute bottom-0 left-4 sm:left-6 md:left-10 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 z-10"
          >
            <Image
              src="/assets/trex_t.png"
              alt="Dino"
              width={80}
              height={80}
              className="w-full h-auto"
            />
          </div>

          {/* Obstacles */}
          <div ref={obstaclesRef} className="absolute w-full h-full"></div>
        </div>
      </section>

      {/* Content Section - Border acts as ground line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-50"></div>

      {/* Content Section - Independent from game section */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row justify-around gap-20 items-center lg:items-center px-4 py-8 md:py-20">
        {/* Text Content */}
        <div>
          <div className="relative mt-8 sm:mt-0 bg-no-repeat bg-contain hero-illustration w-full h-auto p-2 md:max-w-[480px]">
            <h2 className="pt-1 sm:pt-3 pl-4 text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
              Connect. Learn. Build.
            </h2>

            <p className="mt-2.5 ml-3.5 text-lg sm:text-xl leading-6.5 sm:leading-relaxed break-words text-gray-800 dark:text-gray-200">
              At GDG NMIT – explore Google technologies, exchange expertise, and
              transform ideas into solutions. Through workshops, webinars, and
              tech talks, we Dream, Dare and Do.
            </p>

            {/* Social Media Links */}
            <div className="clear-both absolute bottom-1 sm:bottom-4 left-2">
              <div
                className="flex justify-start space-x-4"
                role="group"
                aria-label="Social media links"
              >
                {[
                  {
                    Icon: FaInstagram,
                    color: "hover:text-pink-500 dark:hover:text-pink-400",
                    label: "Instagram",
                  },
                  {
                    Icon: FaLinkedin,
                    color: "hover:text-blue-700 dark:hover:text-blue-600",
                    label: "LinkedIn",
                  },
                  {
                    Icon: FaFacebookSquare,
                    color: "hover:text-blue-500",
                    label: "Facebook",
                  },
                ].map(({ Icon, color, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={label}
                    className="transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon
                      className={`size-7 sm:size-7.5 text-gray-600 dark:text-gray-400 ${color}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lego Image */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end p-4">
          <Image
            src="/assets/gdg_community.gif"
            alt="GDG Community illustration"
            width={600}
            height={450}
            className="h-full w-auto md:min-h-[350px] md:mt-0 mt-20 filter drop-shadow-xl"
          />
        </div>
      </div>
    </main>
  );
}
