[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Funksjon: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## Parametrar

### name

`string`

### fallback?

`string` = `""`

## Returnerer

`string`

## Døme

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
