# {{projectName}}

A plain TypeScript app (via Vite) styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components) and using
framework-agnostic custom elements from
[`@pantoken/web-components`](https://www.npmjs.com/package/@pantoken/web-components).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` imports `@pantoken/css` (defines every `--instui-*` custom property),
  `@pantoken/components/base.css` + `components.css` (`.instui-*` classes),
  `@pantoken/interactions` (wires up modal, tooltip, and other component behaviors out of the
  box), and `@pantoken/web-components` (auto-registers elements like `<instui-icon>`), then
  renders markup into `#app`.
- Optional insertion points (header, filters, content, trailing) are marked with
  `<div data-slot="...">` — replace their contents with your own markup.
- Use custom elements directly in markup, e.g. `<instui-button>`, `<instui-alert variant="success">` —
  see the [`@pantoken/web-components` README](https://www.npmjs.com/package/@pantoken/web-components)
  for the full element list.

## Learn more

See the [HTML guide](https://pantoken.app/guide/components) to learn more.
