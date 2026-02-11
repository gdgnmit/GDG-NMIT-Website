"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  location: string;
}

export default function UpcomingEventPage() {
  const [timerDone, setTimerDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const targetDate = new Date("2026-02-28T08:00:00").getTime();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimerDone(true);
      setDataReady(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const isReady = timerDone && dataReady;

  useEffect(() => {
    if (!titleRef.current || !isReady) return;

    const element = titleRef.current;
    const originalText = "CODESPRINT 4.0";
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

  const sponsors = [
    { name: "JetBrains", logo: "/jetbrains.png", link: "https://www.jetbrains.com", copyright: "Copyright c2025 JetBrains s.r.o. JetBrains and the JetBrains logo are trademarks of JetBrains s.r.o.", invertInDark: false },
    { name: "Unstop", logo: "/unstop.png", link: "https://unstop.com", },
    { name: "Visiting Cards", logo: "/VISITING_CARDS__2__page-0001-removebg-preview.png", link: "#", customSize: true, invertInDark: true },
    { name: "GMC", logo: "/GMC LogoS.png", link: "https://givemycertificate.com/", customSize: true },
    { name: "Dominos", logo: "/dominos_logo-removebg-preview.png", link: "https://www.dominos.co.in/", customSize: true },
    { name: "Gemini", logo: "/Gemini_PrimaryLogo_FullColor.png", link: "https://gemini.google.com/app?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_campaignid=20357620749", customSize: true },
  ];

  const timelineEvents: TimelineEvent[] = [
  {
    time: "08:00 AM - 09:00 AM",
    title: "Offline Team Registration",
    description: "Teams report to the venue for offline registration and verification.",
    location: "APJ Abdul Kalam Auditorium, NMIT",
  },
  {
    time: "09:00 AM - 09:30 AM",
    title: "Inauguration Ceremony",
    description: "Formal inauguration of CodeSprint 4.0 with welcome address.",
    location: "APJ Abdul Kalam Auditorium",
  },
  {
    time: "10:00 AM - 11:00 AM",
    title: "Trivia Round",
    description: "Fun and challenging technical trivia round for all teams.",
    location: "IS&E Labs, NMIT",
  },
  {
    time: "10:00 AM - 11:30 AM",
    title: "CTF Round",
    description: "Capture The Flag round testing cybersecurity and problem-solving skills.",
    location: "IS&E Labs, NMIT",
  },
  {
    time: "11:30 AM - 12:00 PM",
    title: "Break",
    description: "Short refreshment break for participants.",
    location: "Common Area",
  },
  {
    time: "12:10 PM - 03:10 PM",
    title: "Prototyping Phase",
    description: "Teams work on building and implementing their project ideas.",
    location: "IS&E Labs, NMIT",
  },
  {
    time: "03:10 PM - 04:00 PM",
    title: "Judgement & Review",
    description: "Evaluation and review of team submissions by the judges.",
    location: "Judges Panel",
  },
  {
    time: "04:00 PM - 04:15 PM",
    title: "Closing Ceremony & Prize Distribution",
    description: "Announcement of winners and prize distribution.",
    location: "APJ Abdul Kalam Auditorium",
  },
];


  return (
    <>
      {isLoading ? (
        <Loader className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />
      ) : (
        <div className="min-h-screen bg-white dark:bg-g-almost-black">
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 dark:bg-g-almost-black">
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)]">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl font-bold leading-tight font-mono dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-g-blue via-g-red to-g-yellow dark:bg-none"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    CODESPRINT 4.0
                  </h1>

                  <p className="text-xl sm:text-2xl md:text-3xl dark:text-gray-300 max-w-xl mx-auto font-medium leading-relaxed pt-4">
                    Get ready to brings together passionate coders for an intense, multi-round battle of brains, speed, and innovation—push your limits and code your way to victory.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-g-almost-black py-16 lg:py-20 -mt-10 mb-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Starts In
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mx-auto mt-2 mb-12"></div>

                <div className="flex justify-center">
                  <div
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-mono tabular-nums tracking-tight leading-none bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {`${String(timeLeft.days).padStart(2, "0")}:${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-g-almost-black py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Event Timeline
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>
              <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-4">
                A day filled with coding challenges, networking, and innovation
              </p>


              <div className="relative py-8">
                <div className="max-w-5xl mx-auto relative">
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 shadow-lg" style={{
                    height: '100%',
                    background: 'linear-gradient(to bottom, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)'
                  }} />
                  <div className="relative">
                    {timelineEvents.map((event, index) => {
                      const isEven = index % 2 === 0;
                      const isLeft = isEven;
                      const isLast = index === timelineEvents.length - 1;

                      return (
                        <div
                          key={index}
                          className={`relative mb-10 md:mb-12 ${isLeft
                            ? "md:pr-[calc(50%+2rem)] md:pl-0 md:text-right"
                            : "md:pl-[calc(50%+2rem)] md:pr-0 md:text-left"
                            }`}
                        >
                          {/* Timeline Node - Desktop */}
                          <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 z-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-g-blue to-g-green rounded-full shadow-lg animate-pulse" />
                            <div className="absolute inset-1 bg-white dark:bg-g-almost-black rounded-full" />
                            <div className="absolute inset-2 bg-gradient-to-r from-g-blue to-g-green rounded-full" />
                          </div>

                          {/* Timeline Node - Mobile */}
                          <div className="md:hidden absolute left-0 top-6 w-4 h-4 -ml-2 z-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-g-blue to-g-green rounded-full shadow-lg" />
                            <div className="absolute inset-1 bg-white dark:bg-g-almost-black rounded-full" />
                          </div>

                          {/* Timeline Line - Mobile (only if not last) */}
                          {!isLast && (
                            <div className="md:hidden absolute left-0 top-10 bottom-0 w-0.5 -ml-[1px]" style={{
                              background: 'linear-gradient(to bottom, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)'
                            }} />
                          )}

                          {/* Event Card */}
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: typeof window !== "undefined" && window.innerWidth < 768
                                ? 150 
                                : isLeft
                                  ? -300 
                                  : 300, 
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 80,
                              damping: 18,
                              duration: 1.4,
                            }}
                            viewport={{ once: true, amount: 0.3 }}>
                            <div
                              className={`relative ${isLeft ? "md:mr-8" : "md:ml-8"} rounded-xl p-6 transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.28),0_-14px_30px_-16px_rgba(59,130,246,0.24),14px_0_28px_-16px_rgba(59,130,246,0.22),-14px_0_28px_-16px_rgba(59,130,246,0.22)] border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl hover:ring-1 hover:ring-blue-500/30`}
                            >
                              <div className="inline-block mb-3 px-4 py-1.5 bg-gradient-to-r from-g-blue to-g-green text-white text-sm font-bold rounded-full shadow-sm">
                                {event.time}
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {event.title}
                              </h3>
                              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sponsors Section */}
          <section className="bg-white dark:bg-g-almost-black py-12 lg:py-16 mb-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Sponsors
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>
              </div>

              <div className="flex justify-center flex-wrap gap-8 md:gap-12">
                {sponsors.map((sponsor, index) => (
                  <div
                    key={sponsor.name}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-105"
                  >
                    <div className="flex justify-center items-center w-[180px] h-[120px] md:w-[220px] md:h-[140px] p-6">
                      <Link href={sponsor.link} target="_blank" className="flex justify-center items-center w-full h-full">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className={`object-contain transition-all duration-300 hover:opacity-80 ${
                            sponsor.customSize ? 'max-h-24 md:max-h-28 max-w-[160px] md:max-w-[180px]' : 'max-h-16 md:max-h-20 max-w-[140px] md:max-w-[160px]'
                          } ${
                            sponsor.invertInDark ? 'dark:invert' : ''
                          }`}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      )}
    </>
  );
}
