---
"@pantoken/scaffold": minor
"create-pantoken-app": patch
---

feat: alphabetize the platform picker, detect the invoking package manager's usage text, and cwd into the scaffolded dir

The interactive platform picker showed raw keys (`components`, `web-components`,
...) in `PRESET_LEDGER` order. It now shows alphabetized, properly-cased labels
(`HTML`, `Web components`, `React`, ...).

`create-pantoken-app`'s `--help` always showed `npm create pantoken-app --` as
the usage command, regardless of how it was actually invoked. A new
`buildCreateUsageCommand()` maps the detected package manager to its own create
invocation (`pnpm create`, `yarn create`, `bunx create-`, `deno run -A npm:create-`,
`vpx create-`), matching the same `detectPackageManager()` logic already used for
install/next-steps.

After scaffolding and installing, the CLI now `chdir`s into the target directory
(when it isn't already `"."`) so the printed next step is just the dev command,
never a separate `cd`.
