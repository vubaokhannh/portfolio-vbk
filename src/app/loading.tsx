export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden">
      {/* Navbar skeleton */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border border-white/[0.06] bg-[#0F1117]/80">
          <div className="h-7 w-36 bg-white/[0.06] rounded-xl animate-pulse" />
          <div className="hidden md:flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-white/[0.04] rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </div>
          <div className="h-7 w-20 bg-white/[0.05] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 pt-20">
        {/* Badge */}
        <div className="h-7 w-44 bg-white/[0.04] rounded-full animate-pulse" />

        {/* Name */}
        <div className="space-y-3 text-center">
          <div className="h-20 md:h-28 w-72 md:w-[480px] bg-white/[0.08] rounded-2xl animate-pulse mx-auto" />
          <div className="h-20 md:h-28 w-56 md:w-[360px] bg-[#00D9FF]/10 rounded-2xl animate-pulse mx-auto" />
        </div>

        {/* Role + Stack */}
        <div className="flex gap-3 flex-wrap justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-20 bg-white/[0.04] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        {/* Tagline */}
        <div className="space-y-2 text-center">
          <div className="h-4 w-80 bg-white/[0.04] rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-64 bg-white/[0.03] rounded-lg animate-pulse mx-auto" />
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <div className="h-11 w-36 bg-[#00D9FF]/15 rounded-full animate-pulse" />
          <div className="h-11 w-36 bg-white/[0.05] rounded-full animate-pulse" />
          <div className="h-11 w-28 bg-white/[0.04] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
