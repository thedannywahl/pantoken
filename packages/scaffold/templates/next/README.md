# {{projectName}}

A Next.js (App Router) app styled with [`@pantoken/next`](https://www.npmjs.com/package/@pantoken/next),
Instructure's design tokens and icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `next.config.mjs` wraps the config with `withPantoken(...)` (adds pantoken to
  `transpilePackages`).
- `app/layout.tsx` imports `@pantoken/css`, which defines every `--instui-*` custom
  property, at the root so it's available on every page, plus the `wrapper` layout's root class on
  `<body>` and `PantokenInteractions` (a client component that loads `@pantoken/interactions` —
  wires up modal, tooltip, and other component behaviors out of the box).
- `app/page.tsx` renders markup styled with `instui-*` classes; optional insertion points (header,
  filters, content, trailing) are marked with `<div data-slot="...">`.

## Learn more

See the [getting started guide](https://pantoken.app/guide/getting-started) to learn more.
