[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Fonksiyon: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Register the pantoken custom elements (client-side) and render children.

## Parametreler

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Döndürür

`ReactNode`

## Örnek

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
