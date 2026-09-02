[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# फंक्शन: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## पैरामीटर

### name

`string`

### fallback?

`string` = `""`

## वापसी

`string`

## उदाहरण

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
