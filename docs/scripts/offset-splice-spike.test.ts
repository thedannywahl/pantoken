import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vite-plus/test";
import {
  assertDisjoint,
  collectLeafRanges,
  roundTrips,
  splice,
  type LeafRange,
} from "./offset-splice-spike.ts";

const docsRoot = join(import.meta.dirname, "..");

test("round-trip identity holds for a simple paragraph", () => {
  expect(roundTrips("Hello **world**, this is `code` and a [link](https://x).\n")).toBe(true);
});

test("round-trip identity holds for empty and whitespace-only input", () => {
  for (const md of ["", "\n", "\n\n\n"]) expect(roundTrips(md)).toBe(true);
});

test("resolving a leaf actually changes the output at the right offset", () => {
  const md = "Say hello to the world.\n";
  const out = splice(md, collectLeafRanges(md), (text) => text.toUpperCase());
  expect(out).toBe("SAY HELLO TO THE WORLD.\n");
});

describe("the three required embedded cases round-trip (opaque, not sub-extracted)", () => {
  test("an html-lang fence", () => {
    const md = [
      "# Example",
      "",
      "```html",
      '<button aria-label="Close">×</button>',
      "```",
      "",
    ].join("\n");
    expect(roundTrips(md)).toBe(true);
  });

  test("the embedded:shell agent-bootstrap prompt", () => {
    const md = [
      "```sh",
      'claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."',
      "```",
      "",
    ].join("\n");
    expect(roundTrips(md)).toBe(true);
  });

  test("an embedded:mermaid block", () => {
    const md = [
      "```mermaid",
      "flowchart TD",
      '  a["the IR, vendored as static JSON per theme"] --> b["(the decoupling point)"]',
      "```",
      "",
    ].join("\n");
    expect(roundTrips(md)).toBe(true);
  });
});

describe("embedded:markdown recursion", () => {
  test("recurses into a nested md fence, contributing only children's ranges", () => {
    const md = ["# Outer", "", "```md", "Inner **prose** here.", "```", ""].join("\n");
    const ranges = collectLeafRanges(md);
    // The fence's own [start,end) must NOT appear — only its recursed children's ranges do.
    const fenceStart = md.indexOf("```md");
    const fenceEnd = md.indexOf("```", fenceStart + 5) + 3;
    expect(ranges.some((r) => r.start === fenceStart && r.end === fenceEnd)).toBe(false);
    expect(() => assertDisjoint(ranges)).not.toThrow();
    expect(roundTrips(md)).toBe(true);
  });

  test("a nested embedded:html fence inside an embedded:markdown block still round-trips", () => {
    const md = [
      "# Outer",
      "",
      "```md",
      "Some prose.",
      "",
      "```html",
      '<span aria-label="hi"></span>',
      "```",
      "```",
      "",
    ].join("\n");
    expect(roundTrips(md)).toBe(true);
  });

  test("assertDisjoint rejects a deliberately broken extractor (parent + child both included)", () => {
    const md = ["```md", "Inner text.", "```", ""].join("\n");
    const fenceStart = md.indexOf("```md");
    const fenceEnd = md.lastIndexOf("```") + 3;
    const broken: LeafRange[] = [
      { start: fenceStart, end: fenceEnd, text: md.slice(fenceStart, fenceEnd), kind: "code" },
      ...collectLeafRanges(md),
    ];
    expect(() => assertDisjoint(broken)).toThrow(/Overlapping\/contained ranges/u);
    expect(() => splice(md, broken, (t) => t)).toThrow(/Overlapping\/contained ranges/u);
  });
});

const apiFiles = globSync("api/**/*.md", { cwd: docsRoot });
const guideFiles = globSync("guide/**/*.md", { cwd: docsRoot });

describe.runIf(apiFiles.length > 0 && guideFiles.length > 0)(
  "round-trips the real generated corpus",
  () => {
    test("every generated API page round-trips byte-identical", () => {
      const failures: string[] = [];
      for (const file of apiFiles) {
        const md = readFileSync(join(docsRoot, file), "utf8");
        if (!roundTrips(md)) failures.push(file);
      }
      expect(failures).toEqual([]);
    });

    test("every guide page round-trips byte-identical", () => {
      const failures: string[] = [];
      for (const file of guideFiles) {
        const md = readFileSync(join(docsRoot, file), "utf8");
        if (!roundTrips(md)) failures.push(file);
      }
      expect(failures).toEqual([]);
    });

    test("the corpus actually contains an html fence, the shell prompt, and a mermaid block", () => {
      const allGuide = guideFiles.map((f) => readFileSync(join(docsRoot, f), "utf8")).join("\n");
      const allApi = apiFiles.map((f) => readFileSync(join(docsRoot, f), "utf8")).join("\n");
      expect(allApi.includes("```html") || allGuide.includes("```html")).toBe(true);
      expect(allGuide).toContain("```prompt");
      expect(allGuide.includes("```mermaid")).toBe(true);
    });
  },
);
