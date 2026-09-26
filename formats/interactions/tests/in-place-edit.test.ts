// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initInPlaceEdit } from "../src/behaviors/in-place-edit.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup(readonly = false, options?: Parameters<typeof initInPlaceEdit>[2]) {
  document.body.innerHTML = `<span id="host" contenteditable="${readonly ? "false" : "true"}">Initial</span>`;
  const field = document.getElementById("host") as HTMLElement;
  const host = field;
  if (!readonly) initInPlaceEdit(field, host, options);
  return { field, host };
}

test("Enter commits and updates the value attribute", () => {
  const { field, host } = setup();
  field.focus();
  field.textContent = "Updated";
  field.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  expect(host.getAttribute("value")).toBe("Updated");
});

test("Escape reverts to the pre-focus value", () => {
  const { field } = setup();
  field.focus();
  field.textContent = "Changed";
  field.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  expect(field.textContent).toBe("Initial");
});

test("blur commits when value changed", () => {
  const { field, host } = setup();
  field.focus();
  field.textContent = "New value";
  field.dispatchEvent(new Event("blur", { bubbles: true }));
  expect(host.getAttribute("value")).toBe("New value");
});

test("blur does not fire change when value unchanged", () => {
  const { field } = setup();
  const received: string[] = [];
  document.body.addEventListener("change", () => received.push("change"));
  field.focus();
  field.dispatchEvent(new Event("blur", { bubbles: true }));
  expect(received).toHaveLength(0);
});

test("change event bubbles with detail.value", () => {
  const { field } = setup();
  let detail: unknown;
  document.body.addEventListener("change", (e) => {
    detail = (e as CustomEvent).detail;
  });
  field.focus();
  field.textContent = "Hello";
  field.dispatchEvent(new Event("blur", { bubbles: true }));
  expect((detail as { value: string }).value).toBe("Hello");
});

test.each([
  ["text", "text"],
  ["number", "decimal"],
  ["email", "email"],
  ["url", "url"],
  ["tel", "tel"],
  ["search", "search"],
] as const)("%s input type applies the %s editing hint", (inputType, inputMode) => {
  const { field } = setup(false, { inputType });

  expect(field.inputMode).toBe(inputMode);
});

test("input type hints do not validate committed values", () => {
  const { field } = setup(false, { inputType: "number" });

  field.focus();
  field.textContent = "not a number";
  field.dispatchEvent(new Event("blur", { bubbles: true }));
  expect(field.getAttribute("value")).toBe("not a number");
});
