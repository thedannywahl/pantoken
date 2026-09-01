[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / pruneCustomProps

# متغير: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء البرنامج المساعد لـ PostCSS prune-unused-custom-properties.

## Type Declaration

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

مكوّن لـ PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكوّن المطلوبة لـ PostCSS.

## مثال

**قم بتشغيله كمرحلة PostCSS مستقلة**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
