# NO.rr 312 — Industrial & Architectural Jewelry

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r171-black?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

**NO.rr 312** is an independent architectural and industrial jewelry engineering showcase for precision kinetic titanium artifacts. The web application delivers an immersive, interactive 3D engineering viewport centered on the flagship **MOD. R1 V3** tension-core titanium ring.

---

## 💎 App Purpose & Overview

NO.rr 312 deconstructs traditional jewelry into kinetic industrial architecture. The web application serves as a digital atelier and interactive specification registry:

1. **Interactive 3D Viewport (`JewelryScene` & `JewelryRing`)**:
   - Real-time procedural 3D model of the **MOD. R1 V3** ring built with **Three.js** and **@react-three/fiber**.
   - Procedural anisotropic lathe-brushed titanium normal maps, chamfer bump maps, and dual laser-engraved top plates (`NO.rr 312` and `PATCH v1.13`).
   - Dynamic 360° orbital drag rotation with momentum physics and cursor tracking.
   - Macro zoom inspection mode and interactive exploded mechanical schematic view.

2. **Technical Blueprint Modal (`BuildSpecModal`)**:
   - Complete technical specifications, dimensions, and alloy composition.
   - Sizing matrix across US (7–12), EU, and inner diameter millimeter standards.
   - Finish configurator: *Raw Brushed Titanium*, *DLC Obsidian Black (3500 HV)*, and *Thermal Oxide Indigo*.
   - Direct batch allocation reservation flow.

3. **Artifact Catalog & Archive (`ReleasesModal`)**:
   - Release registry for current batches (`MOD. R1 V3`), archived sold-out editions (`MOD. R1 V2`), upcoming drops (`MOD. B2 Kinetic Link Bracelet`), and prototypes (`MOD. P1 Gimbal Tension Pendant`).

4. **Metallurgy & Fabrication Dossier (`ProcessModal`)**:
   - 5-step industrial fabrication methodology:
     - **01. Generative FEA & Structural Optimization**
     - **02. 5-Axis Subtractive CNC Machining (±0.005mm tolerance)**
     - **03. Wire-EDM Spring Core Calibration (316L multi-wire bundle)**
     - **04. Directional Satin Finishing & Hand-Brushing (400-grit)**
     - **05. Laser Micro-Engraving & Cryptographic Physical-Digital Certificate**

5. **Direct Studio Inquiries (`ContactModal` & `/api/contact`)**:
   - Type-safe communication channel for bespoke sizing, batch status, custom alloy inquiries, and press relations.
   - Connected to serverless `/api/contact` API with Zod validation, honeypot anti-spam, and Resend email integration.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/) |
| **3D Engine** | [Three.js 0.171](https://threejs.org/) + [@react-three/fiber v9](https://r3f.docs.pmnd.rs/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom concrete noise & titanium tokens |
| **Animations & Motion** | [Motion (`motion/react` v13)](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Validation & Schema** | [Zod 3.24](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) |
| **Email Delivery** | [Resend 4.1](https://resend.com/) with local fallback logging |
| **Testing & QA** | [Playwright Core](https://playwright.dev/) for headless WebGL regression testing |

---

## 📐 Design System & Palette

The application uses an industrial concrete & aerospace titanium palette:

```css
--color-bg: #111215;           /* Deep obsidian / raw concrete */
--color-bg-soft: #18191e;      /* Secondary surface */
--color-surface: #1e2027;      /* Modal and card background */
--color-line: #2b2e38;         /* Structural borders */
--color-line-gold: #c8a265;    /* Technical blueprint gold highlight */
--color-ink: #f0f2f5;          /* Crisp high-contrast text */
--color-muted: #8e94a0;        /* Secondary technical callout text */
--color-accent-amber: #d4af37; /* Anodized accent kicker */
```

Typography:
- **Display & Monospace**: `JetBrains Mono` (industrial precision, technical blueprints)
- **Neutral Body**: `Inter` (readable UI body)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20, 22 LTS, or 24**
- **npm** 10+

> **Note for Windows + Node 24 users**: Node 24 on Windows has known filesystem readlink/mkdir quirks on certain drives. The project includes [`patch-readlink.cjs`](patch-readlink.cjs) preloaded in the npm scripts to handle these transparently across all operating systems and deployment environments.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 Regression Testing & Quality Assurance

The codebase includes automated regression testing to ensure that 3D canvas initialization, WebGL context, HUD controls, modal transitions, and API endpoints function correctly with zero errors.

### Run Automated End-to-End Regression Suite:
```bash
node test-regression.mjs
```

### Run Visual Screenshot Smoke Test:
```bash
npm run shot
```
*(Outputs full-resolution viewport captures into the `./screenshots/` directory).*

---

## 📬 Contact Form & Email Setup

The direct studio inquiry modal works out-of-the-box:
- In development/preview without API keys, requests are validated against Zod schemas and logged to the server console (`delivered: false`).
- For production email delivery, add your credentials to `.env.local` (template provided in [`.env.example`](.env.example)):

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=studio@norr312.industries
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

---

## 📂 Project Structure

```
norr312-R.01/
├── app/
│   ├── api/contact/route.ts       # Type-safe inquiry API route (Resend + Zod)
│   ├── globals.css                # Tailwind v4 tokens, concrete noise shader
│   ├── icon.tsx                   # Dynamic programmatic favicon (no.rr 312)
│   ├── layout.tsx                 # Root layout, fonts, and OpenGraph metadata
│   ├── not-found.tsx              # 404 error page matching industrial theme
│   ├── opengraph-image.tsx        # Dynamic social preview generation
│   └── page.tsx                   # Main entry point mounting MainExperience
├── components/
│   ├── layout/                    # Layout primitives
│   ├── modals/
│   │   ├── BuildSpecModal.tsx     # Blueprint & size/finish reservation modal
│   │   ├── ContactModal.tsx       # Direct studio transmission modal
│   │   ├── ProcessModal.tsx       # 5-phase metallurgy & fabrication modal
│   │   └── ReleasesModal.tsx      # Artifact releases & catalog archive modal
│   ├── sections/
│   │   └── MainExperience.tsx     # Primary 3D interactive viewport & HUD
│   ├── three/
│   │   ├── JewelryRing.tsx        # Procedural 3D titanium ring geometry & textures
│   │   └── JewelryScene.tsx       # Three.js Canvas studio lighting & controls
│   └── ui/                        # Button, Badge, Container primitives
├── lib/
│   ├── validation.ts              # Zod validation schema with honeypot support
│   └── utils.ts                   # Class merging and utility functions
├── patch-readlink.cjs             # Node 24 Windows filesystem compatibility shim
├── screenshot.mjs                 # Headless Playwright visual capture tool
├── test-regression.mjs            # Automated end-to-end regression test suite
├── next.config.mjs                # Next.js standalone configuration
├── package.json                   # Project scripts and dependencies
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 🌐 Deployment

The project is optimized for deployment on **Vercel** or any Node.js container platform (`output: "standalone"` enabled in `next.config.mjs`).

```bash
npm run build
```
When deploying to production, configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in your environment settings.

---

## 📄 License

© 2026 NO.rr 312. All rights reserved. Precision Kinetic Artifacts.
