"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { personalEn, personalVi } from "@/data/personal";
import { getPersonalInfo } from "@/lib/data-fetchers";
import { useLanguage } from "@/hooks/useLanguage";
import type { PersonalInfo } from "@/types";
import {
  Github,
  Linkedin,
  Mail,
  Facebook,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquare,
  User,
  AtSign,
  Clock,
  ShieldCheck,
} from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const SERVICE_OPTIONS = [
  { id: "web", en: "💻 Web App / Next.js", vi: "💻 Web App / Next.js" },
  { id: "backend", en: "⚡ Backend / API", vi: "⚡ Backend / API" },
  { id: "ecommerce", en: "🛒 E-Commerce", vi: "🛒 Thương mại điện tử" },
  { id: "other", en: "💡 Consulting / Other", vi: "💡 Tư vấn / Khác" },
];

export default function Contact() {
  const { language, t } = useLanguage();
  const [p, setP] = useState<PersonalInfo>(
    language === "en" ? personalEn : personalVi
  );

  // Form state
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0].id);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setP(language === "en" ? personalEn : personalVi);
    getPersonalInfo(language).then((data) => {
      setP(data);
    });
  }, [language]);

  const socialLinks = [
    {
      id: "contact-github",
      label: "GitHub",
      href: p.github,
      icon: <Github className="w-5 h-5" />,
      color: "#FFFFFF",
      description: language === "en" ? "Explore repositories" : "Xem mã nguồn & dự án",
    },
    {
      id: "contact-linkedin",
      label: "LinkedIn",
      href: p.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      color: "#0A66C2",
      description: language === "en" ? "Professional network" : "Kết nối mạng lưới",
    },
    {
      id: "contact-email",
      label: "Direct Email",
      href: `mailto:${p.email}`,
      icon: <Mail className="w-5 h-5" />,
      color: "#00D9FF",
      description: p.email,
    },
    {
      id: "contact-facebook",
      label: "Facebook",
      href: p.facebook,
      icon: <Facebook className="w-5 h-5" />,
      color: "#1877F2",
      description: language === "en" ? "Social connection" : "Trang cá nhân",
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formStatus === "sending") return;

    setFormStatus("sending");
    setFormError("");

    const serviceLabel = SERVICE_OPTIONS.find((s) => s.id === selectedService)?.[language === "en" ? "en" : "vi"] || selectedService;
    const fullMessage = `[Topic: ${serviceLabel}]\n\n${formMessage}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, email: formEmail, message: fullMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Failed to send message.");
        setFormStatus("error");
        return;
      }

      setFormStatus("success");
      setFormName("");
      setFormEmail("");
      setFormMessage("");

      setTimeout(() => setFormStatus("idle"), 6000);
    } catch {
      setFormError(language === "en" ? "Network error. Please try again." : "Lỗi kết nối. Vui lòng thử lại.");
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  }

  const isVi = language === "vi";

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,217,255,0.06) 0%, rgba(124,58,237,0.04) 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-20 blur-3xl"
        style={{
          background: "linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-14">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse shadow-[0_0_8px_#28C840]" />
            <span className="text-xs font-mono text-white/60 tracking-widest uppercase font-semibold">
              {t("contact.eyebrow")}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="text-center space-y-4">
            <SectionHeading title={t("contact.title")} align="center" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto font-sans"
            >
              {t("contact.description")}
            </motion.p>
          </div>

          {/* Grid Layout: Form (Col Span 7) + Contact Cards (Col Span 5) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 relative group"
            >
              {/* Outer Glow Border Effect */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#00D9FF]/20 via-[#7C3AED]/20 to-[#00D9FF]/20 opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative rounded-3xl border border-white/[0.1] bg-[#0C0E15]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Form Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-[#7C3AED]/20 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                        {isVi ? "Gửi Yêu Cầu Liên Hệ" : "Send a Message"}
                      </h3>
                      <p className="text-[11px] text-white/40 font-mono">
                        {isVi ? "Phản hồi trong vòng 24 giờ" : "Response within 24 hours"}
                      </p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#00D9FF] opacity-60" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Topic Selector Pills */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#00D9FF]" />
                      {isVi ? "Bạn quan tâm đến dịch vụ nào?" : "What are you looking for?"}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((svc) => (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setSelectedService(svc.id)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-left border cursor-pointer ${
                            selectedService === svc.id
                              ? "bg-[#00D9FF]/15 border-[#00D9FF]/50 text-white font-bold shadow-[0_0_12px_rgba(0,217,255,0.2)]"
                              : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.05]"
                          }`}
                        >
                          {isVi ? svc.vi : svc.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#00D9FF]" />
                      {isVi ? "Họ và tên" : "Your Name"}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={isVi ? "Nguyễn Văn A" : "John Doe"}
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-black/40 text-white text-sm placeholder:text-white/20 focus:border-[#00D9FF]/60 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                      <AtSign className="w-3 h-3 text-[#00D9FF]" />
                      {isVi ? "Địa chỉ Email" : "Email Address"}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-black/40 text-white text-sm placeholder:text-white/20 focus:border-[#00D9FF]/60 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3 text-[#00D9FF]" />
                        {isVi ? "Nội dung lời nhắn" : "Message"}
                      </label>
                      <span className="text-[10px] font-mono text-white/30">
                        {formMessage.length}/2000
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={2000}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={
                        isVi
                          ? "Chào Khánh, tôi có dự án muốn trao đổi cùng bạn..."
                          : "Hi Khanh, I'd like to discuss a project with you..."
                      }
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-black/40 text-white text-sm placeholder:text-white/20 focus:border-[#00D9FF]/60 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/20 transition-all resize-none font-sans"
                    />
                  </div>

                  {/* Status notifications */}
                  <AnimatePresence mode="wait">
                    {formStatus === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4 shadow-lg"
                      >
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-bold text-xs">
                            {isVi ? "Gửi tin nhắn thành công!" : "Message Sent Successfully!"}
                          </p>
                          <p className="text-[11px] text-emerald-300/70 font-sans">
                            {isVi ? "Tôi đã nhận được thư và sẽ phản hồi sớm nhất." : "Thank you. I will get back to you shortly."}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {formStatus === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-xl p-4 shadow-lg"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                        <div>
                          <p className="font-bold text-xs">{isVi ? "Không thể gửi tin nhắn" : "Failed to send"}</p>
                          <p className="text-[11px] text-red-300/70 font-sans">
                            {formError || (isVi ? "Vui lòng thử lại sau ít phút." : "Please try again later.")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "sending" || formStatus === "success"}
                    className="w-full relative group/btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] via-[#00c0e0] to-[#7C3AED] hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-black font-extrabold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(0,217,255,0.3)] cursor-pointer overflow-hidden"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>{isVi ? "ĐANG GỬI TIN NHẮN..." : "SENDING MESSAGE..."}</span>
                      </>
                    ) : formStatus === "success" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isVi ? "ĐÃ GỬI THÀNH CÔNG" : "SENT SUCCESSFULLY"}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span>{isVi ? "GỬI TIN NHẮN NGAY" : "SEND MESSAGE NOW"}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Right: Direct Channels & Social Cards (Col Span 5) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 space-y-4"
            >
              {/* Direct email spotlight */}
              <div className="p-6 rounded-3xl border border-white/[0.08] bg-[#0C0E15]/80 backdrop-blur-xl space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center text-[#00D9FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {isVi ? "Email Trực Tiếp" : "Direct Contact"}
                    </h4>
                    <p className="text-xs text-[#00D9FF] font-mono font-bold">{p.email}</p>
                  </div>
                </div>

                <p className="text-xs text-white/45 leading-relaxed font-sans">
                  {isVi
                    ? "Bạn có thể gửi email trực tiếp hoặc qua form bên cạnh. Tôi kiểm tra hòm thư hàng ngày."
                    : "Feel free to email directly or use the quick form. I respond promptly."}
                </p>

                <MagneticButton
                  href={`mailto:${p.email}`}
                  variant="primary"
                  size="md"
                  id="contact-email-direct"
                >
                  <Mail className="w-4 h-4" />
                  {isVi ? "Mở Trình Duyệt Email" : "Open Email Client"}
                </MagneticButton>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.id}
                    id={social.id}
                    href={social.href}
                    target={social.label !== "Direct Email" ? "_blank" : undefined}
                    rel={social.label !== "Direct Email" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex flex-col justify-between p-4 rounded-2xl border border-white/[0.06] bg-[#0C0E15]/70 backdrop-blur-sm hover:border-white/15 transition-all duration-300 cursor-pointer overflow-hidden min-h-[100px]"
                    aria-label={`${social.label} — ${social.description}`}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle 120px at 50% 0%, ${social.color}15, transparent)`,
                      }}
                    />
                    <div className="flex items-center justify-between relative z-10">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                        style={{
                          backgroundColor: `${social.color}15`,
                          border: `1px solid ${social.color}25`,
                          color: social.color,
                        }}
                      >
                        {social.icon}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
                    </div>
                    <div className="relative z-10 mt-3">
                      <p className="text-xs font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                        {social.label}
                      </p>
                      <p className="text-[10px] text-white/35 font-mono truncate">{social.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Status Note */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.06] bg-[#0C0E15]/50 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-white/30" />
                  <span className="text-[11px] text-white/40 font-mono">
                    {isVi ? "Bảo mật & Phản hồi < 24h" : "Encrypted & Replied < 24h"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
