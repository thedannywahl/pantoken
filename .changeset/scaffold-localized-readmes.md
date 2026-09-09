---
"@pantoken/scaffold": minor
"create-pantoken-app": minor
---

Localize scaffolded project READMEs.

Adds a `scaffold.readme` content space covering `packages/scaffold/templates/*/README.md`, so each
platform's README is translated as one whole-Markdown unit and rendered per locale. The scaffolder
layers those renderings over the English templates at scaffold time, and only files that actually
differ from English are inlined — an untranslated locale costs nothing.
