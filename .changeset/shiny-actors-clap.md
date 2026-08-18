---
"@pantoken/plugin-logos": minor
"@pantoken/plugin-custom-components": minor
---

Expose per-item CSS as individual package exports. `@pantoken/plugin-logos` now ships a `<product>.css` sheet per product (canvas, igniteai, instructure, learnplatform, mastery, parchment) and a `<name>.css` sheet per individual logo variant, alongside the existing combined `logos.css`. `@pantoken/plugin-custom-components` now exposes its existing per-component sheets (`card.css`, `agent-shell.css`) as real package exports via a `./*.css` wildcard, matching `@pantoken/components`' pattern.
