import { expect, test } from "vite-plus/test";
import { preservesMarkdownStructure } from "./markdown-structure.ts";

test("rejects output that lost guide markdown structure", () => {
  const source = ["# Heading", "", "|Name|Value|", "|---|---|", "|a|b|"].join("\n");
  expect(preservesMarkdownStructure(source, "I cannot translate this.")).toBe(false);
  expect(preservesMarkdownStructure(source, source)).toBe(true);
});
