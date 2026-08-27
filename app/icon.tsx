import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111215",
          borderRadius: "12px",
          border: "1.5px solid #2b2e38",
          color: "#f0f2f5",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#c8a265",
            letterSpacing: "0.5px",
            lineHeight: 1,
            marginBottom: "2px",
          }}
        >
          no.rr
        </span>
        <span
          style={{
            fontSize: "20px",
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          312
        </span>
      </div>
    ),
    { ...size }
  );
}
