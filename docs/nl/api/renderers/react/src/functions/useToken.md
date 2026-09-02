[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Functie: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Retourneert

`string`

## Voorbeeld

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
