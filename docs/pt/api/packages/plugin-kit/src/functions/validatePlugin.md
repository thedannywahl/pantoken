[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# Função: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Assert that a plugin has a valid structure: non-empty name, all hooks are functions,
and no hook key falls outside the recognised stage set.

Called automatically by [definePlugin](definePlugin.md). Export it so hand-authored plugins can
be validated before passing them to a stage runner.

## Parâmetros

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Retorna

`void`

## Lança

When the plugin fails structural validation.

## Exemplo

**Validate a hand-authored plugin**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) });      // throws
```
