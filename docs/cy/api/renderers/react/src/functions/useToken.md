[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Swyddogaeth: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## Paramedrau

### name

`string`

### fallback?

`string` = `""`

## Yn dychwelyd

`string`

## Enghraifft

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
