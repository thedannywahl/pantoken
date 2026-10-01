import { expect, test } from "vite-plus/test";
import { checkCompatibility } from "../scripts/check-compatibility.ts";
import { PantokenVue, readToken } from "../src/index.ts";

test("install marks instui-* tags as custom elements", () => {
  const app = { config: { compilerOptions: {} as { isCustomElement?: (t: string) => boolean } } };
  PantokenVue.install(app);
  expect(app.config.compilerOptions.isCustomElement?.("instui-icon")).toBe(true);
  expect(app.config.compilerOptions.isCustomElement?.("div")).toBe(false);
});

test("readToken returns the fallback on the server", () => {
  expect(readToken("--instui-color-background-brand", "#0374B5")).toBe("#0374B5");
});

test("rejects releases outside the checked Vue major", async () => {
  await expect(checkCompatibility("4.0.0")).rejects.toThrow("Invalid Vue 3 release");
});
