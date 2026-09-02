[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# פונקציה: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## פרמטרים

### prefix

`string`

### path

`string`[]

## מחזיר

`string`

## דוגמה

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
