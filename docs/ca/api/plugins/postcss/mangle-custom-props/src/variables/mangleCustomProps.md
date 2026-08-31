[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / mangleCustomProps

# Variable: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea el plugin PostCSS de mangle-custom-properties.

Recull tots els noms de propietats personalitzades que coincideixen amb `prefix` dels props de declaració, referències de `var()`,
i paràmetres de `@property`. Els ordena alfabèticament per a un mapatge estable i determinista, i després
assigna noms curts utilitzant el `method` triat. Reemplaça cada ocurrència a tota la full d'estils.

## Type Declaration

## Parameters

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

Un [connector](https://postcss.org/api/#plugin) de PostCSS.

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.

## Examples

**Mangle amb valors per defecte (--instui-\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**Comparteix el mapatge entre dos fitxers carregats junts**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, {
  from: undefined,
}).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(
  components,
  { from: undefined },
).css;
// both files use the same --instui-* → --a mapping
```

**Utilitza noms base36 i emet el mapatge a través de result.messages**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, {
  from: undefined,
});
const msg = result.messages.find((m) => m.type === "mangle-map");
```
