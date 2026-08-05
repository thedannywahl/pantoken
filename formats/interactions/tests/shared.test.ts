// @vitest-environment happy-dom
import { afterEach, describe, expect, test } from "vite-plus/test";
import {
  SPACING_ATTRS,
  applySpacing,
  makeOnCommand,
  resolveSpace,
  spacingValue,
  syncInvoker,
} from "../src/shared/index.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

// ── resolveSpace ─────────────────────────────────────────────────────────────

describe("resolveSpace", () => {
  test("maps keyword aliases to tokens", () => {
    expect(resolveSpace("sm")).toBe("var(--instui-spacing-space-sm)");
    expect(resolveSpace("md")).toBe("var(--instui-spacing-space-md)");
    expect(resolveSpace("lg")).toBe("var(--instui-spacing-space-lg)");
    expect(resolveSpace("0")).toBe("0");
    expect(resolveSpace("none")).toBe("0");
    expect(resolveSpace("2xs")).toBe("var(--instui-spacing-space2xs)");
    expect(resolveSpace("xx-small")).toBe("var(--instui-spacing-space2xs)");
  });

  test("passes through unrecognised values unchanged", () => {
    expect(resolveSpace("1rem")).toBe("1rem");
    expect(resolveSpace("auto")).toBe("auto");
  });

  test("trims whitespace before lookup", () => {
    expect(resolveSpace("  sm  ")).toBe("var(--instui-spacing-space-sm)");
  });
});

// ── spacingValue ─────────────────────────────────────────────────────────────

describe("spacingValue", () => {
  test("returns empty string for null/blank", () => {
    expect(spacingValue(null)).toBe("");
    expect(spacingValue("")).toBe("");
    expect(spacingValue("   ")).toBe("");
  });

  test("resolves a single keyword", () => {
    expect(spacingValue("sm")).toBe("var(--instui-spacing-space-sm)");
  });

  test("resolves a 2-value shorthand", () => {
    expect(spacingValue("sm lg")).toBe(
      "var(--instui-spacing-space-sm) var(--instui-spacing-space-lg)",
    );
  });

  test("passes through raw values", () => {
    expect(spacingValue("8px 16px")).toBe("8px 16px");
  });
});

// ── SPACING_ATTRS ─────────────────────────────────────────────────────────────

test("SPACING_ATTRS contains margin, padding, and all logical sides", () => {
  expect(SPACING_ATTRS).toContain("margin");
  expect(SPACING_ATTRS).toContain("padding");
  expect(SPACING_ATTRS).toContain("margin-inline-start");
  expect(SPACING_ATTRS).toContain("padding-block-end");
});

// ── applySpacing ─────────────────────────────────────────────────────────────

describe("applySpacing", () => {
  test("resolves a shorthand margin attribute to inline style", () => {
    document.body.innerHTML = `<div id="el" margin="sm"></div>`;
    const el = document.getElementById("el") as HTMLElement;
    applySpacing(el);
    expect(el.style.margin).toBe("var(--instui-spacing-space-sm)");
  });

  test("resolves a side-specific padding attribute", () => {
    document.body.innerHTML = `<div id="el" padding-top="lg"></div>`;
    const el = document.getElementById("el") as HTMLElement;
    applySpacing(el);
    expect(el.style.paddingTop).toBe("var(--instui-spacing-space-lg)");
  });

  test("clears previously-set properties when attribute is removed", () => {
    document.body.innerHTML = `<div id="el"></div>`;
    const el = document.getElementById("el") as HTMLElement;
    el.style.margin = "1rem";
    applySpacing(el);
    expect(el.style.margin).toBe("");
  });

  test("ignores unknown side suffixes", () => {
    document.body.innerHTML = `<div id="el" margin-diagonal="sm"></div>`;
    const el = document.getElementById("el") as HTMLElement;
    expect(() => applySpacing(el)).not.toThrow();
    expect(el.style.getPropertyValue("margin-diagonal")).toBe("");
  });
});

// ── makeOnCommand ─────────────────────────────────────────────────────────────

describe("makeOnCommand", () => {
  test("routes a native command event to the handler", () => {
    document.body.innerHTML = `<div id="target"></div>`;
    const target = document.getElementById("target") as HTMLElement;
    const onCommand = makeOnCommand(true);
    const received: string[] = [];
    onCommand(target, (cmd) => received.push(cmd));

    target.dispatchEvent(
      Object.assign(new Event("command", { bubbles: true }), {
        command: "--close",
        source: null,
      }),
    );
    expect(received).toEqual(["--close"]);
  });

  test("delegates commandfor clicks when invoker API is absent", () => {
    document.body.innerHTML = `
      <div id="target"></div>
      <button command="--show" commandfor="target">Open</button>
    `;
    const target = document.getElementById("target") as HTMLElement;
    const btn = document.querySelector("button") as HTMLButtonElement;
    const onCommand = makeOnCommand(false);
    const received: string[] = [];
    onCommand(target, (cmd) => received.push(cmd));

    btn.click();
    expect(received).toEqual(["--show"]);
  });

  test("does not duplicate the click delegate for the same scope", () => {
    document.body.innerHTML = `
      <div id="t1"></div>
      <div id="t2"></div>
      <button command="--x" commandfor="t1">1</button>
    `;
    const t1 = document.getElementById("t1") as HTMLElement;
    const t2 = document.getElementById("t2") as HTMLElement;
    const onCommand = makeOnCommand(false);
    const hits: string[] = [];
    onCommand(t1, () => hits.push("t1"));
    onCommand(t2, () => hits.push("t2"));

    document.querySelector("button")?.click();
    expect(hits).toEqual(["t1"]);
  });
});

// ── syncInvoker ───────────────────────────────────────────────────────────────

describe("syncInvoker", () => {
  test("no-ops when the host has no shadow root", () => {
    document.body.innerHTML = `<div id="host" popovertarget="p1"></div>`;
    const host = document.getElementById("host") as HTMLElement;
    expect(() => syncInvoker(host)).not.toThrow();
  });
});
