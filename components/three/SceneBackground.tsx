"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// three.js is heavy — load it in its own client-only chunk after hydration,
// keeping it out of the initial bundle.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function SceneBackground() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  const pointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scroll = useRef<number>(0);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onMq);

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    onScroll();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mq.removeEventListener?.("change", onMq);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {/* Ambient violet glow — always present, and the sole visual when motion is reduced. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 55% at 72% 28%, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(45% 45% at 16% 82%, color-mix(in srgb, var(--color-accent-cyan) 18%, transparent), transparent 70%)",
        }}
      />

      {mounted && !reduced && <Scene pointer={pointer} scroll={scroll} />}
    </div>
  );
}
