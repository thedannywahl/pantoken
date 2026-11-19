---
"@pantoken/interactions": minor
---

Use Array.at() for end-element access in keyboard navigation

Replace 4 occurrences of `arr[arr.length - 1]` with `arr.at(-1)` in keyboard
navigation handlers:

- formats/interactions/src/behaviors/segmented-control.ts (1)
- formats/interactions/src/behaviors/menu.ts (2)
- formats/interactions/src/behaviors/tree-browser.ts (1)

Also update formats/interactions/tsconfig.json target from ES2020 to ES2022 to
support Array.at() (ES2022 feature) while maintaining Node 26+ compatibility.

Array.at() improves readability for relative array access, especially negative
indices for end-of-array elements.
