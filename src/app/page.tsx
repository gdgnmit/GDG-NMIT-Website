"use client";
import React, { useState, useEffect } from "react";
import HomePage from "@/components/HomePage";
import Domain from "@/components/Domain";
import ContactUsHome from "@/components/ContactUsHome";
import WhatWeDo from "@/components/WhatWeDo";
import Loader from "@/components/Loader";
import { LANDING_LOADER_MS } from "@/lib/loaderTiming";
import UpcomingEvent from "@/components/UpcomingEvent";
import Popup from "@/components/Popup"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LANDING_LOADER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader durationMs={LANDING_LOADER_MS} className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />
      ) : (
        <>
          <Popup />
          <HomePage />
          <WhatWeDo />
          <UpcomingEvent />
          <Domain />
          <ContactUsHome />
        </>
      )}
    </>
  );
}
