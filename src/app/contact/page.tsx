"use client";
import React, { useState, useEffect } from "react";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import { PAGE_LOADER_MS } from "@/lib/loaderTiming";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), PAGE_LOADER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader durationMs={PAGE_LOADER_MS} className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />
      ) : (
        <Contact />
      )}
    </>
  );
}
