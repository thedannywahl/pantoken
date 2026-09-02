---
"@pantoken/docs": patch
---

The "Get started" widget's agent view now offers a fetch-based one-liner
(`<launcher> "Fetch https://pantoken.app/create-pantoken-app.md and follow it…"`) for six
agent CLIs — Claude Code, Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, and Amazon Q
Developer CLI — instead of the old `claude`-only `/scaffold-pantoken` slash command (a skill name
that no longer exists, and unquoted text that only worked because it happened to have no spaces).
`docs/guide/getting-started.md` gets the same one-liner. Also drops `GetStartedTabsStrings.aiCommand`
(`get-started.ts` / `i18n.ts`, both locales) — dead since the widget's rewrite stopped reading it.
