# {{projectName}}

A Vite + Vue 3 app styled with [`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components)
and [`@pantoken/vue`](https://www.npmjs.com/package/@pantoken/vue) (the pantoken Vue plugin).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` calls `app.use(PantokenVue)` (from `@pantoken/vue`) so elements like
  `<instui-icon>` work in templates, and imports the token CSS plus `@pantoken/interactions`
  (wires up modal, tooltip, and other component behaviors out of the box).
- `src/App.vue`'s template is styled with `instui-*` classes; optional insertion points (header,
  filters, content, trailing) are marked with `<div data-slot="...">`.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.

## Learn more

See the [getting started guide](https://pantoken.app/guide/getting-started) to learn more.
