[pantoken](../../../index.md) / css-in-js

# css-in-js

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/css-in-js` — كائن سمة من Instructure لمكتبات CSS-in-JS في وقت التشغيل.

يعمل مع أي مكتبة تقرأ سمة من `props.theme` — تشترك مكتبات Emotion و styled-components و
Stitches جميعها في هذا التقليد. [pantokenTheme](variables/pantokenTheme.md) هو كائن `rebrand` الجاهز،
مدعوم بواسطة var() بحيث ينساب تبديل الوضع الفاتح/الداكن عبر `@pantoken/css`. [toStyledTheme](functions/toStyledTheme.md) يبني
واحدًا من أي IR (ويمكنه تثبيت قيم ملموسة باستخدام `{ resolve }`).

## مثال

**styled-components**

```tsx
import { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";
<ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
// const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
```

## واجهات

- [ToStyledThemeOptions](interfaces/ToStyledThemeOptions.md)

## أسماء أنواع مستعارة

- [StyledTheme](type-aliases/StyledTheme.md)

## المتغيرات

- [pantokenTheme](variables/pantokenTheme.md)

## الدوال

- [toThemeKey](functions/toThemeKey.md)
- [toStyledTheme](functions/toStyledTheme.md)

## المراجع

### Mode

يعيد تصدير [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

يعيد تسمية ويعيد تصدير [pantokenTheme](variables/pantokenTheme.md)
