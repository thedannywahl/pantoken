# @pantoken/core

The pantoken transformer. It performs the first and only source transformation: it reads
`@instructure/instructure-design-tokens` and `@instructure/ui-icons`, resolves the Tokens Studio
graph, and produces the canonical `@property`-aligned token IR that every other pantoken package
consumes.

## Install

```sh
npm i @pantoken/core
```

## Usage

```ts
import { buildTokens, toStyleDictionary } from "@pantoken/core";

const tokens = buildTokens({ theme: "rebrand" });
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }

const forSwift = toStyleDictionary(tokens, "light");
// → concrete, single-mode dictionary for the native lineage
```

### Plugins

Every producer accepts `{ plugins }`. A plugin's `tokens` hook receives the current IR and returns
the full replacement list:

```ts
import { buildTokens, type PantokenPlugin } from "@pantoken/core";

const focus: PantokenPlugin = {
  name: "focus",
  tokens: ({ tokens, define }) => [
    ...tokens,
    define({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
  ],
};

buildTokens({ theme: "rebrand", plugins: [focus] });
```

## What it does

- Resolves `{path.to.token}` references into `var(...)` pointers, preserving the token graph.
- Merges light and dark colours into `light-dark()` only where they differ.
- Rolls icons in as `<image>` tokens with metadata (source, bidirectional, viewBox).
- Sniffs the CSS `@property` `syntax` for every concrete value.
- Honors Tokens Studio `modify` extensions (darken, lighten, alpha) on concrete colours, and
  preserves reference-valued modifiers as metadata for the native lineage.

## API

- **`buildTokens(options): Token[]`** — build the IR for a theme, running plugin `tokens` and
  `icons` hooks. Options: `theme`, `plugins`, `includeIcons`, `includeInstui`, `includeLucide`.
- **`toStyleDictionary(tokens, mode): Record<string, SdLeaf>`** — shape the resolved IR as a flat
  Style Dictionary dictionary for the native emitters.
- **`resolveReferences(tokens, mode): Map<string, string>`** — resolve every token to a concrete,
  single-mode value.
- **`defineToken(input): Token`** — build a full `Token` from partial input (defaults `syntax` and
  `inherits`). **`dedupeByName`**, **`runTokenPlugins`**, **`runIconPlugins`** — the plugin-stage
  runners.
- **`collectIcons(options): IconLayer`** — read glyphs from `@instructure/ui-icons` as `<image>`
  tokens plus the icon-colour special values.
- **`decodeIconSvg`, `getIconSvgs`, `toVectorDrawable`, `toXcodeImageset`, `flutterIconManifest`** —
  native icon-asset emitters (decode a data-URI SVG, then convert to Android VectorDrawable, an
  Xcode imageset, or a Flutter manifest).
- **`collectLeaves`, `referenceToVarName`, `resolveValue`, `varName`** — the Tokens Studio graph
  walker and reference resolver.
- **`cssSyntaxForValue`, `isContextual`, `toKebab`, `ICON_COLOR_SPECIAL_VALUES`** — value-level
  helpers (`@property` syntax sniffing, name casing, icon-colour constants).
- **`applyModify(value, modify)`** — apply a Tokens Studio colour modifier to a concrete hex value.
- Re-exports the IR types from `@pantoken/model`: `Token`, `TokenInput`, `TokenMeta`,
  `TokenModify`, `Theme`, `PantokenPlugin` (and the hook-context and CSS-contribution types).

## The `Token` shape

The IR is aligned to the CSS `@property` schema and extended into a superset:

| Field      | Meaning                                                          |
| ---------- | ---------------------------------------------------------------- |
| `name`     | Custom-property name, e.g. `--instui-color-background-base`.     |
| `syntax`   | `@property` syntax (`<color>`, `<length>`, `<image>`, …) or `*`. |
| `inherits` | `@property` inherits flag.                                       |
| `value`    | Concrete value, `var(...)` reference, or `light-dark(a, b)`.     |
| `themed`   | True when light and dark differ.                                 |
| `refersTo` | The referenced token, when `value` is a single `var(...)`.       |
| `meta`     | Non-value metadata (icons, colour modifiers).                    |

## Related

- Types come from `@pantoken/model`.
- `@pantoken/plugin-kit` builds and composes the plugins `buildTokens` runs.
- `@pantoken/utils` provides the reference resolver used by `resolveReferences`.

## License

MIT
