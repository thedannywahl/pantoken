import type { OnCommand } from "../shared/index.js";

/**
 * Wire open/close commands plus width-based responsive overlay switching onto a host: any
 * collapsible side panel (e.g. a drawer's tray) can import this interaction rather than each
 * component reimplementing it.
 */
export function initResponsiveOverlay(host: HTMLElement, onCommand: OnCommand): void {
  onCommand(host, (command) => {
    if (command === "--toggle") host.toggleAttribute("open");
    else if (command === "--open") host.setAttribute("open", "");
    else if (command === "--close") host.removeAttribute("open");
  });

  // Ordered longest-suffix-first so "rem" isn't shadowed by a hypothetical shorter match.
  const unitMultipliers: Array<[unit: string, multiplier: () => number]> = [
    ["rem", () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16],
    ["em", () => parseFloat(getComputedStyle(host).fontSize) || 16],
    ["px", () => 1],
  ];

  const toPx = (value: string): number => {
    const v = value.trim();
    if (!v) return 0;
    const [, multiplier] = unitMultipliers.find(([unit]) => v.endsWith(unit)) ?? [
      undefined,
      () => 1,
    ];
    return (Number.parseFloat(v) || 0) * multiplier();
  };

  const resolveMinWidth = (): number => {
    const style = getComputedStyle(host);
    const breakpoint = style.getPropertyValue("--pantoken-bp-md");
    if (breakpoint.trim()) return toPx(breakpoint);
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return 30 * root;
  };

  let lastOverlay: boolean | undefined;
  const updateOverlay = (): void => {
    const shouldOverlay = host.clientWidth < resolveMinWidth();
    if (shouldOverlay === lastOverlay) return;
    lastOverlay = shouldOverlay;
    host.toggleAttribute("should-overlay-tray", shouldOverlay);
    host.classList.toggle("-should-overlay-tray", shouldOverlay);
    host.dispatchEvent(
      new CustomEvent("overlaytraychange", {
        bubbles: true,
        detail: { shouldOverlayTray: shouldOverlay },
      }),
    );
  };

  window.addEventListener("resize", updateOverlay);
  updateOverlay();
}
