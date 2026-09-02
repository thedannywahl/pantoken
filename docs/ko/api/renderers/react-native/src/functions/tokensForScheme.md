[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# 함수: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## 매개변수

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## 반환값

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## 예제

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
