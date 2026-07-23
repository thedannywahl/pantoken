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
      // `ready:all` is a task DAG, not a serial `&&` chain: `build:all` runs once, then the independent
      // gates fan out concurrently. `command: "true"` makes it a pure aggregator whose only job is to
      // pull its `dependsOn` (the root `ready` script is `vp run ready:all` — a task and a package.json
      // script may not share a name). Everything that needs generated output funnels through `build:all`,
      // the single generation path, so no two nodes run the component codegen at once (a `vp run -r build`
      // and a bare `@pantoken/components#generate` writing the same `generated/` dir would race).
      "build:all": {
        command: "vp run -r build",
      },
      "check:all": {
        command: "vp check",
        dependsOn: ["build:all"],
      },
      "test:all": {
        command: "vp run -r test",
        dependsOn: ["build:all"],
      },
      "validate:generated:only": {
        command: "vp run @pantoken/validate-generated#validate",
        dependsOn: ["build:all"],
      },
      "lint:markdown": {
        command: 'vp exec markdownlint-cli2 "**/*.md"',
      },
      "ready:all": {
        command: "true",
        dependsOn: [
          "check:all",
          "test:all",
          "lint:css",
          "lint:js",
          "validate:generated:only",
          "lint:markdown",
        ],
      },
      // CSS/cssdoc linting needs `@pantoken/components`'s generated sheets (`src/generated/_records.css`,
      // the cssdoc sibling-record provider, and the `generated/*.css` sheets). They depend on `build:all`
      // rather than `@pantoken/components#generate` directly so generation happens exactly once, through
      // the same node `check:all`/`test:all` wait on — otherwise, under the parallel `ready` DAG, this
      // task and `build:all`'s internal build would regenerate concurrently into the same files.
      "lint:css": {
        command:
          'vp exec stylelint "renderers/web-components/src/**/*.css" "formats/components/src/{components,utilities,rules}/*.css" "formats/components/generated/*.css" "plugins/pantoken/*/generated/*.css"',
        dependsOn: ["build:all"],
      },
      "lint:js": {
        command:
          'vp exec eslint "formats/components/src/{components,utilities,rules}/*.css" "formats/components/generated/*.css" "plugins/pantoken/*/generated/*.css" "renderers/web-components/src/**/*.css"',
        dependsOn: ["build:all"],
      },
      "changeset:add": {
        command: "vpx changeset",
      },
      "release:status": {
        command: "vpx changeset status --verbose",
      },
      "release:coverage": {
        command: "node scripts/release/check-changeset-coverage.ts",
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
      // The publish gate. `check:publish` → `gate:publish`, which fans out the three publish-correctness
      // checks: repository metadata (needed for npm OIDC provenance — a missing `repository.url` silently
      // breaks it), publint, and attw. publint/attw pack each package, so they wait on `build:all`;
      // `gate:repository` is a pure manifest read with no build dependency.
      "gate:repository": {
        command: "node scripts/release/check-repository-metadata.ts",
      },
      "gate:publint": {
        command:
          'vp exec -F "./packages/**" -F "./formats/**" -F "./platforms/**" -F "./renderers/**" -F "./bundlers/**" -F "./design/**" -F "./ai/**" -F "./plugins/**" -F "./tools/**" publint',
        dependsOn: ["build:all"],
      },
      "gate:attw": {
        command:
          'vp exec -F "./packages/**" -F "./formats/**" -F "./platforms/**" -F "./renderers/**" -F "./bundlers/**" -F "./design/**" -F "./ai/**" -F "./plugins/**" -F "./tools/**" attw --pack --profile strict --no-emoji --ignore-rules no-resolution cjs-resolves-to-esm',
        dependsOn: ["build:all"],
      },
      "gate:publish": {
        command: "true",
        dependsOn: ["gate:repository", "gate:publint", "gate:attw"],
      },
    },
  },
});
