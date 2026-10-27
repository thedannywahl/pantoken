/** Options for show/hide timing. */
export interface TooltipOptions {
  showDelay?: number;
  hideDelay?: number;
}

/** Handle returned by {@link initTooltip}. */
export interface TooltipHandle {
  /** Remove listeners/timers and restore the original managed marker and show class. */
  cleanup(): void;
  /** Dismiss until both pointer and focus leave, canceling pending timers. */
  cancelAndHide(): void;
}

/**
 * Own tooltip visibility after initialization, retaining CSS hover/focus as a no-JS fallback.
 * Pointer and focus are independent reasons to stay open; Escape dismisses until both leave.
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
  const originalManaged = wrapper.getAttribute("data-tooltip-managed");
  const originalShown = tip.classList.contains("-show");
  const document = wrapper.ownerDocument;
  const isWithin = (target: EventTarget | null): boolean =>
    target instanceof Node &&
    (wrapper.contains(target) ||
      [...wrapper.querySelectorAll("slot")].some((slot) =>
        slot.assignedNodes({ flatten: true }).some((node) => node.contains(target)),
      ));
  let hovering = wrapper.matches(":hover");
  let focused = isWithin(document.activeElement) || wrapper.matches(":focus-within");
  let dismissed = false;
  let cleaned = false;
  wrapper.setAttribute("data-tooltip-managed", "");

  const update = () => {
    clearTimeout(timer);
    if (!hovering && !focused) {
      dismissed = false;
      timer = setTimeout(() => tip.classList.remove("-show"), options?.hideDelay ?? 0);
    } else if (!dismissed && !tip.classList.contains("-show")) {
      timer = setTimeout(() => tip.classList.add("-show"), options?.showDelay ?? 0);
    }
  };
  const cancelAndHide = () => {
    clearTimeout(timer);
    dismissed = hovering || focused;
    tip.classList.remove("-show");
  };
  const onPointerEnter = () => {
    hovering = true;
    update();
  };
  const onPointerLeave = () => {
    hovering = false;
    update();
  };
  const onFocusIn = () => {
    if (focused) return;
    focused = true;
    update();
  };
  const onFocusOut = (event: FocusEvent) => {
    if (isWithin(event.relatedTarget)) return;
    focused = false;
    update();
  };
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") cancelAndHide();
  };

  wrapper.addEventListener("pointerenter", onPointerEnter);
  wrapper.addEventListener("pointerleave", onPointerLeave);
  wrapper.addEventListener("focusin", onFocusIn);
  wrapper.addEventListener("focusout", onFocusOut);
  document.addEventListener("keydown", onKeydown);
  if (hovering || focused) update();

  return {
    cancelAndHide,
    cleanup: () => {
      if (cleaned) return;
      cleaned = true;
      clearTimeout(timer);
      wrapper.removeEventListener("pointerenter", onPointerEnter);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      wrapper.removeEventListener("focusin", onFocusIn);
      wrapper.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("keydown", onKeydown);
      if (originalManaged === null) wrapper.removeAttribute("data-tooltip-managed");
      else wrapper.setAttribute("data-tooltip-managed", originalManaged);
      tip.classList.toggle("-show", originalShown);
    },
  };
}
