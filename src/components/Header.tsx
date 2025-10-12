"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

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
    blue: "hover:bg-blue-400 dark:hover:bg-blue-500",
    red: "hover:bg-red-400 dark:hover:bg-red-500",
    green: "hover:bg-green-400 dark:hover:bg-green-500",
    yellow: "hover:bg-yellow-400 dark:hover:bg-yellow-500",
  };

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <main className="relative bg-white dark:bg-gray-900 overflow-hidden">
        
        <header className=" fixed flex justify-between items-center p-3 sm:p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800  z-20 w-full border-b border-gray-200 dark:border-gray-700">
          
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/assets/google_logo.png"
              alt="GDG Logo"
              width={50}
              height={50}
              className="w-26 sm:w-26 md:w-26 lg:w-26 h-auto"
            />
            <div className="flex flex-col align-left justify-center">
              <h1 className="ml-2 text-xl sm:text-xl md:text-xl lg:text-3xl font-light text-black dark:text-white">
                Google Developer Groups
              </h1>
              <h2 className="ml-2 text-lg sm:text-lg md:text-lg lg:text-lg font-light text-blue-400 dark:text-blue-300">
                Nitte Meenakshi Institute of Technology
              </h2>
            </div>
          </div>

          
          <div className="flex-grow flex justify-end">
           
            <nav className="hidden md:flex items-center justify-center h-12 border border-gray-300 dark:border-gray-600 rounded-full px-3 lg:px-10 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
              <ul className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-black dark:text-white text-sm lg:text-base">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={`/${item.name.replace(/\s+/g, "").toLowerCase()}`}
                      className={`px-3 sm:px-2 py-2 rounded-full text-black dark:text-white font-medium
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

         
          <div className="md:hidden ml-auto pr-4 flex justify-end items-center">
            <button
              className="flex flex-col justify-between w-6 h-5 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block h-0.5 w-full bg-black dark:bg-white rounded"></span>
              <span className="block h-0.5 w-full bg-black dark:bg-white rounded"></span>
              <span className="block h-0.5 w-full bg-black dark:bg-white rounded"></span>
            </button>
          </div>

          
          <div
            ref={mobileMenuRef}
            className={`absolute top-16 right-4 w-1/2 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-xl md:hidden z-20
    transform transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-600
    ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            style={{ display: menuOpen ? "block" : "none" }}
          >
            <ul className="flex flex-col space-y-2 p-4 text-center text-black dark:text-white">
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  ref={(el) => {
                    if (el && menuOpen) {
                      gsap.fromTo(
                        el,
                        { opacity: 0, y: -20 },
                        {
                          opacity: 1,
                          y: 0,
                          delay: index * 0.05,
                          duration: 0.4,
                          ease: "power3.out",
                        }
                      );
                    }
                  }}
                >
                  <a
                    href={`#${item.name.replace(/\s+/g, "").toLowerCase()}`}
                    className={`block py-2 rounded-full text-black dark:text-white ${
                      colorMap[item.color]
                    } hover:text-white transition-all duration-200`}
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
  );
};

export default Header;
