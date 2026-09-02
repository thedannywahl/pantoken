[pantoken](../../../../index.md) / props-minify

# props-minify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-props-minify` — composa transformacions de poda, aplanament i mangle per a
propietats personalitzades de `--instui-*` a través d'una utilitat única [applyMinify](functions/applyMinify.md).

Cada canalització d'emissió CSS (scripts de generació, renderitzadors) utilitza `applyMinify` per a una superfície de
minificació consistent sense prendre una dependència directa de PostCSS.

**La poda + mangle són segures només per a paquets autònoms** on tots els `var(--instui-*)` referencias
i les seves definicions viuen en la mateixa sortida. Per a consumidors de fitxers separats (`@pantoken/css` +
`@pantoken/components` carregats independentment), aplica només `{ flatten: true }`.

**Mangle entre límits de fitxers:** passa la mateixa instància de `Map` com a
`mangle.sharedManifest` a cada crida `applyMinify` que processa fitxers CSS carregats junts.
Processa primer la full de fitxes (alimenta el manifest), després les fulles de components.

## Exemples

**Aplica les tres transformacions a un paquet autònom**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```

**Aplana només (segur per a consumidors de fitxers separats)**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { flatten: true });
```

**Mangle dos fitxers amb el mateix mapatge**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const manifest = new Map<string, string>();
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

## Interfícies

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)
- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)
- [PropsMinifyOptions](interfaces/PropsMinifyOptions.md)

## Àlies de tipus

- [MangleMethod](type-aliases/MangleMethod.md)

## Variables

- [flattenProperty](variables/flattenProperty.md)
- [mangleCustomProps](variables/mangleCustomProps.md)
- [pruneCustomProps](variables/pruneCustomProps.md)

## Funcions

- [applyMinify](functions/applyMinify.md)
