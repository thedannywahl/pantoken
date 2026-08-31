[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSwatches

# Function: toSwatches()

> **toSwatches**(`tokens`, `mode?`): [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Reduir un token IR a una llista plana de mostres de color: resoldre referències, triar un mode, mantenir només
els tokens amb valor de color hexadecimal (les icones i els tokens no-color es descarten).

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Quin mode de color resoldre (per defecte `"light"`).

## Returns

[`Swatch`](../interfaces/Swatch.md)[]

La llista de mostres, anomenada per token (sense el prefix `--instui-`).

## Examples

**Reduir el token IR a mostres de mode clar**

```ts
import { toSwatches } from "@pantoken/swatches";
import { tokens } from "@pantoken/tokens";

const swatches = toSwatches(tokens); // [{ name: "color-background-brand", hex: "#…" }, …]
```

**Mode fosc**

```ts
import { toSwatches } from "@pantoken/swatches";
import { byTheme } from "@pantoken/tokens";

const swatches = toSwatches(byTheme("canvas"), "dark");
```
