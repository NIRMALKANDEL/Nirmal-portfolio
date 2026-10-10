import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getProjectBySlug } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Project by ${site.name}`;

// Share images are PNGs; most social platforms won't render the SVG previews.
export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const accent = project?.theme.accent ?? "#ff6b35";
  const deep = project?.theme.deep ?? "#05050a";
  const siteHost = site.siteUrl.replace("https://", "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${deep} 0%, #05050a 70%)`,
          color: "#f4f2ec",
          fontFamily: "Arial, Helvetica, sans-serif",
          borderTop: `10px solid ${accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: accent, fontWeight: 700, letterSpacing: 3 }}>
            {(project?.category ?? "Project").toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, marginTop: 18, letterSpacing: -2 }}>
            {project?.title ?? site.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#b5b3bf", marginTop: 18, maxWidth: 980, lineHeight: 1.3 }}>
            {project?.tagline ?? site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {(project?.technologies ?? []).slice(0, 6).map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #2a2a38",
                  color: "#d6d4de",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9c9aa8" }}>
            <div style={{ display: "flex" }}>{site.name}</div>
            <div style={{ display: "flex", color: accent }}>{siteHost}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
