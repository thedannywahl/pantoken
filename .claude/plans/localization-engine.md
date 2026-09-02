# One localization engine: PO transport, MF2 messages, one config

## Context

pantoken's translation machinery is **8,432 LOC** of bespoke tooling across seven packages plus
~61,400 lines of JSON. `canvas-locales.ts` exists 4×, `translate.ts` 3×, `check-drift.ts` 3×; two cache
formats with _different correctness guarantees_; two env-var namespaces; 26 root tasks and 55 package
scripts. 76 of the last 604 commits (12.6%) touched it. It also has no pluralization, no interpolation,
no locale-aware formatting, an ad-hoc verbatim syntax, and it cannot translate prose inside code fences
at all.

Goal: one modern, AI-enabled localization engine that ends the sprawl. Format, language, and hashing
are all replaceable.

### The structural insight

There are **two kinds of surface**, and conflating them produced six pipelines:

|           | Content                                                 | Messages                                                                   |
| --------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| What      | `docs/api/**`, `docs/guide/**`, `docs/index.md`         | UI/CLI strings: web-components, scaffold, ai, docs chrome, demos           |
| Needs     | Block segmentation, fuzzy matching, lossless round trip | Plurals, gender, interpolation, markup, `Intl.*` formatting **at runtime** |
| Syntax    | Prose                                                   | **MessageFormat 2**                                                        |
| Transport | **PO**                                                  | **PO**                                                                     |
| Output    | Parallel markdown tree for VitePress                    | Compiled locale bundles in `dist`                                          |

One transport, one config, one CLI — two message models only where they genuinely differ.

### Why PO, and why not an off-the-shelf platform

**[lingo.dev](https://github.com/lingodotdev/lingo.dev)** is Apache-2.0, free, BYO-LLM, and reads PO —
but its exact-hash lockfile reproduces the retranslation cost we're fixing, and markdown granularity is
undocumented. **[Tolgee](https://tolgee.io/opensource)** is Apache-2.0 and free self-hosted, but wrong
shape: a Docker + Postgres server built on named message keys, and the 818-file generated TypeDoc tree
has no stable message identity. Both are usable as the _AI step_; neither is the architecture.

| Problem today                                                | PO                                                                                                    |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Reworded English loses its translation entirely × 90 locales | `msgmerge` marks it **fuzzy**; the model gets the old translation + the diff. The biggest cost lever. |
| `{hash: target}` — translations unreviewable                 | `msgid`/`msgstr` — source beside translation, diffable in PRs                                         |
| `prune: true` destroys history                               | Obsolete entries retained as `#~`                                                                     |
| Two formats, two correctness guarantees                      | One format                                                                                            |
| `__PTK_` masking corrupts content (12 live entries)          | Structural extraction — code never reaches the model, so no masking layer exists                      |
| Bespoke drift check per surface                              | `msgfmt --statistics`, zero network                                                                   |

MF2 in the `msgid` means one message carries all its plural variants, sidestepping PO's positional
`nplurals` mismatching CLDR's categories. The mechanism is specifically that we never emit
`msgid_plural` — see "PO flags and what we never emit" below.

### The unlock: an OpenAI-compatible shim over the CLI agents

Keeping the CLI-agent wrappers (zero secrets, zero API spend, existing paid plans) conflicts with every
off-the-shelf tool, which wants an API key. Resolve it with **one ~100-line local HTTP server**
implementing `POST /v1/chat/completions`, fulfilled by spawning `claude -p` / `agy -p` / `copilot -p`.
Then _any_ tool runs on plans already paid for. Carry the measured tuning over verbatim:
`--model claude-haiku-4-5-20251001 --effort low --strict-mcp-config --setting-sources user`,
`gemini-3.6-flash-low`, `gpt-5-mini --effort low`.

**Settle first:** driving a subscription CLI programmatically for bulk work may bump provider ToS. The
current wrappers already do this, so the shim is a new transport, not a new category — but confirm.
Fallback is API keys via dotenvx.

#### Timeouts and the circuit breaker

`spawnPrompt` ([tools/translation-adapters/src/index.ts:62](tools/translation-adapters/src/index.ts#L62))
spawns, buffers stdout/stderr, and resolves on `close`. There is no timer and no `child.kill()` — a
wedged agent hangs the batch forever (defect 7 below). The shim owns the fix:

- **Per-request timeout, default 120,000 ms**, configurable per profile. Not 30 s: the batch budget is
  4,000 characters ([docs/scripts/api-translation.ts:370](docs/scripts/api-translation.ts#L370)), and a
  4,000-character batch through `claude -p` routinely runs past 30 s. A 30 s default would trip the
  breaker on healthy runs.
- **Three consecutive timeouts or non-zero exits open the breaker for that profile.** The shim then
  **rotates to the next CLI agent** — `claude` → `agy` → `copilot`. Spend stays at zero. It never
  reaches for API keys on its own; converting a zero-spend pipeline into a billed one mid-batch is not
  a decision the shim gets to make.
- **When every profile has tripped, fail fast** rather than hang. Flush already-translated units to
  their PO files first, so a re-run resumes instead of restarting.

Tradeoff to accept knowingly: rotation can leave one batch translated by more than one model. That's
tolerable because PO entries are independent and reviewable side by side — but the run summary must
name which provider produced which entries.

The atomic-write half of defect 7 belongs here too: `TranslationMemory.save()` has no temp-and-rename,
and its PO replacement needs one, or a breaker-killed run corrupts the catalog it was flushing.

## Extraction: assemble from `unified`, don't write a segmenter

`segment-markdown.ts` (311 LOC of line-based heuristics) and `segment-demo-html.ts` (81 LOC hand-rolled
scanner) get **deleted**, not ported. The replacement is glue over maintained libraries — `remark-gfm`
and `unist-util-visit` are **already catalog entries** (used by `renderers/react-markdown`);
`remark-parse`, `remark-frontmatter`, and `rehype-parse` are siblings from the same ecosystem.

**The technique that makes the round-trip gate free: identify with the AST, substitute by offset, never
re-stringify.** Every unist node carries `position.start.offset` / `position.end.offset`.
`remark-stringify` normalizes markdown (bullet chars, emphasis markers, escaping), which would break
byte-exact preservation — so it is never called. Instead:

1. Parse to mdast → walk → collect `{ start, end, text, kind, context }` **absolute offsets**.
2. Recurse into embedded content, mapping child offsets back to absolute document offsets.
3. Translate the extracted ranges.
4. Splice back into the **original source string**, descending by offset.

The splice list holds **disjoint leaf ranges only**. A node that recurses into an embedded extractor
contributes its children's absolute offsets, never its own — otherwise a fence node and the text nodes
inside it both land in the list, and descending order silently corrupts the file. So: sort ascending by
`start`, assert `range[i].end <= range[i+1].start`, then reverse and splice. Any containment or overlap
is an extractor bug and must fail loudly rather than emit a plausible-looking file. (Sorting descending
by `start` and by `end` are equivalent once ranges are disjoint; the assertion is the part that earns
its keep, not the sort key.)

Everything untouched is byte-identical by construction, so `render(extract(x)) == x` holds trivially
when no translation is applied.

Prior art considered: [`remark-redactable`](https://unifiedjs.com/explore/package/remark-redactable/)
(Apache-2.0, Code.org, purpose-built for translation). Right idea, wrong dependency — 6 GitHub stars
and ~4.3k weekly downloads is too thin for the core of this. The offset-splice approach achieves the
same redact/restore guarantee with no dependency.

### Frontmatter: parse the YAML CST, not lines

`remark-frontmatter` yields the YAML block as one opaque string node, so per-scalar offsets need a real
YAML parser. Use **`yaml` (eemeli)** — `parseDocument` gives every scalar a `range`, which drops
straight into the offset-splice model, and it's the same author as `messageformat`, adopted below for
MF2. It is **not currently in the workspace**, so it's a new catalog entry.

Parsing the CST isolates scalar values while ignoring structural keys, block scalars (`|`, `>`), and
comments — the failure mode line-based matching has today.

The key list is **not** `title`/`description`. `docs/index.md` is a VitePress `layout: home` page; its
translatable copy lives in `hero.text`, `hero.tagline`, `features[].title`, and `features[].details`.
There is no `description` key at all, and `title` appears only nested inside `features[]`. Today's
implementation already has this right —
[docs/scripts/home-i18n.ts:20-23](docs/scripts/home-i18n.ts#L20-L23) matches `text|tagline|title|details`
at any indentation or list position. Three rules it implements must survive the migration:

- **`hero.name` is never translated.** It's the `pantoken` wordmark — exactly the `"translate": "never"`
  case formalized below.
- **`hero.actions[].link` is rewritten, not translated.** `LINK_KEY` prefixes route values with the
  locale so localized pages don't 404. A render-time transform, not a catalog entry.
- **`&grave;` round-trips.** Hand-authored frontmatter uses `&grave;…&grave;` for literal backticks
  because real ones render badly there (`toBackticks` and its inverse). Structural extraction has no
  masking layer, so decide deliberately: keep the swap as a frontmatter-specific normalize/denormalize
  pair, or drop the entity from the source now that no mask can chew it.

### Prose in code fences

The current pipeline classifies every fence as `preserve` unconditionally
(`segment-markdown.ts:214-219`) and masks it (`api-translation.ts:167`), so none of this is ever
translated. Measured census:

| Corpus                                                 | Fences    | Where the prose is                                                                                                                                                                        |
| ------------------------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/api/css/*.md` — 101 files                        | 267       | **`html`: 64 of 79 carry prose** (146 unique text nodes, 22 unique attribute values, ~456 words). `css` 101, `mermaid` 38, `demo` 9 — none. `text` 40 — ASCII diagrams, 2 glossary terms. |
| `docs/api/renderers/web-components/src/variables/*.md` | 30 `html` | **8 carry prose** (~39 words) — including `Your changes were saved.`, `Delete this item?`, `Save changes`                                                                                 |
| All generated API md — 1,635 files                     | 1,161     | `ts` 510, `html` 219, `css` 202, `text` 80, `mermaid` 76, `demo` 30, `tsx` 24, `js` 12. **Prose lives only in `html`.**                                                                   |
| `docs/guide/**` — 9 files                              | 45        | 1 pure-prose `sh` fence; 9 `html`/`jsx` fences with copy; 1 `mermaid` with prose labels                                                                                                   |

**Total: ~150–180 unique strings, ~600 English words × 43 locales.** Smaller than the machinery built
to avoid it.

Origin traced: prose starts in `formats/**/*.css` cssdoc `@example` blocks (71 tags in 64 files, 105
unique strings). **43 of the 71 have no fence at all** — `@cssdoc/markdown` synthesizes ` ```html `
when the body contains `<`. **Extraction happens at the generated markdown**, where all 71 are
normalized into uniform fences and one code path serves every content surface; PO's content identity
dedups repeats across files automatically.

**Policy: language sets the default, fence meta overrides per block.**

Marker spelling **joins the existing flag namespace** rather than inventing one. `tools/demo/src/index.ts`
already lifts trailing `-flag` tokens onto fence info strings and consumes them via
`/-[a-z][a-z0-9-]*/gu` (`-nocard`, `-noshow` in use today). So: `-translate` / `-notranslate`.

- `autoExtract` languages are extracted with **zero annotation** — this is what makes 818 generated
  files work.
- `-translate` selects that language's extractor, or whole-block `prose` if it has none.
- `-notranslate` forces preserve.

| Mode                | Behavior                                                   | In scope because                                                                                                                                          |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `embedded:html`     | `rehype-parse` → hast; text nodes + allowlisted attributes | 72 prose fences across two API surfaces + 10 guide fences                                                                                                 |
| `embedded:markdown` | Recurse the markdown extractor                             | Nested cssdoc markdown                                                                                                                                    |
| `embedded:shell`    | Double-quoted string literals only                         | The agent prompt: `claude "Fetch https://… and follow it to set up pantoken in this project."` — whole-block `prose` would translate `claude` and the URL |
| `embedded:mermaid`  | Bracketed/quoted node labels only                          | `docs/guide/architecture.md:9` — `the IR, vendored as static JSON per theme`, `(the decoupling point)`                                                    |
| `prose`             | Whole block body                                           | Escape hatch via `-translate`                                                                                                                             |
| `preserve`          | Never extracted                                            | Default. Includes the 40 ` ```text ` diagram fences — translating them destroys ASCII alignment for 2 glossary terms.                                     |

**HTML scope: text nodes plus a config-driven attribute allowlist** — `aria-label`,
`aria-description`, `title`, `placeholder`, `alt`. Never `class`, `id`, `href`, `data-*`, `style`. The
census found 22 unique attribute values already needing this (`aria-label="Close"`, `aria-label="Previous
month"`, `placeholder="Write a comment…"`, `alt="Campus"`). The same extractor serves `docs/demos/**`,
closing the accessibility gap in `segment-demo-html.ts`, which translates no attributes today.

**Inline code needs no change.** Of 13,463 generated inline spans, **0** look like prose; of 1,737
hand-authored, 11 are shell commands or quoted error strings (`createRequire is not a function`). The
blanket inline mask is correct.

## Verified defects this replaces

Checked directly:

1. **12 corrupted mask markers committed** in `docs/i18n-cache/ar.api.json` — `__PTK_INLINE_CODE_1__`
   chewed into `__PTK_INLINE_CODE_1%)`. Renders on published Arabic pages; content-addressing means it
   never expires.
2. **A bare `-nocard` flag paragraph is sent to the model as prose.** `classifyBlock` falls through to
   `prose` for it (`segment-markdown.ts:126-159` — `hasProseWords("-nocard")` is truthy). It survives
   only because the model echoes it (`docs/ar/api/css/alert.md:27`). A model that translated it would
   silently break card rendering.
3. **UI/CLI caches are not content-addressed** — editing an English string silently keeps its stale
   translation and drift reports nothing.
4. **Cache stores no source text** — no review, no diff, no hand-fix without re-deriving a hash.
5. **The API tree is committed backwards.** Measured:

   ```
   git ls-files 'docs/*/api/**'  →  34,440 files across 42 locales (820 each), 21 MB
   git ls-files 'docs/api/**'    →  0  (gitignored)
   .gitignore                    →  docs/api/, docs/hu/api/   — only those two
   ```

   The repo commits generated _translations_ of a generated source it deliberately doesn't commit, for
   42 of 44 locales, with `hu` as the lone consistent exception. Confirmed as accidental during v1 of
   the localization work. So English API prose changes are invisible in review, **and** every regenerated
   locale tree lands as 820 files of diff noise. The POT fixes the first half; `transientRender` plus a
   `git rm` fixes the second.

6. **NUL bytes in ~51 `.ts` files** make grep/rg/GitHub code search skip them. One is load-bearing: the
   cache-key separator in `docs/scripts/translation-memory.ts` (offset 1796).
7. **`spawnPrompt` has no timeout or retry**; `TranslationMemory.save()` has no temp-and-rename. Both
   are addressed by the shim's breaker and an atomic PO write — see "Timeouts and the circuit breaker."

Only **5 of 43** locales have `api.json` (`ar`, `ca`, `da`, `hu`, `hy`) — not a 43-locale baseline.

## Catalogs: POT template + per-locale PO, centralized

```
l10n/{space}.pot          ← English msgids. One diff when English changes.
l10n/{locale}/{space}.po  ← translations
```

Standard gettext layout, and it fixes defect 5: because `docs/api/` is gitignored, the POT becomes the
**first committed record of generated API prose** — reviewable in PRs without committing 818 artifacts,
and one template diff instead of 43 mirrored ones.

Centralizing is verified safe: **no published package ships its `i18n-cache`.** All four ship only
`dist` (plus bins/assets); translations reach consumers as compiled output (`packages/i18n` →
`dist/index.mjs`; scaffold and ai → `generated/locales/`, 45 files each). Caches are already
build-time-only inputs. It also fixes `packages/i18n/scripts/build-bundles.ts` reaching across the
workspace by relative path, which breaks silently if either package moves.

### PO flags and what we never emit

A `# flag: no-c-format` comment on MF2 entries is sometimes proposed to stop `msgfmt -c` reading
`{$count}` as a malformed printf specifier. That mechanism doesn't hold here — `msgfmt -c` only runs
format checks on entries already carrying a format flag, and `xgettext`, the only tool that adds those
heuristically, is never in this pipeline. We generate the POT ourselves. The flag still goes in as cheap
insurance, alongside the rules that actually keep MF2 safe through a gettext toolchain:

- **Never emit `c-format`, `python-format`, or `python-brace-format` flags.** `python-brace-format` is
  the one that would genuinely mangle `{$count}`.
- **Never emit `msgid_plural`.** MF2 carries every plural variant inside one `msgid`, so no entry has a
  plural form for `msgfmt` to validate against a `Plural-Forms` header. This is the concrete reason the
  CLDR/`nplurals` mismatch goes away.
- **Emit `#, no-c-format` on MF2-bearing entries anyway** — one comment line, and a standing instruction
  to any future tool whose heuristics we don't control.
- **Runtime MF2 validity stays with `i18n lint`**, not the gettext tools.
- `preserveObsolete: true` makes explicit what the `#~` retention above already relies on (`msgmerge`
  keeps obsolete entries unless `--no-obsolete-entries`). It is the direct replacement for `prune: true`
  destroying history.

**Open decision, settled in Phase 0:** this plan shells out to `msgmerge` and `msgfmt --statistics`. CI
is `ubuntu-latest`, where gettext ships preinstalled — but the shim spike must _assert_ that in CI
rather than inherit it. If it's shaky, a JS PO library removes the dependency entirely.

## `i18n.config.json` — one root config

```json
{
  "source": "en",
  "catalogs": { "template": "l10n/{space}.pot", "target": "l10n/{locale}/{space}.po" },

  "poOptions": { "defaultFlags": ["no-c-format"], "preserveObsolete": true },

  "locales": {
    "registry": "@pantoken/i18n#LOCALES",
    "exclude": [],
    "tiers": {
      "source": ["en"],
      "primary": ["en-*", "de", "es", "fr", "fr-CA", "hu", "ja", "nl", "pt-BR", "zh-Hans"],
      "secondary": ["*"]
    }
  },

  "provider": {
    "default": "claude",
    "endpoint": "http://127.0.0.1:8787/v1",
    "batchBudget": 4000,
    "timeoutMs": 120000,
    "circuitBreaker": {
      "maxConsecutiveFailures": 3,
      "rotation": ["claude", "agy", "copilot"],
      "onExhausted": "fail",
      "resetTimeoutMs": 300000
    },
    "profiles": {
      "claude": { "model": "claude-haiku-4-5-20251001", "effort": "low", "concurrency": 8 },
      "agy": { "model": "gemini-3.6-flash-low", "concurrency": 4 },
      "copilot": { "model": "gpt-5-mini", "effort": "low", "concurrency": 4 }
    }
  },

  "extract": {
    "splicing": { "strategy": "descendingOffset", "assertDisjoint": true },
    "frontmatter": {
      "parser": "yaml-cst",
      "includeKeys": ["hero.text", "hero.tagline", "features[].title", "features[].details"],
      "neverTranslate": ["hero.name"],
      "localizeLinks": ["hero.actions[].link"]
    },
    "codeBlocks": {
      "default": "preserve",
      "extractors": {
        "html": "embedded:html",
        "jsx": "embedded:html",
        "vue": "embedded:html",
        "md": "embedded:markdown",
        "sh": "embedded:shell",
        "mermaid": "embedded:mermaid"
      },
      "autoExtract": ["html", "jsx", "vue", "md"],
      "meta": { "-translate": "auto", "-notranslate": "preserve" }
    },
    "htmlAttributes": ["aria-label", "aria-description", "title", "placeholder", "alt"]
  },

  "defaults": {
    "translate": "always",
    "drift": { "source": "block", "primary": "warn", "secondary": "warn" }
  },

  "spaces": {
    "docs.api": {
      "kind": "content",
      "include": ["docs/api/**/*.md"],
      "render": "docs/{locale}/api/{path}",
      "transientRender": true,
      "segment": "block",
      "rules": "docs/i18n/api-rules.ts",
      "locales": { "only": ["hy"] }
    },
    "docs.guides": {
      "kind": "content",
      "include": ["docs/guide/**/*.md"],
      "render": "docs/{locale}/guide/{path}",
      "transientRender": false,
      "segment": "block"
    },
    "docs.home": {
      "kind": "content",
      "include": ["docs/index.md"],
      "render": "docs/{locale}/index.md",
      "transientRender": false,
      "segment": "frontmatter"
    },
    "docs.demos": {
      "kind": "messages",
      "source": "docs/demos/*/i18n.json",
      "render": "docs/{locale}/demos/"
    },
    "docs.chrome": { "kind": "messages", "source": "docs/.vitepress/strings.json" },
    "ui.strings": {
      "kind": "messages",
      "source": "renderers/web-components/src/i18n.json",
      "emit": "packages/i18n/src/locales/{locale}.ts"
    },
    "cli.scaffold": {
      "kind": "messages",
      "source": "packages/scaffold/src/i18n.json",
      "sourceMerge": [
        "packages/scaffold/templates/*/scaffold.json",
        "packages/scaffold/templates/*/src/i18n.json"
      ],
      "emit": "packages/scaffold/generated/locales/{locale}.ts"
    },
    "cli.ai": {
      "kind": "messages",
      "source": "ai/pantoken-ai/src/i18n.json",
      "emit": "ai/pantoken-ai/generated/locales/{locale}.ts"
    },
    "docs.parity": { "kind": "structural", "drift": "block" }
  }
}
```

Absorbs today's `i18n-policy.json` (severity matrix carries over unchanged), both env-var namespaces,
the 26 root tasks, and the 55 package scripts.

**`transientRender`.** `docs.api` renders into the working tree at build time and is never tracked —
the PO catalog is its only committed record. That's not a new policy so much as an admission: the
34,440 committed locale API files were accidental (defect 5), and `docs/hu/api/` is already ignored.
`docs.guides` (387 tracked files) and `docs.home` (3,361 tracked `index.md`) stay `false` explicitly —
they're small, and they're the surfaces where a translation diff is worth reading in a PR.

## Formalized verbatim: two axes, not six shapes

The current design welds orthogonal concepts into one enum — `required`/`allow` express **intent**,
`warn`/`error` express **severity**. Split them:

- **`translate`**: `"always" | "optional" | "never"`, or a locale-pattern map (declaration order, `"*"`
  catch-all). `never` = copy source, never send to the translator.
- **`onIdentical`**: `"accept" | "warn" | "reject"`. Defaults derive from `translate`
  (`never`→accept, `optional`→warn, `always`→reject), so it's rarely written.

```json
{
  "prevMonth": "Previous month",
  "datePlaceholder": { "message": "yyyy-mm-dd", "translate": "never" },
  "brandName": { "message": "pantoken", "translate": "never", "note": "Wordmark." },
  "getStarted": { "message": "Get started", "translate": { "en-*": "never", "*": "always" } },
  "filesSelected": {
    "message": ".input {$count :number}\n.match $count\n  one {{{$count} file selected}}\n  *   {{{$count} files selected}}",
    "translate": "always"
  }
}
```

| Old                                    | New                                                                 |
| -------------------------------------- | ------------------------------------------------------------------- |
| `"required"`                           | `"translate": "never"`                                              |
| `"allow"`                              | `"translate": "optional"`                                           |
| `{ allow: [ …41 locales ] }`           | `"translate": "optional"` — **deletes ~24,000 lines of demos JSON** |
| `{ allow: ["en*"] }`                   | `{ "en-*": "never", "*": "always" }`                                |
| `{ warn: [...] }` / `{ error: [...] }` | `"onIdentical": "warn"` / `"reject"`, locale-scoped                 |

## Locale tiers — one axis, not two

An earlier draft had tiers _and_ a separate `active`/`pilot`/`excluded` lifecycle. That was
redundant: `pilot` is precisely "a tier whose drift severity never blocks", and `active` is just
default tier membership. Only `excluded` carried information tiers can't express — participation
rather than severity — and that is a list, not a state. So there is **one axis**:

- **Tiers** are named locale-pattern groups, matched in declaration order (`"*"` last). A tier's
  meaning comes entirely from the per-surface `drift` map: `source` blocks, everything else warns
  until promoted.
- **`locales.exclude`** removes a locale from the pipeline entirely — not translated, not rendered,
  not checked.
- **Per-space scoping** via `"locales": { "only": [...] }` or `{ "exclude": [...] }` limits which
  locales a single space processes. This is how you pilot one space on one locale — e.g.
  `docs.api` scoped to `["hy"]` (Armenian) while the `primary` tier is `["hu"]` (Hungarian). Note
  those two codes are easy to misread; they are different locales and both are live here.

**Default tiers: `source` is `en`, `primary` is the high-traffic language set, everything else is
`secondary`.**

A broad `primary` is justified by the measured state: **41 of 43** locales already have genuinely
translated UI bundles (`en-AU` and `en-CA` are English passthrough, which is correct for English
variants — and the verbatim rule `{"en-*": "never"}` means they generate no drift), and all 44 locales
have an `index.md`. The genuinely sparse surface is the API tree at 5 of 43 caches, which is why
`docs.api` is the _space_ worth scoping rather than the locales worth demoting.

`hu` is added to the list beyond the obvious high-traffic languages: it is the repo's reference locale
— the worked example throughout `docs/conventions/build-and-docs.md`, with its own `.gitignore` entry
(`docs/hu/api/`) beside the English tree, and one of only five populated `*.api.json` caches.

Promote and demote move a locale between tiers, which is what the words mean — there is no separate
status to flip.

## CLI

```
i18n extract                            # sources → POT
i18n translate                          # every space × every non-excluded locale
i18n translate --locale hy              # one locale, every space
i18n translate docs.api --locale hy     # one space, one locale
i18n translate docs.api --tier primary
i18n translate --provider agy --concurrency 4 --force
i18n render                             # PO → docs/{locale}/**, emit locale bundles

i18n check                              # drift, per severity matrix
i18n check --strict                     # every warn → block
i18n lint                               # MF2 validity, plural coverage, placeholders, punctuation
i18n stats                              # coverage per space × locale

i18n locale promote hu [--to primary]   # move up a tier (drift starts blocking)
i18n locale demote hu [--to secondary]  # move down a tier
i18n locale exclude|include mi          # leave / rejoin the pipeline entirely
```

## Runtime helpers — all four categories in scope

Added to `@pantoken/i18n`. **Must stay Node-free** — it ships to browsers (see `CLAUDE.md`); the MF2
runtime is browser-safe, but extractor and lint layers stay in build scripts.

| Helper                                      | Implementation                                                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Plurals, gender, interpolation, markup      | MF2 via [`messageformat`](https://messageformat.github.io/), which polyfills the proposed `Intl.MessageFormat` — becomes native later                                    |
| Number, date, currency, list, relative-time | Thin typed wrappers over `Intl.*` with the locale bound, so callers never hand-format                                                                                    |
| RTL/bidi                                    | `isolate()` wrapping interpolated values in FSI/PDI (U+2068/U+2069) so a Latin filename inside an Arabic sentence doesn't scramble; `dir` already exists in `LOCALES`    |
| Punctuation                                 | **Lint, not transform** — CLDR `delimiters` per locale, French thin NBSP before `!?:;`, CJK corner brackets. Auto-rewriting would corrupt code samples and proper nouns. |

`i18n lint`: MF2 parses; `.match` variants cover the target's CLDR categories via
`Intl.PluralRules(locale).resolvedOptions().pluralCategories`; every `$var` survives translation;
markup tags balanced; extracted HTML attributes still map to their elements; flag tokens
(`-nocard`, `-noshow`, `-notranslate`) never appear in a `msgid`; CLDR punctuation; no `__PTK_` residue.

## Phases

**Phase 0 — de-risk. Each independently shippable; stop if 1 or 2 fails.**

1. **Spike the shim** against one CLI agent + one off-the-shelf po-translator. Settles ToS and the
   architecture. Also settles two things in the same spike: the 120 s timeout and breaker rotation
   behave under a deliberately wedged agent, and `msgmerge`/`msgfmt` are actually present on
   `ubuntu-latest` CI — or we switch to a JS PO library before anything depends on the binaries.
2. **Spike offset-splice round-trip** on the real generated API tree: materialize `docs/api` (it's
   gitignored), parse all 818 files, extract, splice back unchanged, assert byte-identical. Must include
   an `embedded:html` fence, the `embedded:shell` prompt, and an `embedded:mermaid` block. The
   disjointness assertion is part of this spike, not a later refinement — the nested `embedded:*` cases
   are exactly where containment bugs hide.
3. **De-NUL the source files** (defect 6). Independent.
4. **`canvas-locales.ts` 4 → 1.** Verified md5s: scaffold and pantoken-ai byte-identical (`035aab66`);
   web-components differs by two comment lines (`7b32abe4`); `packages/i18n/src/lib/canvas-locales.ts`
   (`6e2c04a3`) is canonical — it adds `dir`. Then do the naming untangle below in the same pass, since
   it touches the same files.

   **Decouple the locale registry from Canvas.** `CANVAS_LOCALES` was the imported list of locales
   Canvas LMS supports, taken so component-carried strings worked out of the box. pantoken is no longer
   coupled to Canvas, so the registry becomes pantoken's own — the same move `@pantoken/model` makes for
   tokens. The data stays seeded from the Canvas supported-language list; the _dependency_ on that being
   the source of truth goes away, and the docblock should say so rather than citing the community
   article as authority.

   **Two names collide, not one.** `LOCALES` is exported three times across two different meanings, and
   `LocaleMeta` is defined twice across two more. Untangling both:

   | Current                                                                                                                                                                                                       | Becomes             | Why                                                                                                                                                                                                              |
   | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `CANVAS_LOCALES` — `Record<string, LocaleMeta>` (`packages/i18n/src/lib/canvas-locales.ts`)                                                                                                                   | **`LOCALES`**       | pantoken's supported-locale registry. File renamed `locales.ts`.                                                                                                                                                 |
   | `LocaleMeta` — `{ label, dir }` (same file)                                                                                                                                                                   | **`LocaleInfo`**    | Frees `LocaleMeta`, which the docs side uses for something else entirely.                                                                                                                                        |
   | `LOCALES` — `Record<string, Record<string, string>>` (`tools/translation-adapters/src/index.ts:565` codegen template, emitted into `packages/scaffold/generated/locales/index.ts:47` and the `ai` equivalent) | **`MESSAGES`**      | It maps locale → key → string. It is a message catalog, never a locale list — and "catalog" is the term PO already uses. Distinct from the existing `LocaleBundle`/`defineBundle` vocabulary in `packages/i18n`. |
   | `LOCALES` — `Record<DocsLocale, LocaleMeta>` (`docs/.vitepress/i18n.ts:264`)                                                                                                                                  | **`LOCALE_THEMES`** | Not metadata at all: it is per-locale VitePress theme config — route structure plus every translated chrome string, computed lazily behind a Proxy. `config.ts` expands it into per-locale `themeConfig`.        |
   | `LocaleMeta` — `LocaleStructure & UiStrings` (`docs/.vitepress/i18n.ts:246`)                                                                                                                                  | **`LocaleTheme`**   | Matches what it holds and what consumes it.                                                                                                                                                                      |

   Net effect: five names, five distinct meanings, no shadowing. ~50 `CANVAS_LOCALES` references across
   ~12 files plus the handful of `LOCALES`/`LocaleMeta` sites — all mechanical, and it must land before
   the engine work so new code isn't written against the ambiguous names.

5. **Fix the `-nocard` misclassification** (defect 2) in the current pipeline — it ships today.

6. **`git rm` the accidentally-committed locale API trees.** Replace the single `docs/hu/api/` line in
   `.gitignore` with `docs/*/api/`, `git rm -r --cached` the 34,440 files, and confirm the docs build
   still produces them. Independently shippable, needs no engine work, and it removes 21 MB and the
   largest source of review noise in the repo. **Verify the deploy path first:** `docs/*/api/**` must be
   generated by the render step on a clean checkout, not merely present because someone once ran the
   pipeline. Land it as one reviewable commit, separate from item 3's de-NUL churn.

**Phase 1 — engine skeleton.** `i18n.config.json` + schema, config loader, locale resolution/status,
CLI with selectors, and `i18n check` reusing today's `DriftReporter` (already format-agnostic — it
survives unchanged).

**Phase 2 — one content space end to end.** `docs.guides`: extract → POT/PO → shim → translate →
`msgmerge` → render → check. Smallest (9 files, 45 fences), source committed, and it contains three of
the four embedded cases — the `sh` prompt, 10 `html`/`jsx` prose fences, and the `mermaid` labels.
Convert its cache to PO, backfilling `msgid` where the hash still matches.

**Phase 3 — one messages space end to end.** `ui.strings` — MF2 conversion, runtime helper layer,
`emit` codegen into `packages/i18n`, plus `i18n lint`. Proves the Messages half.

**Phase 4 — migrate the rest, hardest first.** `docs.api` (block granularity + `embedded:html` across
72 prose fences on two surfaces is the real test), then `docs.home`, `docs.demos` (attribute extraction
closes the a11y gap), `docs.chrome`, `cli.scaffold`, `cli.ai`. Apply the verbatim migration and delete
the demos JSON bloat. `docs.home` carries a hard gate: the YAML-CST derivation must produce the same
unit set as today's `home-i18n.ts`, entry for entry, before the old path is deleted — and `hero.name`,
`actions[].link`, and the `&grave;` handling must each be covered by a test.

**Restore the CI drift gate before Phase 5.** Re-add `docs:check:drift` to the shared `docs:build`
pipeline once the new engine produces complete documentation translations. When `i18n check` supersedes
the legacy check, replace that command in the same CI pipeline so translation drift remains blocking;
do not delete the legacy drift implementation while CI has no equivalent gate.

**Phase 5 — delete.** `TranslationMemory`, `keyFor`, `segment-markdown.ts`, `segment-demo-html.ts`, the
`__PTK_` masking layer, `chunkByBudget`, `mapPool`, the poison-cache guard, `AiTranslationAdapter`,
three `translate.ts`, three `check-drift.ts`, both env-var namespaces, `tools/translation-adapters`.
Break two couplings first: `docs/.vitepress/i18n.ts` imports `../scripts/translation-memory.ts`
(VitePress config depends on a build script via a lazy `LOCALES` Proxy), and `build-bundles.ts`'s
relative-path reach-across.

**Phase 6 — extract to its own repo**, cssdoc-style, once the design has stopped moving. What's left is
small: extractor, shim, bridge, runtime helpers.

**Any time:** decide the fate of the orphaned `platforms/canvas-theme-editor/src/i18n.json`, which
reaches no pipeline.

## Verification

- **Round-trip identity is the hard gate:** splice-with-no-changes must be byte-identical across all
  818 API files, both guide trees, `index.md`, and all 65 demos. No migration proceeds without it.
- **Splice ranges are disjoint leaves.** The extractor asserts `range[i].end <= range[i+1].start` over
  the ascending-sorted list and throws on any containment or overlap. Cover it with a fixture whose
  `embedded:html` fence sits inside an `embedded:markdown` block.
- **Nested extraction correctness:** for every `embedded:html` fence, the spliced result re-parses to an
  equivalent hast tree — same element and attribute structure, only text and allowlisted attribute
  values differ. No `class`, `id`, `href`, `data-*`, or `style` ever changes. For `embedded:shell`, only
  the contents of double-quoted literals differ. For `embedded:mermaid`, the diagram still parses.
- **`docs.home` unit parity:** the YAML-CST extraction produces exactly the units today's
  `home-i18n.ts` derives — no more (no `hero.name`, no `link`, no `icon` paths), no fewer.
- **No translation lost in conversion.** Per space, count PO entries with a non-empty non-fuzzy `msgstr`
  and assert it matches the pre-migration cached-unit count (28,232 units / 220 files today).
- **Fuzzy actually reuses:** reword one English paragraph and confirm the model receives the prior
  translation rather than translating from scratch.
- **MF2 correctness:** every message parses; plural variants cover each target's CLDR categories;
  `format()` output matches expected strings for `ar` (6 categories) and `ja` (1).
- **No PO entry carries a format flag other than `no-c-format`, and none carries `msgid_plural`.** Grep
  the catalogs; it's a one-line CI assertion.
- **The breaker behaves:** a stubbed agent that never exits is killed at `timeoutMs`; three such
  failures rotate to the next profile; exhausting the rotation fails the run **after** flushing
  translated units, and a re-run resumes from the flushed PO rather than restarting.
- **The new coverage is real:** after migrating `docs.api`, assert `Congratulations! You're using the
"success" color.` (`api/css/alert.md`) and `Your changes were saved.`
  (`api/renderers/web-components/src/variables/alert.md`) are translated in a target locale — both are
  English in `docs/ar/**` today.
- **Transient render leaves no residue:** on a clean checkout, `i18n render` followed by `git status` is
  clean. No locale API file is ever both generated and tracked, and `git ls-files 'docs/*/api/**'`
  returns 0.
- `msgfmt -c` clean on every PO/POT; `grep -c "__PTK_"` returns 0 everywhere.
- `@pantoken/i18n` stays Node-free — assert no `node:*` in its bundle (existing constraint).
- Selectors work: `i18n translate docs.api --locale hy` touches only that space and locale;
  `i18n locale promote hu` moves it to `primary` and its drift becomes blocking;
  `i18n locale exclude mi` drops it from translation, rendering, and checks alike.
- The naming untangle is complete: `grep -r CANVAS_LOCALES` returns 0; `LOCALES`, `MESSAGES`, and
  `LOCALE_THEMES` each resolve to exactly one declaration, as do `LocaleInfo` and `LocaleTheme`; and no
  file declares a name that shadows another package's export.
- `vp test` green (docs 182 tests, translation-adapters 103 until deleted);
  `vp run @pantoken/docs#docs:build` completes; locale parity passes; a built locale page renders on a
  local static preview (distinct port, `--strictPort`).
- `vp run ready` and `vp run check:publish`.
