/** Segmented control options; the medium size is the CSS default. */
export interface SegmentedControlOptions {
  size?: "sm" | "md" | "lg";
  isOverflown?: boolean;
}

/** Detach the segmented-control listeners and observers. */
export interface SegmentedControlHandle {
  cleanup(): void;
  refresh(): void;
}

const initialized = new WeakMap<HTMLElement, SegmentedControlHandle>();

/** Enhance a labelled native radio group with keyboard navigation and optional overflow controls. */
export function initSegmentedControl(
  host: HTMLElement,
  options: SegmentedControlOptions = {},
): SegmentedControlHandle {
  const existing = initialized.get(host);
  if (existing) return existing;

  const strip = host;
  const startButton = host.querySelector<HTMLButtonElement>(":scope > .overflow-start");
  const endButton = host.querySelector<HTMLButtonElement>(":scope > .overflow-end");
  const radios = (): HTMLInputElement[] => [
    ...host.querySelectorAll<HTMLInputElement>(":scope > label > input[type=radio]"),
  ];
  const segments = (): HTMLElement[] => [...strip.querySelectorAll<HTMLElement>(":scope > label")];
  const isOverflown = options.isOverflown ?? host.hasAttribute("data-overflown");
  let arrowWidth = 0;
  if (options.size) {
    host.classList.remove("-size-sm", "-size-md", "-size-lg");
    host.classList.add(`-size-${options.size}`);
  }

  const first =
    radios().find((radio) => radio.checked) ?? radios().find((radio) => !radio.disabled);
  if (first) first.checked = true;

  for (const radio of radios()) {
    const iconClass = [...radio.classList].find((className) => className.startsWith("-icon-"));
    if (iconClass) radio.closest<HTMLElement>("label")?.classList.add(iconClass);
  }

  const bounds = (): { left: number; right: number; rtl: boolean } => {
    const rect = strip!.getBoundingClientRect();
    const rtl = getComputedStyle(strip!).direction === "rtl";
    return {
      left: rect.left + arrowWidth,
      right: rect.right - arrowWidth,
      rtl,
    };
  };

  const updateArrows = (): void => {
    if (!strip || !startButton || !endButton) return;
    const { left, right, rtl } = bounds();
    const items = segments();
    const firstRect = items[0]?.getBoundingClientRect();
    const lastRect = items[items.length - 1]?.getBoundingClientRect();
    startButton.hidden =
      !firstRect || (rtl ? firstRect.right <= right + 1 : firstRect.left >= left - 1);
    endButton.hidden = !lastRect || (rtl ? lastRect.left >= left - 1 : lastRect.right <= right + 1);
  };

  const refresh = (): void => {
    if (!strip || !startButton || !endButton || !isOverflown) {
      if (startButton) startButton.hidden = true;
      if (endButton) endButton.hidden = true;
      return;
    }
    strip.style.removeProperty("--pantoken-segmented-start-reserve");
    strip.style.removeProperty("--pantoken-segmented-end-reserve");
    const overflows = strip.scrollWidth > strip.clientWidth + 1;
    if (!overflows) {
      arrowWidth = 0;
      startButton.hidden = true;
      endButton.hidden = true;
      return;
    }
    startButton.hidden = false;
    endButton.hidden = false;
    arrowWidth = Math.max(startButton.offsetWidth, endButton.offsetWidth);
    strip.style.setProperty("--pantoken-segmented-start-reserve", `${arrowWidth}px`);
    strip.style.setProperty("--pantoken-segmented-end-reserve", `${arrowWidth}px`);
    updateArrows();
  };

  const scrollOne = (towardEnd: boolean): void => {
    if (!strip) return;
    const { left, right, rtl } = bounds();
    const items = towardEnd ? segments() : segments().reverse();
    const clipped = items.find((segment) => {
      const rect = segment.getBoundingClientRect();
      return towardEnd
        ? rtl
          ? rect.left < left - 1
          : rect.right > right + 1
        : rtl
          ? rect.right > right + 1
          : rect.left < left - 1;
    });
    if (!clipped) return;
    const rect = clipped.getBoundingClientRect();
    const distance = towardEnd
      ? rtl
        ? rect.left - left
        : rect.right - right
      : rtl
        ? rect.right - right
        : rect.left - left;
    strip.scrollBy({ left: distance, behavior: "smooth" });
  };

  const select = (radio: HTMLInputElement): void => {
    radio.focus();
    if (!radio.checked) {
      radio.checked = true;
      radio.dispatchEvent(new Event("input", { bubbles: true }));
      radio.dispatchEvent(new Event("change", { bubbles: true }));
    }
    radio.closest("label")?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    const radio = event.target;
    if (!(radio instanceof HTMLInputElement) || !radios().includes(radio) || radio.disabled) return;
    const available = radios().filter((item) => !item.disabled);
    const currentIndex = available.indexOf(radio);
    let nextIndex = currentIndex;
    const rtl = getComputedStyle(host).direction === "rtl";
    if (event.key === "ArrowRight")
      nextIndex = (currentIndex + (rtl ? -1 : 1) + available.length) % available.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (currentIndex + (rtl ? 1 : -1) + available.length) % available.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = available.length - 1;
    else if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    const next = available[nextIndex];
    if (next) select(next);
  };

  const onStart = (): void => scrollOne(false);
  const onEnd = (): void => scrollOne(true);
  host.addEventListener("keydown", onKeyDown);
  strip?.addEventListener("scroll", updateArrows, { passive: true });
  startButton?.addEventListener("click", onStart);
  endButton?.addEventListener("click", onEnd);
  window.addEventListener("resize", refresh);
  const resizeObserver =
    typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(refresh);
  if (resizeObserver) resizeObserver.observe(host);
  const mutationObserver = strip ? new MutationObserver(refresh) : undefined;
  if (strip) mutationObserver?.observe(strip, { childList: true });
  refresh();

  const handle: SegmentedControlHandle = {
    refresh,
    cleanup(): void {
      host.removeEventListener("keydown", onKeyDown);
      strip?.removeEventListener("scroll", updateArrows);
      startButton?.removeEventListener("click", onStart);
      endButton?.removeEventListener("click", onEnd);
      window.removeEventListener("resize", refresh);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      strip?.style.removeProperty("--pantoken-segmented-start-reserve");
      strip?.style.removeProperty("--pantoken-segmented-end-reserve");
      initialized.delete(host);
    },
  };
  initialized.set(host, handle);
  return handle;
}
