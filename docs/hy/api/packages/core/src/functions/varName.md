[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Ֆունկցիա: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կառուցել `--instui-[prefix-]<kebab path>` custom-property անունը:

## Պարամետրեր

### prefix

`string`

### path

`string`[]

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
