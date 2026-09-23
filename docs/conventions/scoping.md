# Scoping: several pantokens on one page

Pantoken used to assume it owned the document. Themes were `:root[data-pantoken-theme="…"]`,
`@property` registrations were global, `color-scheme` was set on `<html>`, storage keys were
unnamespaced, and theme broadcasts swept every iframe on the page. Two pantoken instances on one page
— the docs site and the canvas-theme-editor preview, say — therefore fought, and whichever wrote last
won.

Theming is now a property of a **subtree**, not of the page.

## The contract

Five attributes, defined once in `packages/utils/src/scope.ts` and exposed at the dependency-free
`@pantoken/utils/scope` entry. `@pantoken/css` selects on them; `@pantoken/scope` writes them.

| Attribute                | Class twin                 | Meaning                                                    |
| ------------------------ | -------------------------- | ---------------------------------------------------------- |
| `data-pantoken-theme`    | `.--pantoken-theme-<key>`  | Roots a theme scope. Matches **any** element, not `:root`. |
| `data-pantoken-scheme`   | `.--pantoken-scheme-<key>` | Pins the subtree to `light` or `dark`.                     |
| `data-pantoken-color`    | `.--pantoken-color-<key>`  | Selects a custom brand color.                              |
| `data-pantoken-boundary` | `.--pantoken-boundary`     | Ancestor resolution stops here.                            |
| `data-pantoken-instance` | —                          | Names the owning instance.                                 |

Every selector is emitted in both forms, because some hosts sanitize `data-*` out of authored
content but leave `class` alone — Canvas RCE being the one that forced it. The class twin follows the
repo's global-modifier convention and is repeated three times for (0,3,0) specificity, so a scope
class outranks any component-modifier compound that sets tokens.

The attribute wins when both sit on one element. `resolveScope` reads both, so the runtime and the
stylesheet never disagree about what is in effect.

Declarations land in four cascade layers, lowest first:

```css
@layer pantoken.base, pantoken.theme, pantoken.scheme, pantoken.color;
```

The layers only matter when several attributes sit on the _same_ element — scheme must beat theme
there. Between different elements, plain inheritance decides: the nearest ancestor that declares a
token wins for its subtree.

## The sheets

Load these two instead of a single `style.*.css` when more than one theme must be active:

- `@pantoken/css/properties.css` — the `@property` registrations. **Load once per document.**
  Registrations are document-global: a second copy silently redefines every token's initial value for
  the whole page. `ensureProperties()` makes a repeat call a no-op.
- `@pantoken/css/scope.css` — a shared base block plus one complete token block per theme. Includes
  the scheme pins below.
- `@pantoken/css/schemes.css` — just the scheme pins (343 bytes), for layering onto a sheet that
  didn't bundle them.

A single-theme page should keep using `style.lean.css`; it is much smaller.

### Why theme blocks are complete, not diffs

The docs sheet used to emit non-default themes as _only the tokens that differ_ from rebrand. That is
correct when exactly one theme block can ever apply. Under subtree scoping it is wrong: a `canvas`
scope nested inside a `canvasHighContrast` scope would inherit high-contrast values for every token
the canvas block omitted.

So `multiScopeCss` partitions tokens by whether they actually vary across the emitted theme set.
Invariant tokens go in the shared base once. **Varying tokens are repeated in full in every theme
block.** A test asserts the blocks declare identical token sets — that parity is the nesting-safety
invariant, and breaking it reintroduces the bug silently.

## Color schemes

`color-scheme` is an ordinary inherited CSS property, so one rule keyed to the scope selector
resolves `light-dark()` for everything below it:

```css
@layer pantoken.scheme {
  [data-pantoken-scheme="dark"],
  :where(*).--pantoken-scheme-dark... {
    color-scheme: dark;
  }
}
```

That is the entire mechanism, and it is why a light subtree and a dark subtree can coexist. Nothing
needs an inline style, so a host that can only add a class or an attribute still gets per-subtree
schemes.

An earlier version of this sheet re-declared every themed token flattened to one branch — 87 kb to do
what the browser already does from a single declaration. If you find yourself generating a per-token
override table for a scheme, that's the mistake.

The behaviour this rests on — that `light-dark()` inside a custom property resolves against the
_consuming descendant's_ inherited `color-scheme`, not the element the token was declared on — is
browser-verified by `formats/css/tests/manual/scope-test.html`. Re-run that page after any change to
the scoped emitters; unit tests can only check the emitted strings, not the cascade.

## Sizing

Measured over the three shipped themes, lean (no icons):

|                                                         | bytes | gzip |
| ------------------------------------------------------- | ----: | ---: |
| `style.lean.css` (one theme)                            | 285 K | 25 K |
| `properties.lean.css` + `scope.lean.css` (three themes) | 572 K | 47 K |
| `schemes.css`                                           |   343 |  143 |

Of 2,921 tokens, only **786 vary across themes** — the other 73% are emitted once, in the shared base
block and the `@property` registrations. The repetition that remains is irreducible: custom
properties resolve by inheritance, not by lookup, so values that differ per subtree must physically
exist on each subtree's root.

Emitting complete theme blocks rather than diffs is close to free, and the reason is worth knowing:
`canvas` already differs from `rebrand` in 764 of those 786 tokens, and `canvasHighContrast` in 785.
The diff _is_ the full set. Completeness buys nesting safety for 1–3%.

## The runtime

```ts
import { createScope, resolveScope } from "@pantoken/scope";

// Manual configuration — the way to avoid a collision in the first place.
createScope(appEl, { instanceId: "app", theme: "rebrand", scheme: "dark" });
createScope(previewEl, {
  instanceId: "preview",
  theme: "canvas",
  scheme: "light",
  boundary: true, // nothing outside can theme what is inside
});

// Auto-detection — what is in effect here?
resolveScope(someDescendant); // { theme, scheme, color, instanceId, element, bounded }
```

Each field resolves independently, so a subtree can override the scheme while still inheriting the
theme. Resolution reads the boundary element's own attributes and then stops.

The registry is keyed per **document**, so an iframe gets its own. Storage keys are
`pantoken:<instanceId>:<field>`. Frames opt in with `scope.attachFrame(iframe)` rather than being
found by a document-wide sweep, and messages carry `instanceId` so a receiver can reject another
instance's.

## Rules

- Never read `document.documentElement` to decide what theme or scheme applies. Use `resolveScope` /
  `resolveScheme` from the element you actually care about. That global read is what desynchronises
  two instances.
- Never write a bare `pantoken-theme` storage key. Namespace it by instance.
- Never `querySelectorAll` the whole document for frames to broadcast to. Scope the query to your own
  scope element and skip frames owned by another instance.
- Don't run `applyMinify(css, { flatten: true })` over a scoped sheet. Flattening turns `@property`
  into **unlayered** `:root` declarations, which outrank `@layer pantoken.theme` and break scoping.
- Use a hard boundary (`boundary: true`, a shadow root, or an iframe) when a subtree must be immune
  to its surroundings rather than merely override them.

## Instances in this repo

| Instance                      | Owner                                        |
| ----------------------------- | -------------------------------------------- |
| `docs`                        | the VitePress site (`docs/.vitepress/theme`) |
| `canvas-theme-editor`         | the scaffold app's chrome                    |
| `canvas-theme-editor-preview` | its preview iframe (a boundary)              |
