import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    include: [
      "packages/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "formats/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "platforms/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "renderers/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "bundlers/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "design/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "ai/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "plugins/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "tools/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "docs/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "scripts/**/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
  },
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
      release: {
        command: "node scripts/release/cut-release.ts",
      },
      "release:version": {
        command: "vpx changeset version",
      },
      "release:plan:package": {
        command:
          "node scripts/release/plan-package-release.ts --json .release-plan.json --publish-list .release-packages.txt --markdown .release-plan.md",
      },
      "release:notes:package": {
        command:
          "node scripts/release/build-release-notes.ts --plan .release-plan.json --out release-notes.md",
      },
      "release:changelog:root": {
        command: "node scripts/release/build-root-changelog.ts --out CHANGELOG.md",
      },
      "release:changelog:root:seed": {
        command: "node scripts/release/build-root-changelog.ts --seed-initial --out CHANGELOG.md",
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
      "gate:repository": {
        command: "node scripts/release/check-repository-metadata.ts",
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
