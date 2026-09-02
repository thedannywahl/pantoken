[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# 函式: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## 參數

### name

`string`

### fallback?

`string` = `""`

## 回傳

`string`

## 範例

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
