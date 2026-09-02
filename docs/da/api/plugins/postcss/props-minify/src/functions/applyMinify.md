[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# Funktion: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Anvend minificering af brugerdefineret egenskab til en stylesheet-streng.

Bygger et PostCSS plugin-array fra `options` og kører det synkront. Plugin-rækkefølge:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. Returnerer input uændret når ingen indstillinger er indstillet.

## Parametre

### css

`string`

Stylesheet-strengen til at transformere.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## Returnerer

`string`

Den transformerede CSS-streng.

## Eksempel

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
