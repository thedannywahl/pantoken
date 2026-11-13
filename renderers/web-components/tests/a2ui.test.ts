// @vitest-environment happy-dom
import { ComponentContext, MessageProcessor } from "@a2ui/web_core";
import { afterEach, expect, test, vi } from "vite-plus/test";
import {
  pantokenA2uiCatalog,
  pantokenA2uiComponents,
  registerPantokenA2uiComponents,
} from "../src/a2ui.ts";
import catalogDocument from "../src/generated/a2ui-catalog.json" with { type: "json" };
import { ELEMENTS } from "../src/lib/elements-meta.ts";
import { A2UI_COMPONENTS, a2uiNameForElement } from "../src/a2ui-contracts.ts";

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

function makeSurface(
  componentName: string,
  props: Record<string, unknown>,
): NonNullable<ReturnType<MessageProcessor["model"]["getSurface"]>> {
  const processor = new MessageProcessor([pantokenA2uiCatalog]);
  processor.processMessages([
    {
      version: "1.0",
      createSurface: { surfaceId: "test-surface", catalogId: pantokenA2uiCatalog.id },
    },
    {
      version: "1.0",
      updateComponents: {
        surfaceId: "test-surface",
        components: [{ id: "testComponent", component: componentName, ...props }],
      },
    },
  ]);
  const surface = processor.model.getSurface("test-surface");
  if (!surface) throw new Error("A2UI test surface was not created.");
  return surface;
}

function implementationFor(name: string) {
  const implementation = pantokenA2uiComponents.find((component) => component.name === name);
  if (!implementation) throw new Error(`Missing ${name} A2UI test implementation.`);
  return implementation;
}

test("registers an A2UI implementation for every component in the full catalog", () => {
  expect(pantokenA2uiCatalog.protocolVersion).toBe("1.0");
  expect(pantokenA2uiCatalog.id).toBe("https://pantoken.app/a2ui/catalog/v1/catalog.json");
  expect([...pantokenA2uiCatalog.components.keys()].sort()).toEqual(
    ELEMENTS.map(a2uiNameForElement).sort(),
  );
  expect(pantokenA2uiComponents.map(({ name }) => name).sort()).toEqual(
    Object.keys(catalogDocument.components).sort(),
  );
  expect(pantokenA2uiCatalog.functions.size).toBe(0);
});

test("component schemas constrain variants, icons, media URLs, and undeclared props", () => {
  const button = pantokenA2uiCatalog.components.get("PantokenButton");
  const tooltip = pantokenA2uiCatalog.components.get("PantokenTooltip");
  const icon = pantokenA2uiCatalog.components.get("PantokenIcon");
  const image = pantokenA2uiCatalog.components.get("PantokenImg");
  const link = pantokenA2uiCatalog.components.get("PantokenLink");
  const card = pantokenA2uiCatalog.components.get("PantokenCard");
  const table = pantokenA2uiCatalog.components.get("PantokenTable");
  const select = pantokenA2uiCatalog.components.get("PantokenSimpleSelect");
  expect(button).toBeTruthy();
  expect(tooltip).toBeTruthy();
  expect(icon).toBeTruthy();
  expect(image).toBeTruthy();
  expect(link).toBeTruthy();
  expect(card).toBeTruthy();
  expect(button?.schema.safeParse({ label: "Save", variant: "primary" }).success).toBe(true);
  expect(button?.schema.safeParse({ label: "Save", variant: "arbitrary" }).success).toBe(false);
  expect(button?.schema.safeParse({ label: "Save", href: "javascript:alert(1)" }).success).toBe(
    false,
  );
  expect(button?.schema.safeParse({ label: "Save", html: "<img src=x>" }).success).toBe(false);
  const action = { event: { name: "help" } };
  expect(
    tooltip?.schema.safeParse({ triggerLabel: "Help", tip: "More information", action }).success,
  ).toBe(true);
  expect(
    tooltip?.schema.safeParse({
      triggerLabel: "Help",
      tip: "More information",
      placement: "center",
      action,
    }).success,
  ).toBe(false);
  expect(
    tooltip?.schema.safeParse({
      triggerLabel: "Help",
      tip: "More information",
      href: "javascript:alert(1)",
      action,
    }).success,
  ).toBe(false);
  expect(icon?.schema.safeParse({ name: "arrow-left" }).success).toBe(true);
  expect(icon?.schema.safeParse({ name: "not-an-icon" }).success).toBe(false);
  expect(
    image?.schema.safeParse({ src: "https://example.com/image.png", alt: "Campus" }).success,
  ).toBe(true);
  expect(link?.schema.safeParse({ label: "Docs", href: "https://example.com" }).success).toBe(true);
  expect(link?.schema.safeParse({ label: "Unsafe", href: "javascript:alert(1)" }).success).toBe(
    false,
  );
  expect(link?.schema.safeParse({ label: "External", href: "//evil.example" }).success).toBe(false);
  expect(link?.schema.safeParse({ label: "External", href: "/\\evil.example" }).success).toBe(
    false,
  );
  expect(
    table?.schema.safeParse({
      caption: "People",
      headers: ["Name", "Role"],
      rows: [["Ada", "Admin"]],
    }).success,
  ).toBe(true);
  expect(
    table?.schema.safeParse({
      caption: "People",
      headers: ["Name"],
      rows: ["not a row"],
    }).success,
  ).toBe(false);
  expect(
    select?.schema.safeParse({
      label: "Role",
      options: [{ label: "Admin", value: "admin" }],
    }).success,
  ).toBe(true);
  expect(
    select?.schema.safeParse({
      label: "Role",
      options: [{ label: "Admin", value: "admin", html: true }],
    }).success,
  ).toBe(false);
  expect(A2UI_COMPONENTS.checkbox.valueChange).toEqual({
    event: "value-change",
    property: "checked",
    detailProperty: "value",
  });
  expect(card?.schema.safeParse({ label: "Summary" }).success).toBe(true);
  expect(card?.schema.safeParse({ label: "Summary", html: "<b>raw</b>" }).success).toBe(false);
  expect(pantokenA2uiCatalog.components.has("UnknownComponent")).toBe(false);
});

test("A2UI renders tables and selects with validated native content", async () => {
  registerPantokenA2uiComponents();
  const tableSurface = makeSurface("PantokenTable", {
    caption: "People",
    headers: ["Name", "Role"],
    rows: [["Ada", "Admin"]],
  });
  const tableImplementation = implementationFor("PantokenTable");
  const tableElement = document.createElement(tableImplementation.tagName);
  if (!(tableElement instanceof tableImplementation.element)) {
    throw new Error("Pantoken A2UI table was not registered.");
  }
  document.body.appendChild(tableElement);
  tableElement.context = new ComponentContext(tableSurface, "testComponent");
  await tableElement.updateComplete;

  const table = tableElement.shadowRoot?.querySelector("table");
  expect(table?.querySelector("caption")?.textContent?.trim()).toBe("People");
  expect(table?.querySelectorAll("thead th")).toHaveLength(2);
  expect(Array.from(table?.querySelectorAll("tbody td") ?? [], (cell) => cell.textContent)).toEqual(
    ["Ada", "Admin"],
  );

  const selectSurface = makeSurface("PantokenSimpleSelect", {
    label: "Role",
    value: "admin",
    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" },
    ],
  });
  const selectImplementation = implementationFor("PantokenSimpleSelect");
  const selectElement = document.createElement(selectImplementation.tagName);
  if (!(selectElement instanceof selectImplementation.element)) {
    throw new Error("Pantoken A2UI select was not registered.");
  }
  document.body.appendChild(selectElement);
  selectElement.context = new ComponentContext(selectSurface, "testComponent");
  await selectElement.updateComplete;

  const select = selectElement.shadowRoot?.querySelector("instui-simple-select");
  expect(select?.shadowRoot?.querySelector("select")?.value).toBe("admin");
  expect(select?.shadowRoot?.querySelectorAll("option")).toHaveLength(2);
});

test("registers every Universal implementation and all Pantoken element dependencies on demand", () => {
  registerPantokenA2uiComponents();

  expect(customElements.get("pantoken-a2ui-button")).toBeTruthy();
  expect(customElements.get("pantoken-a2ui-tooltip")).toBeTruthy();
  expect(customElements.get("instui-button")).toBeTruthy();
  for (const component of pantokenA2uiComponents) {
    expect(customElements.get(component.tagName)).toBe(component.element);
  }
  for (const element of ELEMENTS) expect(customElements.get(`instui-${element}`)).toBeTruthy();
});

test("renders button labels as text and dispatches the declared A2UI action", async () => {
  registerPantokenA2uiComponents();
  const unsafeLabel = '<img src=x onerror="alert(1)">';
  const surface = makeSurface("PantokenButton", {
    label: unsafeLabel,
    action: { event: { name: "save" } },
  });
  const element = document.createElement("pantoken-a2ui-button");
  const implementation = implementationFor("PantokenButton");
  expect(element).toBeInstanceOf(implementation.element);
  if (!(element instanceof implementation.element)) {
    throw new Error("Pantoken A2UI button was not registered.");
  }
  document.body.appendChild(element);
  element.context = new ComponentContext(surface, "testComponent");
  await element.updateComplete;

  const customButton = element.shadowRoot?.querySelector("instui-button");
  expect(customButton?.textContent).toBe(unsafeLabel);
  expect(customButton?.querySelector("img")).toBeNull();
  expect(
    customButton?.shadowRoot?.querySelector("button")?.classList.contains("-color-primary"),
  ).toBe(true);

  const actionNames: string[] = [];
  const subscription = surface.onAction.subscribe((action) => {
    actionNames.push(action.name);
  });
  customButton?.shadowRoot?.querySelector("button")?.click();
  await new Promise((resolve) => setTimeout(resolve, 0));
  subscription.unsubscribe();
  expect(actionNames).toEqual(["save"]);
});

test("keeps tooltip trigger and description in one shadow tree and wires Escape behavior", async () => {
  registerPantokenA2uiComponents();
  const unsafeTip = '<img src=x onerror="alert(1)">';
  const surface = makeSurface("PantokenTooltip", {
    triggerLabel: "Help",
    tip: unsafeTip,
    action: { event: { name: "help" } },
  });
  const element = document.createElement("pantoken-a2ui-tooltip");
  const implementation = implementationFor("PantokenTooltip");
  expect(element).toBeInstanceOf(implementation.element);
  if (!(element instanceof implementation.element)) {
    throw new Error("Pantoken A2UI tooltip was not registered.");
  }
  document.body.appendChild(element);
  element.context = new ComponentContext(surface, "testComponent");
  await element.updateComplete;

  const trigger = element.shadowRoot?.querySelector("button");
  const tip = element.shadowRoot?.querySelector<HTMLElement>('[role="tooltip"]');
  expect(trigger?.getAttribute("aria-describedby")).toBe(tip?.id);
  expect(tip?.classList.contains("-placement-top")).toBe(true);
  expect(tip?.textContent).toBe(unsafeTip);
  expect(tip?.querySelector("img")).toBeNull();

  trigger?.focus();
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(tip?.classList.contains("-show")).toBe(true);
  trigger?.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", bubbles: true, composed: true }),
  );
  expect(tip?.classList.contains("-show")).toBe(false);
});

test("uses A2UI tooltip show and hide delay properties", async () => {
  vi.useFakeTimers();
  registerPantokenA2uiComponents();
  const surface = makeSurface("PantokenTooltip", {
    triggerLabel: "Help",
    tip: "More information",
    showDelay: 100,
    hideDelay: 50,
  });
  const element = document.createElement("pantoken-a2ui-tooltip");
  document.body.appendChild(element);
  const implementation = implementationFor("PantokenTooltip");
  if (!(element instanceof implementation.element)) {
    throw new Error("Pantoken A2UI tooltip was not registered.");
  }
  element.context = new ComponentContext(surface, "testComponent");
  await element.updateComplete;

  const wrapper = element.shadowRoot?.querySelector<HTMLElement>(".instui-tooltip");
  const tip = wrapper?.querySelector<HTMLElement>('[role="tooltip"]');
  wrapper?.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(99);
  expect(tip?.classList.contains("-show")).toBe(false);
  vi.advanceTimersByTime(1);
  expect(tip?.classList.contains("-show")).toBe(true);

  wrapper?.dispatchEvent(new Event("pointerleave"));
  vi.advanceTimersByTime(49);
  expect(tip?.classList.contains("-show")).toBe(true);
  vi.advanceTimersByTime(1);
  expect(tip?.classList.contains("-show")).toBe(false);
});

test("sanitizes an unsafe media URL before it reaches the Pantoken image renderer", async () => {
  registerPantokenA2uiComponents();
  const surface = makeSurface("PantokenImg", {
    src: "javascript:alert(1)",
    alt: "Campus",
  });
  const element = document.createElement("pantoken-a2ui-img");
  const implementation = pantokenA2uiComponents.find(({ name }) => name === "PantokenImg");
  if (!implementation || !(element instanceof implementation.element)) {
    throw new Error("Pantoken A2UI image was not registered.");
  }
  document.body.appendChild(element);
  element.context = new ComponentContext(surface, "testComponent");
  await element.updateComplete;

  const image = element.shadowRoot?.querySelector("instui-img")?.shadowRoot?.querySelector("img");
  expect(image?.getAttribute("src")).not.toContain("javascript:");
});
