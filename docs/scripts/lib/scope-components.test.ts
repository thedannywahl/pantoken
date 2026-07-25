import { beforeEach, describe, expect, test, vi } from "vite-plus/test";

// `scopedComponentsCss` diffs the rebrand aggregate against each themed aggregate, so we mock the
// upstream `componentsCss` generator and hand it byte-stable CSS per theme. That keeps the test
// hermetic (no token build) and lets us drive every branch: shared rules cancel, theme-only rules get
// attribute-scoped, an empty delta is skipped, and a theme-only at-rule throws.
interface CssOpts {
  prefix?: string;
  theme?: string;
}
const state = vi.hoisted(() => ({
  css: (_opts: CssOpts): string => "",
  calls: [] as CssOpts[],
}));

vi.mock("../../../formats/components/src/index.ts", () => ({
  componentsCss: (opts: CssOpts) => {
    state.calls.push(opts);
    return state.css(opts);
  },
}));

const { scopedComponentsCss, splitTopLevel } = await import("./scope-components.ts");

const BASE = [".a {\n  color: red;\n}", ".b {\n  color: blue;\n}"].join("\n");

beforeEach(() => {
  state.calls = [];
});

describe("splitTopLevel", () => {
  test("splits a plain selector list on the separator", () => {
    expect(splitTopLevel(".a, .b, .c", ",")).toEqual([".a", ".b", ".c"]);
  });

  test("ignores separators nested inside parentheses", () => {
    expect(splitTopLevel(":is(.a, .b) .c, .d", ",")).toEqual([":is(.a, .b) .c", ".d"]);
  });

  test("handles nested parentheses depth", () => {
    expect(splitTopLevel(":where(:is(.a, .b), .c) .d, .e", ",")).toEqual([
      ":where(:is(.a, .b), .c) .d",
      ".e",
    ]);
  });

  test("trims each part and drops empty segments", () => {
    expect(splitTopLevel("  .a , , .b ,", ",")).toEqual([".a", ".b"]);
  });

  test("returns a single trimmed part when no separator is present", () => {
    expect(splitTopLevel("  .only  ", ",")).toEqual([".only"]);
  });

  test("returns an empty array for empty / separator-only input", () => {
    expect(splitTopLevel("", ",")).toEqual([]);
    expect(splitTopLevel(",,,", ",")).toEqual([]);
  });

  test("a stray closing paren never drives depth negative", () => {
    // depth is clamped at 0, so the top-level comma still splits.
    expect(splitTopLevel(".a) , .b", ",")).toEqual([".a)", ".b"]);
  });
});

describe("scopedComponentsCss", () => {
  test("emits the base sheet plus attribute-scoped theme-only rules", () => {
    state.css = ({ theme }) =>
      theme === "canvas" ? `${BASE}\n.c, .d {\n  color: green;\n}` : BASE; // rebrand + canvasHighContrast are exactly the base (no delta)

    const out = scopedComponentsCss();

    // The base rules survive unscoped.
    expect(out).toContain("color: red");
    expect(out).toContain("color: blue");
    // The canvas-only rule is emitted once per selector, each prefixed with the theme attribute.
    expect(out).toContain("/* canvas theme overrides");
    expect(out).toContain(':root[data-pantoken-theme="canvas"] .c');
    expect(out).toContain(':root[data-pantoken-theme="canvas"] .d');
    // canvasHighContrast produced no delta, so no block for it.
    expect(out).not.toContain('data-pantoken-theme="canvasHighContrast"');
    // Always ends with a single trailing newline.
    expect(out.endsWith("\n")).toBe(true);
  });

  test("passes the requested prefix and themes through to the generator", () => {
    state.css = () => BASE;
    scopedComponentsCss("myprefix");
    expect(state.calls[0]).toEqual({ prefix: "myprefix", theme: "rebrand" });
    expect(state.calls.map((c) => c.theme)).toEqual(["rebrand", "canvas", "canvasHighContrast"]);
  });

  test("returns only the base sheet when no theme adds anything", () => {
    state.css = () => BASE;
    const out = scopedComponentsCss();
    expect(out).not.toContain("theme overrides");
    expect(out).toContain("color: red");
  });

  test("throws when a theme-only override is an at-rule it can't scope from the outside", () => {
    state.css = ({ theme }) =>
      theme === "canvas"
        ? `${BASE}\n@media (min-width: 1px) {\n  .c {\n    color: green;\n  }\n}`
        : BASE;
    expect(() => scopedComponentsCss()).toThrow(
      /theme-conditional CSS inside @scope\/@media is not supported/u,
    );
  });
});
