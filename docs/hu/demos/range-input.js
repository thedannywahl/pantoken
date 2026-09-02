for (const [id, out] of [
  ["r1", "r1v"],
  ["r2", "r2v"],
]) {
  const range = document.getElementById(id);
  const value = document.getElementById(out);
  range.addEventListener("input", () => {
    value.textContent = range.value;
  });
}
