[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Funktion: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## Parametrar

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Returnerar

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Exempel

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
