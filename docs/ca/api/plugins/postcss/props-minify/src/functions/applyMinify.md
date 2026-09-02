[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# Funció: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aplica transformacions de minificació de propietats personalitzades a una cadena de full d'estils.

Construeix una matriu de plugins PostCSS a partir de `options` i l'executa de manera síncrona. Ordre del plugin:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. Retorna l'entrada sense canvis quan
no hi ha opcions establertes.

## Paràmetres

### css

`string`

La cadena de full d'estils a transformar.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## Retorna

`string`

La cadena CSS transformada.

## Exemple

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
