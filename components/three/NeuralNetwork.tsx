"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function readColors() {
  if (typeof window === "undefined") return { line: "#8b5cf6", node: "#a78bfa" };
  const s = getComputedStyle(document.documentElement);
  return {
    line: s.getPropertyValue("--color-accent").trim() || "#8b5cf6",
    node: s.getPropertyValue("--color-accent-soft").trim() || "#a78bfa",
  };
}

export function NeuralNetwork({
  pointer,
  scroll,
}: {
  pointer: RefObject<Pointer>;
  scroll: RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;

  const count = isMobile ? 55 : 110;
  const radius = isMobile ? 2.6 : 3.2;
  const linkDist = isMobile ? 1.5 : 1.3;

  const colors = useMemo(readColors, []);

  // Static node layout + connection topology (computed once).
  const { base, phase, edges } = useMemo(() => {
    const base = new Float32Array(count * 3);
    const phase = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      base[i * 3 + 2] = r * Math.cos(phi);
      phase[i * 3] = Math.random() * Math.PI * 2;
      phase[i * 3 + 1] = Math.random() * Math.PI * 2;
      phase[i * 3 + 2] = Math.random() * Math.PI * 2;
    }
    const edges: number[] = [];
    const d2 = linkDist * linkDist;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = base[i * 3] - base[j * 3];
        const dy = base[i * 3 + 1] - base[j * 3 + 1];
        const dz = base[i * 3 + 2] - base[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < d2) edges.push(i, j);
      }
    }
    return { base, phase, edges };
  }, [count, radius, linkDist]);

  const nodePositions = useMemo(() => new Float32Array(count * 3), [count]);
  const linePositions = useMemo(() => new Float32Array(edges.length * 3), [edges]);

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    return g;
  }, [nodePositions]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  const tilt = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scroll.current ?? 0;

    // Drift nodes around their base positions.
    for (let i = 0; i < count; i++) {
      nodePositions[i * 3] = base[i * 3] + Math.sin(t * 0.4 + phase[i * 3]) * 0.18;
      nodePositions[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.35 + phase[i * 3 + 1]) * 0.18;
      nodePositions[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 0.3 + phase[i * 3 + 2]) * 0.18;
    }
    // Rebuild line endpoints from current node positions.
    for (let k = 0; k < edges.length; k += 2) {
      const a = edges[k];
      const b = edges[k + 1];
      const o = (k / 2) * 6;
      linePositions[o] = nodePositions[a * 3];
      linePositions[o + 1] = nodePositions[a * 3 + 1];
      linePositions[o + 2] = nodePositions[a * 3 + 2];
      linePositions[o + 3] = nodePositions[b * 3];
      linePositions[o + 4] = nodePositions[b * 3 + 1];
      linePositions[o + 5] = nodePositions[b * 3 + 2];
    }
    nodeGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;

    const g = group.current;
    if (g) {
      // Parallax tilt toward the cursor + slow auto-spin + scroll transform.
      const px = pointer.current?.x ?? 0;
      const py = pointer.current?.y ?? 0;
      tilt.current.x += (py * 0.35 - tilt.current.x) * 0.05;
      tilt.current.y += (px * 0.5 - tilt.current.y) * 0.05;
      g.rotation.x = tilt.current.x + Math.sin(t * 0.1) * 0.05 + p * 0.4;
      g.rotation.y = tilt.current.y + t * 0.06 + p * Math.PI;
      g.position.x = isMobile ? 0 : 0.8;
      g.position.y = -p * 0.5;
      g.scale.setScalar(isMobile ? 0.82 : 1.05);
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={colors.line}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={nodeGeo}>
        <pointsMaterial
          color={colors.node}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
