[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / registerLocalized

# Function: registerLocalized()

> **registerLocalized**(`bundle`, `target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

تسجيل `@pantoken/web-components` عناصر مخصصة مع سلاسل خاصة باللغة والاتجاه.

يقبل [LocaleBundle](#) مُحلل بالكامل _أو_ سلسلة علامة BCP47 خام. عند تمرير سلسلة،
[makeStrings](#) يشتق أسماء أيام الأسبوع عبر `Intl.DateTimeFormat` وجميع السلاسل الأخرى
تعود إلى الإنجليزية؛ مرر حزمة للحصول على ترجمات كاملة.

## Parameters

### bundle

`string` \| [`LocaleBundle`](#)

كائن [LocaleBundle](#)، أو علامة BCP47 (`"hu"`، `"ar"`، …).

### target?

`ElementRegistry`

السجل المراد التعريف فيه (الافتراضي هو `globalThis.customElements`).

### options?

مرر إلى `register()` (على سبيل المثال `prefix`، `only`).

#### prefix?

`string` \| `null`

#### only?

readonly `string`[]

## Returns

`void`

## Example

```ts
import { registerLocalized, hu } from "@pantoken/i18n";

registerLocalized(hu);
registerLocalized("ar"); // direction inferred from CANVAS_LOCALES
registerLocalized("x-custom", customElements, { prefix: "x" });
```
