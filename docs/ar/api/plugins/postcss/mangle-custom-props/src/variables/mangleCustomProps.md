[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / mangleCustomProps

# متغير: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء إضافة PostCSS mangle-custom-properties.

يجمع جميع أسماء الخصائص المخصصة التي تطابق `prefix` من خصائص التصريحات، مراجع `var()`،
ومعاملات `@property`. يرتبها أبجديًا للحصول على ترميز ثابت وحتمي، ثم
يعين أسماء قصيرة باستخدام `method` المختار. يستبدل كل ظهور في كامل ورقة الأنماط.

## Type Declaration

## المعلمات

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

مكوّن إضافي لـ PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة مكوّن PostCSS المطلوبة.

## أمثلة

**تشويش بالإعدادات الافتراضية (--instui-\\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**مشاركة المخطط بين ملفين يتم تحميلهما معًا**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, { from: undefined }).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(components, { from: undefined }).css;
// both files use the same --instui-* → --a mapping
```

**استخدام أسماء base36 وإخراج المخطط عبر result.messages**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, { from: undefined });
const msg = result.messages.find((m) => m.type === "mangle-map");
```
