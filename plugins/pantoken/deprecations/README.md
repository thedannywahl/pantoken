# @pantoken/plugin-deprecations

Compatibility shims for upstream tokens that were removed or renamed. Reads a deprecation ledger and,
for every `"alias"` entry, appends a `var()` forwarder so consumers keep resolving the old
`--instui-*` name against its canonical replacement.

```ts
import { buildTokens } from "@pantoken/core";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };

const tokens = buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
// → --instui-color-brand: var(--instui-color-background-brand)
```

`@pantoken/tokens` already bakes these shims into the vendored IR, so most consumers get the
compatibility layer for free. Reach for this plugin only when you run your own `buildTokens`.

`"removed"` entries emit nothing — they carry a migration note for docs and changelogs, not a shim.
The ledger is a hand-authored policy record; the upgrade pipeline's drift report proposes candidate
entries, and a maintainer sets each token's `policy` and `replacement`.
