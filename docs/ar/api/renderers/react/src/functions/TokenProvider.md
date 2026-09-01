[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# دالة: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

تسجيل عناصر pantoken المخصصة (جهة العميل) وعرض العناصر الفرعية.

## المعلمات

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## القيم المرجعة

`ReactNode`

## مثال

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
