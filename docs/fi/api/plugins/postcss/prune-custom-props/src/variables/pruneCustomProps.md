[pantoken](../../../../../index.md) / [plugins/postcss/prune-custom-props/src](../index.md) / pruneCustomProps

# Muuttuja: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create the prune-unused-custom-properties PostCSS plugin.

## Type Declaration

## Palauttaa

[`Plugin`](https://postcss.org/api/#plugin)

A PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## Esimerkki

**Run it as a standalone PostCSS pass**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
