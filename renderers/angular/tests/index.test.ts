import { expect, test } from "vite-plus/test";
import { checkCompatibility } from "../scripts/check-compatibility.ts";
import { readToken, registerPantokenElements } from "../src/index.ts";

test("registerPantokenElements is a no-throw call (no-op without DOM)", () => {
  expect(() => registerPantokenElements()).not.toThrow();
});

test("readToken returns the fallback on the server", () => {
  expect(readToken("--instui-color-background-brand", "#0374B5")).toBe("#0374B5");
});

test("rejects malformed Angular versions before installing", async () => {
  await expect(checkCompatibility("22.2.0-next.1", "6.0.3", "0.16.0")).rejects.toThrow(
    "Invalid Angular/TypeScript releases",
  );
});
