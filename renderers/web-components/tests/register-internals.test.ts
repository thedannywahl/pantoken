// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";
import { applySpacing } from "../src/lib/helpers.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

// ── applySpacing (the shared spacing mixin's worker) ─────────────────────────────

test("applySpacing resolves the margin/padding shorthands from keywords and raw lengths", () => {
  const el = document.createElement("div");
  el.setAttribute("margin", "small none");
  el.setAttribute("padding", "2rem");
  applySpacing(el);
  // happy-dom serializes a bare `0` length as `0px`.
  expect(el.style.margin).toBe("var(--instui-spacing-space-sm) 0px");
  expect(el.style.padding).toBe("2rem");
});

test("applySpacing resolves per-side physical and logical attributes", () => {
  const el = document.createElement("div");
  el.setAttribute("margin-top", "medium");
  el.setAttribute("padding-inline-start", "small");
  applySpacing(el);
  expect(el.style.getPropertyValue("margin-top")).toBe("var(--instui-spacing-space-md)");
  expect(el.style.getPropertyValue("padding-inline-start")).toBe("var(--instui-spacing-space-sm)");
});

test("applySpacing clears a managed property when its attribute is removed", () => {
  const el = document.createElement("div");
  el.setAttribute("margin", "small");
  applySpacing(el);
  expect(el.style.margin).not.toBe("");
  el.removeAttribute("margin");
  applySpacing(el);
  expect(el.style.margin).toBe("");
});

test("applySpacing ignores an unmanaged margin-<side> like margin-foo", () => {
  const el = document.createElement("div");
  el.setAttribute("margin-foo", "small");
  applySpacing(el);
  expect(el.style.getPropertyValue("margin-foo")).toBe("");
});

// ── withSpacing integration: spacing works on every element with no per-element code ──

test("an element applies its margin attribute to the host style on connect", () => {
  document.body.innerHTML = `<instui-button margin="small" margin-top="medium">Go</instui-button>`;
  const el = document.querySelector("instui-button") as HTMLElement;
  expect(el.style.margin).toBe("var(--instui-spacing-space-sm)");
  expect(el.style.getPropertyValue("margin-top")).toBe("var(--instui-spacing-space-md)");
});

// ── syncInvoker: the host's invoker attributes mirror onto the inner <button> IDL ───

test("popovertarget mirrors onto the inner button and defaults the action to toggle", () => {
  document.body.innerHTML = `<instui-button popovertarget="pop">Open</instui-button><div id="pop">x</div>`;
  const el = document.querySelector("instui-button") as HTMLElement;
  const target = document.getElementById("pop");
  el.dispatchEvent(new Event("pointerdown"));
  const btn = el.shadowRoot?.querySelector("button") as HTMLButtonElement & {
    popoverTargetElement?: Element | null;
    popoverTargetAction?: string;
  };
  expect(btn.popoverTargetElement).toBe(target);
  expect(btn.popoverTargetAction).toBe("toggle");
});

test("popovertargetaction overrides the default action", () => {
  document.body.innerHTML = `<instui-button popovertarget="pop" popovertargetaction="show">Open</instui-button><div id="pop">x</div>`;
  const el = document.querySelector("instui-button") as HTMLElement;
  el.dispatchEvent(new Event("keydown"));
  const btn = el.shadowRoot?.querySelector("button") as HTMLButtonElement & {
    popoverTargetAction?: string;
  };
  expect(btn.popoverTargetAction).toBe("show");
});

test("command/commandfor mirror onto the inner button's command IDL", () => {
  document.body.innerHTML = `<instui-button command="--show" commandfor="dlg">Show</instui-button><div id="dlg">x</div>`;
  const el = document.querySelector("instui-button") as HTMLElement;
  const target = document.getElementById("dlg");
  el.dispatchEvent(new Event("pointerdown"));
  const btn = el.shadowRoot?.querySelector("button") as HTMLButtonElement & {
    commandForElement?: Element | null;
    command?: string;
  };
  expect(btn.commandForElement).toBe(target);
  expect(btn.command).toBe("--show");
});

// ── register options against a real registry ────────────────────────────────────

test("register mints working elements under a custom prefix", () => {
  register(customElements, { prefix: "xwc" });
  document.body.innerHTML = `<xwc-button variant="primary">Go</xwc-button>`;
  const el = document.querySelector("xwc-button") as HTMLElement;
  expect(el.shadowRoot?.querySelector("button")?.className).toContain("-color-primary");
});

test("register `only` limits the registered subset (others stay undefined)", () => {
  register(customElements, { prefix: "sub", only: ["button", "alert"] });
  expect(customElements.get("sub-button")).toBeTruthy();
  expect(customElements.get("sub-alert")).toBeTruthy();
  expect(customElements.get("sub-badge")).toBeFalsy();
});

test("register `only` pulls in nested render dependencies transitively", () => {
  register(customElements, { prefix: "dep", only: ["date-time-input"] });
  expect(customElements.get("dep-date-time-input")).toBeTruthy();
  expect(customElements.get("dep-date-input")).toBeTruthy();
  expect(customElements.get("dep-calendar")).toBeTruthy();
  expect(customElements.get("dep-badge")).toBeFalsy();
});

test("register is a safe no-op without a registry", () => {
  expect(() => register(undefined)).not.toThrow();
});
