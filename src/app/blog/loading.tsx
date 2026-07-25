export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16 space-y-4">
          <div className="h-3 w-24 mx-auto bg-white/[0.05] rounded-full animate-pulse" />
          <div className="h-10 w-80 mx-auto bg-white/[0.08] rounded-xl animate-pulse" />
          <div className="h-4 w-64 mx-auto bg-white/[0.05] rounded-lg animate-pulse" />
        </div>

        {/* Filter tags skeleton */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-20 bg-white/[0.05] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Blog cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4 animate-pulse"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Tag */}
              <div className="h-5 w-16 bg-white/[0.06] rounded-full" />
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 w-full bg-white/[0.08] rounded-lg" />
                <div className="h-5 w-3/4 bg-white/[0.06] rounded-lg" />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-white/[0.04] rounded-lg" />
                <div className="h-3.5 w-5/6 bg-white/[0.04] rounded-lg" />
              </div>
              {/* Meta */}
              <div className="flex items-center justify-between pt-2">
                <div className="h-3 w-24 bg-white/[0.04] rounded-full" />
                <div className="h-3 w-16 bg-white/[0.04] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
