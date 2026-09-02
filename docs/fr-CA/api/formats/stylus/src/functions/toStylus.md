[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / toStylus

# Fonction: toStylus()

> **toStylus**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit Stylus variables for a token IR.

## Paramètres

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToStylusOptions`](../interfaces/ToStylusOptions.md) = `{}`

[ToStylusOptions](../interfaces/ToStylusOptions.md).

## Retourne

`string`

The Stylus source string.

## Exemples

**Emit the default (light) variables**

```ts
import { toStylus } from "@pantoken/stylus";
import { tokens } from "@pantoken/tokens";

toStylus(tokens); // "instui-color-brand = #0374b5\n…"
```

**Resolve the dark mode of another theme**

```ts
import { toStylus } from "@pantoken/stylus";
import { byTheme } from "@pantoken/tokens";

toStylus(byTheme("canvas"), { mode: "dark" });
```
