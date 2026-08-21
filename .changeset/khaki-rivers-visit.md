---
"@pantoken/pantoken": minor
---

Ship VS Code custom-data artifacts in `@pantoken/pantoken` so downstream consumers can enable
HTML/CSS authoring hints without a custom extension.

- Publish `dist/html-custom-data.json` (class and modifier tokens, including `instui-*` utilities).
- Publish `dist/css-custom-data.json` (the `--instui-*` custom-property catalog).
- Expose both via package subpath exports:
  - `@pantoken/pantoken/html-custom-data.json`
  - `@pantoken/pantoken/css-custom-data.json`
- Document consumer setup in the getting-started guide via `html.customData` and `css.customData`.
