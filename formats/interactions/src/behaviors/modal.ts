import type { OnCommand } from "../shared/index.js";

/**
 * Wire a CSS `<dialog class="instui-modal">` or a web component's shadow
 * `<dialog>` to the `open` attribute protocol and `--show/--close/--toggle`
 * command routing. Both usages pass the same interface:
 *
 * - CSS: `host === dialog` (the dialog itself carries the id and open attr)
 * - WC: `host` = custom element, `dialog` = its shadow `<dialog>`
 */
export function initModal(
  host: HTMLElement,
  dialog: HTMLDialogElement,
  onCommand: OnCommand,
): void {
  const setOpen = (wantOpen: boolean): void => {
    const modal = dialog.matches(":modal");
    if (wantOpen && !modal) {
      // An authored open attribute creates a nonmodal dialog; promote it through showModal().
      if (dialog.open) dialog.removeAttribute("open");
      dialog.showModal();
    } else if (!wantOpen && (dialog.open || modal)) {
      // Removing open doesn't leave the top layer. Restore it so native close can finish.
      if (!dialog.open) dialog.setAttribute("open", "");
      dialog.close();
    } else if (wantOpen && !dialog.open) {
      dialog.setAttribute("open", "");
    }
    if (host !== dialog) host.toggleAttribute("open", dialog.open);
  };
  const sync = (): void => setOpen(host.hasAttribute("open"));

  dialog.addEventListener("close", () => {
    // A native close event may arrive after the dialog has already reopened.
    if (!dialog.open && host.hasAttribute("open")) host.removeAttribute("open");
    // Only re-dispatch when host ≠ dialog (web component); for CSS use host IS dialog.
    if (host !== dialog) host.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  });

  onCommand(host, (command) => {
    if (command === "--show") setOpen(true);
    else if (command === "--close") setOpen(false);
    else if (command === "--toggle") setOpen(!host.hasAttribute("open"));
  });

  new MutationObserver(sync).observe(host, { attributes: true, attributeFilter: ["open"] });
  sync();
}
