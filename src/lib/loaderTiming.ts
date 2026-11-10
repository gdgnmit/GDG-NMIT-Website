// How long the loading animation (components/Loader.tsx) shows before a page
// appears. One place for these numbers keeps every page's loader the same.

/** The landing page plays the full intro. */
export const LANDING_LOADER_MS = 3500;

/** Every other page shows the same animation, briefly. */
export const PAGE_LOADER_MS = 1500;

/** Length of public/assets/loader.lottie (216 frames at 60fps). The GDG logo
 *  forms near the end, so shorter loaders play it faster to always reach it. */
export const LOADER_ANIMATION_MS = 3600;
