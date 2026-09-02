[pantoken](../../../index.md) / css-in-js

# css-in-js

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/css-in-js` — un objecte de tema d'Instructure per a biblioteques CSS-in-JS en temps d'execució.

Funciona amb qualsevol biblioteca que llegeixi un tema de `props.theme` — Emotion, styled-components i
Stitches comparteixen aquesta convenció. [pantokenTheme](variables/pantokenTheme.md) és l'objecte `rebrand` prèfabricat,
recolzat per var() per la qual cosa el canvi clar/fosc flueix per `@pantoken/css`. [toStyledTheme](functions/toStyledTheme.md) construeix
un a partir de qualsevol IR (i pot coure valors concrets amb `{ resolve }`).

## Exemple

**styled-components**

```tsx
import { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";
<ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
// const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
```

## Interfícies

- [ToStyledThemeOptions](interfaces/ToStyledThemeOptions.md)

## Àlies de tipus

- [StyledTheme](type-aliases/StyledTheme.md)

## Variables

- [pantokenTheme](variables/pantokenTheme.md)

## Funcions

- [toThemeKey](functions/toThemeKey.md)
- [toStyledTheme](functions/toStyledTheme.md)

## Referències

### Mode

Re-exporta [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Canvia el nom i torna a exportar [pantokenTheme](variables/pantokenTheme.md)
