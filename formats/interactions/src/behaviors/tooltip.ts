/** Options for show/hide timing. */
export interface TooltipOptions {
  showDelay?: number;
  hideDelay?: number;
}

/** Handle returned by {@link initTooltip}. */
export interface TooltipHandle {
  /** Remove all event listeners and cancel any pending timer. */
  cleanup(): void;
  /** Immediately cancel any pending show timer and remove `-show`. */
  cancelAndHide(): void;
}

/**
 * Wire hover/focus show-hide with delay onto a tooltip wrapper and its tip
 * bubble. Returns a cleanup function for use in web component disconnectedCallback.
 *
 *   CSS:  wrapper = .instui-tooltip element, tip = its .tip child
 *   WC:   wrapper = shadow .instui-tooltip, tip = shadow .tip
 */
export function initTooltip(
  wrapper: HTMLElement,
  tip: HTMLElement,
  options?: TooltipOptions,
): TooltipHandle {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => tip.classList.add("-show"), options?.showDelay ?? 0);
  };
  const hide = () => {
    clearTimeout(timer);
    timer = setTimeout(() => tip.classList.remove("-show"), options?.hideDelay ?? 0);
  };
  const cancelAndHide = () => {
    clearTimeout(timer);
    tip.classList.remove("-show");
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") cancelAndHide();
  };

  wrapper.addEventListener("pointerenter", show);
  wrapper.addEventListener("pointerleave", hide);
  wrapper.addEventListener("focusin", show);
  wrapper.addEventListener("focusout", hide);
  // Escape listener on wrapper works for CSS (light-DOM) usage; WC puts its own on the host.
  wrapper.addEventListener("keydown", onKeydown as EventListener);

  return {
    cancelAndHide,
    cleanup: () => {
      clearTimeout(timer);
      wrapper.removeEventListener("pointerenter", show);
      wrapper.removeEventListener("pointerleave", hide);
      wrapper.removeEventListener("focusin", show);
      wrapper.removeEventListener("focusout", hide);
      wrapper.removeEventListener("keydown", onKeydown as EventListener);
    },
  };
}
