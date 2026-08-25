# {{projectName}}

Scaffolded with `pantoken-scaffold components` (or `pantoken-ai scaffold components`) — a plain
TypeScript app (via Vite) styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components), Instructure's
design tokens and icons.

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` imports `@pantoken/components/base.css` (document defaults + focus ring),
  `components.css` (`.instui-*` classes), and `@pantoken/plugin-layouts/layouts.css`, then renders
  markup into `#app`.
- The markup follows the `wrapper` app-shell layout from `@pantoken/plugin-layouts` (`.container` /
  `.header` / `.content` parts) — see that package's README for what each part is for.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.iywahl.com/api/css) for the full class list.
