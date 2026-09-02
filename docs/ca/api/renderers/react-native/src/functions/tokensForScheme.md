[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# Funció: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Seleccionar l'objecte de token per a un esquema de color (parella amb `useColorScheme` de RN).

## Paràmetres

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## Retorna

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## Exemple

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
