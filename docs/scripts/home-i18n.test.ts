import { expect, test } from "vite-plus/test";
import {
  LINK_KEY,
  TRANSLATABLE_KEY,
  collectHomeUnits,
  frontmatterRange,
  toBackticks,
  toGrave,
} from "./home-i18n.ts";

const HOME_MD = [
  "---",
  "layout: home",
  "hero:",
  "  name: pantoken",
  "  text: InstUI, everywhere",
  "  tagline: One resolved token model.",
  "  actions:",
  "    - theme: brand",
  "      text: Getting started",
  "      link: /guide/",
  "features:",
  "  - icon:",
  "      light: /a-light.svg",
  "    title: Vendored tokens",
  "    details: Run &grave;npm i&grave; and go.",
  "  - icon:",
  "      light: /b-light.svg",
  "    title: Vendored tokens",
  "    details: ",
  "---",
  "",
  "Body prose is not frontmatter, so it is not a unit.",
].join("\n");

test("collectHomeUnits picks up every rendered frontmatter value", () => {
  expect(collectHomeUnits(HOME_MD)).toEqual([
    "InstUI, everywhere",
    "One resolved token model.",
    "Getting started",
    "Vendored tokens",
    "Run `npm i` and go.",
  ]);
});

test("collectHomeUnits skips hero.name, link, theme, and body prose", () => {
  const units = collectHomeUnits(HOME_MD);
  expect(units).not.toContain("pantoken");
  expect(units).not.toContain("/guide/");
  expect(units).not.toContain("brand");
  expect(units.some((u) => u.includes("Body prose"))).toBe(false);
});

test("collectHomeUnits dedupes repeated values and drops empty ones", () => {
  const units = collectHomeUnits(HOME_MD);
  expect(units.filter((u) => u === "Vendored tokens")).toHaveLength(1);
  expect(units).not.toContain("");
});

// The fragility this guards against: `docs/index.md` happens to put `icon:`/`theme:` first in every
// list item, so each translatable key lands on its own line. Reordering a feature so `title` becomes
// the item's first key must not silently drop it from translation.
test("collectHomeUnits finds a value on a list item's first line", () => {
  const md = ["---", "features:", "  - title: Found anyway", "---"].join("\n");
  expect(collectHomeUnits(md)).toEqual(["Found anyway"]);
});

test("collectHomeUnits tolerates extra space after the list dash", () => {
  const md = ["---", "features:", "  -   text: Wide dash", "---"].join("\n");
  expect(collectHomeUnits(md)).toEqual(["Wide dash"]);
});

test("collectHomeUnits ignores body prose that looks like frontmatter", () => {
  const md = [
    "---",
    "hero:",
    "  text: Real copy",
    "---",
    "",
    "## Notes",
    "",
    "- title: A markdown list item, not frontmatter",
    "  details: Also body prose.",
  ].join("\n");
  expect(collectHomeUnits(md)).toEqual(["Real copy"]);
});

test("collectHomeUnits returns [] when the file has no frontmatter", () => {
  expect(collectHomeUnits("# Just a page\n\n- title: Nope\n")).toEqual([]);
});

test("collectHomeUnits returns [] when the frontmatter is unterminated", () => {
  expect(collectHomeUnits("---\nhero:\n  text: Unclosed\n")).toEqual([]);
});

// ── frontmatterRange ──────────────────────────────────────────────────────────

test("frontmatterRange spans the lines between the delimiters", () => {
  const lines = ["---", "layout: home", "hero:", "---", "", "body"];
  expect(frontmatterRange(lines)).toEqual([1, 3]);
});

test("frontmatterRange is null without a leading delimiter or a closing one", () => {
  expect(frontmatterRange(["# Page", "---", "text: x"])).toBeNull();
  expect(frontmatterRange(["---", "text: x"])).toBeNull();
});

test("frontmatterRange stops at the first closing delimiter, not a later horizontal rule", () => {
  const lines = ["---", "text: x", "---", "", "prose", "", "---", "", "more prose"];
  expect(frontmatterRange(lines)).toEqual([1, 2]);
});

// ── LINK_KEY ──────────────────────────────────────────────────────────────────

test("LINK_KEY matches a link on its own line and on a list item's first line", () => {
  expect("      link: /guide/x".match(LINK_KEY)?.slice(1)).toEqual(["      ", " ", "/guide/x"]);
  expect("    - link: /guide/x".match(LINK_KEY)?.slice(1)).toEqual(["    - ", " ", "/guide/x"]);
});

test("LINK_KEY ignores an external URL, which must not be locale-prefixed", () => {
  expect("  link: https://example.com".match(LINK_KEY)).toBeNull();
});

test("toBackticks and toGrave round-trip", () => {
  const graved = "Run &grave;npm i&grave; then &grave;vp build&grave;.";
  expect(toGrave(toBackticks(graved))).toBe(graved);
});

test("TRANSLATABLE_KEY exposes prefix, key, gap, and value for line rebuilding", () => {
  expect("    details: Some copy.".match(TRANSLATABLE_KEY)?.slice(1)).toEqual([
    "    ",
    "details",
    " ",
    "Some copy.",
  ]);
});

// The prefix must round-trip verbatim: translate-home rebuilds each line as
// `${prefix}${key}:${gap}${translated}`, so a swallowed `- ` would corrupt the YAML.
test("TRANSLATABLE_KEY captures a list dash in the prefix so the line rebuilds intact", () => {
  const line = "  - title: Some copy.";
  const [, prefix, key, gap, value] = line.match(TRANSLATABLE_KEY) ?? [];
  expect(prefix).toBe("  - ");
  expect(`${prefix}${key}:${gap}${value}`).toBe(line);
});
