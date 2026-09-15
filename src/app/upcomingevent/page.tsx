"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function UpcomingEventPage() {
  const [timerDone, setTimerDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimerDone(true);
      setDataReady(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const isReady = timerDone && dataReady;

  useEffect(() => {
    if (!titleRef.current || !isReady) return;

    const element = titleRef.current;
    const originalText = "GDG NMIT Recruitment 2026";
    let iteration = 0;

    const interval = setInterval(() => {
      const animatedText = originalText
        .split("")
        .map((letter, index) => {
          if (letter === " ") return letter;
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      element.textContent = animatedText;

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 5;
    }, 50);

    return () => clearInterval(interval);
  }, [isReady, chars]);

  return (
    <>
      {isLoading ? (
        <Loader className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />
      ) : (
        <div className="min-h-screen bg-white dark:bg-g-almost-black">
          <section className="relative flex items-center justify-center overflow-hidden pt-24 pb-12 dark:bg-g-almost-black">
            <div className="relative z-10 flex items-center justify-center">
              <div className="text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <h1
                    ref={titleRef}
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight font-mono dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-g-blue via-g-red to-g-yellow dark:bg-none"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    GDG NMIT Recruitment 2026
                  </h1>

                  <p className="text-xl sm:text-2xl md:text-3xl dark:text-gray-300 max-w-xl mx-auto font-medium leading-relaxed pt-4">
                    Join the team behind GDG NMIT.
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    We&apos;re looking for enthusiastic students who want to learn, build,
                    collaborate, organize events, and contribute to the GDG NMIT community.
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Think you have what it takes? Join us!
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-g-almost-black pb-20 lg:pb-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-md mx-auto rounded-xl p-6 sm:p-8 transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.28)] border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl hover:ring-1 hover:ring-blue-500/30"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
                    <img
                      src="/assets/gdg_recruitment.png"
                      alt="GDG NMIT Recruitment 2026 registration QR code"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                    />
                  </div>
                  <p className="mt-4 text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Scan to Register
                  </p>

                  <Link
                    href="https://forms.gle/2whRjMZDV38nd9uy8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#4285F4] to-[#34A853] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-indigo-400"
                  >
                    Register Now
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
