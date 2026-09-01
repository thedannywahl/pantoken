[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# دالة: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أنشئ اسم خاصية مخصصة `--instui-[prefix-]<kebab path>`.

## المعلمات

### prefix

`string`

### path

`string`[]

## القيم المرجعة

`string`

## مثال

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
