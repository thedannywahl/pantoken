[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / extendPlugin

# 함수: extendPlugin()

> **extendPlugin**(`base`, `overrides`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Build a plugin on top of another. Same-stage hooks are composed: `tokens` runs `base` then
`overrides` (which sees base's output); `css` merges both `CssContribution`s; `icons`/`native` run
both; `rehype` chains resolvers (overrides first). Capabilities are the union.

## 매개변수

### base

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

The plugin to extend.

### overrides

`Partial`\<[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)\>

Hooks (and an optional `name`) layered on top.

## 반환값

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

A new branded plugin.

## 예제

**Add an extra CSS contribution on top of a base plugin**

```ts
import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";

const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
// themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
```
