import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0d0b",
          color: "#f2f2ee",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#e08a63", fontWeight: 700, letterSpacing: 2 }}>
          {site.role.toUpperCase()}
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 20 }}>{site.name}</div>
        <div style={{ fontSize: 30, color: "#9a9c92", marginTop: 24, maxWidth: 900 }}>
          {site.tagline}
        </div>
      </div>
    ),
    size
  );
}
