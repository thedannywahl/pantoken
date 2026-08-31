[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / CssDocEntry

# Interface: CssDocEntry

En dokumenteret CSS-post: dens basisklasse plus alt afledt fra CSS + dokumentationskommentarer.

## Properties

### name

> **name**: `string`

Postnavnet fra `@component`/`@utility`/`@rule`/`@declaration`/`@name`, f.eks. `button`.

---

### kind

> **kind**: `CssRecordKind`

Hvilken slags CSS-overflade dette dokumenterer (standard til `component`).

---

### className

> **className**: `string`

Basis-CSS-vælgeren — en klasse (`.button`), attribut (`[data-layout="x"]`), ID (`#foo`),
eller shadow-DOM pseudo (`:host`) — udledt fra den første bare-class-regel eller eksplicit sat via
`@selector`. Altid ikke-tom (falder tilbage til `.${name}` når udledning mislykkes).

---

### summary?

> `optional` **summary?**: `string`

Enlinjeresumé fra `@summary`.

---

### remarks?

> `optional` **remarks?**: `string`

Udvidet tekst fra `@remarks`.

---

### privateRemarks?

> `optional` **privateRemarks?**: `string`

Kun internt tekst fra `@privateRemarks` (emittere kan vælge at udelade det fra offentlig output).

---

### releaseStage?

> `optional` **releaseStage?**: `CssReleaseStage`

Udgivelsestrinnet fra et modifier flag-tag (`@alpha`/`@beta`/`@experimental`/`@internal`/`@public`).

---

### since?

> `optional` **since?**: `string`

Version introduceret, fra `@since`.

---

### group?

> `optional` **group?**: `string`

En dokumentationsgruppe/kategori, fra `@group`/`@category`.

---

### accessibility?

> `optional` **accessibility?**: `string`

Tilgængelighedsvejledning, fra `@a11y`/`@accessibility`.

---

### global?

> `optional` **global?**: `boolean`

Indstillet når denne post bærer et `@global` tag — dets modifikatorer (og per-modifier `@global` flag)
kan anvendes på enhver komponent/layout/regel/erklæring, ikke kun denne posts basisklasse. Brugt under
validerings- og forbrugskontroller til at løse modifier-matches globalt.

---

### modifiers

> **modifiers**: `CssModifier`[]

AST-ekstraherede modifikatorer, annoteret med `@modifier` tekst hvor der er forfattet.

---

### parts

> **parts**: `CssPart`[]

AST-ekstraherede underelement-dele (klassebaseret), annoteret med `@part` tekst hvor der er forfattet.

---

### shadowParts

> **shadowParts**: `CssPart`[]

Shadow-DOM-eksponerede dele (`::part(name)`), fra `@csspart` eller en `::part()` vælger.

---

### pseudoElements

> **pseudoElements**: `CssPseudoElement`[]

Native pseudo-elementer som komponenten styler (`::before`, `::marker`, …), fra `@pseudo` eller en vælger.

---

### states

> **states**: `CssState`[]

Tilstande som komponenten reagerer på, fra `@cssstate`, `:state()`, pseudo-klasser eller tilstandklasser.

---

### slots

> **slots**: `CssSlot`[]

Navngivne slots som komponentskallen eksponerer, fra `@slot`.

---

### elements?

> `optional` **elements?**: `CssElementConstraints`

Tilladte HTML-elementer fra `@element` (standard + valgfrie navngivne profiler).

---

### todos

> **todos**: `string`[]

Interne todo-noter, fra `@todo` tags og `/* @todo … */` inline-kommentarer. Udviklings-noter,
ikke offentlig API — emittere kan udelade dem (som [CssDocEntry.privateRemarks](#privateremarks)).

---

### cssPropertiesConsumed

> **cssPropertiesConsumed**: `CssTokenConsumed`[]

Designtokens som denne komponent forbruger: hver `--*` brugerdefineret egenskab refereret via `var(...)` indeni
dens regler, hver kommenteret med `@tokens` tekst hvor der er forfattet (og inkluderet enhver `@tokens`-erklæret
token ikke bogstaveligt fundet via `var()`).

---

### cssPropertiesDeclared

> **cssPropertiesDeclared**: `CssPropertyDeclared`[]

Brugerdefinerede egenskaber som denne komponent erklærer (`@property`) eller dokumenterer (`@cssproperty`).

---

### functions

> **functions**: `CssFunction`[]

CSS brugerdefinerede funktioner (`@function`) som denne komponent definerer.

---

### animations

> **animations**: `CssAnimation`[]

Animationer (`@keyframes`) som denne komponent eksponerer.

---

### layers

> **layers**: `CssLayer`[]

Cascade lag (`@layer`) som denne komponent deltager i.

---

### conditions

> **conditions**: `CssCondition`[]

Betinget-understøttelses blokke (`@container`/`@supports`/`@media`) reglerne sidder under.

---

### examples

> **examples**: `string`[]

`@example` blokke, ordret.

---

### structure?

> `optional` **structure?**: `StructureNode`[]

Det forfattede `@structure` elementtræ (top-niveau knuder), når det er til stede. Når `@structure` bodyen
anvender `@variant` blokke (se [structureVariants](#structurevariants)), indeholder denne kun den første variants knuder,
for bagudkompatibilitet med enhver kode der ikke er blevet opdateret til at læse `structureVariants`.

---

### structureVariants?

> `optional` **structureVariants?**: `StructureVariant`[]

Alternative DOM-former for denne komponent, når det forfattede `@structure` body indeholder en eller
flere top-niveau `@variant` blokke — fraværende for det almindelige tilfælde af en enkelt, ikke-variant struktur.

---

### structureDescription?

> `optional` **structureDescription?**: `string`

En valgfri tekstbeskrivelse førende `@structure` bodyen, når den er forfattet.

---

### demo?

> `optional` **demo?**: `string`

`@demo &lt;spec&gt;` (f.eks. `self:button`), når den er forfattet.

---

### deprecated?

> `optional` **deprecated?**: `string`

Komponent-niveau forældethedserstatning tekst, når den er forfattet (argumentet til et `@deprecated` tag).

---

### see

> **see**: `string`[]

`@see &lt;ref&gt;` krydsreferencer.

---

### usage?

> `optional` **usage?**: `string`

Brugs-tekst fra `@usage` — hvordan man inkluderer stilarket / bruger komponenten.

---

### annotations

> **annotations**: `CssAnnotation`[]

Lokale annotations-forklarings rækker fra `@annotations`, i forfatterrækkefølge.

---

### refs

> **refs**: `number`[]

Lokale annotations-referencer fra `@ref`, i forfatterrækkefølge.

---

### decorators

> **decorators**: `CssDecorator`[]

Post-niveau objekt-model dekoratører.

---

### compat

> **compat**: `string`[]

Browser-understøttelse / funktions-kompatibilitet noter fra `@compat`.

---

### related

> **related**: `CssRelated`[]

Relaterede komponenter fra `@related`.

---

### memberOf?

> `optional` **memberOf?**: `CssMemberOf`

Erklæret familiemedlemskap fra `@memberOf` — denne post er medlem af en anden navngivet post,
optionalt `private` (må kun vises inden i forældrene). Fraværende når ikke forfatterskap.

---

### members?

> `optional` **members?**: `string`[]

Medlemspostnavne fra `@members` — den modsatte retning, erklæret på forælderen.

---

### memberDeclarations?

> `optional` **memberDeclarations?**: `CssMemberDeclaration`[]

Strukturerede erklæringer af medlemmer på forælderside fra gentagne `@member` tags.

---

### source?

> `optional` **source?**: `CssSource`

Hvor posten blev forfattet, når positionsoplysninger er tilgængelige (til kildelinks).

---

### customBlocks?

> `optional` **customBlocks?**: `Record`\<`string`, `string`[]\>

Indholdet af registrerede brugerdefinerede (blok) tags, indekseret efter tagnavnet uden dets `@`. Udfyldt kun for
tags tilføjet via konfiguration; uregistrerede ukendte tags ignoreres. Fraværende når ingen blev fundet.
