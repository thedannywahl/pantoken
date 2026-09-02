[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toStyledTheme

# Ֆունկցիա: toStyledTheme()

> **toStyledTheme**(`tokens`, `options?`): [`StyledTheme`](../type-aliases/StyledTheme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Տոկեն IR-ից կառուցել CSS-in-JS թեմայական օբյեկտ:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToStyledThemeOptions`](../interfaces/ToStyledThemeOptions.md) = `{}`

[ToStyledThemeOptions](../interfaces/ToStyledThemeOptions.md).

## Վերադարձվող արժեք

[`StyledTheme`](../type-aliases/StyledTheme.md)

Թեմայական օբյեկտ, camelCased տոկեն անունով բանալիացված:

## Օրինակներ

**var()-հետկացված, լույս/մութ հոսք @pantoken/css-ի միջոցով**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const theme = toStyledTheme(tokens);
// theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
```

**Գոյացնել կոնկրետ միայն-ռեժիմ արժեքներ (CSS փոփոխականներ անց SSR-ի համար)**

```ts
import { toStyledTheme } from "@pantoken/css-in-js";
import { tokens } from "@pantoken/tokens";

const dark = toStyledTheme(tokens, { resolve: "dark" });
// dark.colorBackgroundBase → a concrete value, not a var()
```
