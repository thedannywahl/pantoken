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
- Remove the promoted `@part` line — a `@memberOf` record documents its own structure on its own page,
  and `@memberOf` alone (independent of nesting in the parent's own `@structure`) already feeds the
  parent's generated "Subcomponents" section.
- Give the member's own `@structure` an `@component <parent> { … }` node instead of a bare
  `@scope (.pfx-<parent>) { … }` wrapper — this embeds the member's real ancestor path (down to the
  member's own selector, with any of its own nested parts) as a cross-linked record reference, e.g.
  `@component table { tbody { tr { td {} } } }` for `table.cell`. See the `table.*` members for the
  full pattern, including a sibling-alternation node like `table.body`'s `tbody`.
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

## Reuse an existing global utility — don't invent a parallel one

`view`'s and `text`'s own key-value modifiers (background, border, shadow, display, position,
overflow, cursor, colour, weight, size, transform, variants) are **copied** into global utilities —
usable bare (`<div class="--bg-secondary">`) or chained onto any component, core or
plugin-authored (`<button class="instui-button --bg-danger">`) — without touching the component's own
chained modifiers, which stay exactly as authored.

- **Never invent a new class word for something a global utility already covers.** If a generic
  `bg`/`text`/`border`/`border-radius`/`border-width`/`box-shadow`/`display` utility already exists,
  extend it (add a name, or an explicit `[name, token]` pair for a value outside its usual token
  family) — don't author a parallel word like `-stroke-*` or a word-spelled duplicate like
  `-border-radius-small` next to the existing `-border-radius-sm`.
- Only a genuinely new concept (no existing global analogue) gets its own utility file — see
  `utilities/position/`, `utilities/overflow/`, `utilities/cursor/`.
- A global utility modifier is spelled with a **double dash** (`--bg-secondary`), never a single dash
  (single-dash `-mod` is reserved for a component's own modifiers) — this is a deliberate,
  non-colliding namespace split, not a stylistic choice.
- The selector mechanism is `globalModifierSelector(p, name)` (`@pantoken/utils`):
  `:where(*).--name.--name.--name`. A plain repeated class selector already matches _any_ element
  carrying it — standalone, or chained onto a component, core or plugin-authored (`.instui-card`,
  `.instui-agent-shell`) — no per-component enumeration needed; the `:where(*)` wrapper contributes
  zero specificity of its own (documentation that this is a global modifier, not a scoping condition),
  while the modifier class repeated 3x gives the rule (0,3,0) specificity, which deterministically
  outranks any real 2-class component-modifier compound (`.instui-view.-mod`, 0,2,0) **regardless of
  source/import order**. `packages/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` build on the same
  helper.
- This replaced an older per-component compound-selector fan-out (`GLOBAL_ALIAS_TARGETS`/
  `globalSelectors()`/`chainTargets`, one `.instui-<component>.-mod` selector per real core
  component) that: couldn't reach plugin-authored components at all (the core package can't know a
  plugin's class names at its own build time); relied on `cssdoc.jsonc`'s `globalPrecedence: "base"`
  and import order for override behavior, which only ever affected generated _documentation_ merge
  order, not real browser cascade; and didn't scale to a utility with a large modifier surface (see
  spacing below).

## Universal spacing/gap modifiers

- `margin`/`padding`/`gap` utility classes (`utilities/spacing/`, `utilities/gap/`) are **universal**:
  every registered component (core or plugin) gets the modifier for free via `globalModifierSelector`,
  with no per-record authoring — see the mechanism above.
- Each value ships in exactly two spellings: **short** (`--mb-sm`) and fully **long**, word-spelled
  (`--margin-bottom-small`) — never a mixed-segment form (no `-margin-e-small`, no `-me-small`).
- Because these modifiers are documented on the separate `spacing`/`gap` utility records, not on the
  component they're chained onto, resolving `.instui-card.--mb-sm` requires cssdoc to fall back from
  the base record to any record tagged `@global` — every utility record here carries that tag for
  exactly this reason. `@cssdoc/eslint-plugin`'s `valid-class-usage` (and the shared `isModifier`/
  `deprecationOf` lookups behind it) already do this fallback automatically; no `cssdoc.jsonc` option
  is involved. The one real prerequisite is that whatever CSS is passed to `valid-class-usage`'s `css`
  option still carries the doc comments (an unminified build) — the published `dist/*.css` bundles are
  minified and strip all comments, so pointing consumer-side lint at them would flag everything, not
  just globals.
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

## `@scope`, nesting, and root targeting

The default authoring system is the `alert.css` pattern:

- Use a single scoped root block: `@scope (.instui-foo) { :scope { … } }`.
- Keep root-owned behavior nested under that root with `&` (`&::before`, `&.-variant-x`,
  `&[class*="-icon-"]`, `&:has(> .part)`).
- Keep child-only selectors as structural descendants inside the root (`> .part`, `.part`,
  `.part::before`) instead of restating independent top-level `:scope > ...` rules.
- Never use functional `:scope(...)`; use standard combinators (`:scope > .part`) or nested child
  selectors inside `:scope`.

This keeps ownership explicit (root vs descendant), reduces duplicated selector prefixes, and produces
more stable diffs when modifier/state branches are added.

When you must support legacy generator behavior (`scope(root, body, children?)` in `helpers.ts`) during
migration, preserve semantic parity first, then normalize toward the scoped-root nested form above.

`@scope`/`:is`/`:has`/`:where` are **not** namespacing tools — only a unique or prefixed name prevents
a collision. Scoping narrows intent and deep-nesting collisions; it isn't collision-proof.

## Local utility `@property` values

For repeated record-local dimensions or timings (for example rail/glyph sizes), define short local custom
properties and register them with `@property` near the top of the file:

- Use local names without global namespace prefixes when the property is record-scoped
  (`--rail-size`, `--glyph-size`, `--duration`).
- Keep global prefixes (`--instui-*`, `--pantoken-*`) only for truly shared cross-record/token surfaces.
- Document internal-only utility properties with valid `@cssproperty` prose and `@readonly` markers when
  they are not public customization API.

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
