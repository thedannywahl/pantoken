[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / MangleCustomPropsOptions

# Interface: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder for [mangleCustomProps](../variables/mangleCustomProps.md).

## Properties

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kun egenskabsnavne for brugerdefinerede, der starter med denne streng, manglificeres.

#### Default Value

`"--instui-"`

---

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Algoritmen brugt til at generere korte erstatningsnavne.

- `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (standard; korteste for store sæt)
- `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (alfanumerisk)
- `"numeric"` — `--0`, `--1`, `--2`, …

#### Default Value

`"base26"`

---

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Når `true`, tilføjer en `mangle-map` post til PostCSS `result.messages` efter behandling.
Beskeden har form `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.

#### Default Value

`false`

---

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En ændrelig `Map` delt på tværs af flere PostCSS-passes.

På hver pass læser plugin'et eksisterende poster (genbrug deres korte navne) og skriver nye (fortsætter tæller fra `sharedManifest.size`). Overfør den samme `Map` instans til hvert `mangleCustomProps` eller `applyMinify` kald, der behandler CSS-filer, som indlæses sammen i browseren — dette garanterer, at alle filer bruger en identisk navnekortlægning.

Behandl token-arket først, så dets navne såes i manifestet, før komponentarke tilføjer deres (typisk overlappende) referencer.
