[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# دالة: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء تمثيل IR الرسمي للرموز لموضوع: العناصر الأساسية، التخطيط، الألوان الدلالية، رموز المكونات،
والأيقونات الاختيارية، ثم تشغيل هوكس الإضافات على النتيجة.

## المعلمات

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## القيم المرجعة

[`Token`](../interfaces/Token.md)[]

قائمة [Token](../interfaces/Token.md) المحلَّلة والمُخلَّصة من العناصر المكررة.

## أمثلة

**بناء IR الافتراضي (إعادة العلامة التجارية)**

```ts
import { buildTokens } from "@pantoken/core";

const tokens = buildTokens();
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
```

**اختر موضوعًا وأزل طبقة الأيقونات**

```ts
import { buildTokens } from "@pantoken/core";

// A smaller, colour/layout-only IR for the canvas theme.
const tokens = buildTokens({ theme: "canvas", includeIcons: false });
```

**تشغيل هوك الرموز الخاص بالمكوّن الإضافي على IR**

```ts
import { buildTokens, type PantokenPlugin } from "@pantoken/core";

const brand: PantokenPlugin = {
  name: "brand",
  tokens: ({ tokens, define }) => [
    ...tokens,
    define({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
  ],
};

buildTokens({ theme: "rebrand", plugins: [brand] });
```
