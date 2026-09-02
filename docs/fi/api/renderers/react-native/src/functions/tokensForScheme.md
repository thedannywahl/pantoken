[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Funktio: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## Parametrit

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Palauttaa

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Esimerkki

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
