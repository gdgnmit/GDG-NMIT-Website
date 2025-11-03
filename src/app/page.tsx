"use client";
import React, { useState, useEffect } from "react";
import HomePage from "@/components/HomePage";
import Domain from "@/components/Domain";
import ContactUsHome from "@/components/ContactUsHome";
import WhatWeDo from "@/components/WhatWeDo";
import Loader from "@/components/Loader";
import UpcomingEvent from "@/components/UpcomingEvent";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />
      ) : (
        <>
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
