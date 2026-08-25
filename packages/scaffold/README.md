# @pantoken/scaffold

Scaffold a starter project — with [pantoken](https://www.npmjs.com/package/@pantoken/pantoken)
(Instructure design tokens and icons) already installed and wired in.

Built on **Bingo presets**: each platform package exports a preset defining its scaffold structure,
enabling decentralized template ownership and consistent multi-platform scaffolding.

## Usage

```sh
npx @pantoken/scaffold components      # plain HTML/CSS (Vite + TS) + @pantoken/components
npx @pantoken/scaffold react           # Vite + React + @pantoken/react
npx @pantoken/scaffold vue             # Vite + Vue 3 + @pantoken/vue
npx @pantoken/scaffold web-components  # Vite + @pantoken/web-components (no framework)

# Target a directory other than the current one:
npx @pantoken/scaffold react ./my-app
```

`npx` works regardless of which package manager you use. Substitute `pnpm dlx`, `yarn dlx`, or
`bunx` for `npx` if you prefer.

Or use it programmatically:

```ts
import { scaffoldProject, SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

await scaffoldProject("react", "./my-app");
```

## API

- **`scaffoldProject(platform, dir?): Promise<string[]>`** — write a starter project template for a
  `ScaffoldPlatform` into `dir` (defaults to `"."`). Its basename (or `"pantoken-app"` for `"."`)
  is passed as the project name to the Bingo preset. Returns the paths written.
- **`SCAFFOLD_PLATFORMS: readonly ScaffoldPlatform[]`** — every scaffoldable platform key (discovered
  from available presets at build time).
- **`ScaffoldPlatform`** — the platform union, derived from preset registry.

## Architecture

### Bingo Preset System

Each platform package (`@pantoken/components`, `@pantoken/react`, `@pantoken/vue`,
`@pantoken/web-components`) exports a Bingo preset via `./scaffold-preset` entry point. Presets are:

- **Built on `@pantoken/scaffold-base`**: a shared Bingo Base defining common options (projectName)
  and blocks (cssdoc.json configuration, wrapper app-shell layout context).
- **Auto-discovered at build time**: `scripts/scan-presets.ts` scans packages and generates a static
  `preset-ledger.ts` registry.
- **Decentralized ownership**: each platform defines its own preset, templates, and scaffold behavior
  without coordination.

### Template Rendering

`scaffoldProject` uses `bingo-stratum`'s `producePreset` to render presets:

1. Validate the platform against the preset ledger.
2. Invoke the preset with the project name as an option.
3. Write the produced files to the target directory.
4. Fall back to the legacy `SCAFFOLDS` template system if preset rendering fails (for backward
   compatibility).

### Wrapper Layout

Every scaffolded starter's entry markup follows the `wrapper` app-shell layout from
[`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts) — the
container/header/content skeleton is generated at build time from that package's `wrapper.css`
cssdoc (`@part`/`@slot` tags), so every platform stays in sync automatically when the layout
changes. See `scripts/wrapper-layout.ts`.

## Integration with `@pantoken/ai`

`@pantoken/ai`'s `pantoken-ai scaffold <platform>` command wraps this package and additionally
installs pantoken's agent assets (AGENTS.md, editor/agent rules, skills) into the same directory.

## License

MIT
