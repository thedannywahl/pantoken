/**
 * Wire a close button to dismiss its target.
 *
 * Target resolution (first match wins):
 * 1. `data-close-target="id"` — dismiss the element with that id
 * 2. `popovertarget` / `commandfor` — skip; native browser handles it
 * 3. walk up to the nearest `<dialog>`, `[popover]`, or `[data-dismissible]`
 *
 * Dismiss strategy:
 * - `<dialog>` → `dialog.close()`
 * - `[popover]` → `el.hidePopover()`
 * - `[data-dismissible]` or `[open]` → remove open attr + fire bubbling `close`
 */
export function initCloseButton(btn: HTMLElement): void {
  if (btn.hasAttribute("popovertarget") || btn.hasAttribute("commandfor")) return;

  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-close-target");
    const root = btn.getRootNode() as Document | ShadowRoot;
    const byId = (id: string) =>
      (typeof (root as Document | ShadowRoot).getElementById === "function"
        ? (root as Document).getElementById(id)
        : null) ?? document.getElementById(id);

    const target = targetId
      ? byId(targetId)
      : btn.closest<HTMLElement>("dialog, [popover], [data-dismissible], [open]");

    if (!target) return;

    if (target instanceof HTMLDialogElement) {
      target.close();
    } else if (target.hasAttribute("popover")) {
      (target as HTMLElement & { hidePopover?(): void }).hidePopover?.();
    } else {
      target.removeAttribute("open");
      target.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
  });
}
