import baseConfig from "../../../stylelint.config.js";

/** @type {import("stylelint").Config} */
export default {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    "block-no-empty": null,
    // cssdoc structure cardinality pseudos — not native CSS
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["optional", "opt", "many", "more", "one-or-more"] },
    ],
  },
};
