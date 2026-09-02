[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# 函式: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Assert that a plugin has a valid structure: non-empty name, all hooks are functions,
and no hook key falls outside the recognised stage set.

Called automatically by [definePlugin](definePlugin.md). Export it so hand-authored plugins can
be validated before passing them to a stage runner.

## 參數

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## 回傳

`void`

## 可能拋出

When the plugin fails structural validation.

## 範例

**Validate a hand-authored plugin**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) });      // throws
```
