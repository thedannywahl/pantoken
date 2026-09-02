[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / toStylus

# Funktion: toStylus()

> **toStylus**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit Stylus variables for a token IR.

## Parameter

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToStylusOptions`](../interfaces/ToStylusOptions.md) = `{}`

[ToStylusOptions](../interfaces/ToStylusOptions.md).

## Rückgabe

`string`

The Stylus source string.

## Beispiele

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
