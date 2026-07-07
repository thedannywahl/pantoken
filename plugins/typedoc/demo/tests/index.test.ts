import { expect, test } from "vite-plus/test";
import type { Comment } from "typedoc";
import { DEMO_TAG, rewriteComment, toDemoFence } from "../src/index.ts";

/** A minimal comment shaped like TypeDoc's, enough for rewriteComment. */
const fakeComment = (
  summary: { kind: "text"; text: string }[],
  blockTags: { tag: string; content: { kind: "text"; text: string }[] }[],
): Comment => ({ summary, blockTags }) as unknown as Comment;

test("toDemoFence wraps a spec in a demo fence", () => {
  expect(toDemoFence("stackblitz:abc")).toBe("```demo\nstackblitz:abc\n```");
  expect(toDemoFence("/pantoken/guide/components")).toContain(
    "```demo\n/pantoken/guide/components",
  );
});

test("rewriteComment appends a fence and drops the @demo tag, keeping other tags", () => {
  const comment = fakeComment(
    [{ kind: "text", text: "A button stylesheet." }],
    [
      { tag: "@param", content: [{ kind: "text", text: "options" }] },
      { tag: DEMO_TAG, content: [{ kind: "text", text: "self:button" }] },
    ],
  );
  rewriteComment(comment);

  expect(comment.blockTags.some((tag) => tag.tag === DEMO_TAG)).toBe(false);
  expect(comment.blockTags.some((tag) => tag.tag === "@param")).toBe(true);
  const summary = comment.summary.map((part) => part.text).join("");
  expect(summary).toContain("```demo\nself:button\n```");
});

test("supports multiple @demo tags, in order", () => {
  const comment = fakeComment(
    [],
    [
      { tag: DEMO_TAG, content: [{ kind: "text", text: "url:/a" }] },
      { tag: DEMO_TAG, content: [{ kind: "text", text: "stackblitz:b" }] },
    ],
  );
  rewriteComment(comment);

  const summary = comment.summary.map((part) => part.text).join("");
  expect(summary.indexOf("url:/a")).toBeLessThan(summary.indexOf("stackblitz:b"));
});

test("leaves comments without a @demo tag untouched", () => {
  const comment = fakeComment(
    [{ kind: "text", text: "No demo here." }],
    [{ tag: "@returns", content: [{ kind: "text", text: "css" }] }],
  );
  rewriteComment(comment);
  expect(comment.summary).toHaveLength(1);
  expect(comment.blockTags).toHaveLength(1);
});
