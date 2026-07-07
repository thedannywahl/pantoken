# @pantoken/aggregate

The generator behind the unified `pantoken` meta package. It scans the meta package's dependencies
for the `pantoken` field, then generates the barrel, one subpath entry per target, and the meta
`package.json` `exports` map — so adding a new target package auto-registers it with no manual barrel
edits.

Internal build tooling. Not published.

## The `pantoken` field

Each aggregatable package declares, in its `package.json`:

```json
"pantoken": { "key": "astro", "kind": "namespace" }
```

- `key` — the export and subpath name (`astro` → `import { astro } from "pantoken"` and
  `pantoken/astro`).
- `kind` — one of:
  - `namespace` — re-exported into the eager barrel and as a subpath.
  - `sideEffect` — subpath imports the package's `/inject` entry (e.g. CSS); also in the barrel.
  - `subpath` — subpath only, kept out of the eager barrel so `import "pantoken"` never loads heavy
    peers (like React).

## Usage

```ts
import { aggregate, discoverTargets } from "@pantoken/aggregate";

aggregate({ metaDir: "/path/to/packages/pantoken" });
// writes src/index.ts (barrel), src/<key>.ts (subpaths), and rewrites package.json exports
```

Run by the meta package's build via `packages/pantoken/scripts/aggregate.mjs`.

## API

- **`aggregate(options): Target[]`** — generate the meta package's barrel, subpath entries, and
  `exports` map. `options.metaDir` is the meta package directory. Returns the discovered targets.
- **`discoverTargets(metaDir): Target[]`** — read the `pantoken` targets from the meta package's
  dependencies (sorted by key).
- **`Target`, `AggregateOptions`** — the target descriptor and option types.

## License

MIT
