/**
 * Wire a contenteditable field for click-to-edit commit/revert behaviour.
 * Enter commits, Escape reverts; blur also commits if the value changed.
 * Fires a bubbling `change` CustomEvent with `detail.value` on commit.
 *
 *   CSS:  host = .instui-in-place-edit element (which IS contenteditable)
 *   WC:   host = shadow .instui-in-place-edit span
 */
export function initInPlaceEdit(host: HTMLElement, dispatchOn: HTMLElement): void {
  let original = "";

  host.addEventListener("focus", () => {
    original = host.textContent ?? "";
  });

  host.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      host.blur();
    } else if (e.key === "Escape") {
      host.textContent = original;
      host.blur();
    }
  });

  host.addEventListener("blur", () => {
    const next = host.textContent ?? "";
    dispatchOn.setAttribute("value", next);
    if (next !== original) {
      dispatchOn.dispatchEvent(
        new CustomEvent("change", { detail: { value: next }, bubbles: true }),
      );
    }
  });
}
