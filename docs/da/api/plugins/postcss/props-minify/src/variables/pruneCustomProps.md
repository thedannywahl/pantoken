[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / pruneCustomProps

# Variabel: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret prune-unused-custom-properties PostCSS-plugin'en.

## Type Declaration

## Returnerer

[`Plugin`](https://postcss.org/api/#plugin)

Et PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Påkrævet PostCSS plugin marker.

## Eksempel

**Kør det som en selvstændig PostCSS-pass**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
