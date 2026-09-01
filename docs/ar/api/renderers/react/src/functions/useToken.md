[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# دالة: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

هوك React يعيد قيمة التوكن المحللة `--instui-*` (يعيد القراءة عند تغيير `name`).

## المعلمات

### name

`string`

### fallback?

`string` = `""`

## القيم المرجعة

`string`

## مثال

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
