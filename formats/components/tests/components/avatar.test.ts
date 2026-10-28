import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";
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
  const targets = resolveExampleTargets(record.examples);
  expect(targets.docs).toHaveLength(1);
  expect(targets.automatica11y).toHaveLength(1);
  for (const [index, example] of record.examples.entries()) {
    const window = new Window();
    try {
      const { document } = window;
      document.body.innerHTML = exampleHtml(example);
      const isAudit = targets.automatica11y.includes(index);
      const avatars = document.querySelectorAll(".instui-avatar");
      if (isAudit) expect(avatars.length).toBeGreaterThan(5);
      else expect(avatars).toHaveLength(5);
      for (const [part, text] of [
        ["name", isAudit ? "Amira Patel" : "Miguel Sanchez"],
        ["first-name", "Miguel"],
        ["last-name", "Sanchez"],
      ]) {
        const element = document.querySelector(`.${part}`)!;
        expect(element.textContent.trim()).toBe(text);
        expect(element.closest('[aria-hidden="true"], [hidden], [inert]')).toBeNull();
        expect(element.closest("[aria-label]")).toBeNull();
      }
      const authored = document.querySelector('[data-initials="NV"]')!;
      expect(authored.textContent.trim()).toBe(isAudit ? "Nguyen Van Thoc" : "Dr. Nguyen Van Thoc");
      expect(authored.closest('[aria-hidden="true"], [hidden], [inert]')).toBeNull();
      if (isAudit) {
        expect(document.querySelector(".instui-avatar > img")).not.toBeNull();
        for (const avatar of avatars) {
          expect(avatar.closest('[aria-hidden="true"], [hidden], [inert]')).toBeNull();
          expect(avatar.closest("[aria-label]")).toBeNull();
          const image = avatar.querySelector("img");
          const name = image?.getAttribute("alt") ?? avatar.textContent.trim();
          expect(name).toMatch(
            avatar.querySelector(".first-name, .last-name") ? /\S{2,}/u : /\S{2,}\s+\S{2,}/u,
          );
          for (const part of avatar.querySelectorAll(".name, .first-name, .last-name")) {
            expect(part.textContent.trim().length).toBeGreaterThan(1);
            expect(part.closest('[aria-hidden="true"], [hidden], [inert]')).toBeNull();
            expect(part.closest("[aria-label]")).toBeNull();
          }
        }
      }
    } finally {
      void window.happyDOM.abort();
    }
  }
});
