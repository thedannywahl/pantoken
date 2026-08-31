[pantoken](../../../../index.md) / [packages/model/src](../index.md) / DeprecationEntry

# Interface: DeprecationEntry

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إدخال واحد في دفتر الرموز المهجورة — دورة حياة رمز أصلي واحد تم إسقاطه.

تأتي قيمة shim من إما `replacement` (بث `var(replacement)`، بحيث يتدفق المظهر) أو
`value` (تجميد الحرفي الأخير المعروف، عندما لا يكون للإسقاط بديل قانوني). يتوقع بالضبط واحد؛
إدخال بدون أي منهما لا يبث shim.

## Properties

### token

> **token**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اسم الرمز الأصلي المسقط، على سبيل المثال `--instui-component-truncate-text-line-height`.

---

### deprecatedIn

> **deprecatedIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الإصدار الأصلي الذي أسقطه، `&lt;tier&gt;@&lt;version&gt;` (على سبيل المثال `"design-tokens@v1.5.0"`).

---

### removeIn

> **removeIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الإصدار الأصلي MINOR الذي يتم فيه إيقاف shim، `&lt;tier&gt;@&lt;version&gt;` (على سبيل المثال `"design-tokens@v1.6.0"`).

---

### replacement?

> `optional` **replacement?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إعادة توجيه shim إلى رمز قانوني (بث `var(replacement)`).

---

### value?

> `optional` **value?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تجميد shim إلى حرفي (آخر قيمة معروفة للرمز) عندما لا يكون هناك بديل.

---

### note?

> `optional` **note?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

ملاحظة بشرية معروضة في وثائق التوافقية وسجل التغييرات.
