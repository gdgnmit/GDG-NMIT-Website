"use state";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useState } from "react";
import { LOADER_ANIMATION_MS } from "@/lib/loaderTiming";

export default function Loader({
  className = "",
  onReady,
  durationMs,
}: {
  className?: string;
  onReady?: () => void;
  /** How long the loader stays up; the animation speeds up to finish (logo included) in that time. */
  durationMs?: number;
}) {
  const [isLoaderReady, setIsLoaderReady] = useState(false);
  const speed = durationMs ? Math.max(1, LOADER_ANIMATION_MS / durationMs) : 1;

  useEffect(() => {
    if (isLoaderReady && onReady) {
      onReady();
    }
  }, [isLoaderReady, onReady]);

  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <DotLottieReact
        src="/assets/loader.lottie"
        autoplay
        speed={speed}
        onLoad={() => setIsLoaderReady(true)}
      />
    </div>
  );
}
