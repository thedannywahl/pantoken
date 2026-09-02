[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# 関数: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## パラメーター

### prefix

`string`

### path

`string`[]

## 戻り値

`string`

## 例

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
