# {{projectName}}

Scaffolded with `pantoken-scaffold svelte` (or `pantoken-ai scaffold svelte`) — a Vite + Svelte app
styled with [`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components) and
[`@pantoken/svelte`](https://www.npmjs.com/package/@pantoken/svelte) (icon action + token reads).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` calls `register()` (from `@pantoken/svelte`) once at bootstrap so elements like
  `<instui-icon>` work in templates, and imports the token/component CSS plus
  `@pantoken/plugin-layouts/layouts.css`.
- `src/App.svelte`'s markup follows the `wrapper` app-shell layout from
  `@pantoken/plugin-layouts` (`.container` / `.header` / `.content` parts).
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.
