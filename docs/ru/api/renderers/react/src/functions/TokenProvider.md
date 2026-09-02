[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / TokenProvider

# Функция: TokenProvider()

> **TokenProvider**(`__namedParameters`): `ReactNode`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Register the pantoken custom elements (client-side) and render children.

## Параметры

### \_\_namedParameters

[`TokenProviderProps`](../interfaces/TokenProviderProps.md)

## Возвращаемое значение

`ReactNode`

## Пример

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
