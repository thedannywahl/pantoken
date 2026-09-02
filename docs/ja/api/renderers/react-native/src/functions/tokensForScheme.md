[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# 関数: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## パラメーター

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## 戻り値

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## 例

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
