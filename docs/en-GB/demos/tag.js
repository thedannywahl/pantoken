const list = document.querySelector(".tag-list");
const restore = document.querySelector('[data-role="restore"]');
const initial = list.innerHTML;

// The -inline tag is dismissible: clicking its close glyph removes it.
function wireDismiss(root) {
  root.querySelectorAll(".-inline[data-dismiss]").forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.remove();
      restore.disabled = false;
    });
  });
}
wireDismiss(list);

// Put every dismissed tag back.
restore.addEventListener("click", () => {
  list.innerHTML = initial;
  wireDismiss(list);
  restore.disabled = true;
});
