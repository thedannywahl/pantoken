# {{projectName}}

A Vite + Svelte app styled with [`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components)
and [`@pantoken/svelte`](https://www.npmjs.com/package/@pantoken/svelte) (icon action + token reads).

## Develop

```sh
npm install
npm run dev
```

## What's here

- `src/main.ts` calls `register()` (from `@pantoken/svelte`) once at bootstrap so elements like
  `<instui-icon>` work in templates, and imports the token CSS plus `@pantoken/interactions`
  (wires up modal, tooltip, and other component behaviors out of the box).
- `src/App.svelte`'s markup is styled with `instui-*` classes; optional insertion points (header,
  filters, content, trailing) are marked with `<div data-slot="...">`.
- Apply classes like `class="instui-button"` to markup; see the
  [component reference](https://pantoken.app/api/css) for the full class list.

## Learn more

See the [getting started guide](https://pantoken.app/guide/getting-started) to learn more.
