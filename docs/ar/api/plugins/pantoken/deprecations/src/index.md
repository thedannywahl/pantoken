[pantoken](../../../../index.md) / deprecations

# deprecations

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-deprecations` — shims التوافق التي تدرك دورة الحياة للرموز المسقوطة في المصب.

عندما تسقط نسخة أساسية رمزًا `--instui-*`، يسجل `DeprecationLedger` المكتوب يدويًا دورة حياته: متى تم إهماله، وإصدار النسخة الأساسية الثانوية التي ستزيله، وكيفية الحفاظ على عمله في الوقت نفسه — إما إعادة توجيه إلى رمز قانوني (`replacement` → `var(...)`) أو تجميد آخر قيمة معروفة لها (`value`). هذا المكون الإضافي يضيف رمزًا واحدًا لكل إدخال. لأن الرمز هو `var(...)` واحد أو قيمة عادية، يسجل `defineToken` `refersTo`/بناء الجملة و`toCss` يصدره، لذا يركب الرمز في css/scss/less/stylus/wordpress/vanilla بدون أسلاك إضافية.

يتم فرض التقاعد في مكان آخر (خط أنابيب الترقية يفشل بشدة عند النسخة الثانوية `removeIn` الأساسية للإدخال، مما يفرض تقاعد الإدخال وقطع النسخة الثانوية للمستهلك). [dueForRemoval](functions/dueForRemoval.md) هو الفحص الذي يدعمه؛ [describeLifecycle](functions/describeLifecycle.md) يدعم المستندات.

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };

buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
```

## Interfaces

- [UpstreamVersions](interfaces/UpstreamVersions.md)
- [ParsedRef](interfaces/ParsedRef.md)

## Functions

- [shimValue](functions/shimValue.md)
- [shimEntries](functions/shimEntries.md)
- [ledgerCovers](functions/ledgerCovers.md)
- [parseUpstreamRef](functions/parseUpstreamRef.md)
- [compareVersions](functions/compareVersions.md)
- [dueForRemoval](functions/dueForRemoval.md)
- [describeLifecycle](functions/describeLifecycle.md)
- [deprecationShims](functions/deprecationShims.md)

## References

### default

إعادة تسمية وإعادة تصدير [deprecationShims](functions/deprecationShims.md)
