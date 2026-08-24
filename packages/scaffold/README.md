# @pantoken/scaffold

Scaffold a starter project — with [pantoken](https://www.npmjs.com/package/@pantoken/pantoken)
(Instructure design tokens and icons) already installed and wired in.

## Usage

```sh
npx @pantoken/scaffold web      # plain HTML/CSS (Vite + TS) + @pantoken/components
npx @pantoken/scaffold react    # Vite + React + @pantoken/react
npx @pantoken/scaffold next     # Next.js (App Router) + @pantoken/next

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
- **`ScaffoldPlatform`** — the platform union: `"web"`, `"react"`, `"next"`.

`@pantoken/ai`'s `pantoken-ai scaffold <platform>` command wraps this package and additionally
installs pantoken's agent assets (AGENTS.md, editor/agent rules, skills) into the same directory.

## License

MIT
