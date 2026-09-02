// countUntil: when the count reaches the cap, show `${countUntil - 1}+` (e.g. 99+).
const countUntil = 100;
const count = 250;
const el = document.querySelector("[data-count]");
el.textContent = count >= countUntil ? `${countUntil - 1}+` : String(count);
