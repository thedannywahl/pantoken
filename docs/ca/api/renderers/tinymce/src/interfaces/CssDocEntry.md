[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / CssDocEntry

# Interface: CssDocEntry

Un registre CSS documentat: la seva classe base més tot el que es deriva del CSS + comentaris de doc.

## Properties

### name

> **name**: `string`

El nom del registre de `@component`/`@utility`/`@rule`/`@declaration`/`@name`, p. ex. `button`.

---

### kind

> **kind**: `CssRecordKind`

Quin tipus de superfície CSS documenta (per defecte `component`).

---

### className

> **className**: `string`

El selector CSS base — una classe (`.button`), atribut (`[data-layout="x"]`), ID (`#foo`),
o pseudo shadow-DOM (`:host`) — inferit de la primera regla de classe nua o establert explícitament via
`@selector`. Sempre no buit (retorna a `.${name}` quan falla la inferència).

---

### summary?

> `optional` **summary?**: `string`

Resum d'una línia de `@summary`.

---

### remarks?

> `optional` **remarks?**: `string`

Prosa estesa de `@remarks`.

---

### privateRemarks?

> `optional` **privateRemarks?**: `string`

Prosa només per a ús intern de `@privateRemarks` (els emissors poden optar per ometre-la de la sortida pública).

---

### releaseStage?

> `optional` **releaseStage?**: `CssReleaseStage`

L'etapa de llançament d'una etiqueta de bandera de modificador (`@alpha`/`@beta`/`@experimental`/`@internal`/`@public`).

---

### since?

> `optional` **since?**: `string`

Versió introduïda, de `@since`.

---

### group?

> `optional` **group?**: `string`

Un grup/categoria de documentació, de `@group`/`@category`.

---

### accessibility?

> `optional` **accessibility?**: `string`

Guia d'accessibilitat, de `@a11y`/`@accessibility`.

---

### global?

> `optional` **global?**: `boolean`

Establert quan aquest registre porta una etiqueta `@global` — els seus modificadors (i les banderes `@global` per modificador)
s'apliquen a qualsevol component/disposició/regla/declaració, no només a la classe base del registre. S'utilitza durant
les comprovacions de validació i consum per resoldre les coincidències de modificadors globalment.

---

### modifiers

> **modifiers**: `CssModifier`[]

Modificadors extrets de l'AST, anotats amb prosa `@modifier` on es va crear.

---

### parts

> **parts**: `CssPart`[]

Parts de subelement extretes de l'AST (basades en classe), anotades amb prosa `@part` on es va crear.

---

### shadowParts

> **shadowParts**: `CssPart`[]

Parts exposades de Shadow-DOM (`::part(name)`), de `@csspart` o un selector `::part()`.

---

### pseudoElements

> **pseudoElements**: `CssPseudoElement`[]

Pseudo-elements nadius que el component estilitza (`::before`, `::marker`, …), de `@pseudo` o un selector.

---

### states

> **states**: `CssState`[]

Estats als quals reacciona el component, de `@cssstate`, `:state()`, pseudo-classes, o classes d'estat.

---

### slots

> **slots**: `CssSlot`[]

Ranures nomenades que el component exposa, de `@slot`.

---

### elements?

> `optional` **elements?**: `CssElementConstraints`

Elements HTML permesos de `@element` (per defecte + perfils nomenats opcionals).

---

### todos

> **todos**: `string`[]

Notes internes de tasques pendents, d'etiquetes `@todo` i comentaris `/* @todo … */` inline. Notes de desenvolupament,
no una API pública — els emissors poden ometre-les (com [CssDocEntry.privateRemarks](#privateremarks)).

---

### cssPropertiesConsumed

> **cssPropertiesConsumed**: `CssTokenConsumed`[]

Tokens de disseny que aquest component consumeix: cada propietat personalitzada `--*` referenciada via `var(...)` dins
les seves regles, cadascuna anotada amb prosa `@tokens` on es va crear (i incloent qualsevol token declarat `@tokens`
no trobat literalment via `var()`).

---

### cssPropertiesDeclared

> **cssPropertiesDeclared**: `CssPropertyDeclared`[]

Propietats personalitzades que aquest component declara (`@property`) o documenta (`@cssproperty`).

---

### functions

> **functions**: `CssFunction`[]

Funcions personalitzades CSS (`@function`) que aquest component defineix.

---

### animations

> **animations**: `CssAnimation`[]

Animacions (`@keyframes`) que aquest component exposa.

---

### layers

> **layers**: `CssLayer`[]

Capes en cascada (`@layer`) en les quals participa aquest component.

---

### conditions

> **conditions**: `CssCondition`[]

Blocs de suport condicional (`@container`/`@supports`/`@media`) sota els quals estan les regles.

---

### examples

> **examples**: `string`[]

Blocs `@example`, verbatim.

---

### structure?

> `optional` **structure?**: `StructureNode`[]

L'arbre d'elements `@structure` creat per l'autor (nodes de nivell superior), quan està present. Quan el cos `@structure`
usa blocs `@variant` (vegeu [structureVariants](#structurevariants)), això conté només els nodes de la primera variant,
per a compatibilitat enrere amb qualsevol codi que no s'ha actualitzat per llegir `structureVariants`.

---

### structureVariants?

> `optional` **structureVariants?**: `StructureVariant`[]

Formes DOM alternatives per a aquest component, quan el cos `@structure` creat per l'autor conté un o
més blocs `@variant` de nivell superior — absent per al cas comú d'una estructura única sense variant.

---

### structureDescription?

> `optional` **structureDescription?**: `string`

Una descripció de prosa opcional que encapçala el cos `@structure`, quan va ser creada.

---

### demo?

> `optional` **demo?**: `string`

`@demo &lt;spec&gt;` (p. ex. `self:button`), quan va ser creat.

---

### deprecated?

> `optional` **deprecated?**: `string`

Text de substitució de deprecació a nivell de component, quan va ser creat (l'argument d'una etiqueta `@deprecated`).

---

### see

> **see**: `string`[]

Referències creuades `@see &lt;ref&gt;`.

---

### usage?

> `optional` **usage?**: `string`

Prosa d'ús de `@usage` — com incloure l'full d'estils / utilitzar el component.

---

### annotations

> **annotations**: `CssAnnotation`[]

Files de llegenda d'anotació local de `@annotations`, en ordre de l'autor.

---

### refs

> **refs**: `number`[]

Referències d'anotació local de `@ref`, en ordre de l'autor.

---

### decorators

> **decorators**: `CssDecorator`[]

Decoradors del model d'objecte a nivell de registre.

---

### compat

> **compat**: `string`[]

Notes de compatibilitat de suport de navegador / característica de `@compat`.

---

### related

> **related**: `CssRelated`[]

Components relacionats de `@related`.

---

### memberOf?

> `optional` **memberOf?**: `CssMemberOf`

Pertinença de família declarada de `@memberOf` — aquest registre és membre d'un altre registre anomenat,
opcionalment `private` (ha d'aparèixer només dins d'aquest pare). Absent quan no està creat.

---

### members?

> `optional` **members?**: `string`[]

Noms de registre membres de `@members` — la direcció inversa, declarada al pare.

---

### memberDeclarations?

> `optional` **memberDeclarations?**: `CssMemberDeclaration`[]

Declaracions estructurades de membres al costat del pare a partir de les etiquetes `@member` repetides.

---

### source?

> `optional` **source?**: `CssSource`

On es va crear el registre, quan la informació de posició està disponible (per als enllaços de font).

---

### customBlocks?

> `optional` **customBlocks?**: `Record`\<`string`, `string`[]\>

Contingut de les etiquetes personalitzades (bloc) registrades, clau pel nom de l'etiqueta sense la seva `@`. Poblat només per
etiquetes afegides via configuració; les etiquetes desconegudes no registrades s'ignoren. Absent quan no es va trobar cap.
