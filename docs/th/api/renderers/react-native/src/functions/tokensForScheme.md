[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# ฟังก์ชัน: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## พารามิเตอร์

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## คืนค่า

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## ตัวอย่าง

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
