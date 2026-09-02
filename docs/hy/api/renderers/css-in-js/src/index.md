[pantoken](../../../index.md) / css-in-js

# css-in-js

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/css-in-js` — runtime CSS-in-JS գրադարանի համար Instructure թեմայական օբյեկտ:

Աշխատում է ցանկացած գրադարանի հետ, որը `props.theme`-ից թեմա ընթերցում է — Emotion, styled-components, և Stitches բոլորը այդ կոնվենցիան կիսում են: [pantokenTheme](variables/pantokenTheme.md)-ը պատրաստ `rebrand` օբյեկտ է, var()-հետկացված այնպես, որ լույս/մութ փոխանջատումը հոսում է `@pantoken/css`-ի միջոցով: [toStyledTheme](functions/toStyledTheme.md)-ը կառուցում է ցանկացած IR-ից (և կարող է կոնկրետ արժեքներ գոյացնել `{ resolve }`-ի հետ):

## Օրինակ

**styled-components**

```tsx
import { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";
<ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
// const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
```

## Ինտերֆեյսներ

- [ToStyledThemeOptions](interfaces/ToStyledThemeOptions.md)

## Տիպային հոմանիշներ

- [StyledTheme](type-aliases/StyledTheme.md)

## Փոփոխականներ

- [pantokenTheme](variables/pantokenTheme.md)

## Ֆունկցիաներ

- [toThemeKey](functions/toThemeKey.md)
- [toStyledTheme](functions/toStyledTheme.md)

## Հղումներ

### Mode

Վերաառաքել [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Վերանամակոչում և վերահատուկ-արտահանում [pantokenTheme](variables/pantokenTheme.md)
