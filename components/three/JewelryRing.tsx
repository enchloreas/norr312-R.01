"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface JewelryRingProps {
  pointer: React.RefObject<{ x: number; y: number }>;
  isDraggingRef: React.RefObject<boolean>;
  dragDeltaRef: React.RefObject<{ x: number; y: number }>;
  autoRotate: boolean;
  exploded: boolean;
  wireframe: boolean;
  zoomLevel: number;
}

export function JewelryRing({
  pointer,
  isDraggingRef,
  dragDeltaRef,
  autoRotate,
  exploded,
  wireframe,
  zoomLevel,
}: JewelryRingProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Modular assembly references for smooth exploded animation
  const leftTowerGroup = useRef<THREE.Group>(null);
  const rightTowerGroup = useRef<THREE.Group>(null);
  const frontRodGroup = useRef<THREE.Group>(null);
  const rearRodGroup = useRef<THREE.Group>(null);
  const wirePackGroup = useRef<THREE.Group>(null);
  const leftFastenersGroup = useRef<THREE.Group>(null);
  const rightFastenersGroup = useRef<THREE.Group>(null);
  const shankGroup = useRef<THREE.Group>(null);

  // Exact 3/4 isometric perspective matching ring_views.jpeg bottom-right panel
  const rotationState = useRef({
    x: 0.28,
    y: -0.62,
    z: -0.06,
    targetX: 0.28,
    targetY: -0.62,
    tiltX: 0,
    tiltY: 0,
  });

  // --------------------------------------------------------------------------
  // PROCEDURAL HIGH-RESOLUTION TEXTURES & LASER ENGRAVINGS
  // --------------------------------------------------------------------------
  const {
    brushedNormalMap,
    leftTopPlateMap,
    leftTopBumpMap,
    rightTopPlateMap,
    rightTopBumpMap,
    innerEngravingMap,
  } = useMemo(() => {
    if (typeof document === "undefined") {
      return {
        brushedNormalMap: null,
        leftTopPlateMap: null,
        leftTopBumpMap: null,
        rightTopPlateMap: null,
        rightTopBumpMap: null,
        innerEngravingMap: null,
      };
    }

    // 1. Brushed Titanium Normal Map (Anisotropic horizontal lathe finish)
    const brushCanvas = document.createElement("canvas");
    brushCanvas.width = 1024;
    brushCanvas.height = 1024;
    const bCtx = brushCanvas.getContext("2d");
    if (bCtx) {
      bCtx.fillStyle = "rgb(128, 128, 255)";
      bCtx.fillRect(0, 0, 1024, 1024);
      for (let i = 0; i < 12000; i++) {
        const y = Math.random() * 1024;
        const x = Math.random() * 1024;
        const length = 30 + Math.random() * 240;
        const intensity = 114 + Math.floor(Math.random() * 32);
        bCtx.strokeStyle = `rgb(${intensity}, ${intensity}, 255)`;
        bCtx.lineWidth = 0.6;
        bCtx.beginPath();
        bCtx.moveTo(x, y);
        bCtx.lineTo(x + length, y);
        bCtx.stroke();
      }
    }
    const brushedTex = new THREE.CanvasTexture(brushCanvas);
    brushedTex.wrapS = THREE.RepeatWrapping;
    brushedTex.wrapT = THREE.RepeatWrapping;
    brushedTex.repeat.set(4, 2);
    brushedTex.needsUpdate = true;

    // 2. Top Plate Laser Engravings & Deep Normal/Bump Maps ("NO.rr 312" on Left, "PATCH v1.13" on Right)
    // Rotated 90 degrees with 3x height, with pronounced 3D recessed milling depth
    const createTopPlateTextures = (text1: string) => {
      // Diffuse Color Map
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext("2d");

      // Bump/Height Map
      const bCanvas = document.createElement("canvas");
      bCanvas.width = 512;
      bCanvas.height = 512;
      const bCtx = bCanvas.getContext("2d");

      if (ctx && bCtx) {
        // Base plate diffuse color
        ctx.fillStyle = "#8e96a4";
        ctx.fillRect(0, 0, 512, 512);

        // Brushed texture on diffuse
        for (let i = 0; i < 1200; i++) {
          const y = Math.random() * 512;
          ctx.strokeStyle = "rgba(90, 96, 106, 0.35)";
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(512, y);
          ctx.stroke();
        }

        // CNC Chamfer margin border
        ctx.strokeStyle = "#2e333d";
        ctx.lineWidth = 8;
        ctx.strokeRect(16, 16, 480, 480);

        // Bump map base: neutral 128 gray (surface level)
        bCtx.fillStyle = "#808080";
        bCtx.fillRect(0, 0, 512, 512);

        // Chamfer groove on bump map (darker = recessed)
        bCtx.strokeStyle = "#303030";
        bCtx.lineWidth = 8;
        bCtx.strokeRect(16, 16, 480, 480);

        // Render deep engraving onto diffuse & bump maps
        const drawEngraving = (targetCtx: CanvasRenderingContext2D, isBump: boolean) => {
          targetCtx.save();
          targetCtx.translate(256, 256);
          targetCtx.rotate(Math.PI / 2);
          targetCtx.scale(1, 3); // 3x text height stretch
          targetCtx.textAlign = "center";
          targetCtx.textBaseline = "middle";
          targetCtx.font = "bold 60px monospace, 'JetBrains Mono', Courier";

          if (isBump) {
            // Shadow / highlight relief in height map for maximum depth
            targetCtx.strokeStyle = "#101010"; // deeply carved trench
            targetCtx.lineWidth = 7;
            targetCtx.strokeText(text1, 0, 0);
            targetCtx.fillStyle = "#050505"; // bottom of groove
            targetCtx.fillText(text1, 0, 0);
          } else {
            // Diffuse 3D bevel beveling
            // Deep shadow bottom
            targetCtx.fillStyle = "#0a0c10";
            targetCtx.fillText(text1, 0, 0);

            // Milled dark border
            targetCtx.strokeStyle = "#1a1d24";
            targetCtx.lineWidth = 4;
            targetCtx.strokeText(text1, 0, 0);

            // Subtle top highlight edge for machined crispness
            targetCtx.fillStyle = "#ced5e0";
            targetCtx.fillText(text1, 0.6, -0.6);
            targetCtx.fillStyle = "#0d0f14";
            targetCtx.fillText(text1, 0, 0);
          }
          targetCtx.restore();
        };

        drawEngraving(ctx, false);
        drawEngraving(bCtx, true);
      }

      const diffTex = new THREE.CanvasTexture(c);
      diffTex.needsUpdate = true;

      const bumpTex = new THREE.CanvasTexture(bCanvas);
      bumpTex.needsUpdate = true;

      return { diffTex, bumpTex };
    };

    const leftTop = createTopPlateTextures("NO.rr 312");
    const rightTop = createTopPlateTextures("PATCH v1.13");

    // 3. Inner Shank Laser Engraving with bump
    const inCanvas = document.createElement("canvas");
    inCanvas.width = 1024;
    inCanvas.height = 256;
    const inCtx = inCanvas.getContext("2d");
    if (inCtx) {
      inCtx.fillStyle = "#8a92a0";
      inCtx.fillRect(0, 0, 1024, 256);
      inCtx.fillStyle = "#1e222a";
      inCtx.font = "bold 32px monospace, 'JetBrains Mono', Courier";
      inCtx.textAlign = "center";
      inCtx.textBaseline = "middle";
      inCtx.fillText(
        "NO.rr 312 // TI-6AL-4V // MOD. R1 V3 // SPEC NO. 0312-ARCH",
        512,
        128
      );
    }
    const innerTex = new THREE.CanvasTexture(inCanvas);
    innerTex.needsUpdate = true;

    return {
      brushedNormalMap: brushedTex,
      leftTopPlateMap: leftTop.diffTex,
      leftTopBumpMap: leftTop.bumpTex,
      rightTopPlateMap: rightTop.diffTex,
      rightTopBumpMap: rightTop.bumpTex,
      innerEngravingMap: innerTex,
    };
  }, []);

  // --------------------------------------------------------------------------
  // MATERIALS
  // --------------------------------------------------------------------------
  const titaniumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#9ca3b1"),
      metalness: 0.94,
      roughness: 0.27,
      normalMap: brushedNormalMap,
      normalScale: new THREE.Vector2(0.16, 0.16),
      wireframe: wireframe,
    });
  }, [brushedNormalMap, wireframe]);

  const innerShankMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: innerEngravingMap,
      metalness: 0.92,
      roughness: 0.30,
      wireframe: wireframe,
    });
  }, [innerEngravingMap, wireframe]);

  const leftTopPlateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: leftTopPlateMap,
      bumpMap: leftTopBumpMap,
      bumpScale: 0.08,
      metalness: 0.92,
      roughness: 0.28,
      wireframe: wireframe,
    });
  }, [leftTopPlateMap, leftTopBumpMap, wireframe]);

  const rightTopPlateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: rightTopPlateMap,
      bumpMap: rightTopBumpMap,
      bumpScale: 0.08,
      metalness: 0.92,
      roughness: 0.28,
      wireframe: wireframe,
    });
  }, [rightTopPlateMap, rightTopBumpMap, wireframe]);

  const polishedSpringSteelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f5f8fc"),
      metalness: 0.98,
      roughness: 0.08,
      wireframe: wireframe,
    });
  }, [wireframe]);

  const darkFastenerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4a505c"),
      metalness: 0.96,
      roughness: 0.22,
      wireframe: wireframe,
    });
  }, [wireframe]);

  // --------------------------------------------------------------------------
  // 1. EXACT U-SHAPED DUAL-RAIL SHANK
  // - Semicircle at bottom (R_inner = 0.92, R_outer = 1.18) from y = 0 down to y = -1.18
  // - Straight vertical legs with reduced top height (legTopY = 0.44)
  // - Dual rails with deep central split groove running continuously around outer contour
  // --------------------------------------------------------------------------
  const { frontRailGeometry, rearRailGeometry, grooveInlayGeo } = useMemo(() => {
    const rInner = 0.92;
    const rOuter = 1.18;
    const legTopY = 0.44; // Reduced height of the lower arch vertical legs
    const railWidth = 0.17; // Width along Z of each rail

    const shape = new THREE.Shape();
    // Inner contour: start at top-right inner wall (x = rInner, y = legTopY)
    shape.moveTo(rInner, legTopY);
    shape.lineTo(rInner, 0); // straight vertical inner wall
    shape.absarc(0, 0, rInner, 0, Math.PI, true); // lower semicircle
    shape.lineTo(-rInner, legTopY); // straight vertical inner wall to top-left

    // Outer contour
    shape.lineTo(-rOuter, legTopY); // horizontal step to top-left outer wall
    shape.lineTo(-rOuter, 0); // straight vertical outer wall down to y = 0
    shape.absarc(0, 0, rOuter, Math.PI, 0, false); // lower outer semicircle
    shape.lineTo(rOuter, 0); // straight vertical outer wall up
    shape.lineTo(rOuter, legTopY); // straight vertical outer wall to top-right
    shape.closePath();

    const extrudeSettings = {
      depth: railWidth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 64,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    };

    const frontRail = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Translate geometry so origin (0,0,0) matches the ring center
    frontRail.translate(0, 0, -railWidth / 2);

    const rearRail = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    rearRail.translate(0, 0, -railWidth / 2);

    // Central groove recessed inlay floor (recessed depth)
    const grooveSettings = {
      depth: 0.14,
      bevelEnabled: false,
      steps: 64,
    };
    const grooveInlay = new THREE.ExtrudeGeometry(shape, grooveSettings);
    grooveInlay.translate(0, 0, -0.07);

    return {
      frontRailGeometry: frontRail,
      rearRailGeometry: rearRail,
      grooveInlayGeo: grooveInlay,
    };
  }, []);

  // --------------------------------------------------------------------------
  // 2. INVERTED TRAPEZOID TOWERS (Top-Right & Bottom-Right views)
  // Positioned on the left (x = -1.05) and right (x = +1.05)
  // In Y-Z plane:
  // - Height from y = 0.24 (overlapping top of shank leg) to y = 1.15 (top flat face)
  // - Bottom width = 0.54 (matching shank total width in Z: -0.27 to +0.27)
  // - Top width = 0.96 (flaring outward in Z: -0.48 to +0.48)
  // - Trapezoid window cutout through which the upper arch tension wires pass
  // --------------------------------------------------------------------------
  const towerGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const botW = 0.54;
    const topW = 0.96;
    const yStart = 0.24;
    const yEnd = 1.15;

    shape.moveTo(-botW / 2, yStart);
    shape.lineTo(botW / 2, yStart);
    shape.lineTo(topW / 2, yEnd);
    shape.lineTo(-topW / 2, yEnd);
    shape.closePath();

    // Inverted trapezoid window cutout
    const hole = new THREE.Path();
    const hBotW = 0.32;
    const hTopW = 0.52;
    const hYStart = 0.48;
    const hYEnd = 0.94;
    hole.moveTo(-hBotW / 2, hYStart);
    hole.lineTo(hBotW / 2, hYStart);
    hole.lineTo(hTopW / 2, hYEnd);
    hole.lineTo(-hTopW / 2, hYEnd);
    hole.closePath();
    shape.holes.push(hole);

    const extrudeSettings = {
      depth: 0.28, // Thickness along X
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center depth along X
    geo.translate(0, 0, -0.14);
    // Rotate so profile is in Y-Z plane
    geo.rotateY(Math.PI / 2);
    return geo;
  }, []);

  // Top plate rectangular caps (matching top width = 0.96)
  const topPlateGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.28, 0.024, 0.96);
    return geo;
  }, []);

  // --------------------------------------------------------------------------
  // 3. TWO HORIZONTAL TIE-RODS (Connecting Left & Right Towers)
  // Crosses horizontally along X at y = 1.02
  // Front Rod at z = +0.36, Rear Rod at z = -0.36
  // --------------------------------------------------------------------------
  const tieRodGeometry = useMemo(() => {
    const rodRadius = 0.028;
    const rodLength = 2.42; // Spans across left and right towers
    const geo = new THREE.CylinderGeometry(rodRadius, rodRadius, rodLength, 24);
    geo.rotateZ(Math.PI / 2);
    return geo;
  }, []);

  // --------------------------------------------------------------------------
  // 4. ARCHING TENSION SPRING WIRE PACK (13 Parallel Spring Rods)
  // Robust circular arc calculation:
  // - Fixed endpoints entering tower windows at x = ±1.04, y = archBaseHeight
  // - Top apex of the dome at x = 0, y = archApexHeight
  // --------------------------------------------------------------------------
  const tensionWires = useMemo(() => {
    const wires: THREE.TubeGeometry[] = [];
    const count = 13;
    const zSpan = 0.54; // Arrayed along Z between z = -0.27 and +0.27 (inside tie rods at ±0.36)

    // =========================================================================
    // 👇 ГЕОМЕТРИЯ ВЕРХНЕЙ ВЫПУКЛОЙ АРКИ С МАЛЫМ РАДИУСОМ:
    // Опущена (apex = 0.98, base = 0.52) с сохранением малого выпуклого радиуса
    // =========================================================================
    const archApexHeight = 0.98; // Вершина выпуклой арки опущена
    const archBaseHeight = 0.52; // Основание арки опущено глубже в проем
    const halfSpan = 0.80;       // Компактный пролет между концами арки

    // Точный радиус и центр окружности:
    // При h = 0.46 и halfSpan = 0.80, радиус R ≈ 0.93 (малый выпуклый радиус)
    const h = Math.max(0.05, archApexHeight - archBaseHeight);
    const radius = (halfSpan * halfSpan + h * h) / (2 * h);
    const centerY = archApexHeight - radius;
    const maxAngle = Math.asin(Math.min(0.9999, halfSpan / radius));

    for (let i = 0; i < count; i++) {
      const zPos = -zSpan / 2 + (i / (count - 1)) * zSpan;
      const points: THREE.Vector3[] = [];
      const steps = 70;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps; // 0 to 1
        // Угол дуги от левой башни к правой
        const angle = Math.PI / 2 + maxAngle * (1 - 2 * t);
        const x = radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, zPos));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const tube = new THREE.TubeGeometry(curve, 70, 0.016, 12, false);
      wires.push(tube);
    }
    return wires;
  }, []);

  // --------------------------------------------------------------------------
  // 5. BOLTS / FASTENERS (4 Outer Socket-Head Screws at Tower Top Corners)
  // Visible in side view (Top-Right Panel) and isometric view (Bottom-Right Panel)
  // --------------------------------------------------------------------------
  const boltGeometry = useMemo(() => {
    const capGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.042, 20);
    capGeo.rotateZ(Math.PI / 2);

    const washerGeo = new THREE.CylinderGeometry(0.086, 0.086, 0.010, 20);
    washerGeo.rotateZ(Math.PI / 2);

    const hexGeo = new THREE.CylinderGeometry(0.034, 0.034, 0.024, 6);
    hexGeo.rotateZ(Math.PI / 2);

    return { capGeo, washerGeo, hexGeo };
  }, []);

  // --------------------------------------------------------------------------
  // FRAME UPDATE LOOP (Orbit, Smooth Lerp, Exploded Assembly)
  // --------------------------------------------------------------------------
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Interactive Drag Orbit
    if (dragDeltaRef.current) {
      rotationState.current.targetY += dragDeltaRef.current.x * 0.007;
      rotationState.current.targetX += dragDeltaRef.current.y * 0.007;
      rotationState.current.targetX = THREE.MathUtils.clamp(
        rotationState.current.targetX,
        -Math.PI / 2.2,
        Math.PI / 2.2
      );
      dragDeltaRef.current.x = 0;
      dragDeltaRef.current.y = 0;
    }

    // Auto-rotation around vertical axis
    if (autoRotate && !isDraggingRef.current) {
      rotationState.current.targetY += delta * 0.32;
    }

    // Parallax mouse tilt
    const px = pointer.current?.x || 0;
    const py = pointer.current?.y || 0;

    rotationState.current.tiltX = THREE.MathUtils.lerp(
      rotationState.current.tiltX,
      -py * 0.20,
      0.08
    );
    rotationState.current.tiltY = THREE.MathUtils.lerp(
      rotationState.current.tiltY,
      px * 0.26,
      0.08
    );

    rotationState.current.x = THREE.MathUtils.lerp(
      rotationState.current.x,
      rotationState.current.targetX,
      0.1
    );
    rotationState.current.y = THREE.MathUtils.lerp(
      rotationState.current.y,
      rotationState.current.targetY,
      0.1
    );

    groupRef.current.rotation.x = rotationState.current.x + rotationState.current.tiltX;
    groupRef.current.rotation.y = rotationState.current.y + rotationState.current.tiltY;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      rotationState.current.z + px * -0.05,
      0.08
    );

    // Zoom scaling (centered comfortable size in viewport)
    const targetScale = 0.58 * zoomLevel;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
    );

    // Exploded View Assembly
    const exp = exploded ? 1.0 : 0.0;
    if (leftTowerGroup.current) {
      leftTowerGroup.current.position.x = THREE.MathUtils.lerp(
        leftTowerGroup.current.position.x,
        -1.05 - exp * 0.50,
        0.1
      );
    }
    if (rightTowerGroup.current) {
      rightTowerGroup.current.position.x = THREE.MathUtils.lerp(
        rightTowerGroup.current.position.x,
        1.05 + exp * 0.50,
        0.1
      );
    }
    if (wirePackGroup.current) {
      wirePackGroup.current.position.y = THREE.MathUtils.lerp(
        wirePackGroup.current.position.y,
        exp * 0.35,
        0.1
      );
    }
    if (frontRodGroup.current) {
      frontRodGroup.current.position.z = THREE.MathUtils.lerp(
        frontRodGroup.current.position.z,
        0.36 + exp * 0.28,
        0.1
      );
    }
    if (rearRodGroup.current) {
      rearRodGroup.current.position.z = THREE.MathUtils.lerp(
        rearRodGroup.current.position.z,
        -0.36 - exp * 0.28,
        0.1
      );
    }
    if (leftFastenersGroup.current) {
      leftFastenersGroup.current.position.x = THREE.MathUtils.lerp(
        leftFastenersGroup.current.position.x,
        -exp * 0.22,
        0.1
      );
    }
    if (rightFastenersGroup.current) {
      rightFastenersGroup.current.position.x = THREE.MathUtils.lerp(
        rightFastenersGroup.current.position.x,
        exp * 0.22,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={0.58}>
      {/* ======================================================== */}
      {/* A. EXACT U-SHAPED DUAL-RAIL TITANIUM SHANK               */}
      {/* ======================================================== */}
      <group ref={shankGroup}>
        {/* Front U-Rail (z = +0.185) */}
        <mesh
          geometry={frontRailGeometry}
          material={titaniumMaterial}
          position={[0, 0, 0.185]}
          castShadow
          receiveShadow
        />

        {/* Rear U-Rail (z = -0.185) */}
        <mesh
          geometry={rearRailGeometry}
          material={titaniumMaterial}
          position={[0, 0, -0.185]}
          castShadow
          receiveShadow
        />

        {/* Central Split Groove Recessed Bed (z = 0) */}
        <mesh
          geometry={grooveInlayGeo}
          material={darkFastenerMaterial}
          position={[0, 0, 0]}
        />
      </group>

      {/* ======================================================== */}
      {/* B. ARCHING TENSION WIRE PACK (Passes through windows)    */}
      {/* ======================================================== */}
      <group ref={wirePackGroup}>
        {tensionWires.map((wireGeo, idx) => (
          <mesh
            key={idx}
            geometry={wireGeo}
            material={polishedSpringSteelMaterial}
            castShadow
          />
        ))}
      </group>

      {/* ======================================================== */}
      {/* C. LEFT TRAPEZOID TOWER & "NO.rr 312" TOP ENGRAVING      */}
      {/* ======================================================== */}
      <group ref={leftTowerGroup} position={[-1.05, 0, 0]}>
        {/* Tower Body */}
        <mesh
          geometry={towerGeometry}
          material={titaniumMaterial}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />

        {/* Top Laser Engraved Plate ("NO.rr 312") */}
        <mesh
          geometry={topPlateGeometry}
          material={leftTopPlateMaterial}
          position={[0, 1.15, 0]}
          castShadow
        />

        {/* Outer Bolts on Left Face (Z = ±0.36, Y = 1.02) */}
        <group ref={leftFastenersGroup}>
          {/* Front Screw */}
          <group position={[-0.14, 1.02, 0.36]}>
            <mesh geometry={boltGeometry.washerGeo} material={darkFastenerMaterial} />
            <mesh geometry={boltGeometry.capGeo} material={darkFastenerMaterial} position={[-0.02, 0, 0]} />
            <mesh geometry={boltGeometry.hexGeo} position={[-0.04, 0, 0]}>
              <meshBasicMaterial color="#14161a" />
            </mesh>
          </group>

          {/* Rear Screw */}
          <group position={[-0.14, 1.02, -0.36]}>
            <mesh geometry={boltGeometry.washerGeo} material={darkFastenerMaterial} />
            <mesh geometry={boltGeometry.capGeo} material={darkFastenerMaterial} position={[-0.02, 0, 0]} />
            <mesh geometry={boltGeometry.hexGeo} position={[-0.04, 0, 0]}>
              <meshBasicMaterial color="#14161a" />
            </mesh>
          </group>
        </group>
      </group>

      {/* ======================================================== */}
      {/* D. RIGHT TRAPEZOID TOWER & "PATCH v1.13" ENGRAVING       */}
      {/* ======================================================== */}
      <group ref={rightTowerGroup} position={[1.05, 0, 0]}>
        {/* Tower Body */}
        <mesh
          geometry={towerGeometry}
          material={titaniumMaterial}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />

        {/* Top Laser Engraved Plate ("PATCH v1.13") */}
        <mesh
          geometry={topPlateGeometry}
          material={rightTopPlateMaterial}
          position={[0, 1.15, 0]}
          castShadow
        />

        {/* Outer Bolts on Right Face (Z = ±0.36, Y = 1.02) */}
        <group ref={rightFastenersGroup}>
          {/* Front Screw */}
          <group position={[0.14, 1.02, 0.36]} rotation={[0, Math.PI, 0]}>
            <mesh geometry={boltGeometry.washerGeo} material={darkFastenerMaterial} />
            <mesh geometry={boltGeometry.capGeo} material={darkFastenerMaterial} position={[-0.02, 0, 0]} />
            <mesh geometry={boltGeometry.hexGeo} position={[-0.04, 0, 0]}>
              <meshBasicMaterial color="#14161a" />
            </mesh>
          </group>

          {/* Rear Screw */}
          <group position={[0.14, 1.02, -0.36]} rotation={[0, Math.PI, 0]}>
            <mesh geometry={boltGeometry.washerGeo} material={darkFastenerMaterial} />
            <mesh geometry={boltGeometry.capGeo} material={darkFastenerMaterial} position={[-0.02, 0, 0]} />
            <mesh geometry={boltGeometry.hexGeo} position={[-0.04, 0, 0]}>
              <meshBasicMaterial color="#14161a" />
            </mesh>
          </group>
        </group>
      </group>

      {/* ======================================================== */}
      {/* E. TWO HORIZONTAL TIE-RODS (Connecting Left & Right)     */}
      {/* ======================================================== */}
      {/* Front Tie-Rod (Z = +0.36, Y = 1.02) */}
      <group ref={frontRodGroup} position={[0, 1.02, 0.36]}>
        <mesh geometry={tieRodGeometry} material={polishedSpringSteelMaterial} castShadow />
      </group>

      {/* Rear Tie-Rod (Z = -0.36, Y = 1.02) */}
      <group ref={rearRodGroup} position={[0, 1.02, -0.36]}>
        <mesh geometry={tieRodGeometry} material={polishedSpringSteelMaterial} castShadow />
      </group>
    </group>
  );
}
