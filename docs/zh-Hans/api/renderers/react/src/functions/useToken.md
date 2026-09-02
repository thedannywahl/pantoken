[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# 函数: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## 参数

### name

`string`

### fallback?

`string` = `""`

## 返回值

`string`

## 示例

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
