[pantoken](../../../index.md) / css-in-js

# css-in-js

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

`@pantoken/css-in-js` — an Instructure theme object for runtime CSS-in-JS libraries.

Works with any library that reads a theme from `props.theme` — Emotion, styled-components, and
Stitches all share that convention. [pantokenTheme](variables/pantokenTheme.md) is the ready-made `rebrand` object,
var()-backed so light/dark switching flows through `@pantoken/css`. [toStyledTheme](functions/toStyledTheme.md) builds
one from any IR (and can bake concrete values with `{ resolve }`).

## 例

**styled-components**

```tsx
import { ThemeProvider } from "styled-components";
import { pantokenTheme } from "@pantoken/css-in-js";
<ThemeProvider theme={pantokenTheme}>...</ThemeProvider>;
// const Btn = styled.button`background: ${({ theme }) => theme.colorBackgroundBrand};`;
```

## インターフェース

- [ToStyledThemeOptions](interfaces/ToStyledThemeOptions.md)

## 型エイリアス

- [StyledTheme](type-aliases/StyledTheme.md)

## 変数

- [pantokenTheme](variables/pantokenTheme.md)

## 関数

- [toThemeKey](functions/toThemeKey.md)
- [toStyledTheme](functions/toStyledTheme.md)

## 参照

### Mode

Re-exports [Mode](../../../packages/core/src/type-aliases/Mode.md)

***

### default

Renames and re-exports [pantokenTheme](variables/pantokenTheme.md)
