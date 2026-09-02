[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / mangleCustomProps

# Variabile: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create the mangle-custom-properties PostCSS plugin.

Collects all custom property names matching `prefix` from declaration props, `var()` references,
and `@property` params. Sorts them alphabetically for a stable, deterministic mapping, then
assigns short names using the chosen `method`. Replaces every occurrence throughout the stylesheet.

## Type Declaration

## Parametri

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## Restituisce

[`Plugin`](https://postcss.org/api/#plugin)

A PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## Esempi

**Mangle with defaults (--instui-\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**Share the mapping across two files loaded together**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, { from: undefined }).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(components, { from: undefined }).css;
// both files use the same --instui-* → --a mapping
```

**Use base36 names and emit the mapping via result.messages**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, { from: undefined });
const msg = result.messages.find((m) => m.type === "mangle-map");
```
