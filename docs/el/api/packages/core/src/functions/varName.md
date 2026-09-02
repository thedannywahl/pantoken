[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# Συνάρτηση: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## Παράμετροι

### prefix

`string`

### path

`string`[]

## Επιστρέφει

`string`

## Παράδειγμα

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
