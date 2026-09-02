[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / flattenProperty

# Variabel: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret flatten-`@property` PostCSS plugin'et.

Gennemgår alle `@property` at-rules i stilarket, ekstraherer hver `initial-value` deskriptor, fjerner
at-rule'en, og prepends en enkelt `injectSelector { --name: value; … }` regel indeholdende alle
eksthraherede erklæringer. Tomme regler og `@layer` blokke tilbage efter fjernelse kasseres.

## Type Declaration

## Parametre

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## Returnerer

[`Plugin`](https://postcss.org/api/#plugin)

Et PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Påkrævet PostCSS plugin marker.

## Eksempler

**Standard injektion i :root**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

**Injektion i :scope (til brug inden i scope blokke)**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, { from: undefined }).css;
```

```ts
Preserve
```
