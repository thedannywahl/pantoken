[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / simpleIcons

# دالة: simpleIcons()

> **simpleIcons**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء ملحق Simple Icons.

## المعلمات

### options?

[`SimpleIconsOptions`](../interfaces/SimpleIconsOptions.md) = `{}`

[SimpleIconsOptions](../interfaces/SimpleIconsOptions.md). مرّر `registry` لتجنّب الاستيراد الكسول (على سبيل المثال في
  token-stage use، حيث الخطافات متزامنة).

## القيم المرجعة

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

A [PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) مع خطافات `tokens` و `rehype`.

## أمثلة

توليد رموز العلامة التجارية كتوكنات \<image\>

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

حل أكواد :brand: أثناء العرض (طبقة rehype)

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```
