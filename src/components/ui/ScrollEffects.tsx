"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP + ScrollTrigger scroll choreography:
 *  - Section headings: clip-path wipe + blur-up reveal
 *  - Aurora orbs: parallax drift while scrolling
 *  - Images / media: subtle scale-in
 * Renders nothing. Safe with reduced motion (skipped).
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    let mo: MutationObserver | undefined;
    let timer: number | undefined;

    const ctx = gsap.context(() => {
      const setup = () => {
        document.querySelectorAll<HTMLElement>("main section h2").forEach((el) => {
          if (el.dataset.gsapDone) return;
          el.dataset.gsapDone = "1";
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 24, filter: "blur(8px)" },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        document.querySelectorAll<HTMLElement>("main section img").forEach((el) => {
          if (el.dataset.gsapDone) return;
          el.dataset.gsapDone = "1";
          gsap.fromTo(
            el,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        document.querySelectorAll<HTMLElement>(".aurora-orb").forEach((el, i) => {
          if (el.dataset.gsapDone) return;
          el.dataset.gsapDone = "1";
          gsap.to(el, {
            yPercent: (i % 2 ? -1 : 1) * 25,
            ease: "none",
            scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.5 },
          });
        });

        ScrollTrigger.refresh();
      };

      // Sections are code-split, so re-scan as they mount.
      setup();
      mo = new MutationObserver(() => ctx.add(setup));
      const main = document.getElementById("main-content");
      if (main) mo.observe(main, { childList: true });
      timer = window.setTimeout(() => ctx.add(setup), 1500);
    });

    return () => {
      mo?.disconnect();
      if (timer) clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return null;
}
