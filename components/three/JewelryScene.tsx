"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { JewelryRing } from "./JewelryRing";

interface JewelrySceneProps {
  pointer: React.RefObject<{ x: number; y: number }>;
  isDraggingRef: React.RefObject<boolean>;
  dragDeltaRef: React.RefObject<{ x: number; y: number }>;
  autoRotate: boolean;
  exploded: boolean;
  wireframe: boolean;
  zoomLevel: number;
}

export default function JewelryScene({
  pointer,
  isDraggingRef,
  dragDeltaRef,
  autoRotate,
  exploded,
  wireframe,
  zoomLevel,
}: JewelrySceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 5.0], fov: 34 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      {/* Studio Lighting Environment */}
      <ambientLight intensity={1.3} color="#cfd6e6" />
      
      {/* Main Overhead Key Light */}
      <directionalLight
        position={[3, 6, 4]}
        intensity={2.8}
        color="#ffffff"
      />

      {/* Front-Fill Light */}
      <directionalLight position={[-3, 2, 3]} intensity={1.6} color="#cbd5e1" />

      {/* Rim / Back Highlight for titanium edges */}
      <directionalLight position={[0, 4, -4]} intensity={2.2} color="#94a3b8" />

      {/* Warm accent kicker for gold / titanium reflections */}
      <pointLight position={[2, -1, 2]} intensity={0.8} color="#e2d2a4" distance={8} />
      <pointLight position={[-2, -1, -2]} intensity={0.6} color="#64748b" distance={8} />

      {/* The 3D Jewelry Artifact */}
      <JewelryRing
        pointer={pointer}
        isDraggingRef={isDraggingRef}
        dragDeltaRef={dragDeltaRef}
        autoRotate={autoRotate}
        exploded={exploded}
        wireframe={wireframe}
        zoomLevel={zoomLevel}
      />
    </Canvas>
  );
}
