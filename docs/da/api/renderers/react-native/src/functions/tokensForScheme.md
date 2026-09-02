[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Funktion: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Vælg tokenobjektet til et farvepalat (parret med RN's `useColorScheme`).

## Parametre

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Returnerer

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Eksempel

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
