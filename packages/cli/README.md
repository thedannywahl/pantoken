# @pantoken/cli

`pantoken generate <target>`, `pantoken create <platform>`, `pantoken add <item>` — CLI tooling
for the pantoken design-token ecosystem. Covers code scaffolding, component distribution from the
registry, and native/non-npm target code generation.

## Install

```sh
npm i @pantoken/cli
```

## Usage

```sh
pantoken create react --dir ./my-app
pantoken add button
pantoken generate swift --out ./ios/DesignTokens --theme rebrand --class PanTokens
pantoken generate inline -i ./page.html -o ./page.inlined.html
pantoken generate email -i ./page.html -o ./page.email.html --client gmail
```

`pantoken add` delegates to the shadcn CLI and resolves bare names through the indexed `@pantoken`
namespace. Registry items install Pantoken packages and CSS imports; they do not generate React
components. Use shadcn directly to discover and inspect items before adding them:

```sh
npx shadcn@latest list @pantoken
npx shadcn@latest search @pantoken --query button
npx shadcn@latest view @pantoken/button
npx shadcn@latest add @pantoken/button
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
`swatches`, `rust`, `icon-font`, `pendo`, `jekyll`, `hugo`, `inline`, and `email`. Each writes to
its selected output and logs the files it wrote.

## Flags

- `--out <dir>` — output directory (default `./pantoken-out`).
- `--theme <theme>` — `rebrand` (default), `canvas`, or `canvasHighContrast`.
- `--class <Name>` — class or font name for targets that generate one (default `PanTokens`).
- `--icons <a,b,c>` — icon names to emit as native assets, for targets that support icons.
- `--format <fmt>` — output format for multi-format targets (`swatches`: `ase` / `gpl` / `sketch`;
  `rust`: `egui` / `iced`).
- `--no-scope`, `--no-important`, `--no-prune` — Pendo target: skip `@scope` wrapping,
  `!important`, or token pruning.
- `-i, --input <file>` and `-o, --output <file>` — `inline` target: read an HTML file and write the
  inlined result.
- `--css <file>` — `inline` or `email`: add caller-supplied CSS.
- `--client <generic|outlook|gmail|webkit>` — `email` target: select the email capability profile.

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
