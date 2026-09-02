[pantoken](../../../../index.md) / [packages/model/src](../index.md) / DeprecationEntry

# واجهة: DeprecationEntry

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إدخال واحد في دفتر تقادم الرموز — دورة حياة رمز علوي مفرد تم إسقاطه.

تأتي قيمة الشيم إما من `replacement` (إصدار `var(replacement)`، بحيث يتدفق التخصيص عبره) أو
`value` (تجميد الحرف الأخير المعروف عندما لا يوجد بديل معياري للسقوط). من المتوقع وجود واحد بالضبط؛ الإدخال الذي لا يحتوي على أيٍّ منهما لا يصدر شيم.

## الخصائص

### token

> **token**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اسم الرمز العلوي المُسقَط، على سبيل المثال `--instui-component-truncate-text-line-height`.

***

### deprecatedIn

> **deprecatedIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الإصدار العلوي الذي أسقطه، `&lt;tier&gt;@&lt;version&gt;` (مثال: `"design-tokens@v1.5.0"`).

***

### removeIn

> **removeIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الإصدار الصغير العلوي الذي تُحال عنده الشيم للتقاعد، `&lt;tier&gt;@&lt;version&gt;` (مثال: `"design-tokens@v1.6.0"`).

***

### replacement?

> `optional` **replacement?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إحالة الشيم إلى رمز معياري (يصدر `var(replacement)`).

***

### value?

> `optional` **value?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تجميد الشيم إلى حرف ثابت (القيمة الأخيرة المعروفة للرمز) عندما لا يوجد بديل.

***

### note?

> `optional` **note?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ملاحظة بشرية تُعرض في وثائق التوافق وسجل التغييرات.
