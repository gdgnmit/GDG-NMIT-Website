import { useEffect, useRef, useState } from "react";
import { SKELETON_MS } from "@/lib/loaderTiming";

// The logo loader plays only once per visit, when the website is first opened.
// Opening other pages afterwards never replays it, including links that do a
// full page reload. The flag lives in sessionStorage, so closing the tab (or
// opening the site in a new tab) counts as a new visit.
const STORAGE_KEY = "gdg-intro-played";

function alreadyPlayed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage blocked: the loader may replay, which is harmless.
  }
}

/**
 * Returns whether the logo loader should be showing right now.
 * `skeleton` is true for a moment right after, still only on the first page.
 * `isIntro` is true only for the page the visitor opened the site on.
 */
export function useIntroLoader(durationMs: number) {
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  // Decided once per mount, so React strict mode's double effect run is safe.
  const decided = useRef<boolean | null>(null);

  useEffect(() => {
    if (decided.current === null) {
      decided.current = !alreadyPlayed();
      markPlayed();
    }
    if (!decided.current) {
      setIsIntro(false);
      setLoading(false);
      return;
    }
    const logoTimer = setTimeout(() => {
      setLoading(false);
      setSkeleton(true);
    }, durationMs);
    const skeletonTimer = setTimeout(() => setSkeleton(false), durationMs + SKELETON_MS);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(skeletonTimer);
    };
  }, [durationMs]);

  return { loading, skeleton, isIntro };
}
