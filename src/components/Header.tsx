"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

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
  blue: "hover:bg-g-blue",
  red: "hover:bg-g-red",
  green: "hover:bg-g-green",
  yellow: "hover:bg-g-yellow",
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
    <header className="fixed w-screen flex justify-between items-center p-3 px-4 sm:px-4 bg-white dark:bg-black z-50 border-b border-gray-200 dark:border-g-gray/70">
      <Link href="/" className="flex items-center flex-shrink-0">
        <Image
          src="/assets/gdg.svg"
          alt="GDG Logo"
          width={50}
          height={50}
          className="h-8 w-auto"
        />
        <div className="flex flex-col align-left justify-center">
          <h1 className="ml-2 text-xl lg:text-2xl text-black dark:text-white leading-6">
            <span className="block sm:hidden text-xl font-bold">GDG NMIT</span>
            <span className="hidden sm:block">Google Developer Groups</span>
          </h1>
          <h2 className="hidden sm:block ml-2 text-md lg:text-md text-g-blue leading-4">
            Nitte Meenakshi Institute of Technology
          </h2>
        </div>
      </Link>

      <div className="flex-grow flex justify-end">
        <nav className="hidden h-12 lg:flex items-center justify-center border border-g-gray/60 rounded-full">
          <ul className="flex px-2 flex-wrap items-center gap-2 text-black dark:text-white text-sm lg:text-base">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`/${item.name.replace(/\s+/g, "").toLowerCase()}`}
                  className={`px-3.5 py-1.5 rounded-full text-black dark:text-white
              ${
                colorMap[item.color]
              } hover:text-white transition-all duration-300 ease-in-out`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="lg:hidden ml-auto pr-4 flex justify-end items-center">
        <button
          className="flex flex-col justify-between w-6 h-5 focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block h-0.5 w-full bg-black dark:bg-white rounded"></span>
          <span className="block h-0.5 w-full bg-black dark:bg-white rounded"></span>
          <span className="block h-0.5 w-full bg-black dark:bg-white rounded"></span>
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white dark:bg-black shadow-2xl lg:hidden z-50
    transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800
    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <span className="font-mono">./</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-black dark:text-white hover:text-g-red transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-3 p-6 text-black dark:text-white">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              ref={(el) => {
                if (el && menuOpen) {
                  gsap.fromTo(
                    el,
                    { opacity: 0, x: 50 },
                    {
                      opacity: 1,
                      x: 0,
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: "power3.out",
                    }
                  );
                }
              }}
            >
              <a
                href={`/${item.name.replace(/\s+/g, "").toLowerCase()}`}
                className={`block px-4 py-3 rounded-full text-center text-black dark:text-white border border-g-gray hover:border-transparent ${
                  colorMap[item.color]
                } hover:text-white transition-all duration-300 ease-in-out cursor-pointer`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
