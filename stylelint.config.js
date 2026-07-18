/**
 * stylelint for pantoken's real `.css`: the hand-authored web-component shadow styles
 * (`renderers/web-components/src/**` /*.css) and the generated component sheet
 * (`formats/components/generated/*.css`). We only lint for *correctness* — no stylistic/formatting
 * opinions — because the CSS is either terse shadow-DOM styling or machine-generated, and it uses
 * modern features (anchor positioning, `:host`/`::slotted`, `@scope`, `light-dark()`).
 *
 * We enable a focused set of core "possible error" rules directly, plus `@cssdoc/stylelint-plugin`'s
 * `cssdoc/valid-doc-comments` — which validates the inline cssdoc doc comments against the record's
 * actual CSS, the one shareable rule this project extends. Its options (rscss modifier convention, the
 * off-list, `structureIgnore`) live in the repo's `cssdoc.json`, which the plugin auto-loads per file —
 * so the same config drives lint, docs, and the test guard, with nothing duplicated here.
 *
 * @type {import("stylelint").Config}
 */
export default {
  plugins: ["@cssdoc/stylelint-plugin"],
  rules: {
    // Options come from cssdoc.json (auto-loaded per linted file).
    "cssdoc/valid-doc-comments": true,
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
      // The component library's sheets — the authored `formats/components/src/**` records and the
      // generated bundles built from them. Keep value-level correctness, but drop the structural rules
      // that legitimately trip on this base/modifier/override authoring style (a base rule plus a later
      // rule for the same selector — e.g. `.instui-context-view::after` overridden per `-placement-*`).
      files: ["**/generated/**/*.css", "formats/components/src/{components,utilities,rules}/*.css"],
      rules: {
        "no-duplicate-selectors": null,
        "declaration-block-no-duplicate-properties": null,
        "no-descending-specificity": null,
      },
    },
  ],
};
