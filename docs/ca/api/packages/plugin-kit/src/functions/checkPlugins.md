[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / checkPlugins

# Funció: checkPlugins()

> **checkPlugins**(`plugins`, `stage`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Filtrar una llista de connectors als que participen a `stage`, advertint sobre els altres.

## Paràmetres

### plugins

readonly [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Els connectors registrats.

### stage

[`Stage`](../type-aliases/Stage.md)

L'etapa que s'està executant.

## Retorna

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Els connectors que tenen un ganxo per a `stage`.

## Exemple

**Mantenir només els connectors que participen en una etapa**

```ts
import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";

const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });

// Warns that "tok" has no css hook, then returns just the css plugin.
checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
```
