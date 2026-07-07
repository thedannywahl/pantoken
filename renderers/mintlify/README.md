# @pantoken/mintlify

Theme a [Mintlify](https://mintlify.com) docs site with Instructure tokens. Mintlify reads concrete
hex from its `docs.json` at build, so this renderer resolves the tokens to per-mode values (like the
MUI renderer) rather than shipping a CSS-variable bridge.

## What it maps

| Mintlify `docs.json` key | Instructure token                                                   | Notes                     |
| ------------------------ | ------------------------------------------------------------------- | ------------------------- |
| `colors.primary`         | `--instui-color-background-brand` (light)                           | Emphasis in light mode.   |
| `colors.light`           | `--instui-color-background-brand` (dark)                            | Emphasis in dark mode.    |
| `colors.dark`            | `--instui-color-background-interactive-action-primary-base` (light) | Buttons and hover states. |
| `background.color.light` | `--instui-color-background-page` (light)                            | Page surface, light mode. |
| `background.color.dark`  | `--instui-color-background-page` (dark)                             | Page surface, dark mode.  |

## Usage

Import the ready-made `rebrand` fragment and merge it into your `docs.json`:

```ts
import { docsJson } from "@pantoken/mintlify";
// { colors: { primary, light, dark }, background: { color: { light, dark } } }
```

Or grab the generated file at `@pantoken/mintlify/docs.json` and merge its keys into your own
`docs.json`. For a different IR, call `toMintlifyConfig(tokens)`.

A `docs.json` with the theming keys merged in:

```json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```
