[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSwatches

# Feidhm: toSwatches()

> **toSwatches**(`tokens`, `mode?`): [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Reduce a token IR to a flat list of colour swatches: resolve references, pick a mode, keep only
tokens whose value is a hex colour (icons and non-colour tokens are dropped).

## Paraiméadair

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Which colour mode to resolve (default `"light"`).

## Tuairisceáin

[`Swatch`](../interfaces/Swatch.md)[]

The swatch list, named by token (without the `--instui-` prefix).

## Samplaí

**Reduce the token IR to light-mode swatches**

```ts
import { toSwatches } from "@pantoken/swatches";
import { tokens } from "@pantoken/tokens";

const swatches = toSwatches(tokens); // [{ name: "color-background-brand", hex: "#…" }, …]
```

**Dark mode**

```ts
import { toSwatches } from "@pantoken/swatches";
import { byTheme } from "@pantoken/tokens";

const swatches = toSwatches(byTheme("canvas"), "dark");
```
