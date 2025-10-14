"use client";

import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
          <div className="flex-1 flex flex-col justify-center w-full md:w-3/4 lg:w-full mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Contact Us
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-4"></div>
              </div>

              <form className="space-y-6 mt-8">
                <div className="group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-xl border border-g-gray bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-g-blue focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-g-gray bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-g-blue focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 rounded-xl border border-g-gray bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-g-blue focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <textarea
                    rows={5}
                    placeholder="Message"
                    className="w-full px-4 py-3 rounded-xl border border-g-gray bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-g-blue focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 cursor-pointer rounded-full bg-g-blue hover:bg-blue-600 text-white font-semibold transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-g-blue focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="flex-1 relative min-h-[400px] lg:min-h-[600px] w-full md:w-3/4 lg:w-full mx-auto">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-g-gray shadow-2xl">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.595,13.005,77.606,13.016&layer=mapnik&marker=13.0103949,77.6007373"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              ></iframe>

              <a
                href="https://maps.app.goo.gl/WW5XvcC2jwoXsjfx6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-g-blue hover:bg-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer group"
                aria-label="Open directions in map"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white dark:bg-black p-4 rounded-xl border border-g-gray shadow-lg backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-g-blue flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                      Nitte Meenakshi Institute of Technology
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      NITTE Campus, Yelahanka, Bengaluru, Karnataka 560064
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
