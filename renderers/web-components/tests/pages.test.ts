// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

const MARKUP = `
  <instui-pages active="one">
    <section data-page="one">First</section>
    <section data-page="two">Second</section>
  </instui-pages>`;

// Mount via a template fragment so the slotted [data-page] panels exist when connectedCallback runs
// its first #apply (happy-dom otherwise attaches innerHTML children after connectedCallback).
function pages(markup = MARKUP): HTMLElement {
  const tpl = document.createElement("template");
  tpl.innerHTML = markup;
  document.body.appendChild(tpl.content);
  return document.querySelector("instui-pages") as HTMLElement;
}

function visible(el: HTMLElement): string[] {
  return [...el.querySelectorAll<HTMLElement>("[data-page]")]
    .filter((p) => !p.hidden)
    .map((p) => p.getAttribute("data-page") ?? "");
}

test("shows only the active panel and hides the rest", () => {
  const el = pages();
  expect(visible(el)).toEqual(["one"]);
});

test("with no active attribute it defaults to the first [data-page]", () => {
  const el = pages(`
    <instui-pages>
      <section data-page="a">A</section>
      <section data-page="b">B</section>
    </instui-pages>`);
  expect(visible(el)).toEqual(["a"]);
});

test("push shows the target panel, reflects active, and fires a `change`", () => {
  const el = pages();
  const seen: string[] = [];
  el.addEventListener("change", (e) => seen.push((e as CustomEvent).detail.page));
  (el as unknown as { push(id: string): void }).push("two");
  expect(visible(el)).toEqual(["two"]);
  expect(el.getAttribute("active")).toBe("two");
  expect(seen).toContain("two");
});

test("back pops the history stack to the previous panel", () => {
  const el = pages();
  const api = el as unknown as { push(id: string): void; back(): void };
  api.push("two");
  api.back();
  expect(visible(el)).toEqual(["one"]);
  expect(el.getAttribute("active")).toBe("one");
});

test("pushing an unknown page id is a no-op (active unchanged, no change event)", () => {
  const el = pages();
  el.setAttribute("active", "one");
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  (el as unknown as { push(id: string): void }).push("nope");
  expect(el.getAttribute("active")).toBe("one");
  expect(fired).toBe(false);
});

test("back at the base of the stack is a no-op (no change event)", () => {
  const el = pages();
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  (el as unknown as { back(): void }).back();
  expect(fired).toBe(false);
});

test("setting active externally navigates to that panel", () => {
  const el = pages();
  el.setAttribute("active", "two");
  expect(visible(el)).toEqual(["two"]);
});

test("--push / --back commands drive it from light DOM (click fallback)", () => {
  document.body.innerHTML = `
    <instui-pages id="p" active="one">
      <section data-page="one">First
        <button id="n" command="--push" commandfor="p" data-page="two">Next</button>
      </section>
      <section data-page="two">Second
        <button id="bk" command="--back" commandfor="p">Back</button>
      </section>
    </instui-pages>`;
  const el = document.querySelector("instui-pages") as HTMLElement;
  (document.getElementById("n") as HTMLButtonElement).click();
  expect(el.getAttribute("active")).toBe("two");
  (document.getElementById("bk") as HTMLButtonElement).click();
  expect(el.getAttribute("active")).toBe("one");
});
