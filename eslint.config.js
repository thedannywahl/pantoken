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
import tsParser from "@typescript-eslint/parser";
import tsdoc from "eslint-plugin-tsdoc";
import tsdocRequire from "eslint-plugin-tsdoc-require-2";

export default [
  // Global ignores: generated coverage reports and build output (never source we lint). Not
  // `**/generated/**` — the cssdoc block below intentionally lints generated component sheets.
  { ignores: ["**/coverage/**", "**/dist/**"] },
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
  {
    // TSDoc enforcement on source TypeScript: every exported declaration needs a doc comment
    // (tsdoc-require-2/require) and comments must be valid TSDoc (tsdoc/syntax, honouring tsdoc.json).
    // The parser is configured WITHOUT `project` — these rules are comment/syntax-only, not type-aware,
    // so skipping type information keeps the pass fast across the whole workspace.
    files: ["**/*.{ts,tsx,mts,cts}"],
    ignores: [
      "**/*.{test,spec}.{ts,tsx,mts,cts}",
      "**/tests/**",
      "**/generated/**",
      "**/dist/**",
      "**/*.d.ts",
      "**/node_modules/**",
    ],
    languageOptions: { parser: tsParser },
    plugins: { "tsdoc-require-2": tsdocRequire, tsdoc },
    rules: {
      "tsdoc-require-2/require": "error",
      "tsdoc/syntax": "error",
    },
  },
];
