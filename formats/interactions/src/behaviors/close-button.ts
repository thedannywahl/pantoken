import { DEFAULT_PREFIX, withPrefix } from "../shared/prefix.js";
import { initRemove } from "./remove.js";

/** Options for {@link initCloseButton}. */
export interface CloseButtonOptions {
  /** Class prefix for the alert/banner hosts. Defaults to `"instui"`; `""` means unprefixed. */
  prefix?: string;
}

/**
 * Wire a close button to dismiss its target.
 *
 * Target resolution (first match wins):
 * 1. `data-close-target="id"` — dismiss the element with that id
 * 2. `popovertarget` / `commandfor` — skip; native browser handles it
 * 3. walk up to the nearest `<dialog>`, `[popover]`, `[data-dismissible]`, `[open]`, alert, or banner
 *
 * Dismiss strategy:
 * - `<dialog>` → `dialog.close()`
 * - `[popover]` → `el.hidePopover()`
 * - `.instui-alert` or `.instui-banner` (per `options.prefix`) → cancelable `dismiss` event, then fade out and remove
 * - `[data-dismissible]` or `[open]` → remove open attr + fire bubbling `close`
 */
export function initCloseButton(btn: HTMLElement, options: CloseButtonOptions = {}): void {
  const prefix = options.prefix ?? DEFAULT_PREFIX;
  const dismissible = withPrefix(".pfx-alert, .pfx-banner", prefix);
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
      : btn.closest<HTMLElement>(`dialog, [popover], [data-dismissible], [open], ${dismissible}`);

    if (!target) return;

    if (target instanceof HTMLDialogElement) {
      target.close();
    } else if (target.hasAttribute("popover")) {
      (target as HTMLElement & { hidePopover?(): void }).hidePopover?.();
    } else if (target.matches(dismissible)) {
      initRemove(target, { timeout: 0 }).dismiss();
    } else {
      target.removeAttribute("open");
      target.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
  });
}
