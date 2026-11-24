import React from "react";

const bar = "rounded-md bg-gray-200 dark:bg-white/10 animate-pulse";

/**
 * Placeholder shapes of a typical page (title, intro text, card grid).
 * Shown only on the first page opened, right after the logo loader.
 * `overlay` lays it over a page that is already rendering underneath.
 */
export default function PageSkeleton({ overlay = false }: { overlay?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`${
        overlay ? "fixed inset-0 z-40" : "min-h-screen"
      } bg-white dark:bg-g-almost-black pt-24 pb-16 px-5 sm:px-8 lg:px-16`}
    >
      <div className="mx-auto max-w-6xl">
        <div className={`${bar} h-10 w-2/3 sm:w-1/3`} />
        <div className={`${bar} h-1 w-20 mt-3`} />
        <div className="mt-8 space-y-3">
          <div className={`${bar} h-4 w-full max-w-3xl`} />
          <div className={`${bar} h-4 w-5/6 max-w-2xl`} />
          <div className={`${bar} h-4 w-2/3 max-w-xl`} />
        </div>
        <div className={`${bar} mt-10 h-56 sm:h-72 w-full`} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div className={`${bar} h-40 w-full`} />
              <div className={`${bar} h-5 w-3/4`} />
              <div className={`${bar} h-4 w-full`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
