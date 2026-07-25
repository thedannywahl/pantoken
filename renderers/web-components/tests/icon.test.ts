// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();

afterEach(() => {
  document.body.innerHTML = "";
});

test("icon renders inline SVG into its own light DOM and sizes/tints the host", () => {
  document.body.innerHTML = `<instui-icon name="arrow-left" size="1.5rem" color="gold"></instui-icon>`;
  const el = document.querySelector("instui-icon") as HTMLElement;
  expect(el.innerHTML.startsWith("<svg")).toBe(true);
  expect(el.style.display).toBe("inline-flex");
  expect(el.style.width).toBe("1.5rem");
  expect(el.style.height).toBe("1.5rem");
  expect(el.style.color).toBe("gold");
});

test("icon defaults size to 1em and leaves color unset when absent", () => {
  document.body.innerHTML = `<instui-icon name="arrow-left"></instui-icon>`;
  const el = document.querySelector("instui-icon") as HTMLElement;
  expect(el.style.width).toBe("1em");
  expect(el.style.height).toBe("1em");
  expect(el.style.color).toBe("");
});

test("icon renders empty for an unknown glyph name and re-renders on name change", () => {
  document.body.innerHTML = `<instui-icon name="definitely-not-an-icon"></instui-icon>`;
  const el = document.querySelector("instui-icon") as HTMLElement;
  expect(el.innerHTML).toBe("");
  el.setAttribute("name", "arrow-left");
  expect(el.innerHTML.startsWith("<svg")).toBe(true);
});

test("icon with no name renders empty (falls back to empty string)", () => {
  document.body.innerHTML = `<instui-icon></instui-icon>`;
  const el = document.querySelector("instui-icon") as HTMLElement;
  expect(el.innerHTML).toBe("");
});
