# @pantoken/android

Emit Instructure design tokens as Android resource XML. It flattens the token IR to concrete,
single-mode values and writes `res/values/colors.xml` and `res/values/dimens.xml`, with the Android
Style Dictionary transforms applied (`#aarrggbb` colours, `dp`/`sp` dimensions).

## Install

```sh
npm i @pantoken/android
```

## Usage

```ts
import { generateAndroid } from "@pantoken/android";

const [colors, dimens] = await generateAndroid({
  outDir: "./app/src/main",
  theme: "rebrand",
  mode: "light",
  icons: ["add", "check"], // optional: also emit res/drawable/ic_*.xml VectorDrawables
});
```

Or via the CLI, straight into a consumer repo:

```sh
pantoken generate android --out ./app/src/main
pantoken generate android --out ./app/src/main --theme canvas --icons add,check
```

## Output

- `res/values/colors.xml` — colour tokens as `<color name="…">#aarrggbb</color>`.
- `res/values/dimens.xml` — dimension tokens as `<dimen name="…">…dp</dimen>`.
- `res/drawable/ic_<name>.xml` — one VectorDrawable per requested icon (only when `icons` is set).

Reference the values from layouts and themes as `@color/…` and `@dimen/…`. Use this package for
Android View-system (XML) UIs; for Jetpack Compose, use `@pantoken/compose`.

## API

- **`generateAndroid(options): Promise<string[]>`** — emit XML for a named theme (from the vendored
  `@pantoken/tokens` IR). Returns the written file paths.
- **`toAndroid(tokens, options): Promise<string[]>`** — same, but for an explicit token IR you pass
  in. Returns the written file paths.
- **`GenerateAndroidOptions`** — the `outDir`, `theme`, `mode`, and `icons` options both take.

## Related

- Pairs with `@pantoken/compose` for the Jetpack Compose (Kotlin) counterpart.
- Uses `@pantoken/tokens` for the vendored token IR and `@pantoken/sd-config` for the Style
  Dictionary platforms.

## License

MIT
