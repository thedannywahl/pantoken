[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / CssDocEntry

# Interface: CssDocEntry

One documented CSS record: its base class plus everything derived from the CSS + doc comments.

## Properties

### name

> **name**: `string`

The record name from `@component`/`@utility`/`@rule`/`@declaration`/`@name`, e.g. `button`.

***

### kind

> **kind**: `CssRecordKind`

Which kind of CSS surface this documents (defaults to `component`).

***

### className

> **className**: `string`

The base CSS selector — a class (`.button`), attribute (`[data-layout="x"]`), ID (`#foo`),
 or shadow-DOM pseudo (`:host`) — inferred from the first bare-class rule or set explicitly via
 `@selector`. Always non-empty (falls back to `.${name}` when inference fails).

***

### summary?

> `optional` **summary?**: `string`

One-line summary from `@summary`.

***

### remarks?

> `optional` **remarks?**: `string`

Extended prose from `@remarks`.

***

### privateRemarks?

> `optional` **privateRemarks?**: `string`

Internal-only prose from `@privateRemarks` (emitters may choose to omit it from public output).

***

### releaseStage?

> `optional` **releaseStage?**: `CssReleaseStage`

The release stage from a modifier flag tag (`@alpha`/`@beta`/`@experimental`/`@internal`/`@public`).

***

### since?

> `optional` **since?**: `string`

Version introduced, from `@since`.

***

### group?

> `optional` **group?**: `string`

A documentation group/category, from `@group`/`@category`.

***

### accessibility?

> `optional` **accessibility?**: `string`

Accessibility guidance, from `@a11y`/`@accessibility`.

***

### global?

> `optional` **global?**: `boolean`

Set when this record carries a `@global` tag — its modifiers (and per-modifier `@global` flags)
apply to any component/layout/rule/declaration, not just this record's base class. Used during
validation and consumption checks to resolve modifier matches globally.

***

### modifiers

> **modifiers**: `CssModifier`[]

AST-extracted modifiers, annotated with `@modifier` prose where authored.

***

### parts

> **parts**: `CssPart`[]

AST-extracted sub-element parts (class-based), annotated with `@part` prose where authored.

***

### shadowParts

> **shadowParts**: `CssPart`[]

Shadow-DOM exposed parts (`::part(name)`), from `@csspart` or a `::part()` selector.

***

### pseudoElements

> **pseudoElements**: `CssPseudoElement`[]

Native pseudo-elements the component styles (`::before`, `::marker`, …), from `@pseudo` or a selector.

***

### states

> **states**: `CssState`[]

States the component reacts to, from `@cssstate`, `:state()`, pseudo-classes, or state classes.

***

### slots

> **slots**: `CssSlot`[]

Named slots the component shell exposes, from `@slot`.

***

### elements?

> `optional` **elements?**: `CssElementConstraints`

Allowed HTML elements from `@element` (default + optional named profiles).

***

### todos

> **todos**: `string`[]

Internal to-do notes, from `@todo` tags and `/* @todo … */` inline comments. Development notes,
not public API — emitters may omit them (like [CssDocEntry.privateRemarks](#privateremarks)).

***

### cssPropertiesConsumed

> **cssPropertiesConsumed**: `CssTokenConsumed`[]

Design tokens this component consumes: every `--*` custom property referenced via `var(...)` inside
its rules, each annotated with `@tokens` prose where authored (and including any `@tokens`-declared
token not literally found via `var()`).

***

### cssPropertiesDeclared

> **cssPropertiesDeclared**: `CssPropertyDeclared`[]

Custom properties this component declares (`@property`) or documents (`@cssproperty`).

***

### functions

> **functions**: `CssFunction`[]

CSS custom functions (`@function`) this component defines.

***

### animations

> **animations**: `CssAnimation`[]

Animations (`@keyframes`) this component exposes.

***

### layers

> **layers**: `CssLayer`[]

Cascade layers (`@layer`) this component participates in.

***

### conditions

> **conditions**: `CssCondition`[]

Conditional-support blocks (`@container`/`@supports`/`@media`) the rules sit under.

***

### examples

> **examples**: `string`[]

`@example` blocks, verbatim.

***

### structure?

> `optional` **structure?**: `StructureNode`[]

The authored `@structure` element tree (top-level nodes), when present. When the `@structure` body
uses `@variant` blocks (see [structureVariants](#structurevariants)), this holds the first variant's nodes only,
for back-compat with any code that hasn't been updated to read `structureVariants`.

***

### structureVariants?

> `optional` **structureVariants?**: `StructureVariant`[]

Alternative DOM shapes for this component, when the authored `@structure` body contains one or
more top-level `@variant` blocks — absent for the common case of a single, non-variant structure.

***

### structureDescription?

> `optional` **structureDescription?**: `string`

An optional prose description leading the `@structure` body, when authored.

***

### demo?

> `optional` **demo?**: `string`

`@demo &lt;spec&gt;` (e.g. `self:button`), when authored.

***

### deprecated?

> `optional` **deprecated?**: `string`

Component-level deprecation replacement text, when authored (the argument to a `@deprecated` tag).

***

### see

> **see**: `string`[]

`@see &lt;ref&gt;` cross-references.

***

### usage?

> `optional` **usage?**: `string`

Usage prose from `@usage` — how to include the stylesheet / use the component.

***

### annotations

> **annotations**: `CssAnnotation`[]

Local annotation legend rows from `@annotations`, in author order.

***

### refs

> **refs**: `number`[]

Local annotation references from `@ref`, in author order.

***

### decorators

> **decorators**: `CssDecorator`[]

Record-level object-model decorators.

***

### compat

> **compat**: `string`[]

Browser-support / feature-compatibility notes from `@compat`.

***

### related

> **related**: `CssRelated`[]

Related components from `@related`.

***

### memberOf?

> `optional` **memberOf?**: `CssMemberOf`

Declared family membership from `@memberOf` — this record is a member of another named record,
optionally `private` (must only ever appear inside that parent). Absent when not authored.

***

### members?

> `optional` **members?**: `string`[]

Member record names from `@members` — the inverse direction, declared on the parent.

***

### memberDeclarations?

> `optional` **memberDeclarations?**: `CssMemberDeclaration`[]

Structured parent-side member declarations from repeated `@member` tags.

***

### source?

> `optional` **source?**: `CssSource`

Where the record was authored, when position info is available (for source links).

***

### customBlocks?

> `optional` **customBlocks?**: `Record`\<`string`, `string`[]\>

Content of registered custom (block) tags, keyed by tag name without its `@`. Populated only for
tags added via configuration; unregistered unknown tags are ignored. Absent when none were found.
