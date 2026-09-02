[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / checkPlugins

# Funktion: checkPlugins()

> **checkPlugins**(`plugins`, `stage`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Filtrer en plugin-liste til dem, der deltager i `stage`, med advarsel om resten.

## Parametre

### plugins

readonly [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

De registrerede plugins.

### stage

[`Stage`](../type-aliases/Stage.md)

Det trin, der køres.

## Returnerer

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

De plugins, der har en hook til `stage`.

## Eksempel

**Behold kun de plugins, der deltager i et trin**

```ts
import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";

const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });

// Warns that "tok" has no css hook, then returns just the css plugin.
checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
```
