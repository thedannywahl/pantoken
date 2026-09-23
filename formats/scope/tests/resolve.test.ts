// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { resolveInstance, resolveScheme, resolveScope } from "../src/resolve.ts";

function mount(html: string): HTMLElement {
  document.body.innerHTML = html;
  return document.body;
}

test("a descendant resolves the nearest ancestor scope", () => {
  mount(`<div data-pantoken-theme="canvas"><span id="x"></span></div>`);
  expect(resolveScope(document.querySelector("#x")).theme).toBe("canvas");
});

test("the nearest scope wins over an outer one", () => {
  mount(`
    <div data-pantoken-theme="rebrand">
      <div data-pantoken-theme="canvas"><span id="x"></span></div>
    </div>
  `);
  expect(resolveScope(document.querySelector("#x")).theme).toBe("canvas");
});

test("fields resolve independently, so a subtree can override scheme but inherit theme", () => {
  mount(`
    <div data-pantoken-theme="canvas" data-pantoken-color="navy">
      <div data-pantoken-scheme="dark"><span id="x"></span></div>
    </div>
  `);
  const scope = resolveScope(document.querySelector("#x"));
  expect(scope.theme).toBe("canvas");
  expect(scope.color).toBe("navy");
  expect(scope.scheme).toBe("dark");
});

test("resolution stops at a boundary but still reads the boundary's own attributes", () => {
  mount(`
    <div data-pantoken-theme="rebrand" data-pantoken-color="navy">
      <div data-pantoken-boundary data-pantoken-theme="canvas">
        <span id="x"></span>
      </div>
    </div>
  `);
  const scope = resolveScope(document.querySelector("#x"));
  expect(scope.theme).toBe("canvas");
  expect(scope.bounded).toBe(true);
  // The outer color must not leak across the boundary.
  expect(scope.color).toBeUndefined();
});

test("an unscoped element resolves to nothing rather than to the document", () => {
  mount(`<span id="x"></span>`);
  const scope = resolveScope(document.querySelector("#x"));
  expect(scope.theme).toBeUndefined();
  expect(scope.element).toBeNull();
  expect(scope.bounded).toBe(false);
});

test("sibling scopes do not see each other", () => {
  mount(`
    <div data-pantoken-theme="rebrand" data-pantoken-scheme="dark"><span id="a"></span></div>
    <div data-pantoken-theme="canvas" data-pantoken-scheme="light"><span id="b"></span></div>
  `);
  expect(resolveScope(document.querySelector("#a"))).toMatchObject({
    theme: "rebrand",
    scheme: "dark",
  });
  expect(resolveScope(document.querySelector("#b"))).toMatchObject({
    theme: "canvas",
    scheme: "light",
  });
});

test("an empty attribute value is treated as unset", () => {
  mount(`<div data-pantoken-theme=""><span id="x"></span></div>`);
  expect(resolveScope(document.querySelector("#x")).theme).toBeUndefined();
});

test("an invalid scheme is ignored rather than propagated", () => {
  mount(`<div data-pantoken-scheme="sepia"><span id="x"></span></div>`);
  expect(resolveScope(document.querySelector("#x")).scheme).toBeUndefined();
});

test("instance ids resolve through the tree and default when absent", () => {
  mount(`
    <div data-pantoken-instance="preview"><span id="a"></span></div>
    <span id="b"></span>
  `);
  expect(resolveInstance(document.querySelector("#a"))).toBe("preview");
  expect(resolveInstance(document.querySelector("#b"))).toBe("pantoken");
});

test("resolveScheme prefers an explicit pin over anything computed", () => {
  mount(`<div data-pantoken-scheme="dark"><span id="x"></span></div>`);
  expect(resolveScheme(document.querySelector("#x"))).toBe("dark");
});

test("two subtrees can resolve to different schemes at the same time", () => {
  mount(`
    <div data-pantoken-scheme="dark"><span id="a"></span></div>
    <div data-pantoken-scheme="light"><span id="b"></span></div>
  `);
  expect(resolveScheme(document.querySelector("#a"))).toBe("dark");
  expect(resolveScheme(document.querySelector("#b"))).toBe("light");
});

test("resolveScope tolerates a null element", () => {
  expect(resolveScope(null).element).toBeNull();
});
