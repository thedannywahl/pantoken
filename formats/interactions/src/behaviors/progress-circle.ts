/** Options for the ProgressCircle mount animation. */
export interface ProgressCircleOptions {
  /** Milliseconds before the mount state is released. Defaults to computed `--animation-delay`. */
  animationDelay?: number;
}

/** Handle returned by {@link initProgressCircle}. */
export interface ProgressCircleHandle {
  /** Cancel the pending mount animation. */
  cleanup(): void;
  /** Release the mount state immediately. */
  finish(): void;
}

/**
 * Release a ProgressCircle's mount-animation modifier after its configured delay.
 *
 * The delay is an explicit millisecond option or the target's computed, unitless
 * `--animation-delay` custom property. Missing, negative, and non-finite values become zero. Both the
 * canonical modifier and its deprecated typo alias are accepted and removed.
 */
export function initProgressCircle(
  target: HTMLElement,
  options: ProgressCircleOptions = {},
): ProgressCircleHandle {
  const cssDelay = getComputedStyle(target).getPropertyValue("--animation-delay").trim();
  const configured = options.animationDelay ?? Number(cssDelay);
  const delay = Number.isFinite(configured) && configured >= 0 ? configured : 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const finish = (): void => {
    clearTimeout(timer);
    target.classList.remove(
      "-should-animate",
      "-should-animate-on-mount",
      "-shold-animate-on-mount",
    );
  };

  const cleanup = (): void => clearTimeout(timer);

  if (
    target.classList.contains("-should-animate") ||
    target.classList.contains("-should-animate-on-mount") ||
    target.classList.contains("-shold-animate-on-mount")
  ) {
    // Force the initial zero-value state to resolve before releasing it on a later task.
    void target.offsetWidth;
    timer = setTimeout(finish, delay);
  }

  return { cleanup, finish };
}
