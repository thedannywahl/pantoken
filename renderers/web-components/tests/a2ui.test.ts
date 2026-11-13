// @vitest-environment happy-dom
import { ComponentContext, MessageProcessor } from "@a2ui/web_core";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { html, render } from "lit";
import {
  pantokenA2uiCatalog,
  pantokenA2uiComponents,
  registerPantokenA2uiComponents,
} from "../src/a2ui.ts";
import catalogDocument from "../src/generated/a2ui-catalog.json" with { type: "json" };
import { ELEMENTS } from "../src/lib/elements-meta.ts";
import { A2UI_COMPONENTS, a2uiNameForElement, a2uiPropertiesFor } from "../src/a2ui-contracts.ts";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.body.innerHTML = "";
});

function makeSurface(
  componentName: string,
  props: Record<string, unknown>,
  dataModel: Record<string, unknown> = {},
  children: Array<Record<string, unknown>> = [],
): NonNullable<ReturnType<MessageProcessor["model"]["getSurface"]>> {
  const processor = new MessageProcessor([pantokenA2uiCatalog]);
  processor.processMessages([
    {
      version: "1.0",
      createSurface: { surfaceId: "test-surface", catalogId: pantokenA2uiCatalog.id, dataModel },
    },
    {
      version: "1.0",
      updateComponents: {
        surfaceId: "test-surface",
        components: [{ id: "testComponent", component: componentName, ...props }, ...children],
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

async function mountAdapter(
  name: string,
  props: Record<string, unknown>,
  data: Record<string, unknown> = {},
  children: Array<Record<string, unknown>> = [],
) {
  registerPantokenA2uiComponents();
  const implementation = implementationFor(name);
  const element = new implementation.element();
  const surface = makeSurface(name, props, data, children);
  element.context = new ComponentContext(surface, "testComponent");
  document.body.append(element);
  await element.updateComplete;
  return { element, surface, root: element.shadowRoot! };
}

test("generated property schemas preserve bounds, child references, and action capabilities", () => {
  for (const element of ELEMENTS) {
    const contract = A2UI_COMPONENTS[element];
    const generated =
      catalogDocument.components[
        a2uiNameForElement(element) as keyof typeof catalogDocument.components
      ];
    expect(generated.properties).toEqual({
      component: { const: a2uiNameForElement(element) },
      ...a2uiPropertiesFor(contract),
    });
  }
  expect(a2uiPropertiesFor({ description: "Empty contract" })).toEqual({});
  const schema = pantokenA2uiCatalog.components.get("PantokenNumberInput")!.schema;
  expect(schema.safeParse({ label: "Amount", value: "not a number" }).success).toBe(false);
  expect(schema.safeParse({ label: "Amount", value: { "@path": "/amount" } }).success).toBe(true);
});

test.each([
  ["PantokenRating", { value: -10, max: 100 }, { value: "0", max: "10" }],
  [
    "PantokenProgress",
    { valueNow: 2_000_000, shouldAnimate: true },
    { "value-now": "1000000", "should-animate": "" },
  ],
  [
    "PantokenAlert",
    { message: "Notice", hasShadow: true },
    { "has-shadow": "true", variant: "info" },
  ],
  ["PantokenToggleButton", { label: "Pin", pressed: false }, { pressed: "false" }],
  [
    "PantokenTextInput",
    { label: "Name", required: true, disabled: false },
    { required: "", type: "text" },
  ],
])("coerces and bounds %s attributes without losing defaults", async (name, props, attributes) => {
  const { root } = await mountAdapter(name, props);
  const host = root.firstElementChild!;
  for (const [attribute, value] of Object.entries(attributes)) {
    expect(host.getAttribute(attribute)).toBe(value);
  }
  expect(host.hasAttribute("disabled")).toBe(false);
});

test("reacts to model changes and writes native input values back to the same binding", async () => {
  const { element, root, surface } = await mountAdapter(
    "PantokenTextInput",
    { label: "Name", value: { "@path": "/name" } },
    { name: "Ada" },
  );
  const host = root.querySelector("instui-text-input")!;
  expect(host.getAttribute("value")).toBe("Ada");
  const input = host.shadowRoot!.querySelector("input")!;
  input.value = "Grace";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await element.updateComplete;
  expect(surface.dataModel.get("/name")).toBe("Grace");
  surface.dataModel.set("/name", "Katherine");
  await element.updateComplete;
  expect(host.getAttribute("value")).toBe("Katherine");
  expect(input.value).toBe("Katherine");
});

test.each([
  ["PantokenCheckbox", "checked", false, "value-change", { value: true }, true],
  ["PantokenCalendar", "value", "2026-01-01", "change", { value: "2026-02-02" }, "2026-02-02"],
  ["PantokenToggleButton", "pressed", false, "click", undefined, true],
  ["PantokenModal", "open", true, "close", undefined, false],
  ["PantokenPages", "active", "first", "change", { page: "second" }, "second"],
  ["PantokenDrilldown", "active", "first", "navigate", { page: "second" }, "second"],
])(
  "maps %s events to bound state and declared actions",
  async (name, property, initial, event, detail, expected) => {
    const extras =
      name === "PantokenDrilldown"
        ? { pages: [{ id: "first", items: [{ label: "Next", target: "second" }] }] }
        : {};
    const { element, root, surface } = await mountAdapter(
      name,
      {
        ...(name === "PantokenCheckbox" || name === "PantokenToggleButton"
          ? { label: "Control" }
          : {}),
        ...(name === "PantokenPages" ? { children: ["first"] } : {}),
        [property]: { "@path": "/state" },
        action: { event: { name: "changed" } },
        ...extras,
      },
      { state: initial },
      childComponents,
    );
    const actions: string[] = [];
    const subscription = surface.onAction.subscribe((action) => {
      actions.push(action.name);
    });
    const host = root.firstElementChild!;
    host.dispatchEvent(new CustomEvent(event, { detail }));
    expect(actions).toEqual(name === "PantokenCheckbox" ? [] : ["changed"]);
    await element.updateComplete;
    expect(surface.dataModel.get("/state")).toEqual(expected);
    host.dispatchEvent(new CustomEvent("unrelated", { detail: { value: "ignored" } }));
    expect(surface.dataModel.get("/state")).toEqual(expected);
    subscription.unsubscribe();
  },
);

test("ignores missing change details and removes action and binding listeners on disconnect", async () => {
  const { element, root, surface } = await mountAdapter(
    "PantokenCalendar",
    { value: { "@path": "/date" }, action: { event: { name: "changed" } } },
    { date: "2026-01-01" },
  );
  const host = root.firstElementChild!;
  host.dispatchEvent(new CustomEvent("change", { detail: {} }));
  expect(surface.dataModel.get("/date")).toBe("2026-01-01");
  const action = vi.fn();
  const subscription = surface.onAction.subscribe(action);
  element.remove();
  host.dispatchEvent(new CustomEvent("change", { detail: { value: "2026-02-02" } }));
  expect(surface.dataModel.get("/date")).toBe("2026-01-01");
  expect(action).not.toHaveBeenCalled();
  subscription.unsubscribe();
});

test("renders icon-button glyphs and escapes their accessible label", async () => {
  const label = "<b>Save</b>";
  const { root } = await mountAdapter("PantokenIconButton", { label, iconName: "arrow-left" });
  expect(root.querySelector("instui-icon-button")?.getAttribute("label")).toBe(label);
  expect(root.querySelector("instui-icon")?.getAttribute("name")).toBe("arrow-left");
  expect(root.querySelector("b")).toBeNull();
});

const childComponents = [
  { id: "first", component: "PantokenBadge", label: "First panel" },
  { id: "second", component: "PantokenBadge", label: "Second panel" },
];

test("renders page IDs and tree children and filters non-item tree clicks", async () => {
  const pages = await mountAdapter(
    "PantokenPages",
    { children: ["first", "second"], active: "second" },
    {},
    childComponents,
  );
  expect(
    Array.from(pages.root.querySelectorAll("[data-page]"), (node) =>
      node.getAttribute("data-page"),
    ),
  ).toEqual(["first", "second"]);
  expect(pages.root.querySelectorAll("pantoken-a2ui-badge")).toHaveLength(2);
  const tree = await mountAdapter(
    "PantokenTreeBrowser",
    {
      label: "Files",
      children: ["first"],
      action: { event: { name: "select" } },
    },
    {},
    childComponents,
  );
  const action = vi.fn();
  const subscription = tree.surface.onAction.subscribe(action);
  tree.root
    .querySelector("instui-tree-browser")!
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(action).not.toHaveBeenCalled();
  const item = tree.root.querySelector<HTMLElement>('[role="treeitem"]')!;
  expect(item.tabIndex).toBe(0);
  item.click();
  expect(action).toHaveBeenCalledOnce();
  subscription.unsubscribe();
});

test("tabs pair labeled controls and panels, clamp selection, and bind only tab clicks", async () => {
  const { element, root, surface } = await mountAdapter(
    "PantokenTabs",
    {
      label: "Sections",
      tabLabels: ["One", "Two"],
      children: ["first", "second"],
      activeIndex: { "@path": "/selected" },
      action: { event: { name: "select" } },
    },
    { selected: 100 },
    childComponents,
  );
  const tabs = root.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  const panels = root.querySelectorAll<HTMLElement>('[role="tabpanel"]');
  expect(tabs[1]!.getAttribute("aria-selected")).toBe("true");
  expect(tabs[0]!.getAttribute("aria-controls")).toBe(panels[0]!.id);
  expect(panels[0]!.hidden).toBe(true);
  expect(panels[1]!.hidden).toBe(false);
  const action = vi.fn();
  const subscription = surface.onAction.subscribe(action);
  panels[1]!.click();
  expect(action).not.toHaveBeenCalled();
  tabs[0]!.click();
  await element.updateComplete;
  expect(surface.dataModel.get("/selected")).toBe(0);
  expect(panels[0]!.hidden).toBe(false);
  tabs[1]!.dataset.index = "invalid";
  tabs[1]!.click();
  expect(surface.dataModel.get("/selected")).toBe(0);
  subscription.unsubscribe();
});

test.each(["PantokenToggleGroup", "PantokenToggleDetails"])(
  "%s renders disclosures and binds both toggle event shapes",
  async (name) => {
    const { element, root, surface } = await mountAdapter(
      name,
      {
        summary: "More",
        open: { "@path": "/expanded" },
        children: ["first"],
      },
      { expanded: false },
      childComponents,
    );
    const host = root.firstElementChild!;
    expect(host.getAttribute("summary")).toBe("More");
    expect(host.querySelector("pantoken-a2ui-badge")).not.toBeNull();
    host.dispatchEvent(new CustomEvent("toggle", { detail: { newState: "open" } }));
    await element.updateComplete;
    expect(surface.dataModel.get("/expanded")).toBe(true);
    const close = new Event("toggle");
    Object.defineProperty(close, "newState", { value: "closed" });
    host.dispatchEvent(close);
    await element.updateComplete;
    expect(surface.dataModel.get("/expanded")).toBe(false);
  },
);

test("drawer slots isolate tray children and stop observing open state on disconnect", async () => {
  const { element, root, surface } = await mountAdapter(
    "PantokenDrawerLayout",
    {
      open: { "@path": "/expanded" },
      shouldOverlayTray: true,
      placement: "end",
      trayLabel: "Tools",
      contentLabel: "Main",
      children: ["first"],
      trayChildren: ["second"],
    },
    { expanded: false },
    childComponents,
  );
  const host = root.querySelector("instui-drawer-layout")!;
  expect(host.querySelector('[slot="tray"] pantoken-a2ui-badge')).not.toBeNull();
  expect(host.getAttribute("placement")).toBe("end");
  expect(host.hasAttribute("should-overlay-tray")).toBe(true);
  host.setAttribute("open", "");
  await vi.waitFor(() => expect(surface.dataModel.get("/expanded")).toBe(true));
  await element.updateComplete;
  host.removeAttribute("open");
  await vi.waitFor(() => expect(surface.dataModel.get("/expanded")).toBe(false));
  element.remove();
  host.setAttribute("open", "");
  await Promise.resolve();
  expect(surface.dataModel.get("/expanded")).toBe(false);
});

test("drilldown renders safe navigation and back items rather than injecting markup", async () => {
  const { root } = await mountAdapter("PantokenDrilldown", {
    active: "first",
    pages: [
      { id: "first", items: [{ label: "<img src=x>", target: "second" }] },
      { id: "second", items: [{ label: "Back", back: true }] },
    ],
  });
  const items = root.querySelectorAll<HTMLElement>('[role="menuitem"]');
  expect(items[0]!.dataset.goto).toBe("second");
  expect(items[0]!.textContent?.trim()).toBe("<img src=x>");
  expect(items[1]!.hasAttribute("data-back")).toBe(true);
  expect(items[1]!.classList.contains("-drilldown-back")).toBe(true);
  expect(root.querySelector("img")).toBeNull();
});

test("select retains disabled options and updates its bound value", async () => {
  const { element, root, surface } = await mountAdapter(
    "PantokenSimpleSelect",
    {
      label: "Role",
      name: "role",
      required: true,
      disabled: true,
      value: { "@path": "/role" },
      options: [
        { label: "<b>Admin</b>", value: "admin", disabled: true },
        { label: "User", value: "user" },
      ],
    },
    { role: "user" },
  );
  const host = root.querySelector("instui-simple-select")!;
  expect(host.hasAttribute("required")).toBe(true);
  expect(host.hasAttribute("disabled")).toBe(true);
  expect(host.querySelector("option")?.disabled).toBe(true);
  expect(host.querySelector("option")?.textContent?.trim()).toBe("<b>Admin</b>");
  expect(host.querySelector("b")).toBeNull();
  host.dispatchEvent(new CustomEvent("value-change", { detail: { value: "admin" } }));
  await element.updateComplete;
  expect(surface.dataModel.get("/role")).toBe("admin");
});

// Exercise the adapter's defensive boundary independently of the protocol validator.
function renderResolved(name: string, props: Record<string, unknown>) {
  registerPantokenA2uiComponents();
  const element = new (implementationFor(name).element)();
  Object.defineProperty(element, "controller", { value: { props } });
  const container = document.createElement("div");
  const renderTemplate: unknown = Reflect.get(element, "render");
  if (typeof renderTemplate !== "function") throw new Error("The adapter has no render method.");
  render(Reflect.apply(renderTemplate, element, []), container);
  return container;
}

test.each([
  ["PantokenTable", { caption: 42, headers: [], rows: [] }, "caption must be a string"],
  [
    "PantokenTable",
    { caption: "Data", headers: [42], rows: [] },
    "headers must be an array of strings",
  ],
  [
    "PantokenTable",
    { caption: "Data", headers: [], rows: [false] },
    "rows must be an array of string arrays",
  ],
  [
    "PantokenTable",
    { caption: "Data", headers: ["Name"], rows: [["Ada", "Admin"]] },
    "one cell per header",
  ],
  ["PantokenSimpleSelect", { options: null }, "labeled string options"],
  ["PantokenSimpleSelect", { options: [{ label: "Admin", value: 42 }] }, "labeled string options"],
  [
    "PantokenSimpleSelect",
    { options: [{ label: "Admin", value: "admin", disabled: "yes" }] },
    "labeled string options",
  ],
  ["PantokenDrilldown", { pages: null }, "pages must be an array"],
  ["PantokenDrilldown", { pages: [null] }, "pages[0] is invalid"],
  ["PantokenDrilldown", { pages: [{ id: "page", items: [null] }] }, "items[0] is invalid"],
  [
    "PantokenDrilldown",
    { pages: [{ id: "page", items: [{ label: "Next", target: 42 }] }] },
    "target is invalid",
  ],
  ["PantokenTabs", { tabLabels: [42], children: [] }, "tabLabels must be an array of strings"],
  ["PantokenTabs", { tabLabels: ["One"], children: [] }, "one child component for each tab label"],
  ["PantokenButton", { children: "not-an-array" }, "valid A2UI child references"],
  ["PantokenButton", { children: [null] }, "valid A2UI child references"],
  ["PantokenButton", { children: [{ id: "child", basePath: 42 }] }, "valid A2UI child references"],
])("%s rejects malformed resolved content %j", (name, props, message) => {
  expect(() => renderResolved(name, props)).toThrow(message);
});

test("validates scoped child references and uses their IDs for page identity", () => {
  const container = renderResolved("PantokenPages", {
    children: [{ id: "row", basePath: "/items/0" }],
  });
  expect(container.querySelector("[data-page]")?.getAttribute("data-page")).toBe("row");
  expect(() => renderResolved("PantokenPages", { children: [{ id: "row" }] })).toThrow(
    "valid A2UI child references",
  );
});

test.each([Number.NaN, Number.POSITIVE_INFINITY, -2.7])(
  "tabs recover from nonfinite or negative resolved selection %s",
  (activeIndex) => {
    const container = renderResolved("PantokenTabs", {
      tabLabels: ["One", "Two"],
      children: ["first", "second"],
      activeIndex,
    });
    const tab = container.querySelector('[role="tab"]')!;
    expect(tab.getAttribute("aria-selected")).toBe("true");
    expect(tab.getAttribute("aria-controls")).toBe("pantoken-panel-0");
    expect(container.querySelector('[role="tablist"]')?.getAttribute("aria-label")).toBe("Tabs");
  },
);

test("omits unrepresentable attributes and prevents resolved URL injection", () => {
  for (const href of ["javascript:alert(1)", "//evil.example", "/\\evil.example", {}, 42]) {
    const container = renderResolved("PantokenLink", { label: "<script>bad</script>", href });
    expect(container.querySelector("instui-link")?.getAttribute("href")).not.toContain(
      "javascript:",
    );
    expect(container.querySelector("instui-link")?.getAttribute("href") ?? "").not.toContain(
      "evil",
    );
    expect(container.querySelector("script")).toBeNull();
  }
  const valid = renderResolved("PantokenLink", { href: "/docs", label: "Docs" });
  expect(valid.querySelector("instui-link")?.getAttribute("href")).toBe("/docs");
  const field = renderResolved("PantokenTextInput", {
    label: "Name",
    name: { unexpected: "object" },
    disabled: "true",
    required: true,
    value: null,
  }).querySelector("instui-text-input")!;
  expect(field.getAttribute("name")).not.toBe("[object Object]");
  expect(field.hasAttribute("disabled")).toBe(false);
  expect(field.hasAttribute("required")).toBe(true);
});

test.each([
  [
    "PantokenTabs",
    { label: "Tabs", tabLabels: ["One"], children: ["first"], activeIndex: "wrong" },
  ],
  ["PantokenDrilldown", { pages: [{ id: "../unsafe", items: [{ label: "Next" }] }] }],
  [
    "PantokenDrilldown",
    { pages: [{ id: "safe", items: [{ label: "Next", target: "javascript:alert(1)" }] }] },
  ],
  [
    "PantokenSimpleSelect",
    { label: "Role", options: [{ label: "Admin", value: "admin", onclick: "alert(1)" }] },
  ],
  ["PantokenTable", { caption: "Data", headers: ["Name"], rows: [[{ html: "<img src=x>" }]] }],
  ["PantokenTextInput", { label: "Name", oninput: "alert(1)" }],
])("protocol rejects unsafe or ill-typed %s payloads", (name, props) => {
  expect(() => makeSurface(name, props)).toThrow(/Validation failed/);
});

test("popover open binding calls native APIs only when state changes and accepts native toggle events", async () => {
  registerPantokenA2uiComponents();
  const prototype = customElements.get("instui-popover")!.prototype as HTMLElement;
  const show = vi.fn();
  const hide = vi.fn();
  Object.defineProperties(prototype, {
    showPopover: { value: show, configurable: true },
    hidePopover: { value: hide, configurable: true },
  });
  try {
    const { element, root, surface } = await mountAdapter(
      "PantokenPopover",
      {
        open: { "@path": "/expanded" },
      },
      { expanded: true },
    );
    const host = root.querySelector("instui-popover")!;
    expect(show).toHaveBeenCalledOnce();
    element.requestUpdate();
    await element.updateComplete;
    expect(show).toHaveBeenCalledOnce();
    surface.dataModel.set("/expanded", false);
    await element.updateComplete;
    expect(hide).toHaveBeenCalledOnce();
    const toggle = new Event("toggle");
    Object.defineProperty(toggle, "newState", { value: "open" });
    host.dispatchEvent(toggle);
    await element.updateComplete;
    expect(surface.dataModel.get("/expanded")).toBe(true);
    expect(show).toHaveBeenCalledOnce();
  } finally {
    Reflect.deleteProperty(prototype, "showPopover");
    Reflect.deleteProperty(prototype, "hidePopover");
  }
});

test("popover binding starts closed without calling native APIs and reports missing platform support", async () => {
  const { element, root, surface } = await mountAdapter(
    "PantokenPopover",
    {
      open: { "@path": "/expanded" },
    },
    { expanded: false },
  );
  Object.defineProperty(root.querySelector("instui-popover"), "showPopover", { value: undefined });
  surface.dataModel.set("/expanded", true);
  await expect(element.updateComplete).rejects.toThrow("requires the browser Popover API");
});

test("tooltip delay rebinding replaces timers and disconnect cancels pending work", async () => {
  vi.useFakeTimers();
  const { element, root, surface } = await mountAdapter(
    "PantokenTooltip",
    {
      triggerLabel: "Help",
      tip: "Description",
      showDelay: { "@path": "/delay" },
    },
    { delay: 100 },
  );
  const wrapper = root.querySelector<HTMLElement>(".instui-tooltip")!;
  const tip = root.querySelector<HTMLElement>('[role="tooltip"]')!;
  wrapper.dispatchEvent(new Event("pointerenter"));
  surface.dataModel.set("/delay", 10);
  await element.updateComplete;
  vi.advanceTimersByTime(100);
  expect(tip.classList.contains("-show")).toBe(false);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(10);
  expect(tip.classList.contains("-show")).toBe(true);
  wrapper.dispatchEvent(new Event("pointerleave"));
  vi.runAllTimers();
  wrapper.dispatchEvent(new Event("pointerenter"));
  element.remove();
  vi.runAllTimers();
  expect(tip.classList.contains("-show")).toBe(false);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.runAllTimers();
  expect(tip.classList.contains("-show")).toBe(false);
});

test("host replacement removes stale action listeners and binds exactly one replacement listener", async () => {
  const { element, root, surface } = await mountAdapter("PantokenButton", {
    label: "Save",
    action: { event: { name: "save" } },
  });
  const old = root.querySelector("instui-button")!;
  vi.spyOn(element, "render").mockImplementation(
    () => html`<instui-button>Replacement</instui-button>`,
  );
  element.requestUpdate();
  await element.updateComplete;
  const replacement = root.querySelector<HTMLElement>("instui-button")!;
  expect(replacement).not.toBe(old);
  const action = vi.fn();
  const subscription = surface.onAction.subscribe(action);
  old.dispatchEvent(new MouseEvent("click"));
  expect(action).not.toHaveBeenCalled();
  replacement.click();
  expect(action).toHaveBeenCalledOnce();
  element.requestUpdate();
  await element.updateComplete;
  replacement.click();
  expect(action).toHaveBeenCalledTimes(2);
  subscription.unsubscribe();
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
