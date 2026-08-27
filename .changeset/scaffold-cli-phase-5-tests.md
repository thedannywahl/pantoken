---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"create-pantoken-app": patch
---

test: rewrite CLI test suites for the commander-based rewrite (Phase 5)

Adds/rewrites test coverage for the Phase 1/4 CLI rebuild:

- `packages/scaffold/tests/cli.test.ts`: fully rewritten for the commander-based
  `cli.ts` (was still testing the old readline-based API). Covers `shouldPrompt`,
  `detectPackageManager`, `validateScaffoldPlatform`, `printNextSteps`,
  `resolveScaffoldTarget` (including clack prompt/cancel paths), `scaffoldWithSpinner`,
  and `createScaffoldCommand`/`runScaffoldCli` end-to-end (help, version, invalid
  flags/platform, `--yes`, successful scaffold, failure reporting).
- `packages/scaffold/tests/locale.test.ts` (new): covers `detectLocale`
  (--lang flag, LC_ALL/LANG env, Intl fallback, English default) and
  `createLocaleLookup` (fallback chains, `{{param}}` substitution).
- `ai/pantoken-ai/tests/cli.test.ts` (new): covers `createAiCommand`/`runAiCli`'s
  `init` and `scaffold` subcommands, including a real bug fix (see below).
- `packages/create-pantoken-app/tests/index.test.ts`: updated the "next steps"
  assertion for the rebuilt CLI's package-manager-aware install line, added
  `--version` and `--yes`-without-platform coverage.

**Bug fix**: `pantoken-ai scaffold <invalid-platform>` previously failed silently
(exit 1, no error message) because platform validation was called manually inside
the action handler instead of registered as the argument's `argParser` — so
commander's own error-formatting/printing pipeline never saw it. Fixed by
registering `validateScaffoldPlatform` as the `[platform]` argument's `argParser`,
matching how `@pantoken/scaffold`'s own CLI already does it.

Also fixes a `spawnPrompt()` call-signature bug in both packages' `scripts/translate.ts`
(was passing an options object as the second argument instead of `(command, args,
prompt, context?)`), and an `isolatedDeclarations` build failure in each package's
generated `locales/index.ts` (needed an explicit `Record<string, Record<string,
string>>` type annotation on the generator template).
