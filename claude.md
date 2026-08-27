# NO.rr 312 — Project Technical Specification & Architecture Dossier

> Single Source of Truth for the **NO.rr 312** independent architectural jewelry engineering application.

---

## 1. Project Overview

**NO.rr 312** is an independent design and engineering label dedicated to titanium and tension-wire kinetic jewelry. The flagship artifact featured in this release is **MOD. R1 V3** (Tension Core Ring).

### Core Goals & Experience
- **Interactive 3D Viewport**: Real-time WebGL rendering of the MOD. R1 V3 ring with high-resolution procedural textures (anisotropic lathe brushing, laser engravings, chamfer relief).
- **Industrial HUD Controls**: Seamless manipulation for 360° orbital drag rotation, macro zoom inspection, exploded schematic layers, and auto-rotation.
- **Specification & Release Registry**: Interactive modals for detailed engineering blueprints (`BuildSpecModal`), release history and archives (`ReleasesModal`), 5-step metallurgy process dossier (`ProcessModal`), and direct studio inquiry submission (`ContactModal`).

---

## 2. Technical Stack

- **Framework**: Next.js 15 (App Router, Standalone build output)
- **UI & Runtime**: React 19 + TypeScript 5.7
- **3D Engine**: Three.js 0.171 + `@react-three/fiber` v9
- **Design System**: Tailwind CSS v4 + Custom Industrial Concrete & Titanium color tokens
- **Animations**: Motion (`motion/react` v13)
- **Validation**: Zod 3.24 + React Hook Form
- **Email Service**: Resend 4.1 (with safe local console logging fallback)
- **Testing**: Playwright Core for automated WebGL headless regression testing

---

## 3. Design System & Palette

### Industrial Palette Tokens (`app/globals.css`)
- `--color-bg`: `#111215` (Obsidian concrete base)
- `--color-bg-soft`: `#18191e` (Muted surface tone)
- `--color-surface`: `#1e2027` (Modal panels and floating HUD containers)
- `--color-line`: `#2b2e38` (Structural borders)
- `--color-line-gold`: `#c8a265` (Technical blueprint gold highlight)
- `--color-ink`: `#f0f2f5` (High-contrast typography)
- `--color-muted`: `#8e94a0` (Technical callout labels)
- `--color-accent-amber`: `#d4af37` (Accent glow & hover states)

### Typography
- **Technical & Display**: `JetBrains Mono` (`--font-jetbrains`)
- **Body & Neutral UI**: `Inter` (`--font-inter`)

---

## 4. 3D Procedural Engineering Architecture (`components/three/`)

### 1. `JewelryScene.tsx`
- Encapsulates `@react-three/fiber` `<Canvas>` with customized studio lighting:
  - Ambient base lighting (`#cfd6e6`)
  - Overhead key directional light
  - Front-fill light (`#cbd5e1`)
  - Rim / back highlight for chamfered titanium edges (`#94a3b8`)
  - Warm accent kickers (`#e2d2a4`)

### 2. `JewelryRing.tsx`
- **Procedural Canvas Textures & Bump Maps**:
  - Anisotropic 1024x1024 lathe brush normal map
  - Dual laser-engraved top plates ("NO.rr 312" on left, "PATCH v1.13" on right) with 3D recessed bump depth
  - Inner shank laser engraving ("NO.rr 312 // TI-6AL-4V // MOD. R1 V3 // SPEC NO. 0312-ARCH")
- **Geometric Construction**:
  - Dual-rail U-shaped shank with central groove inlay
  - Inverted trapezoid towers with truss window cutouts
  - Dual upper tension suspension cross-rods
  - Multi-strand 316L spring steel wire pack with catenary sag
  - M1.6 micro-Torx fastener hardware
- **Dynamic Interactions**:
  - Pointer tracking with smooth easing and velocity inertia
  - Exploded view translation offsets for modular inspection
  - Auto-rotate toggle with seamless frame synchronization

---

## 5. Modals & Information Architecture (`components/modals/`)

1. **`BuildSpecModal.tsx`**:
   - Technical blueprint with alloy breakdown (Grade 5 Titanium Ti-6Al-4V).
   - Size configurator (US 7–12 / 17.3mm–21.4mm / EU 54–67).
   - Finish configurator (Raw Brushed Titanium, DLC Obsidian Black, Thermal Oxide Indigo).
   - 3D exploded view trigger & batch allocation reservation flow.
2. **`ReleasesModal.tsx`**:
   - Release catalog: `MOD. R1 V3` (Active batch), `MOD. R1 V2` (Archived), `MOD. B2` (Upcoming), `MOD. P1` (Prototyping).
3. **`ProcessModal.tsx`**:
   - 5-step industrial manufacturing breakdown (FEA optimization, 5-axis CNC milling, Wire-EDM spring core, 400-grit directional satin hand-brushing, UV laser micro-engraving).
4. **`ContactModal.tsx`**:
   - Direct studio inquiries form connected to `/api/contact`.
   - Category selection, Zod validation, error handling, and confirmation view.

---

## 6. Verification & Regression Testing

The test suite (`test-regression.mjs`) validates:
1. WebGL canvas and Three.js initialization without console errors.
2. HUD toolbar toggles (Zoom, Exploded view, Auto-Rotate, Fullscreen).
3. 360° orbital drag rotation on 3D canvas.
4. All 4 modals opening, interacting, keyboard Escape closing, and form transmission.
5. Production build (`npm run build`) with zero type or bundling errors.
