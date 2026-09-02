[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Swyddogaeth: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Register the pantoken custom elements (client-side) and render children.

## Paramedrau

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Yn dychwelyd

`ReactNode`

## Enghraifft

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
