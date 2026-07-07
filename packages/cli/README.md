# @pantoken/cli

`pantoken generate <target>` — emit native and other non-npm design-token source into a consumer
repo. Covers targets that don't fit the npm-package model: native platforms, static-site assets,
design-tool swatches, and CMS themes.

## Install

```sh
npm i @pantoken/cli
```

## Usage

```sh
pantoken generate swift --out ./ios/DesignTokens --theme rebrand --class PanTokens
```

Writes:

- `Sources/PanTokens/Tokens.swift` — the generated Swift tokens.
- `Package.swift` — a SwiftPM manifest stub, so registry publishing is later a config flip.

Run it programmatically:

```ts
import { run } from "@pantoken/cli";

await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
```

## Targets

Supported now: `swift`, `android`, `compose`, `flutter`, `wordpress`, `vanilla`, `drupal`,
`swatches`, `rust`, `icon-font`, `pendo`, `jekyll`, and `hugo`. Each writes to `--out` and logs the
files it wrote.

## Flags

- `--out <dir>` — output directory (default `./pantoken-out`).
- `--theme <theme>` — `rebrand` (default), `canvas`, or `canvasHighContrast`.
- `--class <Name>` — class or font name for targets that generate one (default `PanTokens`).
- `--icons <a,b,c>` — icon names to emit as native assets, for targets that support icons.
- `--format <fmt>` — output format for multi-format targets (`swatches`: `ase` / `gpl` / `sketch`;
  `rust`: `egui` / `iced`).
- `--no-scope`, `--no-important`, `--no-prune` — Pendo target: skip `@scope` wrapping,
  `!important`, or token pruning.

## API

- **`run(argv): Promise<void>`** — parse `argv` and generate the target, writing files to disk.
- **`parseArgs(argv): CliArgs`** — parse `generate <target> [flags]` into a `CliArgs` object.
- **`CliArgs`** — the parsed invocation shape.

## Related

- `@pantoken/core` builds the IR every target emitter consumes.
- npm-installable targets (React, SCSS, Tailwind, and so on) ship as their own `@pantoken/*`
  packages and don't go through this CLI.

## License

MIT
