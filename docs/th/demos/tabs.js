document.querySelectorAll("[data-tabs]").forEach((root) => {
  const tabs = root.querySelectorAll(".tab");
  const panel = root.querySelector(".panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.hasAttribute("disabled")) return;
      tabs.forEach((t) => {
        t.classList.remove("-selected");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("-selected");
      tab.setAttribute("aria-selected", "true");
      panel.textContent = `The ${tab.dataset.panel} tab's content shows here.`;
    });
  });
});
