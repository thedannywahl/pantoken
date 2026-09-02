[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# دالة: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

اختر كائن التوكن لمخطط ألوان (زوج مع `useColorScheme` الخاص بـ RN).

## المعلمات

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## القيم المرجعة

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## مثال

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
