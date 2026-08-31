[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Function: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Hook de React que retorna un valor de token `--instui-*` resolt (rellegeix en canvi `name`).

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Returns

`string`

## Example

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
