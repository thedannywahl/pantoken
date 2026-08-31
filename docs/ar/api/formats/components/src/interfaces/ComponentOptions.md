[pantoken](../../../../index.md) / [formats/components/src](../index.md) / ComponentOptions

# Interface: ComponentOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الخيارات الشائعة لكل منشئ.

## Extended by

- [`IconGlyphsOptions`](IconGlyphsOptions.md)

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بادئة الفئة. سلسلة صحيحة تضع مساحة اسم لكل فئة (`"instui"` → `.instui-button`); أي قيمة خاطئة (`null`، `undefined`، `""`، أو حذف الخيار) تحذف البادئة بالكامل (`.button`)، لذا يمكنك كتابة `class="heading -h1"`. تم بناء أوراق الأنماط المرسلة بهذه الحزمة باستخدام `"instui"`.

---

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

موضوع الهدف لـ CSS المُصدر. الافتراضي هو `"rebrand"` عند الحذف.
