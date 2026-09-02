[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / flattenProperty

# 变量: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create the flatten-`@property` PostCSS plugin.

Walks all `@property` at-rules in the stylesheet, extracts each `initial-value` descriptor, removes
the at-rule, and prepends a single `injectSelector { --name: value; … }` rule containing all
extracted declarations. Empty rules and `@layer` blocks left behind after removal are dropped.

## Type Declaration

## 参数

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## 返回值

[`Plugin`](https://postcss.org/api/#plugin)

A PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## 示例

**Default injection into :root**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

**Inject into :scope (for use inside scope blocks)**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, { from: undefined }).css;
```

```ts
Preserve
```
