[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Fonksyon: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## Paramèt

### prefix

`string`

### path

`string`[]

## Retounen

`string`

## Egzanp

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
