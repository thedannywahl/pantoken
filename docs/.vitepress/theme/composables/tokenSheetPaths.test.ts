import { expect, test } from "vite-plus/test";
import { tokenLeanSheet, tokenSheetFile } from "./tokenSheetPaths";

test("tokenLeanSheet resolves the canvas theme lean sheet", () => {
  expect(tokenLeanSheet("canvas", "adaptive")).toBe("npm/@pantoken/css/dist/style.canvas.lean.css");
});

test("tokenLeanSheet resolves the canvas high-contrast lean sheet", () => {
  expect(tokenLeanSheet("canvasHighContrast", "adaptive")).toBe(
    "npm/@pantoken/css/dist/style.canvas-high-contrast.lean.css",
  );
});

test("tokenLeanSheet resolves the rebrand light lean sheet", () => {
  expect(tokenLeanSheet("rebrand", "light")).toBe(
    "npm/@pantoken/css/dist/style.rebrand.light.lean.css",
  );
});

test("tokenLeanSheet resolves the rebrand adaptive lean sheet", () => {
  expect(tokenLeanSheet("rebrand", "adaptive")).toBe("npm/@pantoken/css/dist/style.lean.css");
});

test("tokenSheetFile resolves the canvas theme CdnFile", () => {
  expect(tokenSheetFile("canvas", "adaptive")).toEqual({
    package: "@pantoken/css",
    path: "dist/style.canvas.lean.css",
  });
});

test("tokenSheetFile resolves the canvas high-contrast CdnFile", () => {
  expect(tokenSheetFile("canvasHighContrast", "adaptive")).toEqual({
    package: "@pantoken/css",
    path: "dist/style.canvas-high-contrast.lean.css",
  });
});

test("tokenSheetFile resolves the rebrand light CdnFile", () => {
  expect(tokenSheetFile("rebrand", "light")).toEqual({
    package: "@pantoken/css",
    path: "dist/style.rebrand.light.lean.css",
  });
});

test("tokenSheetFile resolves the rebrand adaptive CdnFile", () => {
  expect(tokenSheetFile("rebrand", "adaptive")).toEqual({
    package: "@pantoken/css",
    path: "dist/style.lean.css",
  });
});
