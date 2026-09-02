# create-pantoken-app

![Pantoken: Instructure design tokens and icons, reshaped for every platform.](https://pantoken.app/og.png)

pantoken resolves Instructure UI's design tokens and icons once, then turns that single model into many small packages — scaffold a starter project with pantoken already installed and wired in.

## Getting started

Scaffolding a pantoken app is a one-liner, just choose your target platform:

`HTML` (or `components`) · `web-components` · `react` · `vue` · `svelte` · `angular` ·
`canvas-theme-editor` (or `theme-editor`)

```sh
npx create-pantoken-app <platform>

# Target a directory other than the current one:
npx create-pantoken-app react ./my-app

# Non-interactive (CI-safe): errors instead of prompting for a missing platform/directory
npx create-pantoken-app react --dir ./my-app --yes

# Override the auto-detected display language
npx create-pantoken-app --lang hu
```

Run `npx create-pantoken-app --help` for the full flag reference.

## Native design-token output

`generate <target>` is a separate entry point (flat-name alias for `@pantoken/cli`) that emits
native/non-npm design-token source instead of scaffolding a starter project:

```sh
npx create-pantoken-app generate swift --out ./ios/DesignTokens
```

See [`@pantoken/cli`](https://www.npmjs.com/package/@pantoken/cli) for the full target list.

[📖 Full Docs](https://pantoken.app/) · [Instructure UI](https://instructure.design/)
