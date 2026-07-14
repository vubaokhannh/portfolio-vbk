import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-8xl font-black text-[#00D9FF]">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-[#00D9FF] text-black hover:bg-[#00D9FF]/80 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
