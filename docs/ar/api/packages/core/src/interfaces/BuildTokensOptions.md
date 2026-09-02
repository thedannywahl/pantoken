[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# واجهة: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [buildTokens](../functions/buildTokens.md).

## الخصائص

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الثيم الذي سيتم حله (الافتراضي: `"rebrand"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الإضافات التي تعمل لها خطافات `tokens` عبر IR (الافتراضي: none).

***

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تضمين طبقة الأيقونات (الافتراضي: true).

***

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تضمين الرموز التي أنشأتها Instructure (مخصصة) (الافتراضي: true).

***

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تضمين رموز Lucide (الافتراضي: true).
