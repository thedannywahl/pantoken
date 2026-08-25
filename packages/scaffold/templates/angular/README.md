# {{projectName}}

Scaffolded with `pantoken-scaffold angular` (or `pantoken-ai scaffold angular`) — a standalone
Angular app (via Vite + `@analogjs/vite-plugin-angular`, no Angular CLI) styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components) and
[`@pantoken/angular`](https://www.npmjs.com/package/@pantoken/angular) (pantoken custom elements
for Angular).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` calls `registerPantokenElements()` (from `@pantoken/angular`) once at bootstrap so
  elements like `<instui-icon>` work in templates, and imports the token/component CSS plus
  `@pantoken/plugin-layouts/layouts.css`.
- `src/app.component.ts` is a standalone component (`CUSTOM_ELEMENTS_SCHEMA` lets the template
  compiler accept pantoken's custom element tags) whose template follows the `wrapper` app-shell
  layout from `@pantoken/plugin-layouts` (`.container` / `.header` / `.content` parts).
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.iywahl.com/api/css) for the full class list.
