/** State update sent to an auto-registered skeleton loading region. */
export interface SkeletonLoadingState {
  state: "loading" | "loaded" | "empty" | "error";
  message: string;
}

/** Pre-rendered announcement elements must be outside the busy content region. */
export interface SkeletonLoadingOptions {
  status: HTMLElement;
  error: HTMLElement;
  announceDelayMs?: number;
}

/** Control parent-level loading semantics without touching decorative skeleton shapes. */
export interface SkeletonLoadingHandle {
  setLoading(message: string): void;
  setLoaded(message: string): void;
  setEmpty(message: string): void;
  setError(message: string): void;
  cleanup(): void;
}

const initialized = new WeakMap<HTMLElement, SkeletonLoadingHandle>();

/** Bind the parent content region to SSR-provided status and error announcements. */
export function initSkeletonLoading(
  busyRegion: HTMLElement,
  { status, error, announceDelayMs = 400 }: SkeletonLoadingOptions,
): SkeletonLoadingHandle {
  const existing = initialized.get(busyRegion);
  if (existing) return existing;
  if (busyRegion.contains(status) || busyRegion.contains(error)) {
    throw new Error("Skeleton announcements must be outside the busy region");
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancelAnnouncement = (): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
  const finish = (message: string, failed: boolean): void => {
    cancelAnnouncement();
    busyRegion.setAttribute("aria-busy", "false");
    status.textContent = failed ? "" : message;
    error.textContent = failed ? message : "";
  };

  const handle: SkeletonLoadingHandle = {
    setLoading(message): void {
      cancelAnnouncement();
      busyRegion.setAttribute("aria-busy", "true");
      status.textContent = "";
      error.textContent = "";
      timer = setTimeout(() => {
        status.textContent = message;
        timer = undefined;
      }, announceDelayMs);
    },
    setLoaded(message): void {
      finish(message, false);
    },
    setEmpty(message): void {
      finish(message, false);
    },
    setError(message): void {
      finish(message, true);
    },
    cleanup(): void {
      cancelAnnouncement();
      busyRegion.removeEventListener("pantoken:skeleton-state", onState);
      initialized.delete(busyRegion);
    },
  };

  const onState = (event: Event): void => {
    const { state, message } = (event as CustomEvent<SkeletonLoadingState>).detail ?? {};
    if (typeof message !== "string") return;
    if (state === "loading") handle.setLoading(message);
    else if (state === "loaded") handle.setLoaded(message);
    else if (state === "empty") handle.setEmpty(message);
    else if (state === "error") handle.setError(message);
  };
  busyRegion.addEventListener("pantoken:skeleton-state", onState);
  initialized.set(busyRegion, handle);
  return handle;
}
