[pantoken](../../../../../index.md) / [plugins/postcss/prune-custom-props/src](../index.md) / pruneCustomProps

# متغير: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء مكوّن PostCSS prune-unused-custom-properties.

## Type Declaration

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

مكوّن PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة مكوّن PostCSS المطلوبة.

## مثال

**شغّله كمرور PostCSS مستقل**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
