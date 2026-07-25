// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

test("context-view sets popover=auto and renders a slotted callout span", () => {
  document.body.innerHTML = `<instui-context-view id="cv">More</instui-context-view>`;
  const el = document.querySelector("instui-context-view") as HTMLElement;
  expect(el.getAttribute("popover")).toBe("auto");
  const span = el.shadowRoot?.querySelector("span.instui-context-view");
  expect(span?.getAttribute("part")).toBe("context-view");
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
});

test("context-view keeps an explicit popover value", () => {
  document.body.innerHTML = `<instui-context-view popover="manual">x</instui-context-view>`;
  const el = document.querySelector("instui-context-view") as HTMLElement;
  expect(el.getAttribute("popover")).toBe("manual");
});

test("popover sets popover=auto and renders a slotted surface div", () => {
  document.body.innerHTML = `<instui-popover id="p">Menu</instui-popover>`;
  const el = document.querySelector("instui-popover") as HTMLElement;
  expect(el.getAttribute("popover")).toBe("auto");
  const div = el.shadowRoot?.querySelector("div.instui-popover");
  expect(div?.getAttribute("part")).toBe("popover");
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
});

test("popover keeps an explicit popover value", () => {
  document.body.innerHTML = `<instui-popover popover="manual">x</instui-popover>`;
  const el = document.querySelector("instui-popover") as HTMLElement;
  expect(el.getAttribute("popover")).toBe("manual");
});

test("tray sets popover=auto and composes placement/size modifiers", () => {
  document.body.innerHTML = `<instui-tray id="t" placement="start" size="small">x</instui-tray>`;
  const el = document.querySelector("instui-tray") as HTMLElement;
  expect(el.getAttribute("popover")).toBe("auto");
  const cls = el.shadowRoot?.querySelector("div")?.className ?? "";
  expect(cls).toContain("instui-tray");
  expect(cls).toContain("-placement-start");
  expect(cls).toContain("-size-small");
});

test("tray without placement/size renders only the base class and repaints on change", () => {
  document.body.innerHTML = `<instui-tray>x</instui-tray>`;
  const el = document.querySelector("instui-tray") as HTMLElement;
  expect(el.shadowRoot?.querySelector("div")?.className).toBe("instui-tray");
  el.setAttribute("placement", "end");
  expect(el.shadowRoot?.querySelector("div")?.className).toContain("-placement-end");
});

test("tray sanitizes junk out of placement/size", () => {
  document.body.innerHTML = `<instui-tray placement="st@rt!" size="sm4ll">x</instui-tray>`;
  const el = document.querySelector("instui-tray") as HTMLElement;
  const cls = el.shadowRoot?.querySelector("div")?.className ?? "";
  // placement keeps letters + hyphen; size keeps letters only.
  expect(cls).toContain("-placement-strt");
  expect(cls).toContain("-size-smll");
});
