"use client";
import React from "react";
import HomePage from "@/components/HomePage";
import Domain from "@/components/Domain";
import ContactUsHome from "@/components/ContactUsHome";
import WhatWeDo from "@/components/WhatWeDo";
import Loader from "@/components/Loader";
import PageSkeleton from "@/components/PageSkeleton";
import { useIntroLoader } from "@/lib/useIntroLoader";
import { LANDING_LOADER_MS } from "@/lib/loaderTiming";
import UpcomingEvent from "@/components/UpcomingEvent";
import Popup from "@/components/Popup"

export default function Home() {
  const { loading: isLoading, skeleton } = useIntroLoader(LANDING_LOADER_MS);

  return (
    <>
      {isLoading ? (
        <Loader durationMs={LANDING_LOADER_MS} className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />
      ) : skeleton ? (
        <PageSkeleton />
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
