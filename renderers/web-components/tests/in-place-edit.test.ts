// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

// Mount via a template fragment so slotted text content is present when connectedCallback reads it.
function ipe(attrs = "", inner = ""): { el: HTMLElement; field: HTMLElement } {
  const tpl = document.createElement("template");
  tpl.innerHTML = `<instui-in-place-edit ${attrs}>${inner}</instui-in-place-edit>`;
  document.body.appendChild(tpl.content);
  const el = document.querySelector("instui-in-place-edit") as HTMLElement;
  const field = el.shadowRoot?.querySelector<HTMLElement>(".instui-in-place-edit") as HTMLElement;
  return { el, field };
}

test("renders an editable textbox seeded from the value attribute", () => {
  const { field } = ipe(`value="Course title"`);
  expect(field.getAttribute("role")).toBe("textbox");
  expect(field.getAttribute("contenteditable")).toBe("true");
  expect(field.textContent).toBe("Course title");
});

test("falls back to text content when no value attribute is set", () => {
  const { field } = ipe("", "From slot");
  expect(field.textContent).toBe("From slot");
});

test("readonly renders a non-editable field with the -readonly modifier", () => {
  const { field } = ipe(`value="x" readonly`);
  expect(field.getAttribute("contenteditable")).toBe("false");
  expect(field.className).toContain("-readonly");
});

test("committing on blur writes the value attribute and fires a `change` with the new value", () => {
  const { el, field } = ipe(`value="Old"`);
  let detail: { value: string } | undefined;
  el.addEventListener("change", (e) => (detail = (e as CustomEvent).detail));
  field.focus();
  field.textContent = "New";
  field.blur();
  expect(el.getAttribute("value")).toBe("New");
  expect(detail?.value).toBe("New");
});

test("committing an unchanged value writes it back but fires no `change`", () => {
  const { el, field } = ipe(`value="Same"`);
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  field.focus();
  field.blur();
  expect(el.getAttribute("value")).toBe("Same");
  expect(fired).toBe(false);
});

test("Enter commits by blurring the field", () => {
  const { el, field } = ipe(`value="A"`);
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  field.focus();
  field.textContent = "B";
  const ev = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
  field.dispatchEvent(ev);
  expect(ev.defaultPrevented).toBe(true);
  expect(fired).toBe(true);
  expect(el.getAttribute("value")).toBe("B");
});

test("Escape reverts to the pre-edit value and does not fire `change`", () => {
  const { el, field } = ipe(`value="Original"`);
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  field.focus();
  field.textContent = "Typed junk";
  field.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  expect(field.textContent).toBe("Original");
  expect(fired).toBe(false);
});

test("an external value change reflects into the field while it is not being edited", () => {
  const { el, field } = ipe(`value="First"`);
  el.setAttribute("value", "Second");
  expect(field.textContent).toBe("Second");
});

test("a readonly field wires no editing listeners (blur does not commit)", () => {
  const { el, field } = ipe(`value="Locked" readonly`);
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  field.dispatchEvent(new Event("blur"));
  expect(fired).toBe(false);
});
