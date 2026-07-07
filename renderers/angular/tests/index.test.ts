import { expect, test } from "vite-plus/test";
import { readToken, registerPantokenElements } from "../src/index.ts";

test("registerPantokenElements is a no-throw call (no-op without DOM)", () => {
  expect(() => registerPantokenElements()).not.toThrow();
});

test("readToken returns the fallback on the server", () => {
  expect(readToken("--instui-color-background-brand", "#0374B5")).toBe("#0374B5");
});
