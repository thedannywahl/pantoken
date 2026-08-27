---
"@pantoken/ai": major
---

feat(ai): consolidate CLI onto shared commander engine with localization

Implements Phase 4: creates ai/pantoken-ai/src/cli.ts rebuilding the CLI on commander with subcommands (init, scaffold) that reuse locale detection and scaffold logic from @pantoken/scaffold/cli.

New exports (all @alpha):

- createAiCommand(): builds commander Command with init and scaffold subcommands
- runAiCli(): entry point; parses argv and handles errors

Subcommands:

- init [--tool <all|cursor|copilot|windsurf>] [--dir .]
  Writes pantoken's agent assets into a repo. Tool defaults to "all" (AGENTS.md, llms.txt, Cursor, Copilot, Windsurf, Claude skills).

- scaffold [platform] [--tool <all|cursor|copilot|windsurf>] [--dir .] [--yes]
  Scaffolds a starter project (via @pantoken/scaffold) and installs agent assets into the same directory. Reuses platform selection/directory prompting/spinner/next-steps from scaffold CLI. Tool defaults to "all".

Global options:

- --lang/-l: override auto-detected display language
- --version/-v: show version
- --help/-h: show help

Shell completions for bash/zsh/fish/PowerShell (via @bomb.sh/tab).

Localization:

- ai/pantoken-ai/src/i18n.json (init/scaffold description, tool descriptions)
- ai/pantoken-ai/generated/locales bundle (generated from i18n-cache)
- Reuses detectLocale/createLocaleLookup from @pantoken/scaffold/cli
- Falls back to English for untranslated strings

Bin shim (pantoken-ai.mjs) updated to call runAiCli with version from package.json.

Note: printNextSteps() from @pantoken/scaffold/cli is now shared; post-scaffold output includes detected package manager and "Next steps" block identical to `pantoken-scaffold` and `create-pantoken-app`.

Breaking changes:

- CLI argv contract changed from hand-rolled to commander-based
- Error messages and output formatting match commander standards
- "Next steps" output is now localized and package-manager-aware
