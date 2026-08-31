[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSwatches

# Function: toSwatches()

> **toSwatches**(`tokens`, `mode?`): [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Reducér en token IR til en flad liste over farveprøver: løs referencer, vælg en tilstand, bevar kun
tokens, hvis værdi er en hexfarve (ikoner og ikke-farve-tokens dropper).

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Hvilken farvetilstand skal løses (standard `"light"`).

## Returns

[`Swatch`](../interfaces/Swatch.md)[]

Prøvepaletten, navngivet efter token (uden `--instui-` præfiks).

## Examples

**Reducer token IR til light-mode prøver**

```ts
import { toSwatches } from "@pantoken/swatches";
import { tokens } from "@pantoken/tokens";

const swatches = toSwatches(tokens); // [{ name: "color-background-brand", hex: "#…" }, …]
```

**Mørk tilstand**

```ts
import { toSwatches } from "@pantoken/swatches";
import { byTheme } from "@pantoken/tokens";

const swatches = toSwatches(byTheme("canvas"), "dark");
```
