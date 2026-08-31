[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / flattenProperty

# Variable: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea el connector PostCSS flatten-`@property`.

Recorre totes les at-rules `@property` del full d'estils, extreu cada descriptor `initial-value`, elimina
la at-rule i anteposa una única regla `injectSelector { --name: value; … }` que conté totes
les declaracions extretes. Les regles buides i els blocs `@layer` deixats enrere després de l'eliminació es descarten.

## Type Declaration

## Parameters

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

Un [connector](https://postcss.org/api/#plugin) de PostCSS.

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.

## Examples

**Injecció per defecte a :root**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

**Injecta a :scope (per a ús dins de blocs de scope)**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, {
  from: undefined,
}).css;
```

```ts
Preserve;
```
