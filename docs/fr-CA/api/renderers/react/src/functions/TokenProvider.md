[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Fonction: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Register the pantoken custom elements (client-side) and render children.

## Paramètres

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Retourne

`ReactNode`

## Exemple

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
