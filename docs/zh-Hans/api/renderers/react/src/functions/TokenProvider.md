[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# 函数: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Register the pantoken custom elements (client-side) and render children.

## 参数

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## 返回值

`ReactNode`

## 示例

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
