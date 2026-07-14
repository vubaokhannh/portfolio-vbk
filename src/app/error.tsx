"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          An unexpected error occurred during execution.
        </p>
        <div className="pt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-[#7C3AED] text-white hover:bg-[#7C3AED]/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
