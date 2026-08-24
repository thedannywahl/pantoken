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
- `src/App.tsx` references tokens with `var(--instui-*)` and renders an icon via `@pantoken/react`'s
  `<Icon>`.
- For InstUI's full React component library (buttons, modals, etc.), add the specific
  `@instructure/ui-*` packages you need — see <https://instructure.design>.
