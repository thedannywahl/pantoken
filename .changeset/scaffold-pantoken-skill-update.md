---
"@pantoken/ai": patch
---

Update the `scaffold-pantoken` and `init-pantoken` skills for the current Bingo-based scaffold
CLI: the platform list is now `components` (alias `html`), `react`, `vue`, `svelte`,
`web-components`, `angular` (the stale `next`/pre-Bingo `html`-only list is gone), the CLI
invocation is `npx pantoken-ai scaffold <platform>`, and the flat `npx create-pantoken-app
<platform>` alias is documented alongside `npx @pantoken/scaffold <platform>` for scaffolding
without the agent assets.
