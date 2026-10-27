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
  const view = document.defaultView;
  if (!view) throw new Error("Tooltip positioning requires a document with a window.");
  const originalSide = tip.getAttribute("data-tooltip-side");
  const positionProperties = [
    "left",
    "top",
    "right",
    "bottom",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "transform",
    "--pantoken-tooltip-viewport-inline-size",
    "--pantoken-tooltip-gap",
  ] as const;
  const originalPosition = positionProperties.map((property) => ({
    property,
    value: tip.style.getPropertyValue(property),
    priority: tip.style.getPropertyPriority(property),
  }));
  const restorePosition = () => {
    for (const { property, value, priority } of originalPosition) {
      if (value) tip.style.setProperty(property, value, priority);
      else tip.style.removeProperty(property);
    }
    if (originalSide === null) tip.removeAttribute("data-tooltip-side");
    else tip.setAttribute("data-tooltip-side", originalSide);
  };
  const position = () => {
    if (!tip.classList.contains("-show")) return;
    restorePosition();
    const style = view.getComputedStyle(tip);
    const gap = Math.max(
      ...[style.marginTop, style.marginRight, style.marginBottom, style.marginLeft].map(
        (value) => Number.parseFloat(value) || 0,
      ),
    );
    const visual = view.visualViewport;
    const left = (visual?.offsetLeft ?? 0) + gap;
    const top = (visual?.offsetTop ?? 0) + gap;
    const width = visual?.width ?? (document.documentElement.clientWidth || view.innerWidth);
    const height = visual?.height ?? (document.documentElement.clientHeight || view.innerHeight);
    const right = left + width - 2 * gap;
    const bottom = top + height - 2 * gap;
    tip.style.setProperty(
      "--pantoken-tooltip-viewport-inline-size",
      `${Math.max(0, width - 2 * gap)}px`,
    );
    tip.style.setProperty("--pantoken-tooltip-gap", `${gap}px`);
    const anchor = wrapper.getBoundingClientRect();
    const bubble = tip.getBoundingClientRect();
    const rtl = style.direction === "rtl";
    const preferred = tip.classList.contains("-placement-bottom")
      ? "bottom"
      : tip.classList.contains("-placement-start")
        ? rtl
          ? "right"
          : "left"
        : tip.classList.contains("-placement-end")
          ? rtl
            ? "left"
            : "right"
          : "top";
    const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" } as const;
    const room = {
      top: anchor.top - top,
      bottom: bottom - anchor.bottom,
      left: anchor.left - left,
      right: right - anchor.right,
    };
    const needed = {
      top: bubble.height + gap,
      bottom: bubble.height + gap,
      left: bubble.width + gap,
      right: bubble.width + gap,
    };
    const sides = [preferred, opposite[preferred], "top", "bottom", "left", "right"] as const;
    const side =
      sides.find((candidate) => room[candidate] >= needed[candidate]) ??
      sides.reduce(
        (best, candidate) =>
          room[candidate] - needed[candidate] > room[best] - needed[best] ? candidate : best,
        preferred,
      );
    const centerX = anchor.left + (anchor.width - bubble.width) / 2;
    const centerY = anchor.top + (anchor.height - bubble.height) / 2;
    const positions = {
      top: { x: centerX, y: anchor.top - bubble.height - gap },
      bottom: { x: centerX, y: anchor.bottom + gap },
      left: { x: anchor.left - bubble.width - gap, y: centerY },
      right: { x: anchor.right + gap, y: centerY },
    };
    const { x, y } = positions[side];
    tip.style.left = `${Math.max(left, Math.min(x, right - bubble.width)) - anchor.left - wrapper.clientLeft + wrapper.scrollLeft}px`;
    tip.style.top = `${Math.max(top, Math.min(y, bottom - bubble.height)) - anchor.top - wrapper.clientTop + wrapper.scrollTop}px`;
    tip.style.right = "auto";
    tip.style.bottom = "auto";
    for (const property of ["margin-top", "margin-right", "margin-bottom", "margin-left"])
      tip.style.setProperty(property, "0px");
    tip.style.transform = "none";
    tip.setAttribute("data-tooltip-side", side);
  };
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
      timer = setTimeout(() => {
        tip.classList.add("-show");
        position();
      }, options?.showDelay ?? 0);
    }
  };
  let previousPointer: { x: number; y: number } | undefined;
  let traveling = false;
  const corridor = (point: { x: number; y: number }) => {
    const side = tip.getAttribute("data-tooltip-side");
    if (side !== "top" && side !== "bottom" && side !== "left" && side !== "right") return;
    const anchor = wrapper.getBoundingClientRect();
    const bubble = tip.getBoundingClientRect();
    const vertical = side === "top" || side === "bottom";
    const edges = {
      top: [anchor.bottom, bubble.bottom],
      bottom: [anchor.top, bubble.top],
      left: [anchor.right, bubble.right],
      right: [anchor.left, bubble.left],
    } as const;
    const [start, end] = edges[side];
    const along = vertical ? point.y : point.x;
    const across = vertical ? point.x : point.y;
    const progress = (along - start) / (end - start);
    const fromLow = vertical ? anchor.left : anchor.top;
    const fromHigh = vertical ? anchor.right : anchor.bottom;
    const toLow = vertical ? bubble.left : bubble.top;
    const toHigh = vertical ? bubble.right : bubble.bottom;
    return {
      inside:
        progress >= 0 &&
        progress <= 1 &&
        across >= fromLow + (toLow - fromLow) * progress &&
        across <= fromHigh + (toHigh - fromHigh) * progress,
      distance: Math.abs(end - along),
    };
  };
  const stopTravel = () => {
    document.removeEventListener("pointermove", onTravel);
    document.removeEventListener("pointerout", onTravelOut);
    traveling = false;
  };
  const onTravelOut = (event: PointerEvent) => {
    if (event.relatedTarget) return;
    stopTravel();
    hovering = false;
    update();
  };
  const onTravel = (event: PointerEvent) => {
    const point = { x: event.clientX, y: event.clientY };
    if (previousPointer?.x === point.x && previousPointer.y === point.y) return;
    const from = previousPointer && corridor(previousPointer);
    const to = corridor(point);
    if (from && to?.inside && to.distance < from.distance) {
      previousPointer = point;
      return;
    }
    stopTravel();
    hovering = false;
    update();
  };
  const cancelAndHide = () => {
    clearTimeout(timer);
    if (traveling) {
      stopTravel();
      hovering = false;
    }
    dismissed = hovering || focused;
    tip.classList.remove("-show");
  };
  const onPointerEnter = (event: PointerEvent) => {
    stopTravel();
    previousPointer =
      event instanceof view.PointerEvent ? { x: event.clientX, y: event.clientY } : undefined;
    hovering = true;
    update();
  };
  const onPointerMove = (event: PointerEvent) => {
    previousPointer = { x: event.clientX, y: event.clientY };
  };
  const onPointerLeave = (event: PointerEvent) => {
    const point = { x: event.clientX, y: event.clientY };
    const from = previousPointer && corridor(previousPointer);
    const to = corridor(point);
    if (
      event instanceof view.PointerEvent &&
      event.pointerType !== "touch" &&
      tip.classList.contains("-show") &&
      from &&
      to?.inside &&
      to.distance < from.distance
    ) {
      traveling = true;
      previousPointer = point;
      document.addEventListener("pointermove", onTravel);
      document.addEventListener("pointerout", onTravelOut);
      return;
    }
    stopTravel();
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
  wrapper.addEventListener("pointermove", onPointerMove);
  wrapper.addEventListener("focusin", onFocusIn);
  wrapper.addEventListener("focusout", onFocusOut);
  document.addEventListener("keydown", onKeydown);
  view.addEventListener("resize", position);
  const roots: (Document | ShadowRoot)[] = [document];
  for (
    let root = wrapper.getRootNode();
    root instanceof view.ShadowRoot;
    root = root.host.getRootNode()
  )
    roots.push(root);
  for (const root of roots) root.addEventListener("scroll", position, true);
  view.visualViewport?.addEventListener("resize", position);
  view.visualViewport?.addEventListener("scroll", position);
  const resize = new view.ResizeObserver(position);
  resize.observe(wrapper);
  resize.observe(tip);
  const mutations = new view.MutationObserver(position);
  mutations.observe(tip, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    characterData: true,
    subtree: true,
  });
  for (const root of roots)
    mutations.observe(root, { attributes: true, attributeFilter: ["dir"], subtree: true });
  if (hovering || focused) update();

  return {
    cancelAndHide,
    cleanup: () => {
      if (cleaned) return;
      cleaned = true;
      clearTimeout(timer);
      wrapper.removeEventListener("pointerenter", onPointerEnter);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      wrapper.removeEventListener("pointermove", onPointerMove);
      stopTravel();
      wrapper.removeEventListener("focusin", onFocusIn);
      wrapper.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("keydown", onKeydown);
      view.removeEventListener("resize", position);
      for (const root of roots) root.removeEventListener("scroll", position, true);
      view.visualViewport?.removeEventListener("resize", position);
      view.visualViewport?.removeEventListener("scroll", position);
      resize.disconnect();
      mutations.disconnect();
      restorePosition();
      if (originalManaged === null) wrapper.removeAttribute("data-tooltip-managed");
      else wrapper.setAttribute("data-tooltip-managed", originalManaged);
      tip.classList.toggle("-show", originalShown);
    },
  };
}
