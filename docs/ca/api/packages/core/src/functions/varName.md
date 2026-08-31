[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Function: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix un nom de propietat personalitzada `--instui-[prefix-]<kebab path>`.

## Parameters

### prefix

`string`

### path

`string`[]

## Returns

`string`

## Example

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]); // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]); // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
