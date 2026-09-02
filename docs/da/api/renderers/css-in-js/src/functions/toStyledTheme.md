[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toStyledTheme

# Funktion: toStyledTheme()

> **toStyledTheme**(`tokens`, `options?`): [`StyledTheme`](../type-aliases/StyledTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Byg et CSS-in-JS tema-objekt fra en token IR.

## Parametre

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToStyledThemeOptions`](../interfaces/ToStyledThemeOptions.md) = `{}`

[ToStyledThemeOptions](../interfaces/ToStyledThemeOptions.md).

## Returnerer

[`StyledTheme`](../type-aliases/StyledTheme.md)

Tema-objektet, nøglet efter camelCased token-navn.

## Eksempler

**var()-understøttet, lys/mørk flyder gennem @pantoken/css**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const theme = toStyledTheme(tokens);
// theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
```

**Bage konkrete single-mode værdier (til SSR uden CSS-variabler)**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → a concrete value, not a var()
```
