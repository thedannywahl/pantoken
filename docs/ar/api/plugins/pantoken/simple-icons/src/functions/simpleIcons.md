[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / simpleIcons

# Function: simpleIcons()

> **simpleIcons**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء مكون Simple Icons.

## Parameters

### options?

[`SimpleIconsOptions`](../interfaces/SimpleIconsOptions.md) = `{}`

[SimpleIconsOptions](../interfaces/SimpleIconsOptions.md). مرر `registry` لتجنب الاستيراد الكسول (على سبيل المثال في استخدام مرحلة الرمز، حيث تكون الخطافات متزامنة).

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

مكون [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) مع خطافات `tokens` و`rehype`.

## Examples

**إصدار الرموز الخاصة بالعلامة التجارية كرموز \<image\>**

```ts
import { buildTokens } from "@pantoken/core";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

buildTokens({
  theme: "rebrand",
  plugins: [simpleIcons({ registry, slugs: ["github", "react"] })],
});
// adds --instui-icon-github, --instui-icon-react as <image> tokens
```

**حل رموز :brand: عند العرض (طبقة rehype)**

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```
