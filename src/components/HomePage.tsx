"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
 
  FaInstagram,
  FaLinkedin,
  FaFacebookSquare,
} from "react-icons/fa";

export default function HomeScreen() {
  const dinoRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const activeBirds = useRef<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      // Animate in
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, scale: 0.8, y: -20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      // Animate out
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        scale: 0.8,
        y: -20,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);
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

      const rand = Math.random();
      let imgSrc = "";
      let width = 40;
      let height = 64;
      let bottomPos = 10;
      let isBird = false;
      let isCloud = false;

      if (rand < 0.2) {
        // Cloud (20%)
        imgSrc = "/assets/cloud.png";
        width = 100 + Math.random() * 50; // random width for variation
        height = 60;
        bottomPos = 200 + Math.random() * 50; // high up
        isCloud = true;
      } else if (rand < 0.4) {
        // Bird (30%)
        imgSrc = "/assets/bird.png";
        width = 64;
        height = 64;
        isBird = true;

        let tries = 0;
        do {
          bottomPos = 60 + Math.random() * 30;
          tries++;
        } while (
          activeBirds.current.some((b) => Math.abs(b - bottomPos) < 30) &&
          tries < 10
        );
        activeBirds.current.push(bottomPos);
      } else {
        // Cactus / obstacle (50%)
        const isDarkMode = document.documentElement.classList.contains("dark");
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
        left: -200, // move off screen
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

      setTimeout(spawnObstacle, Math.random() * 2000 + 3000);
    };

    spawnObstacle();
  }, []);
  
  return (
    <main className="w-full relative pt-10">

      {/* Grid Background */}
     <div
        ref={gridRef}
        className="absolute left-0 top-0 w-full h-[23px] sm:h-[300px] md:h-[410px] z-[-10] pointer-events-none
                  bg-white dark:bg-black
                  [background-image:linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]
                  dark:[background-image:linear-gradient(to_right,#555_1px,transparent_1px),linear-gradient(to_bottom,#555_1px,transparent_1px)]"
        style={{ backgroundSize: "40px 40px", opacity: 0.7 }}
      />

   

      {/* Dino Game Section */}
      <section className="flex mt-1 sm:mt-1 lg:mt-1 ">
        <div className="relative w-full h-60 sm:h-80 md:h-96 overflow-hidden">
          {/* Ground */}
          <div className="absolute bottom-3 w-full border-t-2 border-gray-500 dark:border-gray-400"></div>

          {/* Center Logo */}
          <div className="absolute lg:w-full lg:h-full flex justify-center items-center bottom-0 ">
          <div className="absolute -bottom-9 left-2/5 transform -translate-x-1/2 -translate-y-1/4 z-10">
            <div className="bg-blue-500 dark:bg-blue-600 w-180 h-20 md-w-100 md-h-15 rounded-4xl justify-end ml-40">
              <div className=" bg-gradient-to-r from-blue-200 to-white dark:from-blue-300 dark:to-gray-800 w-85 h-20 md-w-25 md-h-15  rounded-4xl flex justify-left align-left">
                <h1 className="text-5xl font-light bg-clip-text text-gray-800 dark:text-white mt-3 ml-10 ">
                  Google
                </h1>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="bg-yellow-500 dark:bg-yellow-600 w-180 h-20 md-w-100 md-h-15  rounded-4xl flex justify-end">
                <div className="bg-gradient-to-l from-yellow-300 to-white dark:from-yellow-300 dark:to-gray-800 w-95 h-20 md-w-70 md-h-15 rounded-4xl flex justify-left align-left ">
                  <h1 className="text-5xl font-light bg-clip-text text-gray-800 dark:text-white mt-3 ml-5 ">
                    Developer
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-green-600 dark:bg-green-700 w-180 h-20 md-w-100 md-h-15 rounded-4xl ml-40 flex justify-end ">
              <div className=" bg-gradient-to-l from-green-200 to-white dark:from-green-300 dark:to-gray-800 w-65 h-20 md-w-30 md-h-15  rounded-4xl flex justify-left align-left">
                <h1 className="text-5xl font-light bg-clip-text text-gray-800 dark:text-white mt-3 ml-5">
                  Groups
                </h1>
              </div>
            </div>
          </div>
          </div>

          {/* Dino */}
          <div
            ref={dinoRef}
            className="absolute bottom-2 left-6 sm:left-10 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
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

      {/*start here  */}
      <div className="w-full h-full flex md:flex-col lg:flex-row sm:flex-col justify-between ">
      <div className="text-white text-lg pl-20 pt-20" > 
      <div className=" relative w-120 h-50 border-2 border-gray-400 dark:bg-black rounded-3xl  border-b-transparent rounded-br-none border-r-transparent z-10">
          <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold ml-5 mt-3 text-gray-900 dark:text-white">
            Connect. Learn. Build.
          </h2>
          <p className=" text-lg sm:text-2xl md:text-2xl lg:text-2xl  leading-relaxed break-words mt-5 ml-5 w-150 text-gray-800 dark:text-gray-200 z-100">
            At GDG NMIT – explore Google <br /> technologies, exchange
            expertise, and transform ideas into solutions. Through workshops,
            webinars, and
          </p>

          <div className="absolute left-29 top-19 w-81 h-31 rounded-xl     ">
            <div className="absolute w-131 h-50  border-2 border-t-transparent  -z-20 border-gray-400 dark:bg-black  rounded-3xl border-l-transparent">
              {/* Concave top-right */}
              <div className="absolute -top-19 right-1 w-41.5 h-21 border-2 bg-white border-gray-400 dark:bg-black rounded-xl border-t-transparent border-r-transparent rounded-tl-none rounded-br-none"></div>
              {/* Concave bottom-left */}
              <div className="absolute flex justify-center  items-center bottom-1 -left-28.5 w-30.5 h-20 border-2 border-gray-400 dark:bg-black rounded-xl border-b-transparent  border-l-transparent rounded-br-none rounded-tl-none z-10">
                 <div className="flex justify-center mr-2 space-x-2">
                            {[
                              
                              {
                                Icon: FaInstagram,
                                color: "hover:text-pink-500 dark:hover:text-pink-400",
                              },
                              {
                                Icon: FaLinkedin,
                                color: "hover:text-blue-700 dark:hover:text-blue-600",
                              },
                              {
                                Icon: FaFacebookSquare,
                                color: "hover:text-blue-500 ",
                              },
        
                            ].map(({ Icon, color }, i) => (
                              <div
                                key={i}
                                className={` text-gray-700 dark:text-gray-300 rounded-lg shadow-md dark:shadow-gray-800 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300  ${color}`}
                              >
                                <Icon size={30} />
                              </div>
                            ))}
                                           </div>
              </div>

              {/* Inner wrapper to fit text perfectly */}
              <div className="absolute top-5 left-6 right-6 bottom-5 flex flex-col justify-start overflow-hidden">
                <p className="text-lg sm:text-2xl md:text-2xl lg:text-2xl mt-22 px-5 leading-relaxed break-words text-gray-800 dark:text-gray-200">
                  tech talks, we Dream, Dare and Do.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="text-white text-lg pr-20">
      <Image src={"/assets/lego1.png"} 
          alt="lego" width={300} height={300} 
          className="w-40 h-40 sm:w-100 sm:h-100 md:w-100 md:h-100 lg:w-115 lg-p-20 lg:h-115 md:mt-10 md:ml-20 sm:ml-20 sm:mt-20"/>

      </div>
      </div>
   
    </main>
  );
}
