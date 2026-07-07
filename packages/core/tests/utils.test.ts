import { expect, test } from "vite-plus/test";
import { cssSyntaxForValue, isContextual, toKebab } from "../src/utils.ts";

test("toKebab converts CamelCase and spaces", () => {
  expect(toKebab("baseButton")).toBe("base-button");
  expect(toKebab("Font Family")).toBe("font-family");
  expect(toKebab("rebrandLight")).toBe("rebrand-light");
});

test("cssSyntaxForValue sniffs colors", () => {
  expect(cssSyntaxForValue("#fff")).toBe("<color>");
  expect(cssSyntaxForValue("#03893D")).toBe("<color>");
  expect(cssSyntaxForValue("rgb(1,2,3)")).toBe("<color>");
  expect(cssSyntaxForValue("transparent")).toBe("<color>");
});

test("cssSyntaxForValue sniffs images, lengths, and numbers", () => {
  expect(cssSyntaxForValue("url('data:image/svg+xml;utf8,x')")).toBe("<image>");
  expect(cssSyntaxForValue("2px")).toBe("<length>");
  expect(cssSyntaxForValue("50%")).toBe("<percentage>");
  expect(cssSyntaxForValue("400")).toBe("<integer>");
  expect(cssSyntaxForValue("1.5")).toBe("<number>");
});

test("cssSyntaxForValue returns universal for font-relative units and complex values", () => {
  expect(cssSyntaxForValue("1rem")).toBe("*");
  expect(cssSyntaxForValue("Lato, Helvetica, sans-serif")).toBe("*");
  expect(cssSyntaxForValue("currentColor")).toBe("*");
});

test("isContextual detects var() and light-dark()", () => {
  expect(isContextual("var(--x)")).toBe(true);
  expect(isContextual("light-dark(#fff, #000)")).toBe(true);
  expect(isContextual("#fff")).toBe(false);
});
