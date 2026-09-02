import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { layouts, pageLayouts, wrapperRules } from "../src/index.ts";
import { SENTINEL } from "../src/lib/sentinel.ts";

const cssOf = (plugin: ReturnType<typeof layouts>): string => {
  const out = plugin.css?.({ tokens: [], css: "" });
  if (!out) return "";
  if ("append" in out) return out.append as string;
  if ("prepend" in out) return out.prepend as string;
  return "";
};

test("is a css-only plugin", () => {
  expect(capabilitiesOf(layouts())).toEqual(["css"]);
});

test("appends by default and prepends when asked", () => {
  const appended = layouts().css?.({ tokens: [], css: "" });
  expect(appended).toHaveProperty("append");
  const prepended = layouts({ position: "prepend" }).css?.({ tokens: [], css: "" });
  expect(prepended).toHaveProperty("prepend");
});

test("wrapperRules default output is prefixed and consumes the sentinel", () => {
  const css = wrapperRules();
  expect(css).toContain(".instui-button");
  expect(css).toContain(".instui-card");
  expect(css).not.toContain(SENTINEL);
});

test("wrapperRules supports custom and empty prefixes", () => {
  expect(wrapperRules("my-")).toContain(".my-button");
  expect(wrapperRules("")).toContain(".button");
});

test("wrapperRules matches the plugin css payload", () => {
  expect(wrapperRules()).toBe(cssOf(layouts()));
});

test("pageLayouts exposes the bundled starter page layouts", () => {
  const names = pageLayouts.map((layout) => layout.name).sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(["callout", "hero", "rubric-note", "testimonial", "two-column"]);
  for (const layout of pageLayouts) {
    expect(layout.html).toContain("instui-");
  }
});
