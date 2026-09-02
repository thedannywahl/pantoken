[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toStyledTheme

# Funktion: toStyledTheme()

> **toStyledTheme**(`tokens`, `options?`): [`StyledTheme`](../type-aliases/StyledTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Build a CSS-in-JS theme object from a token IR.

## Parameter

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToStyledThemeOptions`](../interfaces/ToStyledThemeOptions.md) = `{}`

[ToStyledThemeOptions](../interfaces/ToStyledThemeOptions.md).

## Rückgabe

[`StyledTheme`](../type-aliases/StyledTheme.md)

The theme object, keyed by camelCased token name.

## Beispiele

**var()-backed, light/dark flows through @pantoken/css**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const theme = toStyledTheme(tokens);
// theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
```

**Bake concrete single-mode values (for SSR without CSS variables)**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → a concrete value, not a var()
```
