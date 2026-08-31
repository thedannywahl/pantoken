[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Function: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Vælg tokenobjektet til et farvepalat (parret med RN's `useColorScheme`).

## Parameters

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Returns

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Example

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
