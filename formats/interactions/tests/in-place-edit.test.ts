// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initInPlaceEdit } from "../src/behaviors/in-place-edit.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup(readonly = false) {
  document.body.innerHTML = `<span id="host" contenteditable="${readonly ? "false" : "true"}">Initial</span>`;
  const field = document.getElementById("host") as HTMLElement;
  const host = field;
  if (!readonly) initInPlaceEdit(field, host);
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
