// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { motionPreference } from "../src/lib/motion.ts";

test("reads the owning document's live media query", () => {
  const target = document.createElement("div");
  expect(motionPreference(target)?.media).toBe("(prefers-reduced-motion: reduce)");
});

test("documents without a browsing context do not create a media query", () => {
  const target = document.implementation.createHTMLDocument().createElement("div");
  expect(motionPreference(target)).toBeUndefined();
});
