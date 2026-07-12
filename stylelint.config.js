/**
 * stylelint for pantoken's real `.css`: the hand-authored web-component shadow styles
 * (`renderers/web-components/src/**` /*.css) and the generated component sheet
 * (`formats/components/generated/*.css`). We only lint for *correctness* — no stylistic/formatting
 * opinions — because the CSS is either terse shadow-DOM styling or machine-generated, and it uses
 * modern features (anchor positioning, `:host`/`::slotted`, `@scope`, `light-dark()`).
 *
 * We enable a focused set of core "possible error" rules directly, plus `@cssdoc/stylelint-plugin`'s
 * `cssdoc/valid-doc-comments` — which validates the inline cssdoc doc comments against the record's
 * actual CSS (rscss modifiers), the one shareable rule this project extends.
 *
 * @type {import("stylelint").Config}
 */
export default {
  plugins: ["@cssdoc/stylelint-plugin"],
  rules: {
    // Validate the cssdoc doc comments against the CSS (rscss modifier convention: `.-color-secondary`).
    // Two sub-rules are off because they clash with this library's authoring conventions:
    // - `undocumented-modifier`: the utilities emit whole generated modifier families (View's
    //   `.-display-*`/`.-cursor-*`, the `.-size-*` long-form + deprecated-alias twins) that aren't — and
    //   shouldn't be — hand-documented one by one.
    // - `name-not-in-css`: records document placeholder modifier families (`.-icon-<name>`) and abstract
    //   parts (a consumer-supplied `.hero`) that have no literal selector in the shipped sheet.
    "cssdoc/valid-doc-comments": [
      true,
      {
        modifierConvention: "rscss",
        rules: { "undocumented-modifier": "off", "name-not-in-css": "off" },
      },
    ],
    "annotation-no-unknown": true,
    "at-rule-no-unknown": [true, { ignoreAtRules: ["scope"] }],
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "comment-no-empty": true,
    "declaration-block-no-duplicate-custom-properties": true,
    "declaration-block-no-duplicate-properties": [
      true,
      { ignore: ["consecutive-duplicates-with-different-values"] },
    ],
    "declaration-block-no-shorthand-property-overrides": true,
    "font-family-no-duplicate-names": true,
    "function-calc-no-unspaced-operator": true,
    "function-linear-gradient-no-nonstandard-direction": true,
    "keyframe-block-no-duplicate-selectors": true,
    "media-feature-name-no-unknown": true,
    "named-grid-areas-no-invalid": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-invalid-double-slash-comments": true,
    "no-invalid-position-at-import-rule": true,
    // Anchor positioning is newer than stylelint's property dictionary; allow it explicitly.
    "property-no-unknown": [
      true,
      { ignoreProperties: ["anchor-name", "position-anchor", "position-area"] },
    ],
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "string-no-newline": true,
    "unit-no-unknown": true,
  },
  overrides: [
    {
      // Machine-generated sheets: keep only value-level correctness, drop structural rules that can
      // legitimately trip on generated output (repeated selectors across base/modifier rules, etc.).
      files: ["**/generated/**/*.css"],
      rules: {
        "no-duplicate-selectors": null,
        "declaration-block-no-duplicate-properties": null,
        "no-descending-specificity": null,
      },
    },
  ],
};
