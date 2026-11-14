// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
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

test.each([" https://example.com", "/has space", "/bad\\path", "https://[", "mailto:"])(
  "link leaves malformed navigation target %j inert",
  (href) => {
    const link = document.createElement("instui-link");
    link.setAttribute("href", href);
    link.setAttribute("target", "untrusted-frame");
    document.body.append(link);
    const anchor = link.shadowRoot!.querySelector("a")!;
    expect(anchor.hasAttribute("href")).toBe(false);
    expect(anchor.hasAttribute("target")).toBe(false);
  },
);

test.each(["/guide", "#section", "https://example.com", "mailto:help@example.com", "tel:+123"])(
  "link retains supported navigation target %j",
  (href) => {
    const link = document.createElement("instui-link");
    link.setAttribute("href", href);
    document.body.append(link);
    expect(link.shadowRoot!.querySelector("a")!.getAttribute("href")).toBe(href);
  },
);

test.each([
  ["1", "h1"],
  ["6", "h6"],
  ["0", "h2"],
  ["7", "h2"],
  ["2.5", "h2"],
  ["h1 onclick=alert(1)", "h2"],
])("heading level %j produces a bounded native %s", (level, tag) => {
  const heading = document.createElement("instui-heading");
  heading.setAttribute("level", level);
  document.body.append(heading);
  expect(heading.shadowRoot!.querySelector(tag)).not.toBeNull();
  expect(heading.shadowRoot!.querySelector("[onclick]")).toBeNull();
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

test("native control constraints update without replacing the user's focused control", () => {
  const field = document.createElement("instui-number-input");
  document.body.append(field);
  const input = field.shadowRoot!.querySelector("input")!;
  input.focus();
  for (const [name, value] of [
    ["min", "1"],
    ["max", "10"],
    ["step", "0.5"],
  ] as const) {
    field.setAttribute(name, value);
    expect(input.getAttribute(name)).toBe(value);
    field.removeAttribute(name);
    expect(input.hasAttribute(name)).toBe(false);
  }
  for (const name of ["disabled", "required"] as const) {
    field.setAttribute(name, "");
    expect(input[name]).toBe(true);
    field.removeAttribute(name);
    expect(input[name]).toBe(false);
  }
  field.setAttribute("value", "3");
  expect(input.value).toBe("3");
  field.removeAttribute("value");
  expect(input.value).toBe("");
  expect(field.shadowRoot!.querySelector("input")).toBe(input);
});

test("checkbox and multiline model updates preserve native state and readonly behavior", () => {
  const checkbox = document.createElement("instui-checkbox");
  const field = document.createElement("instui-text-area");
  document.body.append(checkbox, field);
  const input = checkbox.shadowRoot!.querySelector("input")!;
  const textarea = field.shadowRoot!.querySelector("textarea")!;
  checkbox.setAttribute("checked", "");
  expect(input.checked).toBe(true);
  checkbox.removeAttribute("checked");
  expect(input.checked).toBe(false);
  field.setAttribute("readonly", "");
  expect(textarea.readOnly).toBe(true);
  field.removeAttribute("readonly");
  expect(textarea.readOnly).toBe(false);
  field.setAttribute("value", "Updated text");
  expect(textarea.value).toBe("Updated text");
  expect(field.shadowRoot!.querySelector("textarea")).toBe(textarea);
});

test("value events deduplicate native input/change pairs and ignore invalid numeric input", () => {
  const field = document.createElement("instui-number-input");
  document.body.append(field);
  const input = field.shadowRoot!.querySelector("input")!;
  const onChange = vi.fn();
  field.addEventListener("value-change", onChange);
  input.value = "";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  expect(onChange).not.toHaveBeenCalled();
  input.value = "2";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.calls[0]![0].detail.value).toBe(2);
  field.shadowRoot!.dispatchEvent(new Event("input", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(1);
  field.remove();
  input.value = "4";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("a model update allows the user to enter a previously emitted value again", () => {
  const field = document.createElement("instui-text-input");
  document.body.append(field);
  const input = field.shadowRoot!.querySelector("input")!;
  const onChange = vi.fn();
  field.addEventListener("value-change", onChange);
  input.value = "First";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  field.setAttribute("value", "First");
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(1);
  field.setAttribute("value", "Server update");
  input.value = "First";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange.mock.calls[1]![0].detail.value).toBe("First");
});

test("checkbox model updates reset deduplication only when the checked state changes", () => {
  const field = document.createElement("instui-checkbox");
  document.body.append(field);
  const input = field.shadowRoot!.querySelector("input")!;
  const onChange = vi.fn();
  field.addEventListener("value-change", onChange);
  input.checked = false;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  field.setAttribute("checked", "");
  input.checked = false;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(2);
  field.removeAttribute("checked");
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(onChange).toHaveBeenCalledTimes(2);
});

test("disclosures forward state events once and stop forwarding after disconnection", () => {
  const host = document.createElement("instui-toggle-details");
  host.setAttribute("summary", "More <information>");
  document.body.append(host);
  const details = host.shadowRoot!.querySelector("details")!;
  expect(details.querySelector("summary")!.textContent).toBe("More <information>");
  const toggle = vi.fn();
  host.addEventListener("toggle", toggle);
  details.open = true;
  expect(toggle).toHaveBeenCalledTimes(1);
  expect(toggle.mock.calls[0]![0].detail).toEqual({ newState: "open" });
  details.open = false;
  expect(toggle.mock.calls[1]![0].detail).toEqual({ newState: "closed" });
  host.remove();
  details.dispatchEvent(new Event("toggle"));
  expect(toggle).toHaveBeenCalledTimes(2);
});

test("select copies text-only options and reacts to option text changes", async () => {
  const select = document.createElement("instui-simple-select");
  const option = document.createElement("option");
  option.slot = "options";
  option.setAttribute("selected", "");
  option.disabled = true;
  option.textContent = "<img src=x>";
  select.append(option);
  document.body.append(select);
  const nativeOption = select.shadowRoot!.querySelector("option")!;
  expect(nativeOption.value).toBe("<img src=x>");
  expect(nativeOption.textContent).toBe("<img src=x>");
  expect(nativeOption.querySelector("img")).toBeNull();
  expect(nativeOption.disabled).toBe(true);
  expect(nativeOption.selected).toBe(true);
  option.textContent = "Updated";
  await Promise.resolve();
  expect(select.shadowRoot!.querySelector("option")!.textContent).toBe("Updated");
  const disconnectedSelect = select.shadowRoot!.querySelector("select");
  select.remove();
  option.textContent = "Detached update";
  await Promise.resolve();
  expect(select.shadowRoot!.querySelector("select")).toBe(disconnectedSelect);
  expect(select.shadowRoot!.querySelector("option")!.textContent).toBe("Updated");
});
