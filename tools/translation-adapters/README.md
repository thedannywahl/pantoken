# @pantoken/translation-adapters

Shared primitives for the pantoken translation pipelines: the AI command bridge, JSON response parser, SHA-256 helper, and the content-addressed translation-memory core.

The docs site (`docs/scripts/`), the UI string bundler (`renderers/web-components/scripts/`), and the CLI string bundlers (`packages/scaffold/scripts/`, `ai/pantoken-ai/scripts/`) all depend on this package rather than duplicating the logic.

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

`docs/scripts/translation-memory.ts` wraps this class with its own content-addressed key-construction logic. The UI/CLI pipelines (`renderers/web-components`, `packages/scaffold`, `ai/pantoken-ai`) don't need a facade — `runI18nTranslationCli` reads/writes their `i18n-cache/*.json` files directly as flat `{ key: value }` maps, keyed by the plain source string key rather than a content hash.

## Claude (direct invocation)

`I18N_TRANSLATION_COMMAND` defaults to bare `claude` — no wrapper needed, since `spawnPrompt`'s
stdin-based convention already matches `claude -p`'s. All `translate`/`translate:force` scripts pin
`--model claude-haiku-4-5-20251001 --effort low`: haiku is Claude's cheapest tier and, per
`--output-format json` cost telemetry, `--effort low` vs. the unset default made no measurable cost
difference on haiku for a short translation prompt, so it's set anyway for predictability against
future model defaults. The docs pipeline's `:claude` scripts use the same model/effort, plus
`--strict-mcp-config --setting-sources user` to keep the sandboxed CI environment from picking up
unexpected local MCP servers or settings.

## agy wrapper

`agy-wrapper.sh` (in this package) adapts the stdin-based interface to [agy](https://github.com/anthropics/agy)'s positional-arg interface. Scripts reference it via `$(git rev-parse --show-toplevel)/tools/translation-adapters/agy-wrapper.sh`, which resolves correctly from any directory in the repo.

Unlike Claude/Copilot, agy bakes reasoning effort into the model name itself (see `agy models` —
each model has `-low`/`-medium`/`-high` variants). All `:agy` pipeline scripts default to
`--model gemini-3.6-flash-low`: Gemini's Flash tier is its fast/cheap line, and `-low` is its
cheapest effort variant — the same "cheapest capable tier, minimum effort" reasoning as the Copilot
default, appropriate for literal, short UI-string translation.

```sh
# UI (web-components) pipeline — use the package.json alias:
vp run @pantoken/web-components#translate:agy

# docs pipeline — use the package.json alias:
vp run docs:translate:agy

# or manually, overriding the default model:
I18N_TRANSLATION_ADAPTER=ai \
  I18N_TRANSLATION_COMMAND="$(git rev-parse --show-toplevel)/tools/translation-adapters/agy-wrapper.sh" \
  I18N_TRANSLATION_COMMAND_ARGS="--model gemini-3.6-flash-medium" \
  node scripts/translate.ts
```

## Copilot CLI wrapper

`copilot-wrapper.sh` (in this package) adapts the stdin-based interface to [GitHub Copilot
CLI](https://github.com/github/copilot-cli)'s positional-arg interface — `copilot -p "<prompt>"`
puts it in "programmatic mode" for a plain prompt argument, same shape as the `agy` wrapper.

All `:copilot` pipeline scripts default to `--model gpt-5-mini --effort low`: `gpt-5-mini` is the
cheapest model with reasoning-effort support in `copilot --help`'s model list, and `low` (its
minimum for this model) is plenty for translating short, literal UI strings — a spot check against
`claude-haiku-4.5` (no effort control) and the CLI's own `auto` picked ~15x more AI credits for the
same prompt with no quality gain. Override per-invocation with `COMMAND_ARGS` if a locale needs a
stronger model:

```sh
I18N_TRANSLATION_ADAPTER=ai \
  I18N_TRANSLATION_COMMAND="$(git rev-parse --show-toplevel)/tools/translation-adapters/copilot-wrapper.sh" \
  node scripts/translate.ts

# or, overriding the default model/effort:
I18N_TRANSLATION_ADAPTER=ai \
  I18N_TRANSLATION_COMMAND="$(git rev-parse --show-toplevel)/tools/translation-adapters/copilot-wrapper.sh" \
  I18N_TRANSLATION_COMMAND_ARGS="--model claude-sonnet-4.5" \
  node scripts/translate.ts
```

The docs pipeline scripts use the `DOCS_TRANSLATION_*` env var names instead of `I18N_TRANSLATION_*`
(see `docs/scripts/translation-memory.ts`), otherwise the wiring is identical.
