# @pantoken/tailwind

A Tailwind CSS preset that maps Instructure design tokens into the theme. Every token is exposed as a
`var(--instui-*)` reference — not a concrete value — so Tailwind utilities theme through the same CSS
custom properties `@pantoken/css` emits, and light, dark, and high-contrast all keep working.

## Install

```sh
npm i -D @pantoken/tailwind
```

Also available as `pantoken/tailwind`.

## Usage

```ts
// tailwind.config.ts
import { pantokenPreset } from "@pantoken/tailwind";

export default {
  presets: [pantokenPreset()],
  content: ["./src/**/*.{ts,tsx}"],
};
```

Then use utilities backed by the tokens:

```html
<div class="bg-color-background-base p-space-md font-lato">…</div>
```

Pair it with `@pantoken/css` (or `@pantoken/vite`) so the `--instui-*` custom properties are actually
defined. Pass `pantokenPreset({ includePrimitives: true })` to also expose the raw palette under a
`primitive-` prefix. `tailwindcss` is an optional peer dependency.

## API

- **`pantokenPreset(options?): TailwindPreset`** — builds the preset, contributing `colors`,
  `spacing`, and `fontFamily` under `theme.extend`. `options.includePrimitives` adds the primitive
  palette. Also the default export.
- **`PantokenPresetOptions`** — options type.
- **`TailwindPreset`** — the shape of the config slice this preset contributes.

## Related

- Pairs with `@pantoken/css` or `@pantoken/vite`, which define the `--instui-*` custom properties the
  utilities reference.

## License

MIT
