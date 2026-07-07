# @pantoken/model

The zero-dependency type contracts for the pantoken token IR. Every pantoken package depends on
this one for the `Token` type, so no consumer has to install the (GitHub-only) upstream token
package just to type the IR.

## Install

```sh
npm i @pantoken/model
```

## Usage

```ts
import type { Token, PantokenPlugin } from "@pantoken/model";

const token: Token = {
  name: "--instui-color-background-base",
  syntax: "<color>",
  inherits: true,
  value: "light-dark(#fff, #1a1a1a)",
  themed: true,
};
```

## API

- **`Token`** — a single design token in the canonical `@property`-aligned IR (`name`, `syntax`,
  `inherits`, `value`, plus optional `themed`, `refersTo`, and `meta`).
- **`TokenInput`** — the partial shape the `define()` helper in `@pantoken/core` accepts;
  `inherits` and `syntax` default.
- **`TokenMeta`, `TokenModify`** — non-value metadata: icon provenance (kind, style, viewBox,
  source, bidirectional) and Tokens Studio colour modifiers.
- **`Theme`** — the available upstream themes (`rebrand`, `canvas`, `canvasHighContrast`).
- **`PantokenPlugin`** — the uniform plugin contract; each optional hook (`tokens`, `icons`,
  `css`, `rehype`, `native`) opts the plugin into that stage.
- **`IconEntry`, `IconResolver`** — a resolved icon and the function that maps a code to one.
- **`CssContribution`, `PropertyRule`** — what a plugin's `css` hook returns, plus a typed
  `@property` registration.
- **`TokenHookContext`, `IconHookContext`, `CssHookContext`, `RehypeHookContext`** — the context
  objects passed to each plugin hook.

## Related

- Types only. `@pantoken/core` builds the IR these types describe.
- `@pantoken/plugin-kit` composes plugins built against `PantokenPlugin`.

## License

MIT
