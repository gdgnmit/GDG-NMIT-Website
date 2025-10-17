"use client";
import React from "react";

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-white text-black font-[Geist_Mono] leading-relaxed">
      <section className="px-6 py-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Text Content */}
          <div className="md:w-3/5 w-full">
            <h1 className="text-4xl md:text-[2.5rem] mb-6 font-normal tracking-wide">
              About Us
            </h1>

            <p className="mb-6 text-base text-left">
              Welcome to the GDG Club – a vibrant community where innovation,
              learning, and collaboration converge! We are a group of passionate
              developers, designers, and tech enthusiasts united by a common
              interest in Google technologies.
            </p>

            <p className="mb-6 text-base text-left">
              At GDG Club, we believe in the power of shared knowledge. We
              regularly host workshops, study jams, and speaker sessions covering
              a wide array of topics, from Android development and web
              technologies to cloud computing, machine learning, and AI.
            </p>

            <p className="mb-6 text-base text-left">
              Beyond technical growth, we emphasize community building. We
              organize regular meetups, hackathons, and social events that foster
              networking and camaraderie. We celebrate diversity and encourage
              members from all backgrounds and skill levels to join us. Your
              unique perspective is what makes our community stronger and more
              innovative.
            </p>
          </div>

          {/* Images */}
          <div className="hidden md:block relative md:w-[35%] min-h-[550px]">
            <img
              src="/assets/img1.webp"
              alt="Speaker presenting at GDG Club event"
              className="absolute top-0 left-0 z-20 w-full max-w-[300px] h-auto object-cover"
            />
            <img
              src="/assets/img2.webp"
              alt="Colorful GDG abstract shapes"
              className="absolute top-[80px] left-[115px] z-10 w-full max-w-[280px] h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
