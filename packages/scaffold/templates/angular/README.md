# {{projectName}}

A standalone Angular app (via Vite + `@analogjs/vite-plugin-angular`, no Angular CLI) styled with
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
  `@pantoken/interactions` (wires up modal, tooltip, and other component behaviors out of the
  box).
- `src/app.component.ts` is a standalone component (`CUSTOM_ELEMENTS_SCHEMA` lets the template
  compiler accept pantoken's custom element tags) whose template is styled with `instui-*`
  classes; optional insertion points (header, filters, content, trailing) are marked with
  `<div data-slot="...">`.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.

## Learn more

See the [getting started guide](https://pantoken.app/guide/getting-started) to learn more.
