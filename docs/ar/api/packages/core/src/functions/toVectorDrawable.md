[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toVectorDrawable

# دالة: toVectorDrawable()

> **toVectorDrawable**(`svg`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حوّل SVG مضمن إلى سلسلة XML لـ Android VectorDrawable. الأيقونات القائمة على الضرب (Lucide) تصدر `strokeColor`/`strokeWidth`; الأيقونات القائمة على التعبئة (Custom) تصدر `fillColor`.

## المعلمات

### svg

`string`

ترميز SVG مضمّن.

### options?

[`VectorDrawableOptions`](../interfaces/VectorDrawableOptions.md) = `{}`

[VectorDrawableOptions](../interfaces/VectorDrawableOptions.md).

## القيم المرجعة

`string`

XML الخاص بـ VectorDrawable.

## أمثلة

**أيقونة قائمة على الضرب (Lucide) تصدر strokeColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

const xml = toVectorDrawable(
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/></svg>',
);
// → <vector …> with android:strokeColor and android:pathData="M5 12h14"
```

**أيقونة قائمة على التعبئة (Custom) بلون صبغة تُصدر fillColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
  color: "#FF0374B5",
});
// → <vector …> with android:fillColor="#FF0374B5"
```
