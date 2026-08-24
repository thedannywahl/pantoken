# {{projectName}}

Scaffolded with `pantoken-scaffold web-components` (or `pantoken-ai scaffold web-components`) — a
plain TypeScript app (via Vite) styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components) and using framework-agnostic
custom elements from [`@pantoken/web-components`](https://www.npmjs.com/package/@pantoken/web-components).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` imports `@pantoken/components/base.css` + `components.css` (`.instui-*` classes),
  `@pantoken/plugin-layouts/layouts.css`, and `@pantoken/web-components` (auto-registers elements
  like `<instui-icon>`), then renders markup into `#app`.
- The markup follows the `wrapper` app-shell layout from `@pantoken/plugin-layouts` (`.container` /
  `.header` / `.content` parts) — see that package's README for what each part is for.
- Use custom elements directly in markup, e.g. `<instui-button>`, `<instui-alert variant="success">` —
  see the [`@pantoken/web-components` README](https://www.npmjs.com/package/@pantoken/web-components)
  for the full element list.
