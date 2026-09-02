const list = document.querySelector(".alert-list");
const restore = document.querySelector('[data-role="restore"]');
const initial = list.innerHTML;

// Dismiss an alert. With the default fade transition it fades out first,
// backed by a timeout in case transitionend is missed; otherwise it's removed immediately.
function wireCloses(root) {
  root.querySelectorAll(".instui-close-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const alert = btn.closest(".instui-alert");
      restore.disabled = false;
      if (alert.classList.contains("instui-transition")) {
        alert.classList.remove("-fade-entered");
        alert.classList.add("-fade-exiting");
        const drop = () => alert.remove();
        alert.addEventListener("transitionend", drop, { once: true });
        setTimeout(drop, 500);
      } else {
        alert.remove();
      }
    });
  });
}
wireCloses(list);

// Re-render the alerts; fade the transition-enabled ones back in.
restore.addEventListener("click", () => {
  list.innerHTML = initial;
  list.querySelectorAll(".instui-alert.instui-transition").forEach((a) => {
    a.classList.add("-fade-exited");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        a.classList.remove("-fade-exited");
        a.classList.add("-fade-entered");
      }),
    );
  });
  wireCloses(list);
  restore.disabled = true;
});
