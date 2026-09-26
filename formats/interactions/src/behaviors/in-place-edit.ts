/** Text-like input types that can be meaningfully hinted on a contenteditable field. */
export type InPlaceEditInputType = "text" | "number" | "email" | "url" | "tel" | "search";

/** Optional editing hints for an in-place edit field. */
export interface InPlaceEditOptions {
  /** Selects a text-like editing hint for the input surface; it does not validate. */
  inputType?: InPlaceEditInputType;
}

const INPUT_MODES: Record<InPlaceEditInputType, HTMLElement["inputMode"]> = {
  text: "text",
  number: "decimal",
  email: "email",
  url: "url",
  tel: "tel",
  search: "search",
};

/**
 * Wire a contenteditable field for click-to-edit commit/revert behaviour.
 * Enter commits, Escape reverts; blur also commits if the value changed.
 * Fires a bubbling `change` CustomEvent with `detail.value` on commit.
 * The optional input type configures the editing hint only; consumers validate committed values.
 *
 *   CSS:  host = .instui-in-place-edit element (which IS contenteditable)
 *   WC:   host = shadow .instui-in-place-edit span
 */
export function initInPlaceEdit(
  host: HTMLElement,
  dispatchOn: HTMLElement,
  options: InPlaceEditOptions = {},
): void {
  let original = "";

  if (options.inputType) host.inputMode = INPUT_MODES[options.inputType];

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
