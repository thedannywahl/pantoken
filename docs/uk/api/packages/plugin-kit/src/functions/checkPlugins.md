[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / checkPlugins

# Функція: checkPlugins()

> **checkPlugins**(`plugins`, `stage`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Filter a plugin list to those that participate in `stage`, warning about the rest.

## Параметри

### plugins

readonly [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

The registered plugins.

### stage

[`Stage`](../type-aliases/Stage.md)

The stage being run.

## Повертає

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

The plugins that have a hook for `stage`.

## Приклад

**Keep only the plugins that participate in a stage**

```ts
import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";

const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });

// Warns that "tok" has no css hook, then returns just the css plugin.
checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
```
