/**
 * ESLint flat config — the sole job here is `@cssdoc/eslint-plugin`'s `cssdoc/valid-doc-comments` over
 * the `.css` that carries cssdoc doc comments: the generated component sheets and the web-component
 * shadow styles. It's the author-side companion to the stylelint plugin (same `@cssdoc/lint-core` rules
 * via the `@eslint/css` language). Its options (rscss modifiers, the off-list, `structureIgnore`) live in
 * the repo's `cssdoc.json`, which the plugin auto-loads per file — one declarative config, none inlined here.
 */
import cssdoc from "@cssdoc/eslint-plugin";
import css from "@eslint/css";

export default [
  {
    files: ["formats/components/generated/*.css", "renderers/web-components/src/**/*.css"],
    plugins: { css, cssdoc },
    language: "css/css",
    // Options come from cssdoc.json (auto-loaded per linted file).
    rules: { "cssdoc/valid-doc-comments": "error" },
  },
];
