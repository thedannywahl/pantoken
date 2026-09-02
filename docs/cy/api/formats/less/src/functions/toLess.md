[pantoken](../../../../index.md) / [formats/less/src](../index.md) / toLess

# Swyddogaeth: toLess()

> **toLess**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit Less variables for a token IR.

## Paramedrau

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToLessOptions`](../interfaces/ToLessOptions.md) = `{}`

[ToLessOptions](../interfaces/ToLessOptions.md).

## Yn dychwelyd

`string`

The Less source string.

## Enghreifftiau

**Emit the default (light) variables**

```ts
import { toLess } from "@pantoken/less";
import { tokens } from "@pantoken/tokens";

toLess(tokens); // "@instui-color-brand: #0374b5;\n…"
```

**Resolve the dark mode of another theme**

```ts
import { toLess } from "@pantoken/less";
import { byTheme } from "@pantoken/tokens";

toLess(byTheme("canvas"), { mode: "dark" });
```
