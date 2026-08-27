"use client";

import { type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralNetwork } from "./NeuralNetwork";

export default function Scene({
  pointer,
  scroll,
}: {
  pointer: RefObject<{ x: number; y: number }>;
  scroll: RefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      frameloop="always"
    >
      <NeuralNetwork pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
