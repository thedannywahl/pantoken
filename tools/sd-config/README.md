# @pantoken/sd-config

The shared [Style Dictionary](https://styledictionary.com) setup for pantoken's native emitters. It
takes the concrete, resolved dictionary produced by `@pantoken/core`'s `toStyleDictionary()` and
builds a platform's source file (Swift, Compose, Flutter, SCSS, JSON, and Android).

Internal build tooling. Not published.

## Usage

```ts
import { buildPlatform, PLATFORMS } from "@pantoken/sd-config";

const file = await buildPlatform({
  dictionary, // Record<name, { value, type }> from @pantoken/core.toStyleDictionary()
  platform: "swift", // key of PLATFORMS
  outDir: "./out",
  className: "PanTokens",
});
```

`@pantoken/swift` and `@pantoken/cli` consume this; new native platforms are added by extending the
`PLATFORMS` map — no new Style Dictionary wiring per platform. Values are fed to Style Dictionary
pre-resolved, so built-in transform groups are enough; `@tokens-studio/sd-transforms` is a dependency
for the future raw-JSON lineage.

## API

- **`buildPlatform(options): Promise<string>`** — build a native source file for one platform via
  Style Dictionary. Returns the path of the written file. Options: `dictionary`, `platform` (a
  `PLATFORMS` key), `outDir`, `className` (default `PanTokens`), and `fileName` (default `Tokens`).
- **`PLATFORMS: Record<string, NativePlatform>`** — the supported platforms and their Style
  Dictionary wiring: `swift`, `compose`, `flutter`, `scss`, `json`, `android-colors`, and
  `android-dimens`.
- **`SdDictionary`, `NativePlatform`, `BuildPlatformOptions`** — the dictionary, platform, and option
  types.

## License

MIT
