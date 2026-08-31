[pantoken](../../../index.md) / css-in-js

# css-in-js

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/css-in-js` — كائن موضوع Instructure لمكتبات CSS-in-JS في وقت التشغيل.

يعمل مع أي مكتبة تقرأ موضوعاً من `props.theme` — Emotion و styled-components و Stitches كلها تشارك هذه الاتفاقية. [pantokenTheme](variables/pantokenTheme.md) هو كائن `rebrand` الجاهز، مدعوم بـ var() بحيث يتم تدفق التبديل light/dark من خلال `@pantoken/css`. [toStyledTheme](functions/toStyledTheme.md) يبني واحداً من أي IR (ويمكنه خبز قيم ملموسة مع `{ resolve }`).

## Example

**styled-components**

```tsx
import { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";
<ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
// const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
```

## Interfaces

- [ToStyledThemeOptions](interfaces/ToStyledThemeOptions.md)

## Type Aliases

- [StyledTheme](type-aliases/StyledTheme.md)

## Variables

- [pantokenTheme](variables/pantokenTheme.md)

## Functions

- [toThemeKey](functions/toThemeKey.md)
- [toStyledTheme](functions/toStyledTheme.md)

## References

### Mode

إعادة تصدير [Mode](../../../packages/core/src/type-aliases/Mode.md)

---

### default

إعادة تسمية وإعادة تصدير [pantokenTheme](variables/pantokenTheme.md)
