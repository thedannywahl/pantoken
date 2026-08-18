/** Options for a timeout-based removal. */
export interface RemoveOptions {
  /** Milliseconds before dismissal. Defaults to the target's computed `--timeout`. */
  timeout?: number;
  /** Exit treatment. Defaults to `"fade"`, matching InstUI Alert. */
  transition?: "fade" | "none";
}

/** Handle returned by {@link initRemove}. */
export interface RemoveHandle {
  /** Cancel pending dismissal and removal work. */
  cleanup(): void;
  /** Dismiss immediately, without waiting for the configured timeout. */
  dismiss(): void;
}

const DEFAULT_TRANSITION_DURATION = 300;
const FALLBACK_PADDING = 100;

function transitionFallbackDelay(target: HTMLElement): number {
  const raw = getComputedStyle(target).getPropertyValue("--instui-transition-duration").trim();
  const duration = raw.endsWith("ms")
    ? Number(raw.slice(0, -2))
    : raw.endsWith("s")
      ? Number(raw.slice(0, -1)) * 1000
      : Number.NaN;
  return (
    (Number.isFinite(duration) && duration >= 0 ? duration : DEFAULT_TRANSITION_DURATION) +
    FALLBACK_PADDING
  );
}

/**
 * Remove a target after a timeout. Before removal, fires a cancelable, bubbling `dismiss` event.
 * Preventing that event keeps the target mounted.
 *
 * The timeout is an explicit millisecond option or the target's computed, unitless `--timeout` CSS
 * custom property. Missing, non-finite, and non-positive values don't arm a timer. A fade uses the
 * `@pantoken/plugin-transition` classes (`.instui-transition` + `-fade-*`), then waits for
 * `transitionend` (with a fallback); `transition: "none"` removes immediately.
 */
export function initRemove(target: HTMLElement, options: RemoveOptions = {}): RemoveHandle {
  const cssTimeout = getComputedStyle(target).getPropertyValue("--timeout").trim();
  const timeout = options.timeout ?? Number(cssTimeout);
  const transition =
    options.transition ?? (target.classList.contains("-transition-none") ? "none" : "fade");
  let timer: ReturnType<typeof setTimeout> | undefined;
  let fallback: ReturnType<typeof setTimeout> | undefined;
  let transitionEnd: ((event: TransitionEvent) => void) | undefined;
  let removed = false;

  if (transition === "fade") {
    target.classList.add("instui-transition", "-fade-entered");
  }

  const cleanup = (): void => {
    clearTimeout(timer);
    clearTimeout(fallback);
    if (transitionEnd) target.removeEventListener("transitionend", transitionEnd);
  };

  const remove = (): void => {
    if (removed) return;
    removed = true;
    cleanup();
    target.remove();
  };

  const dismiss = (): void => {
    clearTimeout(timer);
    const event = new CustomEvent("dismiss", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (!target.dispatchEvent(event)) return;

    if (transition === "none") {
      remove();
      return;
    }

    target.classList.remove("-fade-entering", "-fade-entered");
    target.classList.add("-fade-exiting");
    transitionEnd = (event): void => {
      if (event.target === target) remove();
    };
    target.addEventListener("transitionend", transitionEnd);
    fallback = setTimeout(remove, transitionFallbackDelay(target));
  };

  if (Number.isFinite(timeout) && timeout > 0) timer = setTimeout(dismiss, timeout);

  return { cleanup, dismiss };
}
