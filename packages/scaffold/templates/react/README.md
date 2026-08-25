# {{projectName}}

Scaffolded with `pantoken-scaffold react` (or `pantoken-ai scaffold react`) — a Vite + React app styled with
[`@pantoken/react`](https://www.npmjs.com/package/@pantoken/react) and
[`@pantoken/css`](https://www.npmjs.com/package/@pantoken/css), Instructure's design tokens and
icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.tsx` imports `@pantoken/css/inject`, which defines every `--instui-*` custom property.
- `src/App.tsx` renders markup following the `wrapper` app-shell layout from
  [`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts)
  (`.container` / `.header` / `.content` parts) styled with `instui-*` classes.
- For InstUI's full React component library (buttons, modals, etc. — including `@pantoken/react`'s
  `<Icon>`), add the specific `@instructure/ui-*` packages you need — see <https://instructure.design>.
