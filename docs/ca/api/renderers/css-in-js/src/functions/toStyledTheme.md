[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toStyledTheme

# Function: toStyledTheme()

> **toStyledTheme**(`tokens`, `options?`): [`StyledTheme`](../type-aliases/StyledTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construeix un objecte de tema CSS-in-JS a partir d'un IR de token.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToStyledThemeOptions`](../interfaces/ToStyledThemeOptions.md) = `{}`

[ToStyledThemeOptions](../interfaces/ToStyledThemeOptions.md).

## Returns

[`StyledTheme`](../type-aliases/StyledTheme.md)

L'objecte de tema, indexat pel nom del token en camelCase.

## Examples

**var()-recolzat, els fluxos clar/fosc passen per @pantoken/css**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const theme = toStyledTheme(tokens);
// theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
```

**Coure els valors concrets de mode únic (per a SSR sense variables CSS)**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → a concrete value, not a var()
```
