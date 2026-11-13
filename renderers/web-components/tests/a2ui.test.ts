// @vitest-environment happy-dom
import { ComponentContext, MessageProcessor } from "@a2ui/web_core";
import { afterEach, expect, test } from "vite-plus/test";
import {
  PantokenA2uiButtonElement,
  PantokenA2uiTooltipElement,
  pantokenA2uiCatalog,
  registerPantokenA2uiComponents,
} from "../src/a2ui.ts";
import catalogDocument from "../src/generated/a2ui-catalog.json" with { type: "json" };

afterEach(() => {
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

test("registers an A2UI implementation for every component in the full catalog", () => {
  expect(pantokenA2uiCatalog.protocolVersion).toBe("1.0");
  expect(pantokenA2uiCatalog.id).toBe("https://pantoken.app/a2ui/catalog/v1/catalog.json");
  expect([...pantokenA2uiCatalog.components.keys()].sort()).toEqual(
    Object.keys(catalogDocument.components).sort(),
  );
  expect(pantokenA2uiCatalog.functions.size).toBe(0);
});

test("component schemas reject unknown props, unsafe URL props, and invalid variants", () => {
  const button = pantokenA2uiCatalog.components.get("PantokenButton");
  const tooltip = pantokenA2uiCatalog.components.get("PantokenTooltip");
  expect(button).toBeTruthy();
  expect(tooltip).toBeTruthy();
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
  expect(pantokenA2uiCatalog.components.has("UnknownComponent")).toBe(false);
});

test("registers the universal components and their Pantoken button dependency on demand", () => {
  registerPantokenA2uiComponents();

  expect(customElements.get("pantoken-a2ui-button")).toBeTruthy();
  expect(customElements.get("pantoken-a2ui-tooltip")).toBeTruthy();
  expect(customElements.get("instui-button")).toBeTruthy();
});

test("renders button labels as text and dispatches the declared A2UI action", async () => {
  registerPantokenA2uiComponents();
  const unsafeLabel = '<img src=x onerror="alert(1)">';
  const surface = makeSurface("PantokenButton", {
    label: unsafeLabel,
    action: { event: { name: "save" } },
  });
  const element = document.createElement("pantoken-a2ui-button");
  expect(element).toBeInstanceOf(PantokenA2uiButtonElement);
  if (!(element instanceof PantokenA2uiButtonElement)) {
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
  expect(element).toBeInstanceOf(PantokenA2uiTooltipElement);
  if (!(element instanceof PantokenA2uiTooltipElement)) {
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
