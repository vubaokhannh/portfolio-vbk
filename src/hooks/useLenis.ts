"use client";

import { useEffect, useRef } from "react";

/**
 * Initializes Lenis smooth scroll.
 * Must be used in a client component rendered inside a provider.
 */
export function useLenis() {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
    } | null = null;
    let rafId: number;

    async function init() {
      const LenisModule = await import("lenis");
      const Lenis = LenisModule.default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return lenisRef;
}
