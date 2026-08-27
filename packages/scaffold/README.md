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

# Omit the platform (and/or directory) on a TTY to be prompted interactively:
npx @pantoken/scaffold

# Non-interactive (CI-safe): errors instead of prompting for a missing platform/directory
npx @pantoken/scaffold react --dir ./my-app --yes

# Override the auto-detected display language
npx @pantoken/scaffold --lang hu
```

`npx` works regardless of which package manager you use. Substitute `pnpm dlx`, `yarn dlx`, or
`bunx` for `npx` if you prefer — the printed "Next steps" install command matches whichever one
invoked the CLI (detected from `npm_config_user_agent`).

Run `npx @pantoken/scaffold --help` for the full flag reference, or `npx @pantoken/scaffold
completion <shell>` to generate a bash/zsh/fish/PowerShell completion script.

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

## CLI flags

| Flag                 | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `[platform]`         | Platform to scaffold (prompted interactively if omitted on a TTY)         |
| `-d, --dir <path>`   | Target directory (prompted interactively if omitted on a TTY)             |
| `-y, --yes`          | Never prompt; error instead of prompting for a missing platform/directory |
| `-l, --lang <tag>`   | Override the auto-detected display language (e.g. `"hu"`)                 |
| `-v, --version`      | Print the installed version                                               |
| `-h, --help`         | Print usage                                                               |
| `completion <shell>` | Generate a bash/zsh/fish/PowerShell completion script                     |

The CLI auto-detects its display language from `--lang` > `LC_ALL`/`LANG` > the runtime's `Intl`
locale > English, falling back to English for any untranslated string.

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
