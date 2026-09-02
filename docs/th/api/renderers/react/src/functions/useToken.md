[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# ฟังก์ชัน: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

React hook returning a resolved `--instui-*` token value (re-reads on `name` change).

## พารามิเตอร์

### name

`string`

### fallback?

`string` = `""`

## คืนค่า

`string`

## ตัวอย่าง

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
