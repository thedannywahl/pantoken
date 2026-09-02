[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# 함수: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Register the pantoken custom elements (client-side) and render children.

## 매개변수

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## 반환값

`ReactNode`

## 예제

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
