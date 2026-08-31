[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / extendPlugin

# Function: extendPlugin()

> **extendPlugin**(`base`, `overrides`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir un connector a partir d'un altre. Els ganxos de la mateixa etapa es componen: `tokens` executa `base` aleshores
`overrides` (que veu la sortida base); `css` fusiona ambdós `CssContribution`; `icons`/`native` executen
ambdós; `rehype` encadena resolvedors (les substitucions primer). Les capacitats són la unió.

## Parameters

### base

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

El connector a estendre.

### overrides

`Partial`\<[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)\>

Ganxos (i un `name` opcional) superposats a la part superior.

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Un nou connector marcat.

## Example

**Afegir una contribució CSS extra a la part superior d'un connector base**

```ts
import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";

const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
// themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
```
