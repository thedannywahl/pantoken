/**
 * ESLint flat config — the sole job here is `@cssdoc/eslint-plugin`'s `cssdoc/valid-doc-comments` over
 * the `.css` that carries cssdoc doc comments: the authored component records
 * (`formats/components/src/**`), the generated component sheets built from them, and the web-component
 * shadow styles. It's the author-side companion to the stylelint plugin (same `@cssdoc/lint-core` rules
 * via the `@eslint/css` language). Its options (rscss modifiers, the off-list, `structureIgnore`, and the
 * source-linting `providers`) live in the repo's `cssdoc.json` files, which the plugin auto-loads per
 * file — the `formats/components/cssdoc.jsonc` scope adds the sibling-record provider for the source.
 */
import cssdoc from "@cssdoc/eslint-plugin";
import css from "@eslint/css";

export default [
  {
    files: [
      "formats/components/src/{components,utilities,rules}/*.css",
      "formats/components/generated/*.css",
      "plugins/pantoken/*/generated/*.css",
      "renderers/web-components/src/**/*.css",
    ],
    plugins: { css, cssdoc },
    language: "css/css",
    // Options come from cssdoc.json (auto-loaded per linted file).
    rules: { "cssdoc/valid-doc-comments": "error" },
  },
];
