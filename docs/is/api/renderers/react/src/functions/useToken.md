[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Fall: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## Færibreytur

### name

`string`

### fallback?

`string` = `""`

## Skilar

`string`

## Dæmi

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
