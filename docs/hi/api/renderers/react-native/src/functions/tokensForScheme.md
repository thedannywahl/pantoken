[pantoken](../../../../index.md) / [renderers/react-native/src](../index.md) / tokensForScheme

# फंक्शन: tokensForScheme()

> **tokensForScheme**(`scheme`): `Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Select the token object for a colour scheme (pair with RN's `useColorScheme`).

## पैरामीटर

### scheme

`"light"` \| `"dark"` \| `null` \| `undefined`

## वापसी

`Record`\<`string`, [`RNTokenValue`](../type-aliases/RNTokenValue.md)\>

## उदाहरण

```tsx
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```
