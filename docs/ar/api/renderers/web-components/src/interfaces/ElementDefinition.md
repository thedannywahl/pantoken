[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Interface: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

عنصر مخصص واحد مسجل: اسم العلامة الأساسي الخاص به بالإضافة إلى `define` الذي يسجله عبر السياق.

## Properties

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

اسم العلامة الأساسي، مثل `button` (الذي تم إنشاؤه إلى `&lt;instui-button&gt;`/`&lt;x-button&gt;` بواسطة البادئة النشطة).

## Methods

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

سجل العنصر في `ctx.registry`، باستخدام المساعدات المشتركة والموعية بالبادئة فقط.

#### Parameters

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Returns

`void`
