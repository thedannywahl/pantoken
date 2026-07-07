# Getting started

pantoken takes Instructure UI's design tokens and icons, resolves them once, and reshapes that one
model into packages for many platforms: plain stylesheets, SCSS and Less, React and Vue and Svelte,
Tailwind and Panda, native Swift and Kotlin, WordPress and Drupal, Figma, and more.

You install the smallest package that fits your task. Everything is also re-exported by the unified
`pantoken` package, so you can start there and narrow down later.

## The token model

Tokens are CSS custom properties named `--instui-<group>-<name>`, for example
`--instui-color-background-brand` or `--instui-spacing-space-md`. Three themes ship: `rebrand`
(the default, with `light-dark()` where light and dark differ), `canvas`, and `canvasHighContrast`.
Icons are `<image>` tokens (`--instui-icon-<name>`) derived from Lucide plus Instructure's custom
glyphs.

## Style a web app

Install the stylesheet and import it once. It defines every `--instui-*` property, so you reference
them straight from your own CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Use icons anywhere

The web component works in any framework, with no porting.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

## Generate for a native platform

The CLI writes token source into a target repo. No install beyond the runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

See [the pantoken CLI](/guide/cli) for every target.

## Where to next

- [The package map](/guide/packages) — which package to reach for, by task.
- [Architecture](/guide/architecture) — how the token model, core, and outputs fit together.
- [API reference](/api/) — every exported symbol, generated from the source.
