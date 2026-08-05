import type { OnCommand } from "../shared/index.js";

/**
 * Wire a CSS `<dialog class="instui-modal">` or a web component's shadow
 * `<dialog>` to the `open` attribute protocol and `--show/--close/--toggle`
 * command routing. Both usages pass the same interface:
 *
 *   CSS:  host === dialog  (the dialog itself carries the id and open attr)
 *   WC:   host = custom element, dialog = its shadow <dialog>
 */
export function initModal(
  host: HTMLElement,
  dialog: HTMLDialogElement,
  onCommand: OnCommand,
): void {
  const sync = () => {
    const wantOpen = host.hasAttribute("open");
    if (wantOpen && !dialog.open) dialog.showModal();
    else if (!wantOpen && dialog.open) dialog.close();
  };

  dialog.addEventListener("close", () => {
    if (host.hasAttribute("open")) host.removeAttribute("open");
    host.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  });

  onCommand(host, (command) => {
    if (command === "--show") host.setAttribute("open", "");
    else if (command === "--close") host.removeAttribute("open");
    else if (command === "--toggle") host.toggleAttribute("open");
  });

  new MutationObserver(sync).observe(host, { attributes: true, attributeFilter: ["open"] });
  sync();
}
