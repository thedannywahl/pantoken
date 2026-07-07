import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { VANILLA_TO_INSTUI, toVanillaVariables } from "../src/to-variables.ts";

const fixture = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-background-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  { name: "--instui-color-background-base", syntax: "<color>", inherits: true, value: "#ffffff" },
  { name: "--instui-color-text-base", syntax: "<color>", inherits: true, value: "#2d3b45" },
];

test("nests dotted Foundation paths and resolves references", () => {
  const v = toVanillaVariables(fixture) as {
    global: { mainColors: { primary: string; bg: string; fg: string } };
  };
  expect(v.global.mainColors.primary).toBe("#0374B5");
  expect(v.global.mainColors.bg).toBe("#ffffff");
  expect(v.global.mainColors.fg).toBe("#2d3b45");
});

test("every mapped Instructure token exists in the real IR", () => {
  const names = new Set(tokens.map((t) => t.name));
  for (const instui of Object.values(VANILLA_TO_INSTUI)) expect(names.has(instui)).toBe(true);
});
