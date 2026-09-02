[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# 함수: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## 매개변수

### name

`string`

### fallback?

`string` = `""`

## 반환값

`string`

## 예제

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
