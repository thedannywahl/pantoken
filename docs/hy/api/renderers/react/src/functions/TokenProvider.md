[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Ֆունկցիա: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Գրանցել pantoken custom տարրերը (հաճախորդի կողմ) և պատկերել երեխաները:

## Պարամետրեր

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Վերադարձվող արժեք

`ReactNode`

## Օրինակ

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
