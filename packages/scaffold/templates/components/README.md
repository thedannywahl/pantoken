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

- `src/main.ts` imports `@pantoken/css` (defines every `--instui-*` custom property),
  `@pantoken/components/base.css` (document defaults + focus ring), `components.css`
  (`.instui-*` classes), and `@pantoken/interactions` (wires up modal, tooltip, and other
  component behaviors out of the box), then renders markup into `#app`.
- Optional insertion points (header, filters, content, trailing) are marked with
  `<div data-slot="...">` — replace their contents with your own markup.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.

## Learn more

See the [HTML guide](https://pantoken.app/guide/components) to learn more.
