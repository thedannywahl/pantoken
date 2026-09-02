[pantoken](../../../index.md) / css-in-js

# css-in-js

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/css-in-js` — et Instructure tema-objekt til runtime CSS-in-JS biblioteker.

Fungerer med ethvert bibliotek, der læser et tema fra `props.theme` — Emotion, styled-components og Stitches deler alle denne konvention. [pantokenTheme](variables/pantokenTheme.md) er det færdiglavede `rebrand` objekt, var()-understøttet så lys/mørk skift flyder gennem `@pantoken/css`. [toStyledTheme](functions/toStyledTheme.md) bygger et fra enhver IR (og kan bage konkrete værdier med `{ resolve }`).

## Eksempel

**styled-components**

```tsx
import { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";
<ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
// const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
```

## Interfaces

- [ToStyledThemeOptions](interfaces/ToStyledThemeOptions.md)

## Typealiaser

- [StyledTheme](type-aliases/StyledTheme.md)

## Variabler

- [pantokenTheme](variables/pantokenTheme.md)

## Funktioner

- [toThemeKey](functions/toThemeKey.md)
- [toStyledTheme](functions/toStyledTheme.md)

## Referencer

### Mode

Genudsender [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Omdøber og re-eksporterer [pantokenTheme](variables/pantokenTheme.md)
