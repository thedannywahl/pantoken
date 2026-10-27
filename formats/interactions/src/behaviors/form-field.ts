/** Native controls supported by {@link initFormField}. */
export type FormFieldControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Native validation controls and listener cleanup. */
export interface FormFieldHandle {
  /** Show the current native validation result without moving focus or changing the value. */
  validate(): boolean;
  /** Remove listeners and restore the initial accessibility and error-visibility state. */
  cleanup(): void;
}

/**
 * Associate an authored error after blur, native invalid events, or explicit validation.
 * Untouched fields stay quiet; edited fields revalidate after the first validation attempt.
 * Preserves hint references and uses native constraints, including `setCustomValidity()`.
 * The host must contain the control and a separate, named error element with message text.
 * Clean up and reinitialize after moving controls between forms or changing error IDs.
 */
export function initFormField(
  host: HTMLElement,
  control: FormFieldControl,
  error: HTMLElement,
): FormFieldHandle {
  if (!host.contains(control) || !host.contains(error) || error.contains(control))
    throw new Error("Form field control and separate error must belong to the host");
  if (!error.id || /\s/u.test(error.id))
    throw new Error("Form field error requires a nonempty ID without whitespace");
  if (!error.textContent?.trim()) throw new Error("Form field error requires message text");

  const errorId = error.id;
  const originalInvalid = control.getAttribute("aria-invalid");
  const originalDescription = control.getAttribute("aria-describedby");
  const originalHidden = error.hidden;
  const originalClass = host.classList.contains("-invalid");
  const form = control.form;
  let touched = originalClass || originalInvalid === "true";
  let active = true;

  const render = (invalid: boolean): void => {
    control.setAttribute("aria-invalid", String(invalid));
    const descriptions = (control.getAttribute("aria-describedby") ?? "")
      .split(/\s+/u)
      .filter((id) => id && id !== errorId);
    if (invalid) descriptions.push(errorId);
    if (descriptions.length)
      control.setAttribute("aria-describedby", [...new Set(descriptions)].join(" "));
    else control.removeAttribute("aria-describedby");
    host.classList.toggle("-invalid", invalid);
    error.hidden = !invalid;
  };
  const validate = (): boolean => {
    if (!active) throw new Error("Form field behavior has been cleaned up");
    touched = true;
    const invalid = control.willValidate && !control.validity.valid;
    render(invalid);
    return !invalid;
  };
  const onValidate = (): void => {
    validate();
  };
  const onInput = (): void => {
    if (touched) validate();
  };
  const onReset = (event: Event): void => {
    queueMicrotask(() => {
      if (!active || event.defaultPrevented) return;
      touched = false;
      render(false);
    });
  };

  render(touched && control.willValidate && !control.validity.valid);
  control.addEventListener("blur", onValidate);
  control.addEventListener("invalid", onValidate);
  control.addEventListener("input", onInput);
  form?.addEventListener("reset", onReset);
  return {
    validate,
    cleanup(): void {
      if (!active) return;
      active = false;
      control.removeEventListener("blur", onValidate);
      control.removeEventListener("invalid", onValidate);
      control.removeEventListener("input", onInput);
      form?.removeEventListener("reset", onReset);
      for (const [name, value] of [
        ["aria-invalid", originalInvalid],
        ["aria-describedby", originalDescription],
      ] as const) {
        if (value === null) control.removeAttribute(name);
        else control.setAttribute(name, value);
      }
      host.classList.toggle("-invalid", originalClass);
      error.hidden = originalHidden;
    },
  };
}
