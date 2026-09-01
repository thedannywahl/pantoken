[pantoken](../../../../index.md) / [formats/css/src](../index.md) / buildCssFile

# دالة: buildCssFile()

> **buildCssFile**(`__namedParameters`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء سلسلة ملف CSS: تسجيلات مُكتوبة `@property` (عالية المستوى، غير معتمدة على الثيم) متبوعة
بقسم واحد أو أكثر من التصريحات المقيَّدة (والذي قد تعيد عملية البناء المستهلكة كتابة محدد الاختيار الخاص به).

## المعلمات

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

## القيم المرجعة

`string`

## أمثلة

**تسجيل خاصية مكتوبة واحدة وإصدار تصريح مقيَّد**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: ["/* my tokens */"],
  scope: ":root",
  properties: [{ name: "--instui-color-brand", syntax: "<color>", value: "#0374b5" }],
  sections: [{ pairs: [["--instui-color-text-base", "var(--instui-color-brand)"]] }],
});
```

**تغليف قسم داخل طبقة تتابع CSS**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: [],
  scope: ":root",
  sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "1rem"]] }],
});
```
