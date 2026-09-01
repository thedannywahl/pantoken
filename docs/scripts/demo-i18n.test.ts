import { expect, test } from "vite-plus/test";
import { renderDemoI18n, validateDemoI18n } from "./demo-i18n.ts";

test("renders HTML, CSS, and JavaScript templates from an adjacent i18n source", () => {
  const localized = {
    intro: "translated-intro",
    outro: "translated-outro",
    comment: "translated-comment",
  };
  const source = validateDemoI18n(
    "<p>{{intro}} <code>x</code>{{outro}}</p>",
    {
      intro: { string: "Hello", verbatim: { allow: ["en*"] } },
      outro: { string: "!", verbatim: { allow: ["en*"] } },
      comment: { string: "A localized comment", verbatim: { allow: ["en*"] } },
    },
    { "style.css": "/* {{comment}} */", "script.js": "// {{comment}}" },
  );

  expect(renderDemoI18n(source.template, localized)).toBe(
    "<p>translated-intro <code>x</code>translated-outro</p>",
  );
  expect(renderDemoI18n(source.assets["style.css"]!, localized)).toBe("/* translated-comment */");
  expect(renderDemoI18n(source.assets["script.js"]!, localized)).toBe("// translated-comment");
  expect(source.verbatim.intro).toEqual({ allow: ["en*"] });
});

test("rejects missing and unused demo i18n keys", () => {
  expect(() => validateDemoI18n("{{missing}}", {})).toThrow("Missing demo i18n key 'missing'.");
  expect(() => validateDemoI18n("<p>Ready</p>", { unused: "Unused" })).toThrow(
    "Unused demo i18n key 'unused'.",
  );
});
