[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toVectorDrawable

# Function: toVectorDrawable()

> **toVectorDrawable**(`svg`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تحويل SVG مضمن إلى سلسلة XML VectorDrawable الخاص بـ Android. الرموز المستندة إلى الضربة (Lucide) تنبعث
`strokeColor`/`strokeWidth`؛ الرموز المستندة إلى الملء (Custom) تنبعث `fillColor`.

## Parameters

### svg

`string`

علامات SVG مضمنة.

### options?

[`VectorDrawableOptions`](../interfaces/VectorDrawableOptions.md) = `{}`

[VectorDrawableOptions](../interfaces/VectorDrawableOptions.md).

## Returns

`string`

XML VectorDrawable.

## Examples

**رمز مستند إلى الضربة (Lucide) ينبعث strokeColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

const xml = toVectorDrawable(
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/></svg>',
);
// → <vector …> with android:strokeColor and android:pathData="M5 12h14"
```

**رمز مستند إلى الملء (Custom) بلون صبغة ينبعث fillColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
  color: "#FF0374B5",
});
// → <vector …> with android:fillColor="#FF0374B5"
```
