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

test("toStyleDictionary maps every CSS syntax to its native SD type", () => {
  const tokens: Token[] = [
    defineToken({ name: "--instui-spacing-md", value: "16px", syntax: "<length>" }),
    defineToken({ name: "--instui-ratio-w", value: "50%", syntax: "<percentage>" }),
    defineToken({ name: "--instui-lh", value: "1.5", syntax: "<number>" }),
    defineToken({ name: "--instui-z", value: "10", syntax: "<integer>" }),
    defineToken({ name: "--instui-icon-x", value: "url('data:...')", syntax: "<image>" }),
    defineToken({ name: "--instui-font", value: "Lato", syntax: "<custom-ident>" }),
  ];
  const sd = toStyleDictionary(tokens, "light");
  expect(sd["instui-spacing-md"].type).toBe("dimension");
  expect(sd["instui-ratio-w"].type).toBe("dimension");
  expect(sd["instui-lh"].type).toBe("number");
  expect(sd["instui-z"].type).toBe("number");
  expect(sd["instui-icon-x"].type).toBe("asset");
  expect(sd["instui-font"].type).toBe("other");
});

test("toStyleDictionary infers a reference token's type from its resolved value", () => {
  const tokens: Token[] = [
    defineToken({ name: "--instui-primitive-space", value: "8px" }),
    // syntax "*" (reference) → type inferred from the resolved concrete value (a length).
    defineToken({ name: "--instui-spacing-alias", value: "var(--instui-primitive-space)" }),
  ];
  const sd = toStyleDictionary(tokens, "light");
  expect(sd["instui-spacing-alias"]).toEqual({ value: "8px", type: "dimension" });
});

test("toStyleDictionary defaults to light mode when omitted", () => {
  const sd = toStyleDictionary(fixture);
  expect(sd["instui-color-bg"].value).toBe("#ffffff");
});
