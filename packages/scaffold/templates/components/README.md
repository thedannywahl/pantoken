# {{projectName}}

A plain TypeScript app (via Vite) styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components), Instructure's
design tokens and icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `index.html` holds the actual page markup — a `wrapper`-layout shell from
  [`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts). View source
  and edit it directly; nothing is injected by JavaScript.
- `src/main.ts` imports `@pantoken/css` (defines every `--instui-*` custom property),
  `@pantoken/components/base.css` (document defaults + focus ring), `components.css`
  (`.instui-*` classes), `@pantoken/interactions` (wires up modal, tooltip, and other component
  behaviors out of the box), and your own `src/style.css` — add interactive behavior here.
- Optional insertion points (header, filters, content, trailing) are marked with
  `<div data-slot="...">` in `index.html` — replace their contents with your own markup.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.

## Learn more

See the [HTML guide](https://pantoken.app/guide/components) to learn more.
