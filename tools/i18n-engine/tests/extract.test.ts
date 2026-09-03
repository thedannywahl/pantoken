import { describe, expect, test } from "vite-plus/test";
import {
  collectProseRanges,
  extractFileUnits,
  extractFrontmatterUnits,
  extractGuideSpace,
  renderFile,
  renderFrontmatterFile,
  renderRanges,
} from "../src/extract.ts";

const docsRoot = new URL("../../../docs/", import.meta.url).pathname;

describe("collectProseRanges / renderFile", () => {
  test("collects paragraph text and round-trips with the identity resolver", () => {
    const md = "Hello **world**, this is a paragraph.\n";
    const ranges = collectProseRanges(md);
    expect(ranges.map((r) => r.text).join("")).toContain("Hello ");
    expect(renderFile(md, (t) => t)).toBe(md);
  });

  test("resolving text actually changes the rendered output", () => {
    const md = "Say hello to the world.\n";
    expect(renderFile(md, (t) => t.toUpperCase())).toBe("SAY HELLO TO THE WORLD.\n");
  });

  test("never extracts code fence or inline code content", () => {
    const md = [
      "```html",
      '<button aria-label="Close">Close</button>',
      "```",
      "",
      "Use `foo()`.",
    ].join("\n");
    const ranges = collectProseRanges(md);
    expect(ranges.map((r) => r.text).join(" ")).not.toContain("aria-label");
    expect(ranges.map((r) => r.text).join(" ")).not.toContain("foo()");
    expect(ranges.some((r) => r.text.includes("Use"))).toBe(true);
  });

  test("skips whitespace-only text nodes", () => {
    const md = "# Heading\n\n\n## Next\n";
    const ranges = collectProseRanges(md);
    expect(ranges.every((r) => r.text.trim() !== "")).toBe(true);
  });
});

describe("extractFileUnits", () => {
  test("attaches a 1-indexed line reference", () => {
    const units = extractFileUnits("line one\n\nline two\n", "guide/x.md");
    expect(units[0]).toEqual({
      msgid: "line one",
      reference: "guide/x.md:1",
      translate: "always",
    });
    expect(units.find((u) => u.msgid === "line two")?.reference).toBe("guide/x.md:3");
  });
});

describe("frontmatter content extraction", () => {
  const source = [
    "---",
    "hero:",
    "  text: InstUI, everywhere",
    "  tagline: One resolved token model.",
    "  link: /guide/",
    "features:",
    "  - title: Vendored tokens",
    "    details: Run &grave;npm i&grave; and go.",
    "---",
    "",
    "- title: body prose, not frontmatter",
  ].join("\n");

  test("extracts visible values, preserves references, and normalizes grave markers", () => {
    expect(extractFrontmatterUnits(source, "index.md")).toEqual([
      { msgid: "InstUI, everywhere", reference: "index.md:3", translate: "always" },
      { msgid: "One resolved token model.", reference: "index.md:4", translate: "always" },
      { msgid: "Vendored tokens", reference: "index.md:7", translate: "always" },
      { msgid: "Run `npm i` and go.", reference: "index.md:8", translate: "always" },
    ]);
  });

  test("renders translated values while leaving links and body prose untouched", () => {
    expect(renderFrontmatterFile(source, (text) => `X:${text}`, "hu")).toContain(
      "text: X:InstUI, everywhere",
    );
    expect(renderFrontmatterFile(source, (text) => `X:${text}`, "hu")).toContain(
      "details: X:Run &grave;npm i&grave; and go.",
    );
    expect(renderFrontmatterFile(source, (text) => `X:${text}`, "hu")).toContain(
      "- title: body prose, not frontmatter",
    );
    expect(renderFrontmatterFile(source, (text) => text, "hu")).toContain("link: /hu/guide/");
  });
});

describe("extractGuideSpace (the real docs/guide corpus)", () => {
  const units = extractGuideSpace(docsRoot);

  test("extracts a non-trivial number of units from real files", () => {
    expect(units.length).toBeGreaterThan(20);
  });

  test("every unit has a non-empty msgid and a guide/ reference", () => {
    for (const unit of units) {
      expect(unit.msgid.trim()).not.toBe("");
      expect(unit.reference).toMatch(/^guide\/.+\.md:\d+$/u);
    }
  });

  test("the agent-bootstrap shell prompt is NOT extracted (fence stays preserved)", () => {
    expect(units.some((u) => u.msgid.includes("Fetch https://create.pantoken.app"))).toBe(false);
  });

  test("real prose from getting-started.md IS extracted", () => {
    expect(units.some((u) => u.reference.startsWith("guide/getting-started.md"))).toBe(true);
  });

  test("renderRanges accepts an extractor-specific range set", () => {
    const source = "alpha beta";
    const ranges = [
      { start: 0, end: 5, text: "alpha" },
      { start: 6, end: 10, text: "beta" },
    ];
    expect(renderRanges(source, ranges, (text) => text.toUpperCase())).toBe("ALPHA BETA");
  });
});
