"use client";
import React from "react";
import dynamic from "next/dynamic";
import HomePage from "@/components/HomePage";
const Domain = dynamic(() => import("@/components/Domain"));
const ContactUsHome = dynamic(() => import("@/components/ContactUsHome"));
const WhatWeDo = dynamic(() => import("@/components/WhatWeDo"));
import Loader from "@/components/Loader";
import PageSkeleton from "@/components/PageSkeleton";
import { useIntroLoader } from "@/lib/useIntroLoader";
import { LANDING_LOADER_MS } from "@/lib/loaderTiming";
const UpcomingEvent = dynamic(() => import("@/components/UpcomingEvent"));
const Popup = dynamic(() => import("@/components/Popup"));

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
