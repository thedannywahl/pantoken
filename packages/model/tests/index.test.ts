import { expect, expectTypeOf, test } from "vite-plus/test";
import type { Token } from "../src/index.ts";

test("Token type accepts a well-formed IR record", () => {
  const token: Token = {
    name: "--instui-color-background-base",
    syntax: "<color>",
    inherits: true,
    value: "#ffffff",
  };
  expect(token.name).toBe("--instui-color-background-base");
  expectTypeOf(token.value).toEqualTypeOf<string>();
});
