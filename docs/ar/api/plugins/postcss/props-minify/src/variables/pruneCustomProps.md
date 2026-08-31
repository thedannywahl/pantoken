[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / pruneCustomProps

# Variable: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أنشئ مكون إضافي PostCSS لتقليم الخصائص المخصصة غير المستخدمة.

## Type Declaration

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

مكون إضافي PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكون الإضافي PostCSS المطلوبة.

## Example

**قم بتشغيله كممر PostCSS مستقل**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
