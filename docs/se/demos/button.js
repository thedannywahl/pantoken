const star = document.getElementById("star");
const starLabel = document.getElementById("star-label");
let starred = false;
star.addEventListener("click", () => {
  starred = !starred;
  starLabel.textContent = starred ? "Starred" : "Star";
  star.setAttribute("aria-pressed", String(starred));
});

const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  toggle.setAttribute(
    "aria-pressed",
    toggle.getAttribute("aria-pressed") === "true" ? "false" : "true",
  );
});
