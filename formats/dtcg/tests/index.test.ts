import { expect, test } from "vite-plus/test";
import { byTheme, dtcg, themes } from "../src/index.ts";

test("dtcg is the rebrand tree and equals themes.rebrand", () => {
  expect(dtcg).toBe(themes.rebrand);
  expect(typeof dtcg).toBe("object");
});

test("themes exposes every theme as a DTCG document", () => {
  expect(Object.keys(themes).sort()).toEqual(["canvas", "canvasHighContrast", "rebrand"]);
});

test("byTheme looks a theme up by name", () => {
  expect(byTheme("canvas")).toBe(themes.canvas);
  expect(byTheme("canvasHighContrast")).toBe(themes.canvasHighContrast);
});
