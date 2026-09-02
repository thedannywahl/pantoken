[pantoken](../../../../../index.md) / [plugins/postcss/prune-custom-props/src](../index.md) / pruneCustomProps

# Newidyn: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Create the prune-unused-custom-properties PostCSS plugin.

## Type Declaration

## Yn dychwelyd

[`Plugin`](https://postcss.org/api/#plugin)

A PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## Enghraifft

**Run it as a standalone PostCSS pass**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
