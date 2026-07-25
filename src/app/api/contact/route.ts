import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// ── In-Memory Rate Limiter (IP-based, 5 req/60s) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function getRateLimit(ip: string): { ok: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true, remaining: RATE_LIMIT_MAX - entry.count, resetIn: entry.resetAt - now };
}

// Clean up stale entries periodically (prevent memory leak)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60_000);

export async function POST(request: NextRequest) {
  try {
    // Get real IP from Vercel/proxy headers
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit check
    const { ok, remaining, resetIn } = getRateLimit(ip);
    if (!ok) {
      return NextResponse.json(
        { error: `Too many requests. Please wait ${Math.ceil(resetIn / 1000)} seconds before trying again.` },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(resetIn / 1000)),
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    // Sanitize inputs
    const safeName = name.trim().slice(0, 100);
    const safeEmail = email.trim().slice(0, 254);
    const safeMessage = message.trim().slice(0, 2000);

    // Optional: Send via Resend (configure RESEND_API_KEY in .env.local)
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "vubaokhanh2311@gmail.com";

    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [contactEmail],
          reply_to: safeEmail,
          subject: `[Portfolio] New message from ${safeName}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f1117;border:1px solid #1a1d28;border-radius:12px;padding:32px">
              <h2 style="color:#00D9FF;margin:0 0 24px">📬 New Contact Message</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#888;width:80px">From</td><td style="color:#fff;font-weight:bold">${safeName}</td></tr>
                <tr><td style="padding:8px 0;color:#888">Email</td><td style="color:#00D9FF">${safeEmail}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #1a1d28;margin:20px 0"/>
              <p style="color:#888;margin-bottom:8px;font-size:13px">MESSAGE</p>
              <p style="color:#fff;line-height:1.7;white-space:pre-wrap">${safeMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              <p style="color:#444;font-size:11px;margin-top:24px">Sent from vubaokhanh.tech contact form · IP: ${ip}</p>
            </div>
          `,
        }),
      });

      if (!emailRes.ok) {
        console.error("[Contact API] Resend error:", await emailRes.text());
      }
    }

    // Save to Supabase DB table contact_messages
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("contact_messages").insert({
          name: safeName,
          email: safeEmail,
          message: safeMessage,
          ip_address: ip,
          is_read: false,
        });
      } catch (dbErr) {
        console.error("[Contact API] Supabase DB insert error:", dbErr);
      }
    }

    // Always log to server (visible in Vercel function logs)
    console.info(`[Contact Form] ${safeName} <${safeEmail}> | Remaining: ${remaining}/min | Msg: ${safeMessage.slice(0, 60)}`);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
