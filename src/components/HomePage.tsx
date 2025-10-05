"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

export default function HomeScreen() {
  const dinoRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const activeBirds = useRef<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating animation
    gsap.to(gridRef.current, {
      backgroundPosition: "200px 200px",
      duration: 8,
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
        y: -80,
        duration: 0.5,
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

      const isBird = Math.random() < 0.3;
      const imgSrc = isBird ? "/bird.png" : "/vector.png";
      obstacle.style.width = isBird ? "64px" : "40px";
      obstacle.style.height = "64px";

      let bottomPos = 10;
      if (isBird) {
        let tries = 0;
        do {
          bottomPos = 60 + Math.random() * 40;
          tries++;
        } while (
          activeBirds.current.some((b) => Math.abs(b - bottomPos) < 40) &&
          tries < 10
        );
        activeBirds.current.push(bottomPos);
      }

      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.width = "100%";
      img.style.height = "100%";
      obstacle.appendChild(img);

      obstacle.style.left = `${window.innerWidth}px`;
      obstacle.style.bottom = `${bottomPos}px`;

      gsap.to(obstacle, {
        left: -100,
        duration: 5,
        ease: "linear",
        onUpdate: () => {
          if (!isBird && dinoRef.current) {
            const dinoLeft = dinoRef.current.offsetLeft;
            const obstacleLeft = obstacle.offsetLeft;
            if (!isJumping.current && obstacleLeft < dinoLeft + 120 && obstacleLeft > dinoLeft + 50) {
              dinoJump();
            }
          }
        },
        onComplete: () => {
          if (isBird) {
            activeBirds.current = activeBirds.current.filter((b) => b !== bottomPos);
          }
          obstacle.remove();
        },
      });

      setTimeout(spawnObstacle, Math.random() * 2000 + 1000);
    };

    spawnObstacle();
  }, []);

  return (
    <main className="relative bg-white overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md fixed z-20 w-full">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/GDG_Logo.jpg" alt="GDG Logo" width={400} height={80} />
      </div>

      {/* Navigation */}
      <div className="h-16 ml-10 mr-5 border-1 border-gray-400 rounded-full p-4">
        <nav>
          <ul className="flex space-x-10 text-black font-sans-bold">
            <li>
              <Link
                href="/about"
                className="px-4 py-2 rounded-full text-black 
                  hover:bg-blue-400 hover:text-white 
                  hover:text-xl hover:font-bold
                  transform hover:scale-125
                  transition-all duration-300 ease-in-out"
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                href="/domain"
                className="px-4 py-2 rounded-full text-black 
                  hover:bg-red-400 hover:text-white 
                  hover:text-xl hover:font-bold
                  transform hover:scale-125
                  transition-all duration-300 ease-in-out"
              >
                DOMAIN
              </Link>
            </li>
            <li>
              <Link
                href="/event"
                className="px-4 py-2 rounded-full text-black 
                  hover:bg-green-400 hover:text-white 
                  hover:text-xl hover:font-bold
                  transform hover:scale-125
                  transition-all duration-300 ease-in-out"
              >
                EVENT
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="px-4 py-2 rounded-full text-black 
                  hover:bg-yellow-400 hover:text-white 
                  hover:text-xl hover:font-bold
                  transform hover:scale-125
                  transition-all duration-300 ease-in-out"
              >
                PROJECTS
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="px-4 py-2 rounded-full text-black 
                  hover:bg-blue-400 hover:text-white 
                  hover:text-xl hover:font-bold
                  transform hover:scale-125
                  transition-all duration-300 ease-in-out"
              >
                TEAM
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-full text-black 
                  hover:bg-green-400 hover:text-white 
                  hover:text-xl hover:font-bold
                  transform hover:scale-125
                  transition-all duration-300 ease-in-out"
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

      {/* Grid Background (top half) */}
      <div
          ref={gridRef}
          className="absolute left-0 w-full h-[385px] mt-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundColor: "white",
            opacity: 0.7,
          }}
        />


      {/* Dino Game Section */}
      <section className="flex mt-20">
          <div className="relative w-full h-96 overflow-hidden">
          <div className="absolute bottom-0 w-full h-10">
            <Image src="/ground.gif" alt="Ground" fill className="object-cover" />
          </div>

          <div className="absolute top-1/2 left-160 -translate-x-1/2 mt-14 -translate-y-1/2 z-10">
            <Image src="/gdg_main_logo.png" alt="GDG Logo" width={900} height={900} />
          </div>

          <div ref={dinoRef} className="absolute bottom-2 left-20 w-16 h-16">
            <Image src="/dinosaur.png" alt="Dino" width={80} height={80} />
          </div>

          <div ref={obstaclesRef} className="absolute w-full h-full"></div>
        </div>
      </section>
      {/* Info Section */}
      <section className="flex justify-start ml-36 items-center py-10 relative">
        <div className="relative w-[1000px] h-[800px]">
          <Image
            src="/union.png"
            alt="GDG Event"
            width={800}
            height={800}
            className="rounded-xl object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col text-left mt-7 px-10">
            <h2 className="text-5xl font-extrabold mb-5 font-[var(--font-google)]">
              Connect. Learn. Build.
            </h2>
            <p className="text-3xl leading-relaxed max-w-[800px] font-[var(--font-google)]">
              At GDG NMIT - explore Google <br /> technologies, exchange expertise, and transform ideas <br /> into solutions. Through workshops, webinars and tech
            </p>
            <p className="text-3xl leading-relaxed ml-50 max-w-[800px] font-[var(--font-google)]">
              talks, we Dream, Dare and Do.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
