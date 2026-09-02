[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# تابع: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## پارامترها

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## مقدار بازگشتی

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## نمونه

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
