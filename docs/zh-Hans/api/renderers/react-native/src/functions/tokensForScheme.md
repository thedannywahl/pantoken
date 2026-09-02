[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# 函数: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## 参数

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## 返回值

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## 示例

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
