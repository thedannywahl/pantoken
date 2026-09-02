---
---

chore(ci): restructure translation task graph and extend drift checks to CLI packages

Implements Phase 0.6: consolidates three separate translation domains (UI, docs, CLI) into a unified task graph.

vite.config.ts tasks restructured:

- Rename i18n:translate → ui:translate (web-components UI strings only)
- Add docs:translate (missing claude variant to match docs:translate:agy)
- Add cli:translate orchestrating @pantoken/scaffold#translate + @pantoken/ai#translate
- Make i18n:translate an umbrella task fanning out to ui:, docs:, and cli: domains
- Make i18n:translate:agy an umbrella task for :agy variants
- Extend i18n:check:drift to run @pantoken/scaffold#check:drift and @pantoken/ai#check:drift

.vite-hooks/pre-push:

- Widen i18n file pattern to include packages/scaffold/(src/i18n.json|i18n-cache/) and ai/pantoken-ai/(src/i18n.json|i18n-cache/)
- Trigger vp run i18n:check:drift on CLI i18n changes

.github/workflows/ci.yml:

- Extend i18n-changes paths-filter to match CLI i18n files
- Add i18n-changes and i18n-drift to ci-gate required needs list (fixes pre-existing gap where i18n-drift ran but was not gated)
