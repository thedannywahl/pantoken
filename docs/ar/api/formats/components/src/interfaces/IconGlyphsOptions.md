[pantoken](../../../../index.md) / [formats/components/src](../index.md) / IconGlyphsOptions

# Interface: IconGlyphsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات [iconGlyphsCss](../functions/iconGlyphsCss.md).

## Extends

- [`ComponentOptions`](ComponentOptions.md)

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بادئة الفئة. سلسلة صحيحة تضع مساحة اسم لكل فئة (`"instui"` → `.instui-button`); أي قيمة خاطئة (`null`، `undefined`، `""`، أو حذف الخيار) تحذف البادئة بالكامل (`.button`)، لذا يمكنك كتابة `class="heading -h1"`. تم بناء أوراق الأنماط المرسلة بهذه الحزمة باستخدام `"instui"`.

#### Inherited from

[`ComponentOptions`](ComponentOptions.md).[`prefix`](ComponentOptions.md#prefix)

---

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

موضوع الهدف لـ CSS المُصدر. الافتراضي هو `"rebrand"` عند الحذف.

#### Inherited from

[`ComponentOptions`](ComponentOptions.md).[`theme`](ComponentOptions.md#theme)

---

### deprecatedAliases?

> `optional` **deprecatedAliases?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أصدر أيضاً بدائل الرموز المهملة InstUI-prop (`-render-icon-&lt;name&gt;`، `-render-custom-icon-&lt;name&gt;`) كبدائل وظيفية لـ `-icon-&lt;name&gt;`. مُطفأ افتراضياً — تشغيله يضاعف الورقة تقريباً، لذا فعّله فقط عندما تحتاج إلى علامات مكتوبة مقابل أسماء الخصائص القديمة `renderIcon`/`renderCustomIcon` للحفاظ على العرض. تم بناء `icons.css` المُرسل بهذا الخيار.
