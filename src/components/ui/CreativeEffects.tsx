"use client";

import { useEffect, useRef } from "react";

/**
 * Global creative effects:
 *  - Interactive particle constellation (mouse attracts/links particles)
 *  - Glowing cursor follower with trailing ring
 *  - Click burst sparks
 *  - Gradient scroll progress bar
 * Auto-disabled for reduced-motion; cursor effects only on fine pointers.
 */
export default function CreativeEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const ring = { x: -100, y: -100 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; hue: number };
    let particles: P[] = [];
    const sparks: Spark[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.6,
      }));
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a,button,[role=button],input,textarea");
      ringRef.current?.classList.toggle("cfx-ring-active", interactive);
    };
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 18; i++) {
        const a = (Math.PI * 2 * i) / 18 + Math.random() * 0.4;
        const s = Math.random() * 3 + 1.5;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 1,
          hue: Math.random() > 0.5 ? 190 : 265,
        });
      }
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 160) {
          p.vx += (dx / d) * 0.012;
          p.vy += (dy / d) * 0.012;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,217,255,0.55)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 120) * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const m = particles[i];
        const dm = Math.hypot(m.x - mouse.x, m.y - mouse.y);
        if (dm < 160) {
          ctx.strokeStyle = `rgba(0,217,255,${(1 - dm / 160) * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.life -= 0.025;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},100%,65%,${s.life})`;
        ctx.fill();
      }

      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px,${ring.y}px,0)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    if (finePointer) window.addEventListener("mousemove", onMove);
    else window.addEventListener("mousemove", onMove); // still feeds particles
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[1] opacity-70"
      />
      <div
        ref={barRef}
        className="fixed left-0 top-0 z-[9998] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#00D9FF] via-[#7C3AED] to-[#FF4ECD]"
        style={{ boxShadow: "0 0 12px rgba(0,217,255,0.7)" }}
      />
      <div ref={ringRef} className="cfx-ring pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block" />
      <div ref={dotRef} className="cfx-dot pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block" />
      <style>{`
        .cfx-dot,.cfx-ring{will-change:transform;}
        .cfx-dot::after{content:"";position:absolute;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;
          background:#00D9FF;box-shadow:0 0 14px 4px rgba(0,217,255,.7);}
        .cfx-ring::after{content:"";position:absolute;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;
          border:1px solid rgba(124,58,237,.7);transition:width .25s,height .25s,margin .25s,background .25s,border-color .25s;}
        .cfx-ring.cfx-ring-active::after{width:64px;height:64px;margin:-32px 0 0 -32px;
          background:rgba(0,217,255,.08);border-color:rgba(0,217,255,.9);}
        @media (pointer:fine){ html,body,a,button{cursor:none !important;} }
      `}</style>
    </div>
  );
}
