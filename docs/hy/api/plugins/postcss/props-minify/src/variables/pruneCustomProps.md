[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / pruneCustomProps

# Փոփոխական: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ստեղծել prune-unused-custom-properties PostCSS plugin-ը:

## Type Declaration

## Վերադարձվող արժեք

[`Plugin`](https://postcss.org/api/#plugin)

PostCSS [Plugin](https://postcss.org/api/#plugin):

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Օրինակ

**Գործարկել որպես ինքնուրույն PostCSS անցում**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
