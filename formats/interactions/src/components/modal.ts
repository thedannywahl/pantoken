import { makeOnCommand } from "../shared/index.js";
import { initModal } from "../behaviors/modal.js";

function initModalComponents(): void {
  const invokerSupported = "command" in (HTMLButtonElement.prototype as object);
  const onCommand = makeOnCommand(invokerSupported);
  for (const dialog of document.querySelectorAll<HTMLDialogElement>("dialog.instui-modal")) {
    initModal(dialog, dialog, onCommand);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalComponents);
} else {
  initModalComponents();
}
