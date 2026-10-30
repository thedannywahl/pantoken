import { expect, test } from "vite-plus/test";
import { DEFAULT_PREFIX, ns, withPrefix } from "../src/shared/prefix.ts";

test("withPrefix swaps the sentinel for the prefix, or removes it when empty", () => {
  const text = ".pfx-button, .pfx-form-field-message.-type-error";
  expect(withPrefix(text)).toBe(".instui-button, .instui-form-field-message.-type-error");
  expect(withPrefix(text, "x")).toBe(".x-button, .x-form-field-message.-type-error");
  expect(withPrefix(text, "")).toBe(".button, .form-field-message.-type-error");
});

test("ns returns the dashed namespace", () => {
  expect(ns(DEFAULT_PREFIX)).toBe("instui-");
  expect(ns("")).toBe("");
});
