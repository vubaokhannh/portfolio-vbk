"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D hero scene (three.js):
 *  - Glowing wireframe torus-knot core that follows the cursor
 *  - Orbiting icosahedron shell + counter-rotating ring
 *  - 3D particle field with depth that reacts to scroll & mouse
 * Client-only (canvas created in effect) so SSR/hydration stay clean.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    mount.appendChild(renderer.domElement);

    // Core
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.1, 0.32, 160, 20),
      new THREE.MeshBasicMaterial({ color: 0x00d9ff, wireframe: true, transparent: true, opacity: 0.5 }),
    );
    // Shell
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.25 }),
    );
    // Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.015, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0xff4ecd, transparent: true, opacity: 0.6 }),
    );
    ring.rotation.x = Math.PI / 2.4;

    const group = new THREE.Group();
    group.add(knot, shell, ring);
    scene.add(group);

    // Particles
    const COUNT = 900;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0x9be9ff,
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(points);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.x = w > 1024 ? 2.2 : 0; // shift scene right on desktop
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);

      knot.rotation.x = t * 0.25 + target.y * 0.6;
      knot.rotation.y = t * 0.35 + target.x * 0.8;
      shell.rotation.y = -t * 0.12;
      shell.rotation.x = t * 0.08;
      ring.rotation.z = t * 0.3;

      const s = 1 + Math.sin(t * 1.2) * 0.03 + scroll * 0.5;
      group.scale.setScalar(s);
      group.position.y = -scroll * 1.2;

      group.rotation.y += (target.x * 0.5 - group.rotation.y) * 0.04;
      group.rotation.x += (target.y * 0.3 - group.rotation.x) * 0.04;

      points.rotation.y = t * 0.03 + scroll * 0.6;
      points.rotation.x = target.y * 0.15;

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      [knot, shell, ring].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      pGeo.dispose();
      (points.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] opacity-80"
    />
  );
}
