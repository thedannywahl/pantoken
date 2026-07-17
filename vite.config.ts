import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
    // stylelint owns real .css (web-component shadow styles); vp check no-ops on them.
    "*.css": "vp exec stylelint --fix",
  },
  fmt: {
    overrides: [{ files: ["**/*.jsonc"], options: { trailingComma: "none" } }],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
    tasks: {
      // CSS/cssdoc linting depends on the component generator: linting the SOURCE `.css` records needs
      // `@pantoken/components`'s `src/generated/_records.css` (the cssdoc sibling-record provider) and the
      // built `generated/*.css` sheets. Declaring the dependency here means `vp run lint:css`/`lint:js`
      // (as `ready` invokes them) regenerate first, instead of relying on an earlier build step.
      "lint:css": {
        command:
          'vp exec stylelint "renderers/web-components/src/**/*.css" "formats/components/src/{components,utilities}/*.css" "formats/components/generated/*.css"',
        dependsOn: ["@pantoken/components#generate"],
      },
      "lint:js": {
        command:
          'vp exec eslint "formats/components/src/{components,utilities}/*.css" "formats/components/generated/*.css" "renderers/web-components/src/**/*.css"',
        dependsOn: ["@pantoken/components#generate"],
      },
      "changeset:add": {
        command: "vpx changeset",
      },
      "release:status": {
        command: "vpx changeset status --verbose",
      },
      "release:version": {
        command: "vpx changeset version",
      },
      "release:publish": {
        command: "vpx changeset publish",
      },
      "release:pre:enter": {
        command: "vpx changeset pre enter next",
      },
      "release:pre:exit": {
        command: "vpx changeset pre exit",
      },
      "gate:publint": {
        command:
          'vp exec -F "./packages/**" -F "./formats/**" -F "./platforms/**" -F "./renderers/**" -F "./bundlers/**" -F "./design/**" -F "./ai/**" -F "./plugins/**" -F "./tools/**" publint',
      },
      "gate:attw": {
        command:
          'vp exec -F "./packages/**" -F "./formats/**" -F "./platforms/**" -F "./renderers/**" -F "./bundlers/**" -F "./design/**" -F "./ai/**" -F "./plugins/**" -F "./tools/**" attw --pack --profile strict --no-emoji --ignore-rules no-resolution cjs-resolves-to-esm',
      },
    },
  },
});
