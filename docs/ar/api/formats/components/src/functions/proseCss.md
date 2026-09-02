[pantoken](../../../../index.md) / [formats/components/src](../index.md) / proseCss

# دالة: proseCss()

> **proseCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء ورقة أنماط نصية بمظهر InstUI، محددة النطاق إلى `options.scope` (الافتراضي `:where(body)`، لذا فهي
تُطبق تلقائيًا دون فئة غلاف — مثل `base.css`).

```demo
self:prose
```

## المعلمات

### options?

[`ProseOptions`](../interfaces/ProseOptions.md) = `{}`

[ProseOptions](../interfaces/ProseOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.
