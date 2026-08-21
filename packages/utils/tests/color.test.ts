import { expect, test } from "vite-plus/test";
import { parseHexColor } from "../src/color.ts";

test("parseHexColor handles #rgb, #rrggbb, #rrggbbaa", () => {
  expect(parseHexColor("#fff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  expect(parseHexColor("#0374B5")).toEqual({ r: 3, g: 116, b: 181, a: 1 });
  expect(parseHexColor("#00000080")?.a).toBeCloseTo(128 / 255);
  expect(parseHexColor("nope")).toBeUndefined();
});
