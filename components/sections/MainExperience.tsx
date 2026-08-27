"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Layers, RotateCw, Sparkles, Move } from "lucide-react";
import { BuildSpecModal } from "@/components/modals/BuildSpecModal";
import { ReleasesModal } from "@/components/modals/ReleasesModal";
import { ProcessModal } from "@/components/modals/ProcessModal";
import { ContactModal } from "@/components/modals/ContactModal";

// Load 3D scene dynamically on client-side
const JewelryScene = dynamic(() => import("@/components/three/JewelryScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#717684] tracking-widest">
      INITIALIZING 3D ARTIFACT VIEWPORT...
    </div>
  ),
});

export function MainExperience() {
  const [mounted, setMounted] = useState(false);

  // Modal states
  const [buildSpecOpen, setBuildSpecOpen] = useState(false);
  const [releasesOpen, setReleasesOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // 3D Scene Controls
  const [autoRotate, setAutoRotate] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse / Pointer Tracking for interactive tilt & drag
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragDeltaRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates across viewport for realistic follow-cursor effect
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized device coordinates (-1 to +1)
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    pointerRef.current.x = (clientX / rect.width) * 2 - 1;
    pointerRef.current.y = -((clientY / rect.height) * 2 - 1);

    // If dragging, calculate delta for 360 orbital rotation
    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      dragDeltaRef.current.x += dx;
      dragDeltaRef.current.y += dy;
      lastMousePosRef.current.x = e.clientX;
      lastMousePosRef.current.y = e.clientY;
      setHasInteracted(true);
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag on primary button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("nav") || target.closest("form") || target.closest("input") || target.closest("select") || target.closest("textarea")) {
      return;
    }
    isDraggingRef.current = true;
    lastMousePosRef.current.x = e.clientX;
    lastMousePosRef.current.y = e.clientY;
    setHasInteracted(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Global window listeners to ensure drag doesn't get stuck if released outside viewport
  useEffect(() => {
    const handleGlobalUp = () => {
      isDraggingRef.current = false;
    };
    const handleGlobalMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - lastMousePosRef.current.x;
        const dy = e.clientY - lastMousePosRef.current.y;
        dragDeltaRef.current.x += dx;
        dragDeltaRef.current.y += dy;
        lastMousePosRef.current.x = e.clientX;
        lastMousePosRef.current.y = e.clientY;
        setHasInteracted(true);
      }
    };
    window.addEventListener("pointerup", handleGlobalUp);
    window.addEventListener("pointercancel", handleGlobalUp);
    window.addEventListener("pointermove", handleGlobalMove);
    return () => {
      window.removeEventListener("pointerup", handleGlobalUp);
      window.removeEventListener("pointercancel", handleGlobalUp);
      window.removeEventListener("pointermove", handleGlobalMove);
    };
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Zoom toggle
  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.55 : 1));
    setHasInteracted(true);
  };

  // Auto-rotate toggle
  const toggleAutoRotate = () => {
    setAutoRotate((prev) => !prev);
    setHasInteracted(true);
  };

  // Exploded / wireframe toggle
  const toggleExploded = () => {
    setExploded((prev) => !prev);
    setHasInteracted(true);
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <main
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-[100svh] overflow-hidden bg-concrete-surface concrete-noise select-none flex flex-col justify-between"
    >
      {/* 1. TOP HEADER & NAVIGATION (MATCHING PROTOTYPE EXACTLY) */}
      <header className="relative z-30 pt-7 pb-2 text-center pointer-events-auto">
        {/* Brand Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono tracking-[0.32em] text-[#f0f2f5] font-light uppercase pl-2">
          NO.rr 312
        </h1>

        {/* Minimalist Navigation Bar */}
        <nav className="mt-3.5 flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-[13px] font-mono tracking-[0.22em] text-[#8e94a0] uppercase">
          <button
            type="button"
            onClick={() => setReleasesOpen(true)}
            className="hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            ARCHIVE
          </button>
          <button
            type="button"
            onClick={() => setProcessOpen(true)}
            className="hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            PROCESS
          </button>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            CONTACT
          </button>
        </nav>
      </header>

      {/* 2. CENTER 3D INTERACTIVE VIEWPORT */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* 3D Center Scene */}
        {mounted && (
          <JewelryScene
            pointer={pointerRef}
            isDraggingRef={isDraggingRef}
            dragDeltaRef={dragDeltaRef}
            autoRotate={autoRotate}
            exploded={exploded}
            wireframe={wireframe}
            zoomLevel={zoomLevel}
          />
        )}

        {/* Interaction Helper Prompt */}
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center pt-24"
          >
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/12 text-white/80 shadow-lg">
              <svg
                className="w-4 h-4 text-white animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" fillOpacity="0.2" />
              </svg>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#e2e4e9]">
                DRAG 360° TO ROTATE
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. LEFT-SIDE FLOATING HUD TOOLBAR (MATCHING PROTOTYPE ICONS) */}
      <div className="relative z-30 pb-20 pl-4 sm:pl-8 flex flex-col gap-2.5 pointer-events-auto self-start mt-auto">
        {/* Button 1: Fullscreen */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          className="hud-btn grid h-9 w-9 place-items-center rounded text-[#9aa1ae] hover:text-white"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>

        {/* Button 2: Zoom / Macro Inspection */}
        <button
          type="button"
          onClick={toggleZoom}
          title={zoomLevel > 1 ? "Reset Zoom" : "Macro Inspection Zoom"}
          className={`hud-btn grid h-9 w-9 place-items-center rounded transition-colors ${
            zoomLevel > 1 ? "text-[#c8a265] border-[#c8a265]/40" : "text-[#9aa1ae] hover:text-white"
          }`}
          aria-label="Toggle Zoom"
        >
          {zoomLevel > 1 ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
        </button>

        {/* Button 3: Exploded Schematic View */}
        <button
          type="button"
          onClick={toggleExploded}
          title={exploded ? "Collapse Schematic" : "Explode 3D Components"}
          className={`hud-btn grid h-9 w-9 place-items-center rounded transition-colors ${
            exploded ? "text-[#c8a265] border-[#c8a265]/40" : "text-[#9aa1ae] hover:text-white"
          }`}
          aria-label="Toggle Exploded View"
        >
          <Layers size={16} />
        </button>

        {/* Button 4: Auto-Rotate 360 / Reset */}
        <button
          type="button"
          onClick={toggleAutoRotate}
          title={autoRotate ? "Pause 360 Rotation" : "Resume 360 Rotation"}
          className={`hud-btn grid h-9 w-9 place-items-center rounded transition-colors ${
            autoRotate ? "text-[#c8a265] border-[#c8a265]/40" : "text-[#9aa1ae] hover:text-white"
          }`}
          aria-label="Toggle 360 Spin"
        >
          <RotateCw size={16} className={autoRotate ? "animate-[spin_6s_linear_infinite]" : ""} />
        </button>
      </div>

      {/* 5. BOTTOM SPECIFICATIONS & ACTION BUTTONS (MATCHING PROTOTYPE EXACTLY) */}
      <footer className="relative z-30 pb-7 sm:pb-9 text-center pointer-events-auto px-4">
        {/* Specification Labels */}
        <div className="text-xs sm:text-[13px] font-mono tracking-[0.18em] text-[#e2e4e9] uppercase">
          BUILD SPECIFICATIONS: MOD. R1 V3
        </div>
        <div className="text-[11px] sm:text-xs font-mono tracking-[0.18em] text-[#8e94a0] uppercase mt-1">
          LIMIT: UNTIL PATCH_v3.12
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-center gap-3 font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase">
          <button
            type="button"
            onClick={() => setBuildSpecOpen(true)}
            className="btn-spec-gold px-5 py-2 sm:px-6 sm:py-2.5 rounded transition-all duration-200 cursor-pointer font-medium"
          >
            BUILD SPEC
          </button>
          <button
            type="button"
            onClick={() => setReleasesOpen(true)}
            className="btn-releases-steel px-5 py-2 sm:px-6 sm:py-2.5 rounded transition-all duration-200 cursor-pointer font-medium"
          >
            VIEW_RELEASES
          </button>
        </div>
      </footer>

      {/* MODALS */}
      <BuildSpecModal
        isOpen={buildSpecOpen}
        onClose={() => setBuildSpecOpen(false)}
        onExplodeToggle={toggleExploded}
        isExploded={exploded}
      />
      <ReleasesModal
        isOpen={releasesOpen}
        onClose={() => setReleasesOpen(false)}
      />
      <ProcessModal
        isOpen={processOpen}
        onClose={() => setProcessOpen(false)}
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}
