[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / mangleCustomProps

# Variabel: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret plugin'et mangle-custom-properties PostCSS.

Indsamler alle egenskabsnavne for brugerdefinerede, der matcher `prefix` fra erklæringsprops, `var()` referencer og `@property` parametre. Sorterer dem alfabetisk for en stabil, deterministisk kortlægning, derefter tildeler korte navne ved hjælp af den valgte `method`. Erstatter hvert forekomst i hele stylesheet'et.

## Type Declaration

## Parametre

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## Returnerer

[`Plugin`](https://postcss.org/api/#plugin)

Et PostCSS [Plugin](https://postcss.org/api/#plugin).

### postcss

> **postcss**: `true`

Påkrævet PostCSS plugin marker.

## Eksempler

**Manglificer med standardindstillinger (--instui-\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**Del kortlægningen på tværs af to filer indlæst sammen**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, { from: undefined }).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(components, { from: undefined }).css;
// both files use the same --instui-* → --a mapping
```

**Brug base36-navne og emit kortlægningen via result.messages**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, { from: undefined });
const msg = result.messages.find((m) => m.type === "mangle-map");
```
