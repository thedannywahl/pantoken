[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / CliArgs

# Interface: CliArgs

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

استدعاء CLI المُحلل.

## Properties

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

---

### target

> **target**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

---

### out

> **out**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

---

### theme

> **theme**: [`Theme`](../../../core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

---

### className

> **className**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أسماء الأيقونات للإصدار كموارد أصلية (من `--icons a,b,c`).

---

### format?

> `optional` **format?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

صيغة الإخراج، للأهداف التي تدعم عدة (على سبيل المثال `swatches --format ase`).

---

### noScope?

> `optional` **noScope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pendo: تخطي `@scope` الملفوفة (`--no-scope`).

---

### noImportant?

> `optional` **noImportant?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pendo: تخطي `!important` (`--no-important`).

---

### noPrune?

> `optional` **noPrune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pendo: تخطي قص الرموز (`--no-prune`).
