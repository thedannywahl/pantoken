// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { readToken, register, registerPantokenElements } from "../src/index.ts";

test("register is re-exported from the web-components package", () => {
  expect(typeof register).toBe("function");
});

test("readToken reads a resolved custom property when a document exists", () => {
  document.documentElement.style.setProperty("--instui-color-background-brand", "#0374B5");
  expect(readToken("--instui-color-background-brand", "#fallback")).toBe("#0374B5");
});

test("readToken falls back to the default when the property is unset", () => {
  expect(readToken("--instui-not-a-real-token", "#fallback")).toBe("#fallback");
});

test("registerPantokenElements does not throw in a DOM environment", () => {
  expect(() => registerPantokenElements()).not.toThrow();
});
