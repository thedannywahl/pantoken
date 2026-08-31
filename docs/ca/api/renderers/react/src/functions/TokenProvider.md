[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Function: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Registra els elements personalitzats de pantoken (del costat del client) i renderitza els fills.

## Parameters

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Returns

`ReactNode`

## Example

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
