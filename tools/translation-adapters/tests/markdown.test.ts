import { expect, test } from "vite-plus/test";
import {
  assertCleanMarkdownTranslation,
  buildMarkdownTranslationPrompt,
  preserveMarkdown,
  restoreMarkdown,
  stripMarkdownEnvelope,
} from "../src/markdown.ts";

const SOURCE = [
  "# {{projectName}}",
  "",
  "A Vite app styled with [`@pantoken/react`](https://npmjs.com/package/@pantoken/react).",
  "",
  "```sh",
  "npm install",
  "```",
  "",
  "See `Readonly`\\<`Record`\\<`string`, `string`\\>\\> for details.",
  "",
].join("\n");

test("masks every token a model must not rewrite", () => {
  const preserved = preserveMarkdown(SOURCE);
  expect(preserved.text).not.toContain("{{projectName}}");
  expect(preserved.text).not.toContain("@pantoken/react");
  expect(preserved.text).not.toContain("npm install");
  expect(preserved.text).not.toContain("\\<");
  expect(preserved.text).toContain("__PTK_VAR_0__");
});

test("leaves translatable prose visible to the model", () => {
  expect(preserveMarkdown(SOURCE).text).toContain("A Vite app styled with");
});

test("round-trips an untouched document byte for byte", () => {
  const preserved = preserveMarkdown(SOURCE);
  expect(restoreMarkdown(preserved.text, preserved)).toBe(SOURCE);
});

test("restores masked tokens around translated prose", () => {
  const preserved = preserveMarkdown(SOURCE);
  const translated = preserved.text.replace("A Vite app styled with", "Egy Vite alkalmazás");
  const restored = restoreMarkdown(translated, preserved);
  expect(restored).toContain("Egy Vite alkalmazás");
  expect(restored).toContain("# {{projectName}}");
  expect(restored).toContain("[`@pantoken/react`](https://npmjs.com/package/@pantoken/react)");
  expect(restored).toContain("```sh\nnpm install\n```");
});

test("masks a fenced block as one unit rather than per line", () => {
  const preserved = preserveMarkdown(SOURCE);
  expect(preserved.codeBlocks).toEqual(["```sh\nnpm install\n```"]);
});

test("prompt names the target language and wraps the document in its envelope", () => {
  const prompt = buildMarkdownTranslationPrompt("body", "Hungarian", "react/README.md");
  expect(prompt).toContain("English to Hungarian");
  expect(prompt).toContain("File: react/README.md");
  expect(prompt).toContain("Do not include explanations, reasoning, analysis");
  expect(prompt).toContain("--- BEGIN MARKDOWN ---\nbody\n--- END MARKDOWN ---");
});

test("strips the envelope when a model echoes the delimiters back", () => {
  expect(stripMarkdownEnvelope("chatter\n--- BEGIN MARKDOWN ---\nbody\n--- END MARKDOWN ---")).toBe(
    "body",
  );
});

test("returns the response unchanged when no envelope is echoed", () => {
  expect(stripMarkdownEnvelope("just the body")).toBe("just the body");
});

test("accepts a plain translated markdown body", () => {
  expect(() =>
    assertCleanMarkdownTranslation("# Komponensek\n\nLefordított tartalom.", "guide/a.md"),
  ).not.toThrow();
});

test("rejects model self-correction commentary", () => {
  expect(() =>
    assertCleanMarkdownTranslation(
      "# Komponensek\n\nOops — must not produce garbled. I'll continue carefully.",
      "guide/a.md",
    ),
  ).toThrow(/model commentary/);
});

test("rejects repeated-character garbage", () => {
  expect(() =>
    assertCleanMarkdownTranslation(
      "Թարգմանություն任任任任任任任任任任任任任任任任任任任任任任任任任",
      "guide/a.md",
    ),
  ).toThrow(/repeated-character garbage/);
});

test("rejects duplicated whole-document starts", () => {
  expect(() =>
    assertCleanMarkdownTranslation(
      "# Komponensek\n\nTartalom.\n\n# Komponensek\n\nTartalom.",
      "guide/a.md",
    ),
  ).toThrow(/multiple document starts/);
});

test("rejects unexpected CJK characters for non-CJK target languages", () => {
  expect(() =>
    assertCleanMarkdownTranslation(
      "Գործընթացի բարերը ընդունում են任意 մասշտաբներ։",
      "guide/a.md",
      "Armenian",
    ),
  ).toThrow(/unexpected CJK characters/);
});

test("allows CJK characters for CJK target languages", () => {
  expect(() =>
    assertCleanMarkdownTranslation(
      "# コンポーネント\n\n任意の尺度を受け入れます。",
      "guide/a.md",
      "Japanese",
    ),
  ).not.toThrow();
});
