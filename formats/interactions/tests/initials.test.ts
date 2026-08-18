// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initInitials } from "../src/behaviors/initials.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

test("sets data-initials from a multi-word name", () => {
  document.body.innerHTML = `<span id="a" class="instui-avatar">Foo Bar</span>`;
  const el = document.getElementById("a") as HTMLElement;
  initInitials(el);
  expect(el.getAttribute("data-initials")).toBe("FB");
  expect(el.textContent).toBe("Foo Bar");
});

test("uses the first and last word for a longer name", () => {
  document.body.innerHTML = `<span id="a" class="instui-avatar">  Sarah  Jane Robinson  </span>`;
  const el = document.getElementById("a") as HTMLElement;
  initInitials(el);
  expect(el.getAttribute("data-initials")).toBe("SR");
});

test("skips a single-token name (already-computed initials)", () => {
  document.body.innerHTML = `<span id="a" class="instui-avatar">DW</span>`;
  const el = document.getElementById("a") as HTMLElement;
  initInitials(el);
  expect(el.hasAttribute("data-initials")).toBe(false);
});

test("does not override an already-authored data-initials", () => {
  document.body.innerHTML = `<span id="a" class="instui-avatar" data-initials="XX">Foo Bar</span>`;
  const el = document.getElementById("a") as HTMLElement;
  initInitials(el);
  expect(el.getAttribute("data-initials")).toBe("XX");
});

test("skips when an <img> child is present", () => {
  document.body.innerHTML = `<span id="a" class="instui-avatar">Foo Bar<img src="x.png" alt=""></span>`;
  const el = document.getElementById("a") as HTMLElement;
  initInitials(el);
  expect(el.hasAttribute("data-initials")).toBe(false);
});

test("does nothing for empty or blank content", () => {
  document.body.innerHTML = `<span id="a" class="instui-avatar">   </span>`;
  const el = document.getElementById("a") as HTMLElement;
  initInitials(el);
  expect(el.hasAttribute("data-initials")).toBe(false);
});
