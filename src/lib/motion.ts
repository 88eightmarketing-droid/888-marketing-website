"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a media query; `serverValue` is what static HTML renders before hydration. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True when the visitor asked the OS for reduced motion. */
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Coarse pointer = touch device: skip cursor-driven effects. */
export const useCoarsePointer = () => useMediaQuery("(pointer: coarse)");
