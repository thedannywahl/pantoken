[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Fonksyon: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## Paramèt

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Retounen

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Egzanp

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
