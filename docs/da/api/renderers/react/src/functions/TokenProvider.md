[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Funktion: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Registrer pantokenets brugerdefinerede elementer (på klientsiden) og gengivelse af børn.

## Parametre

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Returnerer

`ReactNode`

## Eksempel

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
