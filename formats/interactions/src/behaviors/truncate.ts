/** Optional knobs for {@link initTruncateAuto}. */
export interface TruncateAutoOptions {
  /** Observe the host's parent size (default true). */
  observeParent?: boolean;
  /** Optional slot to watch for `slotchange` re-syncs in shadow DOM usage. */
  slot?: HTMLSlotElement | null;
}

/** Handle returned by {@link initTruncateAuto}. */
export interface TruncateAutoHandle {
  /** Force a recompute of the derived `--lines` value. */
  sync(): void;
  /** Remove observers/listeners created by init. */
  cleanup(): void;
}

/** Resolve a numeric line-height in px from computed styles. */
function resolveLineHeightPx(el: HTMLElement): number {
  const computed = getComputedStyle(el);
  const lineHeight = Number.parseFloat(computed.lineHeight);
  if (Number.isFinite(lineHeight) && lineHeight > 0) return lineHeight;
  const fontSize = Number.parseFloat(computed.fontSize);
  if (Number.isFinite(fontSize) && fontSize > 0) return fontSize * 1.2;
  return 0;
}

/** Compute and apply a numeric `--lines` value from available height. */
export function syncTruncateAutoLines(host: HTMLElement, target: HTMLElement): void {
  const lineHeight = resolveLineHeightPx(target);
  if (lineHeight <= 0) return;
  const ownHeight = host.getBoundingClientRect().height;
  const parentHeight = host.parentElement?.getBoundingClientRect().height ?? 0;
  const availableHeight = parentHeight > 0 ? parentHeight : ownHeight;
  if (availableHeight <= 0) return;
  const lines = Math.max(1, Math.floor(availableHeight / lineHeight));
  target.style.setProperty("--lines", String(lines));
}

/**
 * Keep `--lines` in sync with available height for an auto-clamped truncate target.
 *
 * - CSS usage: pass the same element as `host` and `target`.
 * - Web-component usage: pass custom-element host + shadow truncate target span.
 */
export function initTruncateAuto(
  host: HTMLElement,
  target: HTMLElement,
  options?: TruncateAutoOptions,
): TruncateAutoHandle {
  let resizeObserver: ResizeObserver | undefined;
  const onSlotChange = (): void => {
    syncTruncateAutoLines(host, target);
  };

  if (typeof ResizeObserver === "function") {
    resizeObserver = new ResizeObserver(() => {
      syncTruncateAutoLines(host, target);
    });
    resizeObserver.observe(host);
    if (options?.observeParent !== false && host.parentElement) {
      resizeObserver.observe(host.parentElement);
    }
  }

  options?.slot?.addEventListener("slotchange", onSlotChange);
  syncTruncateAutoLines(host, target);

  return {
    sync: () => {
      syncTruncateAutoLines(host, target);
    },
    cleanup: () => {
      resizeObserver?.disconnect();
      options?.slot?.removeEventListener("slotchange", onSlotChange);
    },
  };
}
