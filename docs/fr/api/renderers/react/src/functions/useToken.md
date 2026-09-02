[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Fonction: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## Paramètres

### name

`string`

### fallback?

`string` = `""`

## Renvoie

`string`

## Exemple

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
