# Authoring `@pantoken/components`

`@pantoken/components` is the semantic RSCSS CSS API — a parameterized generator, not hand-written
CSS. Each documented record is one file; the bucket `index.ts` is a barrel + registry, not a monolith.

## Source layout

- `src/components/<name>/index.ts` + `<name>.css` (`COMPONENTS` registry).
- `src/components/<name>/members/<member>/index.ts` + `<member>.css` — a promoted sub-component (see
  "Sub-components (`@memberOf`)" below).
- `src/utilities/<name>/index.ts` + `<name>.css` (`UTILITIES`).
- `src/rules/{base,prose}/index.ts` + `<name>.css` (`RULES`).
- `src/declarations/<name>/index.ts` + `<name>.css` (`DECLARATIONS`).
- `src/lib/`: `helpers.ts` (ns/scope/glyph consts/spacing scales/`ComponentOptions`/`DEFAULT_PREFIX`),
  `define.ts` (`defineComponent`/`defineUtility`/`defineRule`/`defineDeclaration`), `aliases.ts`
  (`withSizeAliases`/`withAliases`), `css.ts` (the identity `css` tag), `headings.ts`,
  `field-controls.ts`.

## Sub-components (`@memberOf`)

When a component maps to a real, separately-named instui sub-component export (`Tabs.Panel`,
`Table.Row`, `Menu.Item`, …), promote it to its own record instead of documenting it as a `@part`
bullet on the parent:

- New files: `src/components/<parent>/members/<member>/<member>.css` + `index.ts`, same shape as any
  other record (`defineComponent`, registered in `COMPONENTS`, exported from `src/index.ts`).
- The record's cssdoc name is **dotted**: `@component <parent>.<member>` (e.g. `@component menu.item`)
  — this keeps member names globally unique across the whole registry even when two different parents
  have a same-named part (`menu.item` vs `side-nav-bar.item`), which a bare `item`/`item` collision
  would break for the `providers`-indexed cross-file `@memberOf`/`@structure` resolution. The TS
  identifier stays camelCase (`menuItem`/`menuItemCss`), since a dot isn't legal there anyway.
- Add `@memberOf <parent>` on the member's own record.
- **Always author an explicit `@class .<member>`** (or `@selector`) rather than relying on inference —
  a member's CSS typically keeps the parent's `@scope (.pfx-<parent>) { … }` wrapper (real cascade
  scoping, not just documentation), and inference across that boundary is unreliable; the fallback
  className for a dotted name (`.menu.item`) would also be misleading.
- **Physically move the CSS** into the member's own file — don't leave a doc-only record pointing at
  rules that still live in the parent. The aggregator just concatenates raw CSS text regardless of
  which file it came from, so this is safe even for native-element selectors with no `@scope` (e.g.
  `table.row`'s `tr`) or where a shared declaration has to be duplicated across a couple of sibling
  members (e.g. `table.-layout-stacked`'s box-reset, split per part rather than kept as one
  five-selector compound rule) — cssdoc requires each record's own file to own its own selectors.
- Remove the promoted `@part` line and any `@structure` entry that named the member's selector — a
  `@memberOf` record documents its own structure on its own page and doesn't need to also appear in the
  parent's `@structure` tree (that's what the generated "Subcomponents" section is for).
- If a parent-level modifier restyles a promoted member (e.g. `tabs`'s `-variant-secondary` restyling
  `tabs.tab`, or `table`'s `-layout-stacked` restyling all six of its members), mark it inline:
  `@modifier -variant-secondary — … @affects tabs.tab — …`. Multiple `@affects <parent>.<member>`
  markers can follow one another on the same `@modifier` line.
- Register the member in `COMPONENTS` right after its parent, export `<member>Css` from `src/index.ts`
  next to the parent's export, and add it to `tests/public-surface.test.ts`'s `EXPECTED` list (that
  array is sorted before comparison, so insertion position doesn't matter). Fix any existing test that
  asserted on the parent's `xxxCss` for content that moved to the member.
- Don't promote a `@part` just because it's stylistically distinct — the bar is a **real, separately
  exported instui component** (`List.Item` yes; a passive style hook like byline's `.title`/`.description`
  or tabs' `.list`, which has no corresponding `Tabs.List` export, no).

## Alternate DOM shapes (`@variant`)

`@structure` supports `@variant <name>? { … }` blocks for a component that genuinely renders one of
several alternative DOM shapes (e.g. a `<label>` wrapping a control vs. a `<label for>` plus a sibling
control). Only add one when a second shape is **already real and CSS-supported** — check the record's
existing `@example`s and rules first; don't invent a shape the component doesn't actually render. As of
this pass, no component in this package authors a genuine second DOM shape (things like a checkbox's
`-label-placement-*` only reorder the same markup via CSS, which isn't a `@variant`), so none carry one.

## Authoring a record

```ts
export const foo = defineComponent({
  name,
  summary,
  modifiers,
  parts,
  cssProperties,
  examples,
  structure,
  demo,
  css: (p) =>
    // prettier-ignore
    css`…css body…`,
});
export const fooCss = foo.css;
```

- The doc comment is **metadata** — plain strings, no backtick/`${` escaping.
- Only the `css` body stays a template literal. **Tag it with `css` and put a `// prettier-ignore`
  line right before it** (before the template for a direct arrow body, before `return` for a block).
  oxfmt treats `css` and `styled` tagged templates as embedded CSS and corrupts interpolated
  selectors (`${p}foo.-mod` → `${p}foo .-mod`, a different meaning) otherwise. Setting
  `embeddedLanguageFormatting` to off does **not** stop it. See the engineering log.
- Add the record to its bucket `index.ts`. For `COMPONENTS` the order is **load-bearing** — it matches
  the `componentsCss()` concat order, not alphabetical.

## The modifier convention (key-value RSCSS compound)

- Modifiers are `.${p}<comp>.-<prop>-<val>`, aligned to InstUI prop names
  (`-color-secondary`, `-size-sm`, `-shape-circle`, `-variant-title-page`).
- Booleans are the prop name alone, presence = true (`-clickable`, `-condensed`). A default-on boolean
  toggled off **inverts**: `-without-background`, `-without-border`.
- Sizes use one scale `-size-{xs,sm,md,lg,xl}`, emitted with both short and long spellings as
  first-class aliases via `withSizeAliases()`.
- Nested elements are **unprefixed short classes scoped as descendants** (`.instui-menu .item`), not
  BEM `__`. Non-nested structural parts that can't be descendant-scoped are **flat prefixed**
  (`.instui-badge-wrapper`). A guard test rejects `__` and `--`.
- Avoid hyphen-then-digit tokens (`-2xs` needs escaping); keep tokens letter-leading.

## Universal spacing/gap modifiers

- `margin`/`padding`/`gap` utility classes (`utilities/spacing.ts`, `utilities/gap.ts`) are
  **universal**: every component and `view` get a component-attached alias for free
  (`.instui-card.-mb-sm`), with no per-record authoring — see `SPACING_ALIAS_TARGETS` in
  `utilities/spacing.ts`.
- Each value ships in exactly two spellings: **short** (`-mb-sm`, unchanged since before the long
  spelling existed) and fully **long**, word-spelled (`-margin-bottom-small`) — never a mixed-segment
  form (no `-margin-e-small`, no `-me-small`).
- Because these modifiers are documented on the separate `spacing`/`gap` utility records, not on the
  component they're chained onto, `withSpacingModifierDocs()` (`lib/aliases.ts`) injects five wildcard
  `@modifier` families (`-m*`, `-margin*`, `-p*`, `-padding*`, `-gap*`) into every component's and
  `view`'s own doc comment. This is what keeps a consumer's `@cssdoc/eslint-plugin`
  `valid-class-usage` check from flagging `.instui-card.-mb-sm` as an unknown modifier — that rule
  looks up modifiers against the record the base class belongs to, not wherever the CSS rule happens
  to be authored. A more durable fix (a utility's modifiers implicitly valid on any component) is a
  cssdoc feature request, not a pantoken workaround.
- If a component already sets its own `margin`/`padding`/`gap` from a component-specific token (e.g.
  card's responsive padding, breadcrumb's `gap`), document that in `@remarks` and warn that chaining a
  spacing/gap utility modifier overrides it — see breadcrumb, button, byline, checkbox, form-field,
  form-field-group, form-field-messages, link, list, metric, pagination, radio, radio-input-group,
  rating, side-nav-bar, and tag for the pattern.

## Deprecated and alias modifiers (auto-discovered, always functional)

- Author a modifier's metadata with `alias: "{@link -canonical}"` for a **pure rename** (no behavior
  change, e.g. `-toggle` → `-variant-toggle`), or `deprecated: "{@link -canonical}"` for a **true
  deprecation** (behavior changed, e.g. the color/spacing normalization renames like avatar's
  `-color-accent*` or alert's `-variant-*`). `withAliases` reads either tag and clones each canonical
  rule under the alias name — there is no hardcoded pairs list, and both tags render a functional twin.
- **A deprecated or aliased modifier must be a functional alias — never a doc-only noop** (user's
  absolute rule).
- The docs render `@alias` as a blue "Alias" pill (informational rename) and `@deprecated` as a red
  "Deprecated" pill (a real behavior change) — see `docs/scripts/api-badge-classes.ts`.
- The alias post-processors run on the CSS **body only**, before the doc block is prepended, because
  the doc block's `{@link}` braces confuse the brace-based scanners. They anchor on the base class
  (`.instui-radio.-variant-toggle`), not the bare token, so a bare `.-canonical` match doesn't wrongly
  clone `:not(.-canonical)` or compound rules.

## `@scope` and child-combinator scoping

`scope(root, body, children?)` (in `helpers.ts`) rewrites element rules and wraps them in
`@scope (root) { … }`. Two constraints that bite:

1. Keep the component **root rule and every root-modifier-only rule (especially `-size-*`) outside**
   the scope, prefixed — because `withSizeAliases`/`withAliases` append twin rules at top level by
   scanning flat CSS; a `:scope.-size-*` twin emitted inside a scope block would be orphaned.
2. Never pass a body whose root token prefixes a sibling class (e.g. `.instui-progress` prefixes
   `.instui-progress-value`) — the string split would corrupt it to `:scope-value`. Keep flat
   siblings out of the scoped body.

`@scope`/`:is`/`:has`/`:where` are **not** namespacing tools — only a unique or prefixed name prevents
a collision. Scoping narrows intent and deep-nesting collisions; it isn't collision-proof.

## Icons

Glyphs render via a single generic `[class*="${p}icon-"]::before` mask painter (currentColor, 1em
box). A glyph class rides a host directly because `--pantoken-glyph` is a plain (non-`@property`)
custom prop that inherits into `::before`. So `<button class="instui-button -shape-square
-icon-arrow-right">` needs no nested icon span. Built-in component glyphs source from the shared
`--instui-icon-<name>` tokens via an `iconMask(name)` helper.

## Per-component checklist

Extend the record, update the drift-checked test, update the guide (`docs/guide/components.md`), and
add or update a demo. Then run `vp check --fix`, the component + demo tests, `check:publish`, and
`lint:markdown`. Browser-verify anything visual. Skip upstream tokens that are `@property`-registered
but value-less (being removed upstream) — don't invent them.
