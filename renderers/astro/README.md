# @pantoken/astro

Astro / Starlight integration for pantoken. `InstUI` is a Starlight plugin that injects the
Instructure design tokens and icons as CSS into the page head. It ports the approach of
`starlight-theme-instui` onto the shared `@pantoken/css` pipeline.

## Install

```sh
npm i @pantoken/astro
```

Also available as `pantoken/astro`.

## Usage

```ts
// astro.config.mjs
import starlight from "@astrojs/starlight";
import { InstUI } from "@pantoken/astro";
import { transition } from "@pantoken/plugin-transition";

export default defineConfig({
  integrations: [
    starlight({
      title: "Docs",
      plugins: [InstUI({ theme: "rebrand", plugins: [transition()] })],
    }),
  ],
});
```

Or build the stylesheet directly:

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```

## API

- **`InstUI(options?): StarlightPluginLike`** — create the Starlight plugin that injects the pantoken stylesheet into the page head. Also the default export.
- **`pantokenCss(options?): string`** — build the pantoken stylesheet for a theme, with optional plugin CSS.
- **`InstUIOptions`** — options interface: `theme` (default `"rebrand"`) and `plugins` (default none).
- **`HeadEntry`, `StarlightPluginLike`** — minimal structural types that avoid a hard dependency on Starlight.

## Related

- Builds on `@pantoken/css` and `@pantoken/tokens` for the token-to-CSS pipeline.
- Accepts pantoken plugins such as `@pantoken/plugin-transition`.

## License

MIT
