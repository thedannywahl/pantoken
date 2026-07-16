# Authoring `@pantoken/components`

`@pantoken/components` is the semantic RSCSS CSS API — a parameterized generator, not hand-written
CSS. Each documented record is one file; the bucket `index.ts` is a barrel + registry, not a monolith.

## Source layout

- `src/components/<name>.ts` + `index.ts` (`COMPONENTS` registry).
- `src/utilities/<name>.ts` + `index.ts` (`UTILITIES`).
- `src/rules/{base,prose}.ts` + `index.ts` (`RULES`).
- `src/declarations/<name>.ts` + `index.ts` (`DECLARATIONS`).
- `src/lib/`: `helpers.ts` (ns/scope/glyph consts/spacing scales/`ComponentOptions`/`DEFAULT_PREFIX`),
  `define.ts` (`defineComponent`/`defineUtility`/`defineRule`/`defineDeclaration`), `aliases.ts`
  (`withSizeAliases`/`withAliases`), `css.ts` (the identity `css` tag), `headings.ts`,
  `field-controls.ts`.

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

## Deprecated aliases (auto-discovered, always functional)

- Author a modifier's metadata with `deprecated: "{@link -canonical}"`. `withAliases` reads that and
  clones each canonical rule under the alias name. There is no hardcoded pairs list.
- **A deprecated modifier must be a functional alias — never a doc-only noop** (user's absolute rule).
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
