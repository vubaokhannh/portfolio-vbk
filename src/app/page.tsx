"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";

// ── Critical above-fold components ─────────────────────────
import Loader from "@/components/sections/Loader";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Lazy-loaded sections (code splitting) ──────────────────
const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});

const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
});

const TechUniverse = dynamic(
  () => import("@/components/sections/TechUniverse"),
  { ssr: false },
);
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      {/* Loader experience */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Main site — revealed after loader */}
      {loaderDone && (
        <>
          <Navbar />
          <main id="main-content">
            <Hero />
            <About />

            <Services />
            <Projects />
            <Skills />
            <Experience />

            <TechUniverse />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
