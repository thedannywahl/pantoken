[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toVectorDrawable

# Ֆունկցիա: toVectorDrawable()

> **toVectorDrawable**(`svg`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Convert inline SVG Android VectorDrawable XML string-ի: Stroke-based icons (Lucide) արտանետում են `strokeColor`/`strokeWidth`; fill-based icons (Custom) արտանետում են `fillColor`:

## Պարամետրեր

### svg

`string`

Ներկառուցյալ SVG նշում:

### options?

[`VectorDrawableOptions`](../interfaces/VectorDrawableOptions.md) = `{}`

[VectorDrawableOptions](../interfaces/VectorDrawableOptions.md).

## Վերադարձվող արժեք

`string`

The VectorDrawable XML:

## Օրինակներ

**Stroke-based (Lucide) icon արտանետում է strokeColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

const xml = toVectorDrawable(
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/></svg>',
);
// → <vector …> with android:strokeColor and android:pathData="M5 12h14"
```

**Fill-based (Custom) icon tint colour-ի հետ արտանետում է fillColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
  color: "#FF0374B5",
});
// → <vector …> with android:fillColor="#FF0374B5"
```
