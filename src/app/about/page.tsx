"use client";
import React, { useState, useEffect } from "react";
import About from "@/components/About";
import Loader from "@/components/Loader";

export default function TeamPage() {
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
        <About />
      )}
    </>
  );
}
