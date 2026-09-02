---
"@pantoken/ai": patch
"@pantoken/scaffold": patch
"@pantoken/docs": patch
---

Swept the CLI and docs source strings for the new passthrough guard and marked the non-prose ones
`verbatim: "allow"` so the next translation pass doesn't strip or warn on them: `@pantoken/ai` and
`@pantoken/scaffold`'s `wroteFile` (a checkmark + path template, no English words) and
`@pantoken/scaffold`'s `nextStepsNav` (a literal `cd {{dir}}` shell command); the docs UI chrome's
404 status code and the CDN picker's `<link>`/`@import` output-format tokens (via
`translate-chrome.ts`'s `verbatimSources`). Left `getStartedTabs.agentPrompt` alone — despite
carrying a literal URL, it's documented as real prose that goes through translation normally.
