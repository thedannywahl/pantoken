[pantoken](../../../../index.md) / [formats/css/src](../index.md) / buildCssFile

# Function: buildCssFile()

> **buildCssFile**(`__namedParameters`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء سلسلة ملف CSS: تسجيلات `@property` مكتوبة (على المستوى الأعلى، غير متعلقة بالمظهر) متبوعة بقسم واحد أو أكثر من أقسام الإعلان المحدود النطاق (الذي قد تعيد كتابة محدده البناء المستهلك).

## Parameters

### \_\_namedParameters

#### comments

`string`[]

#### scope

`string`

#### properties?

`PropertyRule`[] = `[]`

#### sections

[`CssSection`](../interfaces/CssSection.md)[]

#### inherits?

`boolean` = `true`

## Returns

`string`

## Examples

**تسجيل خاصية واحدة مكتوبة وإصدار إعلان محدود النطاق**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: ["/* my tokens */"],
  scope: ":root",
  properties: [{ name: "--instui-color-brand", syntax: "<color>", value: "#0374b5" }],
  sections: [{ pairs: [["--instui-color-text-base", "var(--instui-color-brand)"]] }],
});
```

**لف قسم في طبقة سقوط CSS**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: [],
  scope: ":root",
  sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "1rem"]] }],
});
```
