# {{projectName}}

Scaffolded with `pantoken-scaffold vue` (or `pantoken-ai scaffold vue`) — a Vite + Vue 3 app styled
with [`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components) and
[`@pantoken/vue`](https://www.npmjs.com/package/@pantoken/vue) (the pantoken Vue plugin).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` calls `app.use(PantokenVue)` (from `@pantoken/vue`) so elements like
  `<instui-icon>` work in templates, and imports the token/component CSS plus
  `@pantoken/plugin-layouts/layouts.css`.
- `src/App.vue`'s template follows the `wrapper` app-shell layout from
  `@pantoken/plugin-layouts` (`.container` / `.header` / `.content` parts).
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.
