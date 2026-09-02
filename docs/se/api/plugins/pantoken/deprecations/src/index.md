[pantoken](../../../../index.md) / deprecations

# deprecations

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

`@pantoken/plugin-deprecations` — lifecycle-aware compatibility shims for dropped upstream tokens.

When an upstream release drops a `--instui-*` token, a hand-authored `DeprecationLedger`
records its lifecycle: when it was deprecated, the upstream minor that will remove it, and how to
keep it working meanwhile — either forward to a canonical token (`replacement` → `var(...)`) or
freeze its last-known literal (`value`). This plugin appends one shim token per entry. Because the
shim is a single `var(...)` or a plain value, `defineToken` records its `refersTo`/syntax and
`toCss` emits it, so the shim rides into css/scss/less/stylus/wordpress/vanilla with no extra wiring.

The retirement is enforced elsewhere (the upgrade pipeline hard-fails a bump once an entry's
`removeIn` upstream minor is reached, forcing the entry to be retired and a consumer minor cut).
[dueForRemoval](functions/dueForRemoval.md) is the check that powers it; [describeLifecycle](functions/describeLifecycle.md) powers the docs.

## Exempel

```ts
import { buildTokens } from "@pantoken/core";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };

buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
```

## Interfáčat

- [UpstreamVersions](interfaces/UpstreamVersions.md)
- [ParsedRef](interfaces/ParsedRef.md)

## Fuššat

- [shimValue](functions/shimValue.md)
- [shimEntries](functions/shimEntries.md)
- [ledgerCovers](functions/ledgerCovers.md)
- [parseUpstreamRef](functions/parseUpstreamRef.md)
- [compareVersions](functions/compareVersions.md)
- [dueForRemoval](functions/dueForRemoval.md)
- [describeLifecycle](functions/describeLifecycle.md)
- [deprecationShims](functions/deprecationShims.md)

## Referenssat

### default

Renames and re-exports [deprecationShims](functions/deprecationShims.md)
