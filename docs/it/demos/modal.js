// Progressive enhancement: invoker commands (command="show-modal"/"close") are Baseline 2025. On
// older browsers, wire the same buttons to the <dialog> API so the demo still works.
if (!("command" in HTMLButtonElement.prototype)) {
  document.querySelectorAll("[command][commandfor]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = document.getElementById(btn.getAttribute("commandfor"));
      if (btn.getAttribute("command") === "show-modal") dialog.showModal();
      else dialog.close();
    });
  });
}
