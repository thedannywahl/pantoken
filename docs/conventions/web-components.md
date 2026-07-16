# `@pantoken/web-components`

Shadow-DOM custom elements built over the `@pantoken/components` CSS. A `wrapper(tag, css, render,
display)` covers pure-presentational elements; behavioral elements are bespoke classes.

## Runtime graph must stay Node-free

This package ships to the browser (the docs client registers it). Anything in the runtime graph is
bundled into the client. A **value** import of a postcss-based `@cssdoc/*` package makes rolldown
inject a `createRequire`/`node:module` shim into `dist/index.mjs`, which throws `createRequire is not
a function` at app init and kills all client JS. Keep `@cssdoc/*` value imports out of `src/` —
type-only imports are fine (erased at build); value imports belong in build scripts and tests.

## Shadow CSS is co-located `.css` → codegen

- Shadow CSS lives in co-located `src/**/*.css` files — the lint, format, and docs source of truth.
- `scripts/styles.ts` compiles every `src/**/*.css` into `src/generated/styles.ts` (gitignored) as
  camelCased string consts; elements import those and inline them into the shadow `<style>`.
- The codegen **strips doc comments** before inlining, so cssdoc records on the `.css` files don't
  ship. Plain (non-doc) CSS comments survive.
- **Why a codegen and not `?raw`:** `vp pack` (rolldown) doesn't resolve Vite's `?raw` query. Vite
  dev/test do, but the published build can't. The codegen runs before pack/check/test.

## `register()` and the tag prefix

`register(target?, { prefix })`. A prefix is **always** applied because a custom-element name must
contain a hyphen (`<icon>` is invalid). A non-empty string wins (`{prefix:"x"}` → `<x-icon>`); anything
falsy or whitespace falls back to `DEFAULT_PREFIX = "instui"` — it never drops elements. Implementation
is low-churn: internal code keeps its canonical `instui-<base>` literals, and `register` shadows the
registry with a scoped adapter that rewrites `instui-<base>` → `${prefix}-<base>`. Cross-element
nesting uses `ctx.tag("calendar")` so the prefix propagates.

`register()` also injects `foundationCss()` once into `document.head` as `<style
id="pantoken-foundation">` — a `:root` block built from `elevationDeclarations()` +
`focusOutlineDeclarations()`. Those tokens aren't in the plain token sheet, so without it a consumer
loading only the module + `@pantoken/css` gets no shadows or focus rings (custom props pierce the
shadow boundary). It's guarded on `typeof document` so the registry-only test path skips it, and
exported for SSR inlining.

## Structure

`src/index.ts` is a barrel. Elements are `src/elements/<name>.ts`, one `ElementDefinition` each, added
to `DEFINITIONS[]` and `ELEMENTS[]` in **load-bearing order** (a test asserts `ELEMENTS` matches the
`register()` define order — append new tags at the end). `register()` builds one `RegisterContext`
(`{ registry, tag, I:{prefix:"instui"}, invokerSupported, onCommand, wrapper, variantClass, iconSvg }`)
and hands it to each `def.define(ctx)`.

## The JS-behavior tier

Behavior pure CSS can't cover: tooltip, drilldown, pages, drawer-layout, an interactive calendar, and
date/datetime pickers. The consistent declarative layer is the **Invoker Commands API** — light-DOM
`<button command="…" commandfor="element-id">`:

- `instui-modal`: `--show` / `--close` / `--toggle` (the shadow `<dialog>` can't be a `commandfor`
  target, hence host-level custom commands).
- `instui-drilldown`: `--goto` (reads `data-page`) / `--back`.
- `instui-pages`: `--push` / `--back`.
- `instui-drawer-layout`: `--toggle` / `--open` / `--close`.
- `instui-popover`/`instui-tray`/`instui-context-view`: already native `[popover]`, so the built-in
  `command="toggle-popover"` works with no code.

A shared `onCommand(target, handler)` helper adds the `command` listener and, when the API is absent
(`!("command" in HTMLButtonElement.prototype)`), falls back to a click delegate reading the same
attributes. It listens on `target.getRootNode()` so it covers a light-DOM host (document) and the
calendar grid (shadow root). Date helpers use **local** dates (avoid `toISOString` UTC shift).

## Universal spacing

Every element supports `margin`/`padding` (InstUI 1–4-value shorthand) and per-side
`margin-<side>`/`padding-<side>` (physical or logical edges), each value a keyword → token or a raw
CSS length. `lib/helpers.ts` exports `resolveSpace`, `spacingValue`, and `applySpacing(host)`; a
`withSpacing(Ctor)` mixin subclasses each ctor and the scoped registry wraps **every** ctor with it in
`define`, so it's universal with zero per-element code (a per-host MutationObserver re-applies on attr
change).

## Testing

The harness has no DOM lib (happy-dom/jsdom absent), so `tests/index.test.ts` only asserts
registration + pure `iconSvg`. Verify behavior in a real browser. `.focus()` fires no focus events
when `document.hasFocus()` is false (headless) — dispatch a composed `focusin` to exercise focus-show.
