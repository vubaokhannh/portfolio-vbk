"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Run once after mount (client only, so SSR HTML always matches). */
  autoPlay?: boolean;
}

/** Text that scrambles into place on mount and on hover. */
export function ScrambleText({ text, className, autoPlay = true }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const total = 28;
    let frame = 0;
    const tick = () => {
      frame++;
      const reveal = Math.floor((frame / total) * text.length);
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < reveal ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame < total) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    setDisplay(text);
    if (!autoPlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(run, 900);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf.current);
    };
  }, [text, autoPlay, run]);

  return (
    <span className={className} onMouseEnter={run} aria-label={text}>
      {display}
    </span>
  );
}
