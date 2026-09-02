[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# ฟังก์ชัน: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Register the pantoken custom elements (client-side) and render children.

## พารามิเตอร์

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## คืนค่า

`ReactNode`

## ตัวอย่าง

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
