import React from "react";
import Image from "next/image";

const WhatWeDo = () => {
  return (
    <section className="bg-white dark:bg-g-almost-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="w-full overflow-hidden rounded-2xl">
              <Image
                src="/assets/illustration_teamwork.jpg"
                alt="What we do illustration"
                width={1000}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              What we do
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>

            <div className="mt-8 space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We&lsquo;re a bunch of tech enthusiasts who love to build, break, and
                learn!
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                At GDG NMIT we host hands-on workshops, crazy-cool hackathons,
                tech talks, and coding challenges that keep the geek in you
                alive.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Whether you&apos;re a beginner trying to code your first &quot;Hello
                World&quot; or a pro building the next big thing, there&apos;s always
                something exciting happening here! We learn together, share
                ideas, and grow into better developers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
