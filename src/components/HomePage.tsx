  "use client";

  import { useEffect, useRef, useState} from "react";
  import Image from "next/image";
  import gsap from "gsap";
  import Link from "next/link";

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
          imgSrc = "/cloud.png";
          width = 100 + Math.random() * 50; // random width for variation
          height = 60;
          bottomPos = 200 + Math.random() * 50; // high up
          isCloud = true;
        } else if (rand < 0.4) {
          // Bird (30%)
          imgSrc = "/bird.png";
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
          imgSrc = "/Vector.png";
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
              activeBirds.current = activeBirds.current.filter((b) => b !== bottomPos);
            }
            obstacle.remove();
          },
        });
      
        setTimeout(spawnObstacle, Math.random() * 2000 + 3000);
      };

      spawnObstacle();
    }, []);
    interface NavItem {
    name: string;
    color: string;
    }
    const navItems: NavItem[] = [
    { name: "ABOUT US", color: "blue" },
    { name: "DOMAIN", color: "red" },
    { name: "EVENT", color: "green" },
    { name: "PROJECTS", color: "yellow" },
    { name: "TEAM", color: "blue" },
    { name: "CONTACT US", color: "green" },
  ];
  const colorMap: Record<string, string> = {
    blue: "hover:bg-blue-400",
    red: "hover:bg-red-400",
    green: "hover:bg-green-400",
    yellow: "hover:bg-yellow-400",
  };
    return (
    <main >
    {/* Header */}
    <main className="relative bg-white overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-3 sm:p-4 bg-white shadow-md fixed z-20 w-full">
          {/* Logo */}
        <div className="flex items-center flex-shrink-0">
      <Image
        src="/google_logo.png"
        alt="GDG Logo"
        width={50}
        height={50}
        className="w-26 sm:w-26 md:w-26 lg:w-26 h-auto"
      />
      <div className="flex flex-col align-left justify-center">
        <h1 className="ml-2 text-xl sm:text-xl md:text-xl lg:text-3xl font-light text-black">
          Google Developer Groups
          </h1>
        <h2 className="ml-2 text-lg sm:text-lg md:text-lg lg:text-lg font-light text-blue-400">
          Nitte Meenakshi Institute of Technology
        </h2>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex-grow flex justify-end">
  {/* Desktop Nav */}
  <nav className="hidden md:flex items-center justify-center h-12 border border-gray-300 rounded-full px-3 lg:px-10 bg-white shadow-sm">
    <ul className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-black text-sm lg:text-base">
      {navItems.map((item) => (
        <li key={item.name}>
          <a
            href={`#${item.name.replace(/\s+/g, "").toLowerCase()}`}
            className={`px-3 sm:px-2 py-2 rounded-full text-black font-medium
              ${colorMap[item.color]} hover:text-white hover:font-bold
              transform hover:scale-110 transition-all duration-300 ease-in-out`}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</div>  
    

            {/* Mobile Hamburger */}
<div className="md:hidden ml-auto pr-4 flex justify-end items-center">
  <button
    className="flex flex-col justify-between w-6 h-5 focus:outline-none"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <span className="block h-0.5 w-full bg-black rounded"></span>
    <span className="block h-0.5 w-full bg-black rounded"></span>
    <span className="block h-0.5 w-full bg-black rounded"></span>
  </button>
</div>

{/* Mobile Dropdown Menu */}
<div
  ref={mobileMenuRef}
  className={`absolute top-16 right-4 w-1/2 bg-white shadow-md rounded-xl md:hidden z-20
    transform transition-all duration-300 ease-in-out
    ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
  style={{ display: menuOpen ? "block" : "none" }}
>
  <ul className="flex flex-col space-y-2 p-4 text-center text-black">
    {navItems.map((item, index) => (
      <li
        key={item.name}
        ref={(el) => {
          if (el && menuOpen) {
            gsap.fromTo(
              el,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, delay: index * 0.05, duration: 0.4, ease: "power3.out" }
            );
          }
        }}
      >
        <a
          href={`#${item.name.replace(/\s+/g, "").toLowerCase()}`}
          className={`block py-2 rounded-full text-black ${colorMap[item.color]} hover:text-white transition-all duration-200`}
          onClick={() => setMenuOpen(false)}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
</div>

        </header>
      </main>

    {/* Grid Background */}
    {/*<div
      ref={gridRef}
      className="absolute left-0 w-full h-[250px] sm:h-[300px] md:h-[385px] mt-20"
      style={{
        backgroundImage:
          "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundColor: "white",
        opacity: 0.7,
      }}
    />*/}

    {/* Dino Game Section */}
    <section className="flex mt-1 sm:mt-1 lg:mt-1 ">
      <div className="relative w-full h-60 sm:h-80 md:h-96 overflow-hidden mt-40">
        {/* Ground */}
        <div className="absolute bottom-3 w-full border-t-2 border-gray-500"></div>

        {/* Center Logo */}
        <div className="absolute -bottom-9 left-2/5 transform -translate-x-1/2 -translate-y-1/4 z-10"> 
          <div className="bg-blue-500 w-180 h-20 rounded-4xl justify-end ml-40"> 
              <div className=" bg-gradient-to-r from-blue-200 to-white w-85 h-20 rounded-4xl flex justify-left align-left"> 
                <h1 className="text-5xl font-light bg-clip-text mt-3 ml-10 "> 
                  Google 
                </h1> 
              </div> 
            </div> 
            <div className="flex flex-row">
          <div className="bg-yellow-500 w-180 h-20 rounded-4xl flex justify-end"> 
            <div className="bg-gradient-to-l from-yellow-300 to-white w-95 h-20 rounded-4xl flex justify-left align-left "> 
              <h1 className="text-5xl font-light bg-clip-text mt-3 ml-5 "> 
                Developer 
              </h1> 
            </div> 
          </div>
          </div>
          <div className="bg-green-600 w-180 h-20 rounded-4xl ml-40 flex justify-end "> 
            <div className=" bg-gradient-to-l from-green-200 to-white w-65 h-20 rounded-4xl flex justify-left align-left"> 
              <h1 className="text-5xl font-light bg-clip-text mt-3 ml-5"> 
                Groups 
              </h1> 
            </div> 
          </div> 
        </div>

        {/* Dino */}
        <div
          ref={dinoRef}
          className="absolute bottom-2 left-6 sm:left-10 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
        >
          <Image
            src="/trex.png"
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

    



    <div className="flex ml-20 py-10 sm:px-5 md:px-5">
    <div className="relative w-120 h-50 border-2 border-gray-400 rounded-3xl -z-1 rounded-br-none border-r-transparent">

      <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold ml-5 mt-3">
        Connect. Learn. Build.
      </h2>
      <p className="text-lg sm:text-2xl md:text-2xl lg:text-2xl leading-relaxed break-words mt-5 ml-5 w-150">
      At GDG NMIT – explore Google <br /> technologies, exchange expertise, and
      transform ideas into solutions. Through workshops, webinars, and
      </p>
      
      <div className="absolute left-29 top-19 w-71 h-31 rounded-xl bg-white -z-10">

        <div className="absolute w-131 h-50 border-2 border-t-transparent bg-white -z-5 rounded-3xl   border-gray-400  border-l-transparent">
          {/* Concave top-right */}
          <div className="absolute -top-19 right-1 w-41.5 h-21 border-2 bg-white rounded-xl border-t-transparent  border-gray-400  border-r-transparent rounded-tl-none rounded-br-none"></div>
          {/* Concave bottom-left */}
          <div className="absolute bottom-1 -left-28.5 w-30.5 h-20 border-2 bg-white rounded-xl border-b-transparent   border-gray-400  border-l-transparent rounded-br-none rounded-tl-none z-10"></div>

          {/* Inner wrapper to fit text perfectly */}
          <div className="absolute top-5 left-6 right-6 bottom-5 flex flex-col justify-start overflow-hidden z-20">

            {/* Additional inner div for padding/margin */}
            <p className="text-lg sm:text-2xl md:text-2xl lg:text-2xl mt-22 leading-relaxed break-words ">
                tech talks, we Dream, Dare and Do.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>





  </main>
    );
  }
