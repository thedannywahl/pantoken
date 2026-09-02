[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Fušla: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## Parametera

### prefix

`string`

### path

`string`[]

## Gullii / Gávdnat

`string`

## Exempel

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
