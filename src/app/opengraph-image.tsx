import { ImageResponse } from "next/og";
import { getSeoConfig } from "@/lib/data-fetchers";

export const runtime = "edge";
export const alt = "Vu Bao Khanh — Fullstack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const seo = await getSeoConfig();
  const title = seo.authorName || "Vũ Bảo Khanh";
  const jobTitle = seo.jobTitle || "Fullstack Web Engineer";
  const description = seo.seoDescription || "Building scalable digital experiences";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050505 0%, #0f1117 50%, #050505 100%)",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Domain badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            padding: "8px 16px",
            borderRadius: "100px",
            background: "rgba(0,217,255,0.08)",
            border: "1px solid rgba(0,217,255,0.2)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#28C840",
            }}
          />
          <span style={{ color: "#00D9FF", fontSize: "14px", fontWeight: "700", letterSpacing: "0.15em" }}>
            VUBAOKHANH.TECH
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: "900",
            lineHeight: "1",
            letterSpacing: "-2px",
            marginBottom: "16px",
            color: "#ffffff",
          }}
        >
          {title}
        </div>

        {/* Job title */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#00D9FF",
            letterSpacing: "0.05em",
            marginBottom: "24px",
          }}
        >
          {jobTitle}
        </div>

        {/* Description (truncated) */}
        <div
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: "1.6",
            maxWidth: "700px",
          }}
        >
          {description.length > 120 ? description.slice(0, 120) + "…" : description}
        </div>

        {/* Tech stack badges */}
        <div style={{ display: "flex", gap: "10px", marginTop: "40px" }}>
          {["Laravel", "React", "TypeScript", "NestJS", "Next.js"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
