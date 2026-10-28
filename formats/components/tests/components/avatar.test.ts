import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { avatarCss } from "../../src/index.ts";
import { avatar } from "../../src/components/avatar/index.ts";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";
import { validate } from "../_validate.ts";

test("avatar: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(avatar);
});

test("avatar retains its intentional name abbreviation and authored-initials alternatives", () => {
  const css = avatarCss({ prefix: "instui" });
  expect(css).toContain("max-width: 1ch");
  expect(css).toContain("overflow: hidden");
  expect(css).toContain("content: attr(data-initials)");
  for (const name of ["name", "first-name", "last-name"]) expect(css).toContain(`.${name}`);
});

test("documentation and audit examples retain complete names without hiding accessible text", () => {
  const [record] = parseCssDocs(avatarCss({ prefix: "instui" }));
  expect(record.examples).toHaveLength(2);
  for (const example of record.examples) {
    const window = new Window();
    try {
      const { document } = window;
      document.body.innerHTML = exampleHtml(example);
      expect(document.querySelectorAll(".instui-avatar")).toHaveLength(5);
      for (const [part, text] of [
        ["name", "Miguel Sanchez"],
        ["first-name", "Miguel"],
        ["last-name", "Sanchez"],
      ]) {
        const element = document.querySelector(`.${part}`)!;
        expect(element.textContent.trim()).toBe(text);
        expect(element.closest('[aria-hidden="true"], [hidden], [inert]')).toBeNull();
        expect(element.closest("[aria-label]")).toBeNull();
      }
      const authored = document.querySelector('[data-initials="NV"]')!;
      expect(authored.textContent.trim()).toBe("Dr. Nguyen Van Thoc");
      expect(authored.closest('[aria-hidden="true"], [hidden], [inert]')).toBeNull();
    } finally {
      void window.happyDOM.abort();
    }
  }
});
