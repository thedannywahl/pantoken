const zone = document.getElementById("fd");
const input = document.getElementById("fd-input");
const msg = document.getElementById("fd-msg");
input.addEventListener("change", () => {
  const file = input.files && input.files[0];
  zone.classList.remove("-accepted", "-rejected");
  if (!file) return;
  const ok = file.type.startsWith("image/");
  zone.classList.add(ok ? "-accepted" : "-rejected");
  msg.textContent = ok ? `${file.name} — accepted.` : `${file.name} — not an image.`;
});
