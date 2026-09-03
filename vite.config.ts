import { defineConfig } from "vite-plus";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    // Reads FC_NUM_RUNS to adjust fast-check iteration counts without changing test source.
    // Default: 100 (fast). Stress runs (vp run property:stress): 10 000.
    setupFiles: [`${__dir}/scripts/quality/fast-check-setup.ts`],
    // Default (5000ms) is too tight for a full-suite local run (277 files) where module transform/
    // import contends for CPU; slower CI/gh runners need the same headroom.
    testTimeout: 20_000,
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
    coverage: {
      provider: "v8",
      // text-summary for humans, lcov for Codecov, json for `fallow health --coverage`.
      reporter: ["text-summary", "lcov", "json"],
      include: [
        "packages/*/src/**",
        "formats/*/src/**",
        "platforms/*/src/**",
        "renderers/*/src/**",
        "bundlers/*/src/**",
        "design/*/src/**",
        "ai/*/src/**",
        "plugins/*/*/src/**",
        "tools/*/src/**",
        "tools/*/*.ts",
        "scripts/**/*.ts",
        // Build/docs tooling brought under coverage (specific files, not a broad glob, so untested
        // siblings don't drag the floor). These are the high-complexity scripts now unit-tested so
        // their CRAP reflects real coverage rather than a worst-case zero.
        "formats/*/scripts/{fonts,generate}.ts",
        "docs/scripts/{translation-memory,api-translation,build-api-locales,build-css-api,check-locale-drift,style-api-badges}.ts",
        "docs/scripts/lib/scope-components.ts",
        "renderers/web-components/src/locales/**",
        "renderers/web-components/src/i18n.ts",
        "renderers/web-components/src/locale-bundle.ts",
        "renderers/web-components/src/lib/{locales,runtime}.ts",
        "renderers/web-components/scripts/build-bundles.ts",
      ],
      exclude: [
        "**/*.{test,spec}.?(c|m)[jt]s?(x)",
        "**/tests/**",
        "**/generated/**",
        "**/dist/**",
        "**/*.config.*",
        "**/*.d.ts",
        // Data files, not executable code — nothing for v8 to instrument.
        "**/*.json",
        // Type-only package — no runtime statements to cover, so it can't meet an 85% floor.
        "packages/model/**",
      ],
      // Hard coverage floor (grade-A number). Vitest fails the run below these; codecov.yml enforces
      // the same 85% project + patch in CI. Branches sit at 70 (85% branch coverage isn't realistic
      // across I/O and DOM code); statements/functions/lines hold the 85 line.
      thresholds: { statements: 85, branches: 70, functions: 85, lines: 85 },
    },
  },
  staged: {
    "*": "vp check --fix",
    // stylelint owns real .css (web-component shadow styles); vp check no-ops on them.
    "*.css": "vp exec stylelint --fix",
  },
  fmt: {
    overrides: [{ files: ["**/*.jsonc"], options: { trailingComma: "none" } }],
    // Generated TypeDoc API reference (including per-locale copies) is never hand-edited and is
    // rebuilt by `docs:build`; oxfmt's markdown formatter isn't idempotent on the escaped generic-type
    // angle brackets TypeDoc emits in signature lines (e.g. `` `Readonly`\<`Record`\<`string`,
    // `string`\>\> ``) — each pass through `vp check --fix` (including the `staged` pre-commit hook)
    // duplicated more `>` characters into already-committed locale API docs. Excluded the same way
    // `.markdownlint-cli2.yaml` already excludes this tree.
    // `ai/create-pantoken-app-site` is a separate git submodule (github.com/thedannywahl/
    // create-pantoken-app): its `index.html` is plain-text skill content wearing an `.html`
    // extension only so GitHub Pages resolves it as the directory index, not real markup to format.
    ignorePatterns: ["docs/api/**", "docs/*/api/**", "ai/create-pantoken-app-site/**"],
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
      // Coverage run for Codecov + fallow health; needs generated output like the plain test run.
      "test:coverage": {
        command: "vp test --coverage",
        dependsOn: ["build:all"],
      },
      "validate:generated:only": {
        command: "vp run @pantoken/validate-generated#validate",
        dependsOn: ["build:all"],
      },
      "lint:markdown": {
        command: 'vp exec markdownlint-cli2 "**/*.md"',
      },
      // Workspace/catalog consistency + internal-version alignment. Pure manifest read, no build dep.
      "check:manypkg": {
        command: "vp exec manypkg check",
      },
      // On-demand dependency vulnerability scan via the bundled Snyk CLI (devDependency, so every
      // contributor gets it from `pnpm install` — a Snyk account/`snyk auth` is still needed to run).
      // NOT in `ready:all`: it needs auth + network, which CI and fresh clones lack. Run
      // `pnpm run security:snyk` (or `vp run snyk:scan`); `vp exec snyk monitor` to track over time.
      // Task name differs from the `security:snyk` package.json script — vp forbids the two matching.
      "snyk:scan": {
        command:
          "vp exec snyk test --all-projects --severity-threshold=medium --exclude=generated,dist",
      },
      // Snyk Code (SAST) gate. Snyk has no GitHub App on this repo, so CI can't run it — the pre-push
      // hook runs this instead (see .vite-hooks/pre-push) and it's here for on-demand runs. The wrapper
      // blocks on findings but skips gracefully when Snyk isn't authenticated. NOT in `ready:all`: it
      // needs `snyk auth` + network, which CI and fresh clones lack. Task name differs from the
      // `security:code` package.json script — vp forbids the two matching.
      "snyk:code": {
        command: "node scripts/quality/snyk-code-gate.ts",
      },
      // TSDoc enforcement over source TypeScript (eslint.config.js TS block). Comment/syntax-only, so
      // no build dependency.
      "lint:tsdoc": {
        // `eslint .` lets the flat config drive file discovery (its TS block globs + ignores); passing
        // explicit globs errors when a pattern like **/*.mts matches nothing.
        command: "vp exec eslint .",
      },
      // Fallow gate: dead-code = error, health = grade A, duplicates = advisory. Needs generated
      // output (build:all) so the CSS-codegen sources and workspace graph resolve.
      "health:fallow": {
        command: "node scripts/quality/fallow-health-gate.ts",
        dependsOn: ["build:all"],
      },
      "ready:all": {
        command: "true",
        dependsOn: [
          "check:all",
          // Coverage run (not the plain test run) so the 85% threshold floor is enforced in `ready`.
          "test:coverage",
          "lint:css",
          "lint:js",
          "lint:tsdoc",
          "validate:generated:only",
          "gate:compatibility",
          "lint:markdown",
          "check:manypkg",
          "health:fallow",
        ],
      },
      // The upstream-upgrade pipeline. `upgrade:check` is the drift gate — it fails when the committed
      // baseline doesn't match the current build, so a bump must be blessed in the same change. It's kept
      // OUT of `ready:all` (a routine core-output change would trip it and force a baseline re-commit) and
      // gated instead by the paths-filtered `upstream-drift` CI job, which fires only on a pin change.
      // `upgrade:bless` accepts a reviewed bump (and refuses if a removed token lacks a ledger entry).
      "upgrade:check": {
        command: "vp run @pantoken/upstream-diff#diff",
        dependsOn: ["build:all"],
      },
      "upgrade:bless": {
        command: "vp run @pantoken/upstream-diff#bless",
        dependsOn: ["build:all"],
      },
      // Writer/gate pair for the consumer compatibility manifest, mirroring sync:/gate:repository.
      // `gate:compatibility` is cheap and correct on every PR (compatibility.json changes only when the
      // pins or the consumer set change), so it joins `ready:all`; `sync:compatibility` regenerates it.
      "sync:compatibility": {
        command: "node scripts/release/generate-compatibility.ts",
        dependsOn: ["build:all"],
      },
      "gate:compatibility": {
        command: "node scripts/release/check-compatibility.ts",
        dependsOn: ["build:all"],
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
          'vp exec eslint --no-error-on-unmatched-pattern "formats/components/src/{components,utilities,rules}/*.css" "formats/components/generated/*.css" "plugins/pantoken/*/generated/*.css" "renderers/web-components/src/**/*.css"',
        dependsOn: ["build:all"],
      },
      // ── Property-based testing ────────────────────────────────────────────────────────────────
      // `vp test` already runs property tests at 100 iterations (the fast default); that is part of
      // `test:coverage` in `ready:all`. `property:stress` runs only the property test files with
      // 10 000 iterations per property — used by the weekly `property.yml` CI workflow and for
      // on-demand deep checks before a release. `FC_NUM_RUNS` is read by
      // `scripts/quality/fast-check-setup.ts`, which is wired as a Vitest `setupFiles` entry.
      "property:stress": {
        command: 'FC_NUM_RUNS=10000 vp test "property.test" --reporter=verbose',
        dependsOn: ["build:all"],
      },
      // Convenience alias matching the security: namespace convention.
      "security:property:stress": {
        command: "vp run property:stress",
      },
      // i18n locale bundle management. translate is local-only (AI credentials required);
      // check:drift asserts committed caches are current (CI-safe, no network).
      // UI (web-components) string localization.
      "ui:translate": {
        command: "vp run @pantoken/web-components#translate",
        cache: false,
      },
      "ui:translate:agy": {
        command: "vp run @pantoken/web-components#translate",
        cache: false,
      },
      "ui:translate:copilot": {
        command: "vp run @pantoken/web-components#translate",
        cache: false,
      },
      "ui:translate:force": {
        command: "vp run @pantoken/web-components#translate",
        cache: false,
      },
      "ui:translate:force:agy": {
        command: "vp run @pantoken/web-components#translate",
        cache: false,
      },
      "ui:translate:force:copilot": {
        command: "vp run @pantoken/web-components#translate",
        cache: false,
      },
      // Docs locale translation (both claude and agy variants).
      "docs:translate": {
        command: "vp run @pantoken/docs#docs:locales:translate",
        cache: false,
      },
      "docs:translate:agy": {
        command: "vp run @pantoken/docs#docs:locales:translate:agy",
        cache: false,
      },
      "docs:translate:copilot": {
        command: "vp run @pantoken/docs#docs:locales:translate:copilot",
        cache: false,
      },
      "docs:translate:force": {
        command: "vp run @pantoken/docs#docs:locales:translate:force",
        cache: false,
      },
      "docs:translate:force:agy": {
        command: "vp run @pantoken/docs#docs:locales:translate:agy:force",
        cache: false,
      },
      "docs:translate:force:copilot": {
        command: "vp run @pantoken/docs#docs:locales:translate:copilot:force",
        cache: false,
      },
      // CLI (scaffold and ai) string localization.
      "cli:translate": {
        command: "vp run @pantoken/scaffold#translate && vp run @pantoken/ai#translate",
        cache: false,
      },
      "cli:translate:agy": {
        command: "vp run @pantoken/scaffold#translate && vp run @pantoken/ai#translate",
        cache: false,
      },
      "cli:translate:copilot": {
        command: "vp run @pantoken/scaffold#translate && vp run @pantoken/ai#translate",
        cache: false,
      },
      "cli:translate:force": {
        command: "vp run @pantoken/scaffold#translate && vp run @pantoken/ai#translate",
        cache: false,
      },
      "cli:translate:force:agy": {
        command: "vp run @pantoken/scaffold#translate && vp run @pantoken/ai#translate",
        cache: false,
      },
      "cli:translate:force:copilot": {
        command: "vp run @pantoken/scaffold#translate && vp run @pantoken/ai#translate",
        cache: false,
      },
      // Umbrella tasks for all translation domains.
      "i18n:translate": {
        command: "true",
        dependsOn: ["ui:translate", "docs:translate", "cli:translate"],
        cache: false,
      },
      "i18n:translate:agy": {
        command: "true",
        dependsOn: ["ui:translate:agy", "docs:translate:agy", "cli:translate:agy"],
        cache: false,
      },
      "i18n:translate:copilot": {
        command: "true",
        dependsOn: ["ui:translate:copilot", "docs:translate:copilot", "cli:translate:copilot"],
        cache: false,
      },
      // Bypasses every domain's translation-memory cache — retranslates and overwrites everything,
      // even already-cached content. Use after fixing an adapter bug or a bad translation; see
      // DOCS_TRANSLATION_FORCE / I18N_TRANSLATION_FORCE in the respective translation pipelines.
      "i18n:translate:force": {
        command: "true",
        dependsOn: ["ui:translate:force", "docs:translate:force", "cli:translate:force"],
        cache: false,
      },
      // Same as i18n:translate:force but routed through the agy adapter wrapper.
      "i18n:translate:force:agy": {
        command: "true",
        dependsOn: [
          "ui:translate:force:agy",
          "docs:translate:force:agy",
          "cli:translate:force:agy",
        ],
        cache: false,
      },
      // Same as i18n:translate:force but routed through the copilot adapter wrapper.
      "i18n:translate:force:copilot": {
        command: "true",
        dependsOn: [
          "ui:translate:force:copilot",
          "docs:translate:force:copilot",
          "cli:translate:force:copilot",
        ],
        cache: false,
      },
      // Drift checks for the UI and CLI i18n domains. Severity per surface and locale tier comes from
      // `i18n.config.json` — these tasks report every gap but only exit non-zero on a `block`, so an
      // English-only change lands without waiting on ~90 translations. Docs drift runs in
      // `@pantoken/docs#docs:build` (it needs the generated EN API tree); `i18n:check:drift:all` runs
      // both.
      "i18n:check:drift": {
        command:
          "vp run @pantoken/translation-adapters#build && vp run @pantoken/i18n-engine#build && vp run @pantoken/web-components#check:drift && vp run @pantoken/scaffold#check:drift && vp run @pantoken/ai#check:drift",
      },
      // Generate the local, git-ignored language coverage report. Keep this uncached so the report
      // always reflects the current PO catalogs and policy configuration.
      "i18n:coverage": {
        command:
          "vp run @pantoken/i18n-engine#build && node tools/i18n-engine/bin/i18n.mjs --config i18n.config.json stats --html",
        cache: false,
      },
      // Every i18n surface at once, including the docs ones. Assumes `docs:api:en` already ran — API
      // prose drift is skipped with a note when `docs/api` is absent.
      "i18n:check:drift:all": {
        command:
          "vp run @pantoken/i18n-engine#build && node tools/i18n-engine/bin/i18n.mjs --config i18n.config.json lint && vp run i18n:check:drift && vp run @pantoken/docs#docs:check:locales && vp run @pantoken/docs#docs:check:drift",
        cache: false,
      },
      // Same sweep with every policy `warn` escalated to `block`. Not wired into PR CI — this is the
      // "show me every gap, fail if any remain" command for a local audit or a scheduled full-locale
      // run before a release.
      "i18n:check:drift:strict": {
        command: "I18N_DRIFT_STRICT=1 vp run i18n:check:drift:all",
        cache: false,
      },
      "i18n:bundles:build": {
        command: "vp run @pantoken/web-components#generate",
        dependsOn: ["build:all"],
      },
      "changeset:add": {
        command: "vpx changeset",
        cache: false,
      },
      "release:status": {
        command: "vpx changeset status --verbose",
      },
      "release:coverage": {
        command: "node scripts/release/check-changeset-coverage.ts",
      },
      // Driven by the changesets action (.github/workflows/release.yml): `version` opens/updates the
      // Version Packages PR, `publish` ships it via the npm CLI (not `changeset publish`, which shells out
      // to pnpm, whose OIDC token exchange is broken). The script prints `New tag:` lines the action turns
      // into git tags + GitHub releases. See scripts/release/publish-npm.ts. NOTE: CI runs the publish
      // script with plain `node`, NOT `vp run release:publish` — the `vp run` launcher scrubs the
      // `ACTIONS_ID_TOKEN_REQUEST_*` env vars npm needs for OIDC. This task stays for local/manual runs.
      // Bump versions AND refresh the fallow regression baseline so each release re-bases the floor
      // (the changesets action commits both into the Version PR). fallow runs as a direct bin — never
      // a nested `vp` — and `|| true` keeps its non-zero "findings present" exit from failing the
      // version step; it still writes fallow-baseline.json. fallow writes that JSON unformatted, and
      // changesets can emit changelog lines with trailing whitespace, so `vp fmt` both afterwards —
      // otherwise the Version PR can fail the `vp check` format gate on generated files.
      // Assumes build already ran (release.yml).
      "release:version": {
        command:
          'vpx changeset version && (node_modules/.bin/fallow dead-code --save-regression-baseline fallow-baseline.json || true) && vp fmt "**/CHANGELOG.md" fallow-baseline.json',
      },
      "release:publish": {
        command: "node scripts/release/publish-npm.ts",
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
      // Writer counterpart to `gate:repository`: stamps the canonical npm metadata onto every
      // publishable package.json. Run after adding a package; the gate then keeps it correct.
      "sync:repository": {
        command: "node scripts/release/sync-repository-metadata.ts",
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
      // Root convenience alias so `vp run scaffold:dev <platform>` works from anywhere in the repo;
      // args pass through to the underlying package task. See packages/scaffold/scripts/scaffold-dev.ts.
      "scaffold:dev": {
        command: "vp run @pantoken/scaffold#scaffold:dev",
        cache: false,
      },
    },
  },
});
