import { expect, test } from "vite-plus/test";
import { defineToken } from "../src/plugin.ts";
import { resolveReferences, toStyleDictionary } from "../src/style-dictionary.ts";
import type { Token } from "../src/model.ts";

const fixture: Token[] = [
  defineToken({ name: "--instui-primitive-color-blue", value: "#0374B5" }),
  defineToken({ name: "--instui-color-brand", value: "var(--instui-primitive-color-blue)" }),
  defineToken({
    name: "--instui-color-bg",
    value: "light-dark(#ffffff, #000000)",
  }),
  defineToken({ name: "--instui-component-btn-bg", value: "var(--instui-color-brand)" }),
];

test("resolveReferences flattens var() chains to concrete values", () => {
  const light = resolveReferences(fixture, "light");
  expect(light.get("--instui-color-brand")).toBe("#0374B5");
  expect(light.get("--instui-component-btn-bg")).toBe("#0374B5");
});

test("resolveReferences picks the requested light-dark() mode", () => {
  expect(resolveReferences(fixture, "light").get("--instui-color-bg")).toBe("#ffffff");
  expect(resolveReferences(fixture, "dark").get("--instui-color-bg")).toBe("#000000");
});

test("toStyleDictionary strips the -- prefix and maps types", () => {
  const sd = toStyleDictionary(fixture, "light");
  expect(sd["instui-color-brand"]).toEqual({ value: "#0374B5", type: "color" });
  expect(sd["instui-component-btn-bg"].value).toBe("#0374B5");
});
