[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / mangleCustomProps

# متغير: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء ملحق PostCSS mangle-custom-properties.

يجمع جميع أسماء الخصائص المخصصة المطابقة لـ `prefix` من خصائص التعريف، `var()` المراجع،
ومعاملات `@property`. يقوم بفرزها أبجديًا للحصول على تعيين ثابت وحتمي، ثم
يُسند أسماء قصيرة باستخدام `method` المختار. يستبدل كل ظهور في ورقة الأنماط بأكملها.

## Type Declaration

## المعلمات

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

ملحق PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة ملحق PostCSS المطلوبة.

## أمثلة

**تشويه بالإعدادات الافتراضية (--instui-\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**مشاركة التعيين عبر ملفين تم تحميلهما معًا**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, { from: undefined }).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(components, { from: undefined }).css;
// both files use the same --instui-* → --a mapping
```

**استخدام أسماء base36 وإخراج التعيين عبر result.messages**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, { from: undefined });
const msg = result.messages.find((m) => m.type === "mangle-map");
```
