# create-pantoken-app

![Pantoken: Instructure design tokens and icons, reshaped for every platform.](https://pantoken.iywahl.com/og.png)

pantoken resolves Instructure UI's design tokens and icons once, then turns that single model into many small packages — scaffold a starter project with pantoken already installed and wired in.

## Getting started

Scaffolding a pantoken app is a one-liner, just choose your target platform:

`HTML` (or `components`) · `web-components` · `react` · `vue` · `svelte` · `angular`

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

[📖 Full Docs](https://pantoken.iywahl.com/) · [Instructure UI](https://instructure.design/)
