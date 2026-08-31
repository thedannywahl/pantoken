---
"@pantoken/docs": patch
---

The "Get started" widget's agent-shell prompt (`"Fetch create.pantoken.app/SKILL.md and follow
it…"`) is now a translatable UI string (`GetStartedTabsStrings.agentPrompt` in `get-started.ts` /
`i18n.ts`) instead of a hardcoded English constant in `GetStartedTabs.vue`, so it goes through the
same `translate-chrome.ts` pipeline as the rest of the widget's chrome.
