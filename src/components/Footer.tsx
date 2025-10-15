"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  const navLinks = [
    { name: "About Us", href: "/aboutus" },
    { name: "Domain", href: "/domain" },
    { name: "Events", href: "/event" },
    { name: "Projects", href: "/projects" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { Icon: FaInstagram, href: "#", label: "Instagram" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaGithub, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="h-1 w-full" style={{
        background: 'linear-gradient(to right, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)'
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/assets/GDG On Campus NMIT Logo.svg"
                alt="GDG NMIT Logo"
                width={300}
                height={80}
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mb-6">
              Empowering developers through collaboration, learning, and
              innovation. Let&apos;s build a better tech future — together.
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-g-gray bg-white dark:bg-black text-gray-600 dark:text-gray-400 hover:bg-g-blue hover:text-white hover:border-transparent transition-all duration-300 ease-in-out flex items-center justify-center transform hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-g-blue dark:hover:text-g-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="leading-relaxed">
                Nitte Meenakshi Institute of Technology
                <br />
                Yelahanka, Bengaluru
                <br />
                Karnataka 560064
              </p>
              <a
                href="mailto:gdg@nmit.ac.in"
                className="block hover:text-g-blue dark:hover:text-g-blue transition-colors duration-300"
              >
                gdg@nmit.ac.in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} GDG On Campus NMIT. All rights
              reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-g-blue dark:hover:text-g-blue transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-g-blue dark:hover:text-g-blue transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
