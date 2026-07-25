import { ImageResponse } from "next/og";
import { postsEn } from "@/data/posts";

export const alt = "Vũ Bảo Khanh Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const post = postsEn.find((p) => p.slug === slug);

  const title = post?.title ?? "Blog - Vũ Bảo Khanh";
  const description = post?.description ?? "Chia sẻ kỹ thuật từ một Fullstack Developer";
  const tags = post?.tags ?? [];
  const date = post?.date ?? "";
  const readTime = post?.readTime ?? "";

  // Truncate long text for display
  const displayTitle = title.length > 72 ? title.slice(0, 69) + "..." : title;
  const displayDesc = description.length > 110 ? description.slice(0, 107) + "..." : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050507",
          padding: "56px 64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient orb top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Background gradient orb bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* TOP SECTION — Branding & Tags */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          {/* Logo / Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "linear-gradient(135deg, #00D9FF, #7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              V
            </div>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>
              vubaokhanh.tech
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8 }}>
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "5px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(0,217,255,0.25)",
                  background: "rgba(0,217,255,0.07)",
                  color: "#00D9FF",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION — Title & Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1, flex: 1, justifyContent: "center", padding: "12px 0" }}>
          {/* Cyan accent line */}
          <div
            style={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #00D9FF, #7C3AED)",
            }}
          />
          {/* Title */}
          <div
            style={{
              fontSize: displayTitle.length > 50 ? 42 : 50,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: -1,
              maxWidth: 900,
            }}
          >
            {displayTitle}
          </div>
          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.55,
              maxWidth: 820,
              fontWeight: 400,
            }}
          >
            {displayDesc}
          </div>
        </div>

        {/* BOTTOM SECTION — Author & Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Author info */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Avatar circle */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 900,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              K
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, fontWeight: 700 }}>
                Vũ Bảo Khanh
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                Fullstack Developer
              </span>
            </div>
          </div>

          {/* Meta info: date + readTime */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {date && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#7C3AED",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>{date}</span>
              </div>
            )}
            {readTime && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00D9FF",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>{readTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
