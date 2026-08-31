[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / MangleCustomPropsOptions

# Interface: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [mangleCustomProps](../variables/mangleCustomProps.md).

## Properties

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Només els noms de propietats personalitzades que comencen amb aquesta cadena es manglejen.

#### Default Value

`"--instui-"`

---

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

L'algoritme utilitzat per generar noms de reemplaçament curts.

- `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (per defecte; més curt per a conjunts grans)
- `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (alfanumèric)
- `"numeric"` — `--0`, `--1`, `--2`, …

#### Default Value

`"base26"`

---

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Quan `true`, afegeix una entrada `mangle-map` als `result.messages` de PostCSS després del processament.
El missatge té forma `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.

#### Default Value

`false`

---

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un `Map` mutable compartit entre múltiples passes de PostCSS.

A cada passa el plugin llegeix les entrades existents (reutilitzant els seus noms curts) i escriu noves
entrades (continuant el comptador de `sharedManifest.size`). Passa la mateixa instància `Map` a
qualsevol crida `mangleCustomProps` o `applyMinify` que processi fitxers CSS que es carregaran
junts al navegador — això garanteix que tots els fitxers utilitzin un mapatge idèntic de noms.

Processa primer la full de fitxes de manera que els seus noms es siembrin al manifest abans que les
fulles de components afegeixen les seves referències (típicament solapades).
