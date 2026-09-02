[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# 関数: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## パラメーター

### name

`string`

### fallback?

`string` = `""`

## 戻り値

`string`

## 例

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
