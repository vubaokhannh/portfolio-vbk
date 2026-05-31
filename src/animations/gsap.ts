// GSAP animation helpers — imported lazily in client components
// to avoid SSR issues with window/document

export const gsapConfig = {
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  },
  timeline: {
    start: "top 70%",
    end: "bottom center",
    scrub: 1,
  },
};

export const timelineGsapConfig = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.15,
};

export const heroGsapConfig = {
  duration: 1.2,
  ease: "power4.out",
};
