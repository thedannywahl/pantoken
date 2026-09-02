[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Функция: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## Параметры

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Возвращаемое значение

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Пример

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
