[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Function: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تسجيل عناصر pantoken المخصصة (على جانب العميل) وعرض الأطفال.

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
