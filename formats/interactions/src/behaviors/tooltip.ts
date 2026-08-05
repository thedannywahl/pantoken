/** Options for show/hide timing. */
export interface TooltipOptions {
  showDelay?: number;
  hideDelay?: number;
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
): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => tip.classList.add("-show"), options?.showDelay ?? 0);
  };
  const hide = () => {
    clearTimeout(timer);
    timer = setTimeout(() => tip.classList.remove("-show"), options?.hideDelay ?? 0);
  };
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      clearTimeout(timer);
      tip.classList.remove("-show");
    }
  };

  wrapper.addEventListener("pointerenter", show);
  wrapper.addEventListener("pointerleave", hide);
  wrapper.addEventListener("focusin", show);
  wrapper.addEventListener("focusout", hide);
  wrapper.addEventListener("keydown", onKeydown as EventListener);

  return () => {
    clearTimeout(timer);
    wrapper.removeEventListener("pointerenter", show);
    wrapper.removeEventListener("pointerleave", hide);
    wrapper.removeEventListener("focusin", show);
    wrapper.removeEventListener("focusout", hide);
    wrapper.removeEventListener("keydown", onKeydown as EventListener);
  };
}
