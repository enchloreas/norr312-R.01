import { ImageResponse } from "next/og";

export const alt = "NO.rr 312 — Industrial & Architectural Jewelry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#111215",
          backgroundImage:
            "radial-gradient(ellipse at 50% 40%, rgba(45, 48, 58, 0.7) 0%, rgba(17, 18, 21, 0.95) 75%, #0c0d10 100%)",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: "36px", fontWeight: 700, letterSpacing: "0.25em", color: "#f0f2f5" }}>
            NO.rr 312
          </div>
          <div style={{ display: "flex", fontSize: "16px", letterSpacing: "0.15em", color: "#c8a265" }}>
            PATCH_v3.12
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "20px", color: "#c8a265", letterSpacing: "0.2em" }}>
            BUILD SPECIFICATIONS: MOD. R1 V3
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.05em" }}>
            KINETIC TENSION-WIRE & TITANIUM ARTIFACTS
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #252830", paddingTop: "24px" }}>
          <div style={{ fontSize: "14px", color: "#8a8f9d", letterSpacing: "0.15em" }}>
            AEROSPACE Ti-6Al-4V GRADE 5 · WIRE-EDM SPRING CORE
          </div>
          <div style={{ fontSize: "14px", color: "#8a8f9d", letterSpacing: "0.15em" }}>
            BERLIN & TOKYO ATELIERS
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
