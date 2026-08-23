import { afterAll, beforeAll, describe, expect, test } from "vite-plus/test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { CssDocConfigFile } from "@cssdoc/config";
import type { CssDocEntry, CssModifier } from "@cssdoc/core";
import type { Token } from "@pantoken/tokens";
import {
  annotateJsRequirement,
  assertNoUnknownReferences,
  componentSources,
  indexLocalVars,
  inferSyntax,
  makeImportSnippet,
  makeResolveSource,
  makeSourceResolver,
  pluginRecords,
  resolveSyntax,
  resolveToken,
  sourceMap,
  syntaxFromChain,
  writeCssIndexBlurb,
} from "./build-css-api.ts";

// A minimal IR token. Reference tokens carry syntax "*"; a concrete leaf carries a real syntax/value.
const tok = (name: string, extra: Partial<Token> = {}): Token => ({
  name,
  syntax: "*",
  inherits: true,
  value: "",
  ...extra,
});
const asEntry = (
  name: string,
  kind: CssDocEntry["kind"],
  modifiers: readonly Partial<CssModifier>[] = [],
): CssDocEntry => ({ name, kind, modifiers }) as CssDocEntry;

const repoRoot = join(import.meta.dirname, "..", "..");
let configuration: ReturnType<CssDocConfigFile["toConfiguration"]>;
let tmp: string;

beforeAll(() => {
  configuration = CssDocConfigFile.loadForFolder(repoRoot).toConfiguration();
  tmp = mkdtempSync(join(tmpdir(), "pantoken-cssapi-"));
});
afterAll(() => {
  rmSync(tmp, { recursive: true, force: true });
});

describe("inferSyntax", () => {
  test("url / data values", () => {
    expect(inferSyntax("url(#glyph)")).toBe("<url>");
    expect(inferSyntax("data:image/svg+xml,foo")).toBe("<url>");
  });
  test("colour values (hex, rgb, oklch, and light-dark pairs)", () => {
    expect(inferSyntax("#fff")).toBe("<color>");
    expect(inferSyntax("rgb(0, 0, 0)")).toBe("<color>");
    expect(inferSyntax("oklch(0.6 0.1 200)")).toBe("<color>");
    expect(inferSyntax("light-dark(#fff, #000)")).toBe("<color>");
  });
  test("length values (px, rem, viewport units)", () => {
    expect(inferSyntax("16px")).toBe("<length>");
    expect(inferSyntax("1.5rem")).toBe("<length>");
    expect(inferSyntax("100vh")).toBe("<length>");
    // A trailing `%` isn't matched (the unit regex requires a word boundary the `%` can't provide).
    expect(inferSyntax("50%")).toBeUndefined();
  });
  test("time values", () => {
    expect(inferSyntax("200ms")).toBe("<time>");
    expect(inferSyntax("0.3s")).toBe("<time>");
  });
  test("integer vs number", () => {
    expect(inferSyntax("42")).toBe("<integer>");
    expect(inferSyntax("-3")).toBe("<integer>");
    expect(inferSyntax("1.5")).toBe("<number>");
    expect(inferSyntax("0.25")).toBe("<number>");
  });
  test("keyword / empty values are unresolvable", () => {
    expect(inferSyntax("solid")).toBeUndefined();
    expect(inferSyntax("")).toBeUndefined();
  });
  test("leading/trailing whitespace is trimmed before matching", () => {
    expect(inferSyntax("  #abc  ")).toBe("<color>");
  });
});

describe("syntaxFromChain", () => {
  test("returns the first concrete syntax on the token itself", () => {
    const lookup = new Map([["--a", tok("--a", { syntax: "<color>" })]]);
    expect(syntaxFromChain("--a", lookup)).toBe("<color>");
  });
  test("follows refersTo past `*` aliases to a concrete syntax", () => {
    const lookup = new Map([
      ["--a", tok("--a", { syntax: "*", refersTo: "--b" })],
      ["--b", tok("--b", { syntax: "<length>" })],
    ]);
    expect(syntaxFromChain("--a", lookup)).toBe("<length>");
  });
  test("infers from the terminal value when no concrete syntax exists", () => {
    const lookup = new Map([
      ["--a", tok("--a", { syntax: "*", refersTo: "--b" })],
      ["--b", tok("--b", { syntax: "*", value: "16px" })],
    ]);
    expect(syntaxFromChain("--a", lookup)).toBe("<length>");
  });
  test("a reference cycle terminates and yields undefined", () => {
    const lookup = new Map([
      ["--a", tok("--a", { syntax: "*", refersTo: "--b" })],
      ["--b", tok("--b", { syntax: "*", refersTo: "--a" })],
    ]);
    expect(syntaxFromChain("--a", lookup)).toBeUndefined();
  });
  test("a missing token yields undefined", () => {
    expect(syntaxFromChain("--nope", new Map())).toBeUndefined();
  });
});

describe("resolveSyntax", () => {
  const empty = new Map<string, Token>();
  const noLocals = new Map<string, string>();
  const id = (v: string): string => v;

  test("the chained syntax wins", () => {
    const lookup = new Map([["--a", tok("--a", { syntax: "<color>" })]]);
    expect(resolveSyntax("--a", lookup, noLocals, id)).toBe("<color>");
  });
  test("falls back to the by-name property grammar (font-family)", () => {
    expect(resolveSyntax("--instui-heading-font-family", empty, noLocals, id)).toBe(
      "[ <font-family-name> | <generic-font-family> ]#",
    );
  });
  test("falls back to inferring from a sheet-local value", () => {
    const locals = new Map([["--instui-elevation-x", "0 1px 2px #000"]]);
    // Not a known token, no property-grammar match → infer from the resolved local (a colour shadow).
    expect(resolveSyntax("--instui-elevation-x", empty, locals, id)).toBe("none | <shadow>#");
  });
  test("a local value with no grammar match infers the primitive type", () => {
    const locals = new Map([["--x-plain", "12px"]]);
    expect(resolveSyntax("--x-plain", empty, locals, id)).toBe("<length>");
  });
  test("undefined when nothing can be derived", () => {
    expect(resolveSyntax("--x-plain", empty, noLocals, id)).toBeUndefined();
  });
});

describe("resolveToken", () => {
  const id = (v: string): string => v;
  const noLocals = new Map<string, string>();

  test("returns both syntax and resolved value from the IR", () => {
    const lookup = new Map([["--a", tok("--a", { syntax: "<color>", value: "#123456" })]]);
    expect(resolveToken("--a", lookup, noLocals, id)).toEqual({
      syntax: "<color>",
      value: "#123456",
    });
  });
  test("reads the value from sheet-local vars when not in the IR", () => {
    const locals = new Map([["--x-plain", "8px"]]);
    expect(resolveToken("--x-plain", new Map(), locals, id)).toEqual({
      syntax: "<length>",
      value: "8px",
    });
  });
  test("returns a syntax-only object when no value is available", () => {
    const result = resolveToken("--instui-heading-font-family", new Map(), noLocals, id);
    expect(result).toEqual({
      syntax: "[ <font-family-name> | <generic-font-family> ]#",
      value: undefined,
    });
  });
  test("undefined when neither syntax nor value can be derived", () => {
    expect(resolveToken("--totally-unknown", new Map(), noLocals, id)).toBeUndefined();
  });
});

describe("indexLocalVars", () => {
  test("indexes custom-property declarations across texts (first wins)", () => {
    const target = new Map<string, string>();
    indexLocalVars(["--a: 1px; --b: red;", ":root { --c: 2rem; }", "--a: 99px;"], target);
    expect(target.get("--a")).toBe("1px"); // first definition wins
    expect(target.get("--b")).toBe("red");
    expect(target.get("--c")).toBe("2rem");
  });
});

describe("pluginRecords", () => {
  test("returns the five CSS-emitting plugin records", () => {
    const records = pluginRecords();
    expect(records).toHaveLength(5);
    expect(records.map((r) => r.sheet)).toContain("visual-debug.css");
    expect(records.find((r) => r.sheet === "visual-debug.css")?.import).toBe(
      "@pantoken/plugin-visual-debug/visual-debug.css",
    );
    expect(records.map((r) => r.sheet)).toContain("custom-components.css");
    expect(records.find((r) => r.sheet === "custom-components.css")?.import).toBe(
      "@pantoken/plugin-custom-components/custom-components.css",
    );
    expect(records.map((r) => r.sheet)).toContain("layouts.css");
    expect(records.find((r) => r.sheet === "layouts.css")?.import).toBe(
      "@pantoken/plugin-layouts/layouts.css",
    );
  });
});

describe("makeResolveSource", () => {
  test("links a known record to its GitHub blob, labelled with the filename", () => {
    const resolve = makeResolveSource(new Map([["button", "formats/components/src/button.css"]]));
    const link = resolve(asEntry("button", "component"));
    expect(link?.href).toBe(
      "https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/button.css",
    );
    expect(link?.label).toBe("button.css");
  });
  test("returns undefined for an unmapped record", () => {
    const resolve = makeResolveSource(new Map());
    expect(resolve(asEntry("ghost", "component"))).toBeUndefined();
  });
});

describe("sourceMap", () => {
  test("maps each record name to its file (first definition wins), skipping tag-less files", () => {
    const dir = mkdtempSync(join(tmp, "sm-"));
    const a = join(dir, "a.css");
    const b = join(dir, "b.css");
    const c = join(dir, "c.css");
    const dup = join(dir, "dup.css");
    writeFileSync(a, "/**\n * @component button\n */\n.button {}\n");
    writeFileSync(b, "/**\n * @utility view\n */\n.view {}\n");
    writeFileSync(c, ".no-record {}\n");
    writeFileSync(dup, "/**\n * @component button\n */\n.button {}\n");

    const map = sourceMap([a, b, c, dup]);
    expect(map.get("button")?.endsWith("a.css")).toBe(true); // first wins over dup
    expect(map.get("view")?.endsWith("b.css")).toBe(true);
    expect(map.has("no-record")).toBe(false);
  });
});

describe("componentSources", () => {
  test("collects .ts/.css from the four src dirs plus scripts/generate.ts, ignoring .md", () => {
    const root = mkdtempSync(join(tmp, "cs-"));
    for (const d of ["components", "utilities", "rules", "declarations"]) {
      mkdirSync(join(root, "src", d), { recursive: true });
    }
    mkdirSync(join(root, "scripts"), { recursive: true });
    writeFileSync(join(root, "src", "components", "a.ts"), "");
    writeFileSync(join(root, "src", "components", "a.css"), "");
    writeFileSync(join(root, "src", "components", "a.md"), "");
    writeFileSync(join(root, "src", "utilities", "b.css"), "");
    writeFileSync(join(root, "scripts", "generate.ts"), "");

    const files = componentSources(root);
    expect(files.some((f) => f.endsWith("src/components/a.ts"))).toBe(true);
    expect(files.some((f) => f.endsWith("src/components/a.css"))).toBe(true);
    expect(files.some((f) => f.endsWith("src/utilities/b.css"))).toBe(true);
    expect(files.some((f) => f.endsWith("scripts/generate.ts"))).toBe(true);
    expect(files.some((f) => f.endsWith(".md"))).toBe(false);
  });

  test("recurses into per-record directories, including nested members", () => {
    const root = mkdtempSync(join(tmp, "cs-nested-"));
    for (const d of ["components", "utilities", "rules", "declarations"]) {
      mkdirSync(join(root, "src", d), { recursive: true });
    }
    mkdirSync(join(root, "scripts"), { recursive: true });
    mkdirSync(join(root, "src", "components", "breadcrumb", "members", "link"), {
      recursive: true,
    });
    writeFileSync(join(root, "src", "components", "breadcrumb", "index.ts"), "");
    writeFileSync(join(root, "src", "components", "breadcrumb", "breadcrumb.css"), "");
    writeFileSync(join(root, "src", "components", "breadcrumb", "members", "link", "index.ts"), "");
    writeFileSync(join(root, "scripts", "generate.ts"), "");

    const files = componentSources(root);
    expect(files.some((f) => f.endsWith("components/breadcrumb/index.ts"))).toBe(true);
    expect(files.some((f) => f.endsWith("components/breadcrumb/breadcrumb.css"))).toBe(true);
    expect(files.some((f) => f.endsWith("members/link/index.ts"))).toBe(true);
  });
});

describe("makeSourceResolver", () => {
  test("resolves a component record to its source under the given root", () => {
    const root = mkdtempSync(join(tmp, "msr-"));
    for (const d of ["components", "utilities", "rules", "declarations"]) {
      mkdirSync(join(root, "src", d), { recursive: true });
    }
    mkdirSync(join(root, "scripts"), { recursive: true });
    writeFileSync(join(root, "scripts", "generate.ts"), "");
    writeFileSync(
      join(root, "src", "components", "button.css"),
      "/**\n * @component button\n */\n.button {}\n",
    );

    const resolve = makeSourceResolver(root, []); // no plugin records → no plugin source reads
    const link = resolve(asEntry("button", "component"));
    expect(link?.href).toContain("button.css");
    expect(link?.label).toBe("button.css");
    expect(resolve(asEntry("ghost", "component"))).toBeUndefined();
  });
});

describe("makeImportSnippet", () => {
  const COMPONENTS_CSS = "/**\n * @component button\n */\n.button { color: red; }\n";
  const UTILITIES_CSS = "/**\n * @utility view\n */\n.view { display: block; }\n";
  const PLUGIN_CSS = "/**\n * @rule zstack\n */\n.zstack { z-index: 1; }\n";
  const pluginDefs = [
    {
      pkg: "plugins/pantoken/stacking",
      sheet: "stacking.css",
      import: "@pantoken/plugin-stacking/stacking.css",
    },
  ];

  const build = () =>
    makeImportSnippet(
      ["components.css", "utilities.css"],
      pluginDefs,
      (r) => r.sheet,
      configuration,
      (s) => (s === "components.css" ? COMPONENTS_CSS : UTILITIES_CSS),
      () => PLUGIN_CSS,
    );

  test("a plugin record's import wins", () => {
    expect(build()(asEntry("zstack", "rule"))).toBe(
      '@import "@pantoken/plugin-stacking/stacking.css";',
    );
  });
  test("a component gets both the sheet import and its per-component subpath", () => {
    expect(build()(asEntry("button", "component"))).toBe(
      [
        '@import "@pantoken/components/components.css";',
        '@import "@pantoken/components/button.css";',
      ].join("\n"),
    );
  });
  test("a non-component record gets only the sheet import", () => {
    expect(build()(asEntry("view", "utility"))).toBe(
      '@import "@pantoken/components/utilities.css";',
    );
  });
  test("an unknown record yields undefined", () => {
    expect(build()(asEntry("ghost", "component"))).toBeUndefined();
  });
});

describe("assertNoUnknownReferences", () => {
  test("passes when there are no unknown --instui references", () => {
    expect(() => assertNoUnknownReferences(".x { color: red; }")).not.toThrow();
  });
  test("exempts the elevation and focus-outline sheet-local families", () => {
    expect(() =>
      assertNoUnknownReferences(
        ".x { box-shadow: var(--instui-elevation-foo); outline: var(--instui-focus-outline-bar); }",
      ),
    ).not.toThrow();
  });
  test("throws for a genuinely unknown token reference", () => {
    expect(() =>
      assertNoUnknownReferences(".x { color: var(--instui-definitely-not-a-real-token-xyz); }"),
    ).toThrow(/unknown token reference/u);
  });
});

describe("annotateJsRequirement", () => {
  const page = (dir: string, name: string, body: string): string => {
    const path = join(dir, `${name}.md`);
    writeFileSync(path, body);
    return path;
  };

  test("inserts a callout before the first section for js-only/both records, skips css-only", () => {
    const dir = mkdtempSync(join(tmp, "js-req-"));
    const jsOnly = page(dir, "drilldown", "# drilldown\n\nSummary.\n\n## Modifiers\n\n...\n");
    const both = page(dir, "modal", "# modal\n\n**Source:** [x](y)\n\n## Modifiers\n\n...\n");
    const cssOnly = page(dir, "badge", "# badge\n\nSummary.\n\n## Modifiers\n\n...\n");
    const capabilityMap = new Map([
      ["drilldown", "js-only"],
      ["modal", "both"],
      ["badge", "css-only"],
    ]);

    annotateJsRequirement(
      [
        asEntry("drilldown", "component"),
        asEntry("modal", "component"),
        asEntry("badge", "component"),
      ],
      [jsOnly, both, cssOnly],
      capabilityMap,
    );

    const jsOnlyMd = readFileSync(jsOnly, "utf8");
    const bothMd = readFileSync(both, "utf8");
    // js-only truly requires JS; both is CSS that works alone, JS only enhances it.
    expect(jsOnlyMd).toContain("**JS Requirement**");
    expect(bothMd).toContain("**JS Enhancement**");
    expect(readFileSync(cssOnly, "utf8")).not.toContain("[!TIP]");

    // Points at the modifier table below, not the CDN picker.
    expect(jsOnlyMd).toContain("[modifier table below](#modifiers)");
    expect(jsOnlyMd).not.toContain("CDN picker");
    expect(bothMd).not.toContain("CDN picker");
  });

  test("names @interaction-tagged modifiers instead of a generic notice", () => {
    const dir = mkdtempSync(join(tmp, "js-req-interaction-"));
    const single = page(dir, "alert", "# alert\n\nSummary.\n\n## Modifiers\n\n...\n");
    const multiple = page(dir, "widget", "# widget\n\nSummary.\n\n## Modifiers\n\n...\n");
    const capabilityMap = new Map([
      ["alert", "both"],
      ["widget", "both"],
    ]);

    annotateJsRequirement(
      [
        asEntry("alert", "component", [
          { name: "-timeout", interaction: true },
          { name: "-color-danger" },
        ]),
        asEntry("widget", "component", [
          { name: "-open", interaction: true },
          { name: "-should-animate", interaction: true },
        ]),
      ],
      [single, multiple],
      capabilityMap,
    );

    const singleMd = readFileSync(single, "utf8");
    const multipleMd = readFileSync(multiple, "utf8");
    expect(singleMd).toContain("Its `-timeout` modifier is driven by that behavior.");
    expect(singleMd).not.toContain("-color-danger");
    expect(multipleMd).toContain(
      "Its `-open` and `-should-animate` modifiers are driven by that behavior.",
    );
  });

  test("is idempotent", () => {
    const dir = mkdtempSync(join(tmp, "js-req-idem-"));
    const file = page(dir, "tooltip", "# tooltip\n\nSummary.\n\n## Modifiers\n\n...\n");
    const capabilityMap = new Map([["tooltip", "js-only"]]);

    annotateJsRequirement([asEntry("tooltip", "component")], [file], capabilityMap);
    const once = readFileSync(file, "utf8");
    annotateJsRequirement([asEntry("tooltip", "component")], [file], capabilityMap);
    expect(readFileSync(file, "utf8")).toBe(once);
  });
});

describe("writeCssIndexBlurb", () => {
  test("inserts the overview blurb after the standard heading (idempotently)", () => {
    const path = join(mkdtempSync(join(tmp, "blurb-")), "index.md");
    writeFileSync(path, "# CSS API reference\n\nGenerated tables follow.\n");
    writeCssIndexBlurb("css", path);
    const once = readFileSync(path, "utf8");
    expect(once).toContain("class-based component layer");
    expect(once.startsWith("# CSS API reference\n\n")).toBe(true);

    writeCssIndexBlurb("css", path); // second run is a no-op
    const twice = readFileSync(path, "utf8");
    expect(twice).toBe(once);
  });
  test("prepends a heading when the index doesn't start with one", () => {
    const path = join(mkdtempSync(join(tmp, "blurb2-")), "index.md");
    writeFileSync(path, "no heading here\n");
    writeCssIndexBlurb("css", path);
    const out = readFileSync(path, "utf8");
    expect(out.startsWith("# CSS API reference\n\n")).toBe(true);
    expect(out).toContain("class-based component layer");
    expect(out).toContain("no heading here");
  });
});
