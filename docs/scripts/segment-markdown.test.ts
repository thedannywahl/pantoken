import { describe, expect, test } from "vite-plus/test";
import {
  type Segment,
  type TranslationKind,
  collectUnits,
  reassemble,
  segmentMarkdown,
} from "./segment-markdown.ts";

/** A cssdoc component page (mirrors `docs/api/css/button.md`, incl. an escaped `\|` token value). */
const CSSDOC_PAGE = [
  "# CSS: button",
  "",
  "`.instui-button` — An accessible action control, styled from the token palette.",
  "",
  "**Source:** [button.ts](https://example.com/button.ts)",
  "",
  "## Accessibility",
  "",
  "Drive the `-toggle` variant's pressed state with `aria-pressed`.",
  "",
  "## Usage",
  "",
  "```css",
  '@import "@pantoken/components/button.css";',
  "```",
  "",
  "## Modifiers",
  "",
  "| Modifier | Description |",
  "| --- | --- |",
  "| `.-color-ai` | An AI action. |",
  "| `.-color-danger` | A destructive action. |",
  "| `.-size-lg` | — |",
  "",
  "## Tokens consumed",
  "",
  "| Token | Type | Value |",
  "| --- | --- | --- |",
  "| `--instui-font-family-base` | `[ <font-family-name> \\| <generic-font-family> ]#` | `Arial` |",
  "",
  "## Related",
  "",
  "- [close-button](/api/css/close-button.md) — The icon-only dismiss button.",
  "",
].join("\n");

/** A TypeDoc function page (mirrors `docs/api/bundlers/next/src/functions/withPantoken.md`). */
const TYPEDOC_PAGE = [
  "[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken",
  "",
  "# Function: withPantoken()",
  "",
  "> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)",
  "",
  '<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>',
  "",
  "Wrap a Next.js config so the Instructure UI packages are transpiled.",
  "",
  "## Parameters",
  "",
  "### nextConfig?",
  "",
  "[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`",
  "",
  "The existing Next config (default `{}`).",
  "",
  "## Examples",
  "",
  "**Wrap your next.config.mjs**",
  "",
  "```js",
  'import { withPantoken } from "@pantoken/next";',
  "",
  "export default withPantoken({ reactStrictMode: true });",
  "```",
  "",
].join("\n");

const identity = (text: string): string => text;

/** Find the single segment whose text contains `needle`. */
const find = (segments: Segment[], needle: string): Segment => {
  const match = segments.filter((s) => s.kind !== "table" && s.text.includes(needle));
  expect(match.length, `exactly one segment contains ${JSON.stringify(needle)}`).toBe(1);
  return match[0];
};

describe("segmentMarkdown / reassemble round-trip", () => {
  for (const [name, page] of [
    ["cssdoc page", CSSDOC_PAGE],
    ["typedoc page", TYPEDOC_PAGE],
  ] as const) {
    test(`is lossless for a ${name}`, () => {
      expect(reassemble(segmentMarkdown(page), identity)).toBe(page);
    });
  }

  test("is lossless for empty and whitespace-only input", () => {
    for (const md of ["", "\n", "\n\n\n", "no trailing newline"]) {
      expect(reassemble(segmentMarkdown(md), identity)).toBe(md);
    }
  });
});

describe("classification", () => {
  const cssdoc = segmentMarkdown(CSSDOC_PAGE);
  const typedoc = segmentMarkdown(TYPEDOC_PAGE);

  test("section headings are glossary", () => {
    expect(find(cssdoc, "## Accessibility").kind).toBe("glossary");
    expect(find(cssdoc, "## Usage").kind).toBe("glossary");
    expect(find(typedoc, "# Function: withPantoken()").kind).toBe("glossary");
  });

  test("description paragraphs and captions are prose", () => {
    expect(find(cssdoc, "An accessible action control").kind).toBe("prose");
    expect(find(typedoc, "Wrap a Next.js config").kind).toBe("prose");
    expect(find(typedoc, "The existing Next config").kind).toBe("prose");
    expect(find(typedoc, "**Wrap your next.config.mjs**").kind).toBe("prose");
    expect(find(cssdoc, "The icon-only dismiss button").kind).toBe("prose");
  });

  test("stability-badge pills are glossary", () => {
    expect(find(typedoc, "pantoken-doc-tag").kind).toBe("glossary");
  });

  test("fenced code, signatures, breadcrumbs, and type lines are preserved", () => {
    expect(find(typedoc, "> **withPantoken**").kind).toBe("preserve");
    expect(find(typedoc, "[pantoken](../../../../index.md)").kind).toBe("preserve");
    expect(find(typedoc, "import { withPantoken }").kind).toBe("preserve"); // inside a fence
    expect(find(typedoc, "= `{}`").kind).toBe("preserve"); // link + inline-code only
    expect(find(cssdoc, '@import "@pantoken/components').kind).toBe("preserve");
  });

  test("tables become table segments", () => {
    const tables = cssdoc.filter((s) => s.kind === "table");
    expect(tables.length).toBe(2);
  });
});

describe("tables", () => {
  const cssdoc = segmentMarkdown(CSSDOC_PAGE);
  const tables = cssdoc.filter((s): s is Extract<Segment, { kind: "table" }> => s.kind === "table");
  const modifiers = tables[0];
  const tokens = tables[1];

  test("Modifiers table flags its Description column", () => {
    expect(modifiers.descCols).toEqual([1]);
  });

  test("Tokens table has no prose column", () => {
    expect(tokens.descCols).toEqual([]);
  });

  test("units cover header labels + prose cells, but not code columns or em-dash cells", () => {
    const units = collectUnits([modifiers]);
    const texts = units.map((u) => u.text);
    expect(texts).toContain("Modifier"); // header label → glossary
    expect(texts).toContain("Description");
    expect(texts).toContain("An AI action."); // description cell → prose
    expect(texts).toContain("A destructive action.");
    expect(texts).not.toContain("`.-color-ai`"); // code column, never translated
    expect(texts).not.toContain("—"); // empty description cell, skipped
    const proseTexts = units.filter((u) => u.kind === "prose").map((u) => u.text);
    expect(proseTexts).toEqual(["An AI action.", "A destructive action."]);
  });

  test("reassembly translates header + Description cells only, keeping code + structure", () => {
    const resolve = (text: string, kind: TranslationKind): string =>
      kind === "prose" ? `HU(${text})` : `[${text}]`;
    const out = renderOne(modifiers, resolve);
    expect(out).toBe(
      [
        "| [Modifier] | [Description] |",
        "| --- | --- |",
        "| `.-color-ai` | HU(An AI action.) |",
        "| `.-color-danger` | HU(A destructive action.) |",
        "| `.-size-lg` | — |",
      ].join("\n"),
    );
  });

  test("a table with an escaped pipe round-trips exactly", () => {
    const out = renderOne(tokens, identity);
    expect(out).toBe(
      [
        "| Token | Type | Value |",
        "| --- | --- | --- |",
        "| `--instui-font-family-base` | `[ <font-family-name> \\| <generic-font-family> ]#` | `Arial` |",
      ].join("\n"),
    );
  });

  test("a table that can't rebuild exactly falls back to preserve", () => {
    // Ragged padding the rebuilder would normalize → preserved whole instead of reformatted.
    const ragged = ["|A|B|", "| --- | --- |", "|  x  |  y  |"].join("\n");
    const segments = segmentMarkdown(ragged);
    expect(segments.some((s) => s.kind === "table")).toBe(false);
    expect(reassemble(segments, identity)).toBe(ragged);
  });
});

/** Reassemble a single segment in isolation (no inter-segment newline joins). */
function renderOne(segment: Segment, resolve: (t: string, k: TranslationKind) => string): string {
  return reassemble([segment], resolve);
}
