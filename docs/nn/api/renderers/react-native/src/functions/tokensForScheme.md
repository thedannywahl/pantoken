[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Funksjon: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## Parametrar

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Returnerer

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Døme

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
