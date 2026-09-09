---
"@pantoken/scaffold": minor
"create-pantoken-app": patch
---

The `components` (plain HTML) scaffold now puts the app shell markup directly in `index.html`
instead of injecting it via a `main.ts` `innerHTML` template literal. `src/main.ts` is now just
imports plus a place to add your own behavior, and a new `src/style.css` holds your own
app-specific styles.
