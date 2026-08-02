# @pantoken/translation-adapters

Shared primitives for the pantoken translation pipelines: the AI command bridge, JSON response parser, SHA-256 helper, and the content-addressed translation-memory core.

Both the docs site (`docs/scripts/`) and the i18n bundle generator (`packages/i18n/scripts/`) depend on this package rather than duplicating the logic.

## Exports

### `extractJsonObject(raw)`

Pulls the first `{…}` JSON object out of a model response, tolerating surrounding prose and code fences. Returns `null` when no valid object is found.

### `spawnPrompt(command, args, prompt, context?)`

Spawns an AI CLI tool, sends `prompt` via stdin, and resolves with the trimmed stdout. The convention is that `-p` is always the final element of `args` — the `agy-wrapper.sh` scripts in the pipelines strip it and forward the prompt via agy's own `-p` flag.

Pass an optional `context` string (e.g. `"locale 'hu'"` or `"guide/foo.md"`) to make error messages more descriptive when the process exits non-zero.

### `sha256(input)`

Returns the SHA-256 hex digest of `input`. Used by pipeline-specific `keyFor` functions to build content-addressed cache keys.

### `TranslationMemory`

A content-addressed translation cache backed by a committed JSON file (`{ version: 1, entries: { sha256key: value } }`).

```ts
import { TranslationMemory } from "@pantoken/translation-adapters";

// Open or create — path need not exist.
const mem = TranslationMemory.open("/path/to/cache.json", { prune: true });

mem.get(key); // returns cached value + increments hits; undefined on miss
mem.set(key, value); // stores + marks as used
mem.has(key); // existence check, no counter side-effects
mem.save(); // writes sorted JSON; prune:true discards untouched keys
```

**`prune: true`** (docs pipeline) — `save()` discards any entry not touched (`get` or `set`) this session. Keeps the cache from accumulating stale keys after source content is deleted.

**`prune: false`** (default, i18n pipeline) — `save()` writes all entries across runs.

Pipeline-specific facades (`docs/scripts/translation-memory.ts`, `packages/i18n/scripts/lib/translation-memory.ts`) wrap this class with their own key-construction logic and factory methods.

## agy wrapper

`agy-wrapper.sh` (in this package) adapts the stdin-based interface to [agy](https://github.com/anthropics/agy)'s positional-arg interface. Scripts reference it via `$(git rev-parse --show-toplevel)/tools/translation-adapters/agy-wrapper.sh`, which resolves correctly from any directory in the repo:

```sh
# i18n pipeline — use the package.json alias:
vp run @pantoken/i18n#translate:agy

# docs pipeline — use the package.json alias:
vp run docs:translate:agy

# or manually, passing extra args to agy (e.g. --model):
I18N_TRANSLATION_ADAPTER=ai \
  I18N_TRANSLATION_COMMAND="$(git rev-parse --show-toplevel)/tools/translation-adapters/agy-wrapper.sh" \
  I18N_TRANSLATION_COMMAND_ARGS="--model gemini-3.6-flash-medium" \
  node scripts/translate-bundles.ts
```
