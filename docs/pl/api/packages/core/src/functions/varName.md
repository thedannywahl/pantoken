[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Funkcja: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## Parametry

### prefix

`string`

### path

`string`[]

## Zwraca

`string`

## Przykład

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
