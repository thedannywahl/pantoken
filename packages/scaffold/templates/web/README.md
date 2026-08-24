# {{projectName}}

Scaffolded with `pantoken-scaffold web` (or `pantoken-ai scaffold web`) — a plain TypeScript app (via Vite) styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components), Instructure's
design tokens and icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` imports `@pantoken/components/base.css` (document defaults + focus ring) and
  `components.css` (`.instui-*` classes), then renders markup into `#app`.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.iywahl.com/api/css) for the full class list.
