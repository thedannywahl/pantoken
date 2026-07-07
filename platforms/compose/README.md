# @pantoken/compose

Emit Instructure design tokens as a Jetpack Compose (Kotlin) object, via Style Dictionary. It's the
modern Android counterpart to `@pantoken/android`'s resource XML: it flattens the token IR to
concrete, single-mode values and keeps the natively-typed tokens (colours, dimensions, numbers).

## Install

```sh
npm i @pantoken/compose
```

## Usage

```ts
import { generateCompose } from "@pantoken/compose";

const file = await generateCompose({
  outDir: "./app/src/main/kotlin",
  theme: "rebrand",
  className: "PanTokens", // the generated Kotlin object name (default)
});
```

Or via the CLI:

```sh
pantoken generate compose --out ./app/src/main/kotlin
pantoken generate compose --out ./app/src/main/kotlin --theme canvas --class BrandTokens
```

## Output

A single Kotlin file (named after `className`) declaring a Compose object of `Color`, `Dp`, and
numeric constants. Reference them straight from composables. Use this for Compose UIs; for the
Android View-system (XML) resources, use `@pantoken/android`.

## API

- **`generateCompose(options): Promise<string>`** — emit Kotlin for a named theme (from the vendored
  `@pantoken/tokens` IR). Returns the written file path.
- **`toCompose(tokens, options): Promise<string>`** — same, but for an explicit token IR. Returns
  the written file path.
- **`GenerateComposeOptions`** — the `outDir`, `theme`, `mode`, and `className` options both take.

## Related

- Pairs with `@pantoken/android` for the Android View-system (XML) counterpart.
- Uses `@pantoken/tokens` for the vendored token IR and `@pantoken/sd-config` for the Style
  Dictionary platforms.

## License

MIT
