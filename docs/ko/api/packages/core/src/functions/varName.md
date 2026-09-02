[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# 함수: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## 매개변수

### prefix

`string`

### path

`string`[]

## 반환값

`string`

## 예제

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
