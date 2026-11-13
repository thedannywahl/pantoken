// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";
import { COMPONENTS } from "../../../formats/components/src/components/index.ts";
import { ELEMENTS } from "../src/lib/elements-meta.ts";

register();

afterEach(() => {
  document.body.innerHTML = "";
});

test("every root CSS component has a web-component export", () => {
  const exported = new Set<string>(ELEMENTS);
  const missing = COMPONENTS.map(({ name }) => name).filter(
    (name) => !name.includes(".") && !exported.has(name),
  );
  expect(missing).toEqual([]);
});

test("link rejects executable and network-path URLs and protects blank-target navigation", () => {
  for (const href of ["javascript:alert(1)", "//evil.example", "/\\evil.example"]) {
    const unsafe = document.createElement("instui-link");
    unsafe.setAttribute("href", href);
    unsafe.textContent = "Unsafe";
    document.body.append(unsafe);
    expect(unsafe.shadowRoot?.querySelector("a")?.hasAttribute("href")).toBe(false);
  }

  const safe = document.createElement("instui-link");
  safe.setAttribute("href", "https://example.com");
  safe.setAttribute("target", "_blank");
  safe.textContent = "Docs";
  document.body.append(safe);
  expect(safe.shadowRoot?.querySelector("a")?.getAttribute("href")).toBe("https://example.com");
  expect(safe.shadowRoot?.querySelector("a")?.getAttribute("rel")).toBe("noopener noreferrer");
});

test("text input reports value changes and preserves the native control on model updates", () => {
  const field = document.createElement("instui-text-input");
  field.textContent = "Name";
  document.body.append(field);
  const input = field.shadowRoot?.querySelector("input");
  if (!input) throw new Error("The native text input was not rendered.");

  let value: unknown;
  field.addEventListener("value-change", (event) => {
    value = (event as CustomEvent<{ value: unknown }>).detail.value;
  });
  input.value = "Ada";
  input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  expect(value).toBe("Ada");

  field.setAttribute("value", "Ada");
  expect(field.shadowRoot?.querySelector("input")).toBe(input);
  expect(input.value).toBe("Ada");
});

test("checkbox reports its checked state as a boolean", () => {
  const checkbox = document.createElement("instui-checkbox");
  checkbox.textContent = "Agree";
  document.body.append(checkbox);
  const input = checkbox.shadowRoot?.querySelector<HTMLInputElement>("input");
  if (!input) throw new Error("The native checkbox was not rendered.");

  let value: unknown;
  checkbox.addEventListener("value-change", (event) => {
    value = (event as CustomEvent<{ value: unknown }>).detail.value;
  });
  input.click();
  expect(value).toBe(true);
});

test("group and navigation elements expose configurable accessible names", () => {
  const group = document.createElement("instui-form-field-group");
  group.setAttribute("label", "Contact details");
  const breadcrumb = document.createElement("instui-breadcrumb");
  breadcrumb.setAttribute("aria-label", "Order progress");
  const pagination = document.createElement("instui-pagination");
  pagination.setAttribute("aria-label", "Search results pages");
  document.body.append(group, breadcrumb, pagination);

  expect(group.shadowRoot?.querySelector("legend")?.textContent).toBe("Contact details");
  expect(breadcrumb.shadowRoot?.querySelector("nav")?.getAttribute("aria-label")).toBe(
    "Order progress",
  );
  expect(pagination.shadowRoot?.querySelector("nav")?.getAttribute("aria-label")).toBe(
    "Search results pages",
  );
});

test("table slots stay in a table role and select options render as native options", async () => {
  const table = document.createElement("instui-table");
  const row = document.createElement("div");
  row.setAttribute("role", "row");
  table.append(row);
  document.body.append(table);

  const tableSlot = table.shadowRoot?.querySelector<HTMLSlotElement>('[role="table"] slot');
  expect(tableSlot?.assignedNodes()).toContain(row);

  const select = document.createElement("instui-simple-select");
  select.setAttribute("value", "two");
  select.textContent = "Choose an option";
  document.body.append(select);
  const first = document.createElement("option");
  first.slot = "options";
  first.value = "one";
  first.textContent = "One";
  const second = document.createElement("option");
  second.slot = "options";
  second.value = "two";
  second.textContent = "Two";
  select.append(first, second);
  await Promise.resolve();

  const nativeSelect = select.shadowRoot?.querySelector("select");
  expect(nativeSelect?.options.length).toBe(2);
  expect(nativeSelect?.value).toBe("two");
});

test("numeric controls report finite values as numbers", () => {
  const numberInput = document.createElement("instui-number-input");
  numberInput.textContent = "Quantity";
  document.body.append(numberInput);
  const input = numberInput.shadowRoot?.querySelector<HTMLInputElement>("input");
  if (!input) throw new Error("The native number input was not rendered.");

  let value: unknown;
  numberInput.addEventListener("value-change", (event) => {
    value = (event as CustomEvent<{ value: unknown }>).detail.value;
  });
  input.value = "4.5";
  input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  expect(value).toBe(4.5);
  expect(typeof value).toBe("number");
});
