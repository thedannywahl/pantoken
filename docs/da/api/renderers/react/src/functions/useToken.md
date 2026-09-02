[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Funktion: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

React hook returnerer en opløst `--instui-*` tokenværdi (genlæser på `name` ændring).

## Parametre

### name

`string`

### fallback?

`string` = `""`

## Returnerer

`string`

## Eksempel

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
