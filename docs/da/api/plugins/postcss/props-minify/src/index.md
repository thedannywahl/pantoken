[pantoken](../../../../index.md) / props-minify

# props-minify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-props-minify` — komponér prune-, flatten- og mangle-transformationer for `--instui-*` brugerdefinerede egenskaber via et enkelt [applyMinify](functions/applyMinify.md) værktøj.

Hver CSS-emitterende pipeline (generer scripts, renderere) bruger `applyMinify` til en konsistent minificeringsflade uden at tage en direkte PostCSS-afhængighed.

**Prune + mangle er kun sikker for selvindeholdt bundles**, hvor alle `var(--instui-*)` referencer og deres definitioner bor i det samme output. For separate-fil-forbrugere (`@pantoken/css` + `@pantoken/components` indlæst uafhængigt), anvend kun `{ flatten: true }`.

**Manglificer på tværs af filgrænser:** overfør den samme `Map` instans som `mangle.sharedManifest` til hvert `applyMinify` kald, der behandler CSS-filer indlæst sammen. Behandl token-arket først (det såer manifestet), derefter komponentarke.

## Eksempler

**Anvend alle tre transformationer på et selvindeholdt bundle**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```

**Kun udlign (sikker for separate-fil-forbrugere)**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { flatten: true });
```

**Manglificer to filer med samme kortlægning**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const manifest = new Map<string, string>();
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

## Interfaces

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)
- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)
- [PropsMinifyOptions](interfaces/PropsMinifyOptions.md)

## Typealiaser

- [MangleMethod](type-aliases/MangleMethod.md)

## Variabler

- [flattenProperty](variables/flattenProperty.md)
- [mangleCustomProps](variables/mangleCustomProps.md)
- [pruneCustomProps](variables/pruneCustomProps.md)

## Funktioner

- [applyMinify](functions/applyMinify.md)
