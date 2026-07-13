"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";

// ── Critical above-fold components ─────────────────────────
import Loader from "@/components/sections/Loader";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Lazy-loaded sections (code splitting — SSR enabled for SEO) ──────────────────
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const TechUniverse = dynamic(() => import("@/components/sections/TechUniverse"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      {/* Loader overlay — fixed on top, does NOT block DOM content */}
      <Loader onComplete={handleLoaderComplete} />

      {/*
       * SEO FIX: Main content is ALWAYS in the DOM so Googlebot can read it.
       * We use CSS visibility/opacity to hide it until the loader finishes,
       * instead of conditional rendering which completely removes it from HTML.
       */}
      <div
        aria-hidden={!loaderDone}
        style={{
          opacity: loaderDone ? 1 : 0,
          visibility: loaderDone ? "visible" : "hidden",
          transition: "opacity 0.4s ease",
        }}
      >
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
      </div>
    </>
  );
}
