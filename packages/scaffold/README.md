# @pantoken/scaffold

Scaffold a starter project — with [pantoken](https://www.npmjs.com/package/@pantoken/pantoken)
(Instructure design tokens and icons) already installed and wired in.

## Usage

```sh
npx @pantoken/scaffold html            # plain HTML/CSS (Vite + TS) + @pantoken/components
npx @pantoken/scaffold react           # Vite + React + @pantoken/react
npx @pantoken/scaffold next            # Next.js (App Router) + @pantoken/next
npx @pantoken/scaffold angular         # Vite + Angular (standalone) + @pantoken/web-components
npx @pantoken/scaffold web-components  # Vite + @pantoken/web-components (no framework)

# Target a directory other than the current one:
npx @pantoken/scaffold react --dir ./my-app
```

`npx` works regardless of which package manager you use. Substitute `pnpm dlx`, `yarn dlx`, or
`bunx` for `npx` if you prefer.

Or use it programmatically:

```ts
import { scaffoldProject, SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

scaffoldProject("react", "./my-app");
```

## API

- **`scaffoldProject(platform, dir?): string[]`** — write a starter project template for a
  `ScaffoldPlatform` into `dir` (defaults to `"."`). Its basename (or `"pantoken-app"` for `"."`)
  is substituted for `{{projectName}}` in the template files. Returns the paths written.
- **`SCAFFOLD_PLATFORMS: readonly ScaffoldPlatform[]`** — every scaffoldable platform key.
- **`ScaffoldPlatform`** — the platform union: `"html"`, `"react"`, `"next"`, `"angular"`,
  `"web-components"`.

`@pantoken/ai`'s `pantoken-ai scaffold <platform>` command wraps this package and additionally
installs pantoken's agent assets (AGENTS.md, editor/agent rules, skills) into the same directory.

Every scaffolded starter's entry markup follows the `wrapper` app-shell layout from
[`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts) — the
container/header/content skeleton is generated at build time from that package's `wrapper.css`
cssdoc (`@part`/`@slot` tags), so every platform stays in sync automatically when the layout
changes. See `scripts/wrapper-layout.ts`.

## License

MIT
