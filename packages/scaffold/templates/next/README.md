# {{projectName}}

Scaffolded with `pantoken-scaffold next` (or `pantoken-ai scaffold next`) — a Next.js (App Router) app styled with
[`@pantoken/next`](https://www.npmjs.com/package/@pantoken/next), Instructure's design tokens and
icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `next.config.mjs` wraps the config with `withPantoken(...)` (adds pantoken to
  `transpilePackages`).
- `app/layout.tsx` imports `@pantoken/css/inject`, which defines every `--instui-*` custom
  property, at the root so it's available on every page.
- `app/page.tsx` references tokens with `var(--instui-*)`.
