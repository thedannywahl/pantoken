# @pantoken/utils

Shared, upstream-free helpers used across the pantoken packages: the token reference resolver
(with `light-dark()` handling), the two token regexes, kebab→camel case, hex-colour parsing, and
the drift/reference-integrity checks. Depends only on `@pantoken/model` (types) and
[`arkregex`](https://www.npmjs.com/package/arkregex), so any package can use it without pulling the
GitHub-only upstream token source.

## Install

```sh
npm i @pantoken/utils
```

## Usage

```ts
import { makeResolver, resolveTokens } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// Expand var(--x) chains to concrete leaf values, collapsing light-dark() to one branch.
const resolve = makeResolver(tokens, { mode: "light" });
resolve("var(--instui-color-background-base)"); // → "#ffffff"

// Or resolve every token at once, keyed by name.
const byName = resolveTokens(tokens, { mode: "dark" });
```

## API

- **`makeResolver(base, { mode?, overrides? })`** — build a resolver that expands `var(--x)`
  references to concrete leaf values against `base` (plus `overrides`, which win on name
  collisions). With `mode` (`"light"` / `"dark"`) it collapses `light-dark()` to that branch;
  without, it keeps `light-dark()` intact. Replaces the per-package resolver that used to be
  copy-pasted across the formats and renderers.
- **`resolveTokens(base, opts)`** — `makeResolver` applied to every token, returned as a
  `name → resolved` `Map`.
- **`camelCase(kebab)`** — `color-background-brand` → `colorBackgroundBrand`.
- **`parseHexColor(hex)`** — parse `#rgb` / `#rrggbb` / `#rrggbbaa` to `{ r, g, b, a }` (`r`/`g`/`b`
  0–255, `a` 0–1), or `undefined` for a non-hex string.
- **`unknownReferences(text, ir)`** — drift check: the `--instui-*` names in `text` the IR doesn't
  define (sorted; empty means no drift). Use for outputs that _reference_ tokens defined elsewhere,
  such as the docusaurus, vitepress, bootstrap, and shadcn bridges.
- **`danglingReferences(css)`** — self-containment check: the `--instui-*` names referenced via
  `var()` that the same stylesheet never defines. Use for self-contained stylesheets (`css`,
  `pendo`).
- **`extractInstuiRefs(text)` / `tokenNames(ir)`** — the primitives the two checks build on,
  exposed for custom assertions.
- **`VAR_RE` / `LIGHT_DARK_RE`** — the two token regexes, built with `arkregex`'s `regex()` so
  their capture groups are typed on `.exec()` / `.matchAll()`. They're real `RegExp` instances.
- **`Mode`, `ResolveOptions`, `Rgba`** — the supporting types.

For value fidelity (an emitted, resolved value equals the IR's resolved value), compare against
`resolveTokens(ir, { mode })` directly — see `@pantoken/scss`'s test.

## Related

- Types come from `@pantoken/model`.
- `@pantoken/plugin-kit` re-exports `makeResolver` and `resolveTokens` for plugin authors.

## License

MIT
