[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# Function: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء IR التوكن الأساسي للمظهر: البدائيات، والتخطيط، والألوان الدلالية، وتوكنات المكونات،
والرموز الاختيارية، ثم تشغيل خطافات المكون على النتيجة.

## Parameters

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## Returns

[`Token`](../interfaces/Token.md)[]

قائمة [Token](../interfaces/Token.md) المحسنة والمزيلة للتكرار.

## Examples

**بناء IR الافتراضي (إعادة العلامة التجارية)**

```ts
import { buildTokens } from "@pantoken/core";

const tokens = buildTokens();
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
```

**اختر مظهرًا واحذف طبقة الرمز**

```ts
import { buildTokens } from "@pantoken/core";

// A smaller, colour/layout-only IR for the canvas theme.
const tokens = buildTokens({ theme: "canvas", includeIcons: false });
```

**تشغيل خطاف توكنات المكون على IR**

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
