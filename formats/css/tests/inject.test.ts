import { expect, test } from "vite-plus/test";
import { css } from "../src/index.ts";
import { inject } from "../src/inject.ts";

/** A minimal stand-in for the tiny slice of the DOM `inject` touches. */
function fakeDocument() {
  const store: FakeStyle[] = [];
  return {
    store,
    head: {
      append(el: FakeStyle) {
        store.push(el);
      },
    },
    querySelector(_selector: string) {
      return store.find((el) => el.attrs["data-pantoken"] !== undefined) ?? null;
    },
    createElement(_tag: string): FakeStyle {
      return {
        attrs: {},
        textContent: "",
        setAttribute(name: string, value: string) {
          this.attrs[name] = value;
        },
      };
    },
  };
}

interface FakeStyle {
  attrs: Record<string, string>;
  textContent: string;
  setAttribute(name: string, value: string): void;
}

test("inject() no-ops (returns undefined) with no document", () => {
  // The module-level `inject()` side-effect already ran on import in this DOM-less env; calling it
  // again with no document must stay safe.
  expect(inject(undefined)).toBeUndefined();
});

test("inject() creates a <style data-pantoken> carrying the css and appends it to head", () => {
  const doc = fakeDocument();
  const style = inject(doc as unknown as Document) as unknown as FakeStyle;
  expect(style.attrs["data-pantoken"]).toBe("css");
  expect(style.textContent).toBe(css);
  expect(doc.store).toHaveLength(1);
});

test("inject() is idempotent: a second call returns the existing element", () => {
  const doc = fakeDocument();
  const first = inject(doc as unknown as Document);
  const second = inject(doc as unknown as Document);
  expect(second).toBe(first);
  expect(doc.store).toHaveLength(1);
});
