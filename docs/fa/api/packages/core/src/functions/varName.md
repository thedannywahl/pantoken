[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# تابع: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## پارامترها

### prefix

`string`

### path

`string`[]

## مقدار بازگشتی

`string`

## نمونه

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
