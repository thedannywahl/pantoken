[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / mangleCustomProps

# Variable: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إنشاء ملحق mangle-custom-properties PostCSS.

يجمع جميع أسماء الخصائص المخصصة المطابقة لـ `prefix` من خصائص التصريح، ومراجع `var()`،
ومعاملات `@property`. يرتبها أبجدياً للحصول على تعيين مستقر وحتمي، ثم
يعين أسماء قصيرة باستخدام `method` المختار. يستبدل كل ظهور في ورقة الأنماط.

## Type Declaration

## Parameters

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

مكون إضافي PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

علامة المكون الإضافي PostCSS المطلوبة.

## Examples

**تشويش مع الافتراضيات (--instui-\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**مشاركة التعيين عبر ملفين يتم تحميلهما معاً**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, {
  from: undefined,
}).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(
  components,
  { from: undefined },
).css;
// both files use the same --instui-* → --a mapping
```

**استخدم أسماء base36 وأصدر التعيين عبر result.messages**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, {
  from: undefined,
});
const msg = result.messages.find((m) => m.type === "mangle-map");
```
