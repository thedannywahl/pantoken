[pantoken](../../../../index.md) / [packages/core/src](../index.md) / decodeIconSvg

# دالة: decodeIconSvg()

> **decodeIconSvg**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

فك ترميز قيمة `url('data:…')` لرمز الأيقونة مرة أخرى إلى SVG مضمن.

## المعلمات

### value

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { decodeIconSvg } from "@pantoken/core";

const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
decodeIconSvg(value); // → "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>"
```
