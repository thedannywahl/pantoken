[pantoken](../../../../index.md) / [formats/css/src](../index.md) / buildCssFile

# Ֆունկցիա: buildCssFile()

> **buildCssFile**(`__namedParameters`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կառուցել CSS ֆայլի շղթա՝ տեսակավորված `@property` գրանցումներ (վերին մակարդակ, թեմայից անկախ) հետևելով մեկ կամ ավելի շրջանային հայտարարության բաժինների (որոնց ընտրիչը սպառողական կազմը կարող է վերաշարադրել):

## Պարամետրեր

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

## Վերադարձվող արժեք

`string`

## Օրինակներ

**Գրանցել մեկ տեսակավորված հատկություն և արտանետել շրջանային հայտարարություն**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: ["/* my tokens */"],
  scope: ":root",
  properties: [{ name: "--instui-color-brand", syntax: "<color>", value: "#0374b5" }],
  sections: [{ pairs: [["--instui-color-text-base", "var(--instui-color-brand)"]] }],
});
```

**Փաղաղել բաժինը CSS կասկադային շերտում**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: [],
  scope: ":root",
  sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "1rem"]] }],
});
```
