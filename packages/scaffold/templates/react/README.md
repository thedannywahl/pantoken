# {{projectName}}

A Vite + React app styled with [`@pantoken/react`](https://www.npmjs.com/package/@pantoken/react)
and [`@pantoken/css`](https://www.npmjs.com/package/@pantoken/css), Instructure's design tokens and
icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.tsx` imports `@pantoken/css` (defines every `--instui-*` custom property) and
  `@pantoken/interactions` (wires up modal, tooltip, and other component behaviors out of the
  box).
- `src/App.tsx` renders markup styled with `instui-*` classes; optional insertion points (header,
  filters, content, trailing) are marked with `<div data-slot="...">`.
- For InstUI's full React component library (buttons, modals, etc. — including `@pantoken/react`'s
  `<Icon>`), add the specific `@instructure/ui-*` packages you need — see <https://instructure.design>.

## Learn more

See the [getting started guide](https://pantoken.app/guide/getting-started) to learn more.
