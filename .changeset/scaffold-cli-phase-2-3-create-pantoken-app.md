---
"create-pantoken-app": major
---

feat(create-pantoken-app): pass --version and --lang through to shared CLI

Implements Phase 2-3: updates packages/create-pantoken-app/bin/create-pantoken-app.mjs to pass version and locale flag to the rebuilt commander-based CLI via @pantoken/scaffold/cli.

Bin shim now:

- Imports runScaffoldCli from @pantoken/scaffold/cli (the shared CLI implementation)
- Passes package.json version to runScaffoldCli
- Invocation string remains "npm create pantoken-app --" for help/usage display

Users can now invoke:

- npx create-pantoken-app --version
- npx create-pantoken-app react --lang hu
- npx create-pantoken-app --help
- npx create-pantoken-app (interactive TTY prompts platform/directory)
- npx create-pantoken-app react --yes --dir ./my-app (non-interactive)

Breaking change: error wording and "Next steps" output changed (inherits from rebuilt scaffold CLI).
