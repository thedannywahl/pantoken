// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initFormField, type FormFieldControl } from "../src/behaviors/form-field.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup() {
  document.body.innerHTML = `<form><label class="instui-form-field">
    <span>Email address</span>
    <input type="email" required value="reader@example.com" aria-describedby="hint">
    <span id="hint">Use your work email.</span>
    <span id="error" hidden>Enter a valid email address.</span>
  </label></form>`;
  const host = document.querySelector<HTMLElement>("label")!;
  const control = document.querySelector("input")!;
  const error = document.getElementById("error")!;
  const form = document.querySelector("form")!;
  const handle = initFormField(host, control, error);
  return { host, control, error, form, handle };
}

test("untouched input stays quiet; blur associates an error without losing hints", () => {
  const { host, control, error } = setup();
  control.value = "";
  control.dispatchEvent(new Event("input", { bubbles: true }));
  expect(control.getAttribute("aria-invalid")).toBe("false");
  expect(control.getAttribute("aria-describedby")).toBe("hint");
  expect(error.hidden).toBe(true);
  control.dispatchEvent(new Event("blur"));
  expect(control.getAttribute("aria-invalid")).toBe("true");
  expect(control.getAttribute("aria-describedby")).toBe("hint error");
  expect(host.classList.contains("-invalid")).toBe(true);
  expect(error.hidden).toBe(false);
});

test("edited fields revalidate and remove only the error reference after correction", () => {
  const { host, control, error, handle } = setup();
  control.value = "not-an-email";
  expect(handle.validate()).toBe(false);
  control.setAttribute("aria-describedby", "hint extra error error");
  control.dispatchEvent(new Event("input", { bubbles: true }));
  expect(control.getAttribute("aria-describedby")).toBe("hint extra error");
  control.value = "valid@example.com";
  control.dispatchEvent(new Event("input", { bubbles: true }));
  expect(control.getAttribute("aria-invalid")).toBe("false");
  expect(control.getAttribute("aria-describedby")).toBe("hint extra");
  expect(host.classList.contains("-invalid")).toBe(false);
  expect(error.hidden).toBe(true);
});

test("native invalid events expose errors without recursion or canceling browser validation", () => {
  const { control, error } = setup();
  control.value = "";
  expect(control.checkValidity()).toBe(false);
  expect(control.getAttribute("aria-invalid")).toBe("true");
  expect(error.hidden).toBe(false);
  const invalid = new Event("invalid", { cancelable: true });
  control.dispatchEvent(invalid);
  expect(invalid.defaultPrevented).toBe(false);
});

test("native custom validity and initially invalid state are honored", () => {
  const { host, control, error, handle } = setup();
  handle.cleanup();
  host.classList.add("-invalid");
  control.setAttribute("aria-invalid", "true");
  control.setCustomValidity("This address is unavailable.");
  error.textContent = "This address is unavailable.";
  const next = initFormField(host, control, error);
  expect(control.getAttribute("aria-describedby")).toBe("hint error");
  expect(error.hidden).toBe(false);
  control.setCustomValidity("");
  expect(next.validate()).toBe(true);
  next.cleanup();
  expect(control.getAttribute("aria-invalid")).toBe("true");
  expect(host.classList.contains("-invalid")).toBe(true);
});

test.each(["disabled", "readonly"])("barred %s controls don't receive errors", (attribute) => {
  const { control, error, handle } = setup();
  control.value = "";
  control.setAttribute(attribute, "");
  expect(handle.validate()).toBe(true);
  expect(error.hidden).toBe(true);
});

test.each(["textarea", "select"])(
  "supports native %s validity without inventing validation",
  (tag) => {
    document.body.innerHTML = `<div class="field">${
      tag === "textarea"
        ? '<textarea required aria-label="Message"></textarea>'
        : '<select required aria-label="Choice"><option value="">Choose</option><option>One</option></select>'
    }<span id="error">Required.</span></div>`;
    const host = document.querySelector<HTMLElement>(".field")!;
    const control = host.querySelector<FormFieldControl>(tag)!;
    const error = document.getElementById("error")!;
    const handle = initFormField(host, control, error);
    expect(handle.validate()).toBe(false);
    expect(control.getAttribute("aria-describedby")).toBe("error");
    control.value = tag === "textarea" ? "Message" : "One";
    expect(handle.validate()).toBe(true);
    expect(control.hasAttribute("aria-describedby")).toBe(false);
  },
);

test("form reset restores pristine state after native values reset", async () => {
  const { control, error, form, handle } = setup();
  control.value = "";
  handle.validate();
  form.reset();
  await Promise.resolve();
  expect(control.value).toBe("reader@example.com");
  expect(control.getAttribute("aria-invalid")).toBe("false");
  expect(error.hidden).toBe(true);
  control.value = "";
  control.dispatchEvent(new Event("input", { bubbles: true }));
  expect(error.hidden).toBe(true);
});

test("canceled resets retain errors and queued resets can't run after cleanup", async () => {
  const { control, error, form, handle } = setup();
  control.value = "";
  handle.validate();
  const cancel = (event: Event) => event.preventDefault();
  form.addEventListener("reset", cancel);
  form.reset();
  await Promise.resolve();
  expect(error.hidden).toBe(false);
  form.removeEventListener("reset", cancel);
  form.reset();
  handle.cleanup();
  await Promise.resolve();
  expect(control.hasAttribute("aria-invalid")).toBe(false);
  expect(control.getAttribute("aria-describedby")).toBe("hint");
  expect(error.hidden).toBe(true);
});

test("cleanup restores initial state, removes listeners, and prevents stale validation", () => {
  const { control, error, handle } = setup();
  handle.cleanup();
  handle.cleanup();
  control.value = "";
  control.dispatchEvent(new Event("blur"));
  control.dispatchEvent(new Event("input"));
  control.dispatchEvent(new Event("invalid"));
  expect(control.hasAttribute("aria-invalid")).toBe(false);
  expect(control.getAttribute("aria-describedby")).toBe("hint");
  expect(error.hidden).toBe(true);
  expect(() => handle.validate()).toThrow("cleaned up");
});

test("rejects foreign, containing, unnamed, whitespace-ID, and empty errors", () => {
  const { host, control, error, handle } = setup();
  handle.cleanup();
  const outside = document.createElement("span");
  outside.id = "outside";
  outside.textContent = "Error";
  expect(() => initFormField(host, control, outside)).toThrow("belong to the host");
  expect(() => initFormField(outside, control, error)).toThrow("belong to the host");
  expect(() => initFormField(host, control, host)).toThrow("separate error");
  error.removeAttribute("id");
  expect(() => initFormField(host, control, error)).toThrow("nonempty ID");
  error.id = "bad id";
  expect(() => initFormField(host, control, error)).toThrow("whitespace");
  error.id = "error";
  error.textContent = " ";
  expect(() => initFormField(host, control, error)).toThrow("message text");
});

test("detached fields without hints or a form support manual validation and restoration", () => {
  const host = document.createElement("div");
  const control = document.createElement("input");
  control.required = true;
  const error = document.createElement("span");
  error.id = 'error-with-"symbols"';
  error.textContent = "Required.";
  host.append(control, error);
  const handle = initFormField(host, control, error);
  expect(handle.validate()).toBe(false);
  expect(control.getAttribute("aria-describedby")).toBe(error.id);
  handle.cleanup();
  expect(control.hasAttribute("aria-describedby")).toBe(false);
  expect(error.hidden).toBe(false);
});
