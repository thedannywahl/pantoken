[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# फंक्शन: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Register the pantoken custom elements (client-side) and render children.

## पैरामीटर

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## वापसी

`ReactNode`

## उदाहरण

```tsx
import { TokenProvider, Icon } from "@pantoken/react";
import "@pantoken/css";

function App() {
  return (
    <TokenProvider>
      <Icon name="check-mark" size="1.25rem" /> Saved
    </TokenProvider>
  );
}
```
