import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import {
  calloutRules,
  heroRules,
  layouts,
  pageLayoutRules,
  pageLayouts,
  rubricNoteRules,
  testimonialRules,
  twoColumnRules,
  wrapperRules,
} from "../src/index.ts";
import { SENTINEL } from "../src/lib/sentinel.ts";
import { runtimeCss } from "../src/lib/runtime-css.ts";

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

test("every layout appears in the plugin css payload", () => {
  const css = cssOf(layouts());
  for (const rules of [
    wrapperRules,
    calloutRules,
    heroRules,
    pageLayoutRules,
    rubricNoteRules,
    testimonialRules,
    twoColumnRules,
  ]) {
    expect(css).toContain(runtimeCss(rules()));
  }
});

test("plugin css payload is runtime-safe", () => {
  const css = cssOf(layouts());
  expect(css).not.toContain("@component");
  expect(css).not.toMatch(/:(?:optional|one-or-more)\b/u);
});

test("pageLayouts exposes the bundled starter page layouts", () => {
  const names = pageLayouts.map((layout) => layout.name).sort((a, b) => a.localeCompare(b));
  expect(names).toEqual([
    "about-me",
    "callout",
    "course-home",
    "footer",
    "header",
    "hero",
    "rubric-note",
    "syllabus",
    "testimonial",
    "two-column",
  ]);
  for (const layout of pageLayouts) {
    expect(layout.html).toContain("instui-");
    expect(layout.html).not.toContain("placehold.co");
  }
});

test("image placeholders are provider-neutral and use the image component marker", () => {
  const aboutMe = pageLayouts.find((layout) => layout.name === "about-me");
  expect(aboutMe?.imagePlaceholders).toEqual([
    {
      key: "instructor-photo",
      width: 240,
      height: 240,
      altText: "A photo of the instructor",
    },
  ]);
  expect(aboutMe?.html).toContain(
    '<img class="instui-img" data-pantoken-image-placeholder="instructor-photo"',
  );
});
