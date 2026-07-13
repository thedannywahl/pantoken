/**
 * ESLint flat config — the sole job here is `@cssdoc/eslint-plugin`'s `cssdoc/valid-doc-comments` over
 * the `.css` that carries cssdoc doc comments: the generated component sheets and the web-component
 * shadow styles. It's the author-side companion to the stylelint plugin (same `@cssdoc/lint-core` rules
 * via the `@eslint/css` language), configured identically — rscss modifiers, with the two sub-rules that
 * clash with this library's generated families / placeholder members turned off (see stylelint.config.js).
 */
import cssdoc from "@cssdoc/eslint-plugin";
import css from "@eslint/css";

export default [
  {
    files: ["formats/components/generated/*.css", "renderers/web-components/src/**/*.css"],
    plugins: { css, cssdoc },
    language: "css/css",
    rules: {
      "cssdoc/valid-doc-comments": [
        "error",
        {
          modifierConvention: "rscss",
          rules: { "undocumented-modifier": "off", "name-not-in-css": "off" },
          // Cross-component compositions and modifier/state suffixes shown in a @structure tree aren't
          // the record's own members — exempt them from structure-unknown-selector.
          structureIgnore: ["instui-*", "-*"],
        },
      ],
    },
  },
];
