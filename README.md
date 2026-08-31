# pantoken

[![CI](https://github.com/thedannywahl/pantoken/actions/workflows/ci.yml/badge.svg)](https://github.com/thedannywahl/pantoken/actions/workflows/ci.yml)
[![CodeQL](https://github.com/thedannywahl/pantoken/actions/workflows/codeql.yml/badge.svg)](https://github.com/thedannywahl/pantoken/actions/workflows/codeql.yml)
[![codecov](https://codecov.io/gh/thedannywahl/pantoken/branch/main/graph/badge.svg)](https://codecov.io/gh/thedannywahl/pantoken)
[![CodSpeed](https://img.shields.io/endpoint?url=https://codspeed.io/badge.json)](https://app.codspeed.io/thedannywahl/pantoken)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/thedannywahl/pantoken/badge)](https://securityscorecards.dev/viewer/?uri=github.com/thedannywahl/pantoken)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/13875/badge)](https://www.bestpractices.dev/projects/13875)

![Pantoken: Instructure design tokens and icons, reshaped for every platform.](https://pantoken.app/og.png)

pantoken resolves Instructure UI's design tokens and icons once, then turns that single model into
many small, publishable packages: plain stylesheets, SCSS and Less, React and Vue and Svelte,
Tailwind and Panda, native Swift and Kotlin, WordPress and Drupal, Figma, and more. You install the
smallest package that fits your task, or the unified `pantoken` package that re-exports them all.

> pantoken is built and used internally at Instructure, then open-sourced; Instructure doesn't
> provide official warranty or support for it as a product, which is why it's published under
> [`thedannywahl`](https://github.com/thedannywahl/pantoken) rather than the `instructure` org — it
> may move there later.

[Learn more](https://pantoken.app)

## Quick start

Style a web app with the token stylesheet:

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

Or generate token source for a native platform, with no runtime dependency:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Or skip the install entirely and pull a lean token foundation plus only the components you need from a
CDN — see [CDN & distribution](https://pantoken.app/guide/cdn) for the interactive URL builder.

## The token model

Tokens are CSS custom properties named `--instui-<group>-<name>`, for example
`--instui-color-background-brand`. Three themes ship: `rebrand` (the default, with `light-dark()`
where light and dark differ), `canvas`, and `canvasHighContrast`. Icons are `<image>` tokens
(`--instui-icon-<name>`) derived from Lucide plus Instructure's custom glyphs.

## Packages

The monorepo is organized into buckets. A few highlights:

| Bucket       | Contains                             | Examples                                                                    |
| ------------ | ------------------------------------ | --------------------------------------------------------------------------- |
| `packages/`  | The model, core transformer, and CLI | `@pantoken/model`, `@pantoken/core`, `@pantoken/tokens`, `@pantoken/cli`    |
| `formats/`   | Token file formats                   | `@pantoken/css`, `@pantoken/scss`, `@pantoken/dtcg`, `@pantoken/icon-font`  |
| `renderers/` | Framework and tool integrations      | `@pantoken/react`, `@pantoken/vue`, `@pantoken/mui`, `@pantoken/pendo`      |
| `bundlers/`  | Build-tool plugins and presets       | `@pantoken/vite`, `@pantoken/next`, `@pantoken/tailwind`, `@pantoken/panda` |
| `platforms/` | Native and site-generator targets    | `@pantoken/swift`, `@pantoken/wordpress`, `@pantoken/rust`                  |
| `design/`    | Design-tool payloads                 | `@pantoken/figma`, `@pantoken/swatches`                                     |
| `plugins/`   | Optional token and CSS transforms    | `@pantoken/plugin-stacking`, `@pantoken/plugin-simple-icons`                |
| `tools/`     | Private build tooling                | `@pantoken/aggregate`, `@pantoken/validate-generated`                       |

The docs site has the [full package map](https://pantoken.app/guide/packages).

## Architecture

`@pantoken/model` holds the type contracts. `@pantoken/core` is the only package that reads the
upstream source; it resolves tokens and icons into the canonical IR. `@pantoken/tokens` vendors that
IR as static JSON at build time, which is the decoupling point: downstream packages read
`@pantoken/tokens`, never `@pantoken/core`, so `npm i pantoken` never reaches for the GitHub-only
upstream. Every other bucket consumes the IR.

## Documentation

The site is built with VitePress and TypeDoc and deploys to GitHub Pages:
[pantoken.app](https://pantoken.app).

```sh
pnpm run docs:dev      # local dev server with hot reload
pnpm run docs:build    # production build
pnpm run docs:preview  # serve the production build
```

## Development

```sh
pnpm install
pnpm run generate            # build every package, regenerating all generated/ output
pnpm run validate:generated  # build, then validate the generated output
pnpm run ready               # build, check, test, validate, and lint — the full gate
pnpm run check:publish       # publint every publishable package
```

Generated files are never committed — a build reproduces them into each package's `generated/`
directory. See the [generated-output guide](https://pantoken.app/guide/generated-output).

## License

MIT

## Project Governance

See [GOVERNANCE.md](GOVERNANCE.md) for details on how project decisions are made.
