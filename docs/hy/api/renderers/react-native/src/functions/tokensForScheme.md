[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Ֆունկցիա: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ընտրել մեջբերում օբյեկտ գույնի սխեմայի համար (զույգ RN's `useColorScheme`-ի հետ)։

## Պարամետրեր

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Վերադարձվող արժեք

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Օրինակ

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
