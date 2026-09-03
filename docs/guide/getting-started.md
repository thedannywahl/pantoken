# Getting started

pantoken takes Instructure UI's design tokens and icons, resolves them once, and reshapes that one
model into packages for many platforms: plain stylesheets, SCSS and Less, React and Vue and Svelte,
Tailwind and Panda, native Swift and Kotlin, WordPress and Drupal, Figma, and more.

You install the smallest package that fits your task. Everything is also re-exported by the unified
`pantoken` package, so you can start there and narrow down later.

## Scaffold a starter project

The fastest way to try pantoken: scaffold a starter project with it already installed and wired in.

```sh
npx create-pantoken-app
```

Platforms: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. See
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) for `--dir <path>` and
programmatic use.

Using an AI coding agent? No install needed — point it at the skill directly:

```prompt
Fetch create.pantoken.app/SKILL.md and follow it to set up pantoken in this project.
```

If you'drather wire pantoken's agent rules into the repo permanently (AGENTS.md, editor rules, a local copy of this skill), run `npx @pantoken/ai init` instead.

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

### CSS tokens

Icons are CSS custom properties (`--instui-icon-<name>`). Load the stylesheet once and reference any
icon as a `mask-image` or `background-image` — no per-icon import needed.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — single icon vs. full set

`@pantoken/icons` exposes two named exports. Use `iconsByName` to pull one icon without iterating
the full array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Use `icons` when you need the whole set (e.g. to build a picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Both exports load the full IR at module initialisation — there is no per-icon tree-shaking at this
level. For lean CSS-only loading, use the [CDN picker](/guide/cdn-picker) to generate a combine URL
for only the icons you need.

## Generate for a native platform

The CLI writes token source into a target repo. No install beyond the runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

See [the pantoken CLI](/guide/cli) for every target.

## VS Code authoring hints

`@pantoken/pantoken` now ships VS Code custom-data files so downstream projects can get class and
token completion in HTML/CSS without installing a pantoken-specific extension.

1. Install the unified package:

```sh
npm i @pantoken/pantoken
```

1. Point VS Code at the shipped custom-data JSON from your consumer workspace:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (or run "Developer: Reload Window") to apply the new data.

This enables suggestions for `instui-*` class tokens (and `-modifier` class tokens) plus
`--instui-*` custom properties.

## Where to next

- [The package map](/guide/packages) — which package to reach for, by task.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — install agent assets and rules in a consumer repo.
- [Architecture](/guide/architecture) — how the token model, core, and outputs fit together.
- [API reference](/api/) — every exported symbol, generated from the source.
