// Tracks loader status in memory across client-side page navigations (SPA)
// and persists in sessionStorage across page refreshes within the same browser session.

let inMemoryLoaderDone = false;

export function isLoaderCompleted(): boolean {
  if (inMemoryLoaderDone) return true;
  if (typeof window !== "undefined") {
    try {
      if (sessionStorage.getItem("portfolio_loader_shown") === "true") {
        inMemoryLoaderDone = true;
        return true;
      }
    } catch {
      // Fallback if sessionStorage is disabled/restricted
    }
  }
  return false;
}

export function setLoaderCompleted(): void {
  inMemoryLoaderDone = true;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("portfolio_loader_shown", "true");
    } catch {
      // Fallback if sessionStorage is disabled/restricted
    }
  }
}
