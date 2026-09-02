[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Hàm: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Register the pantoken custom elements (client-side) and render children.

## Tham số

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Trả về

`ReactNode`

## Ví dụ

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
