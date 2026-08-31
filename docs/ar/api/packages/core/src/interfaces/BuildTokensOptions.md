[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Interface: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الخيارات لـ [buildTokens](../functions/buildTokens.md).

## Properties

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المظهر المراد حله (الافتراضي: `"rebrand"`).

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المكونات الإضافية التي تعمل خطافات `tokens` على IR (الافتراضي: بلا).

---

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تضمين طبقة الرمز (الافتراضي: true).

---

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تضمين الحروف (مخصصة) من تأليف Instructure (الافتراضي: true).

---

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تضمين حروف Lucide (الافتراضي: true).
