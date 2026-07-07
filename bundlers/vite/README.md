# @pantoken/vite

A Vite plugin for pantoken. It exposes virtual modules so apps consume the tokens and CSS without
importing the large packages directly, and it can auto-inject the stylesheet into the HTML entry.

## Install

```sh
npm i -D @pantoken/vite
```

Also available as `pantoken/vite`.

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { pantoken } from "@pantoken/vite";

export default defineConfig({
  plugins: [pantoken({ injectCss: true })],
});
```

Then in your app:

```ts
import css from "virtual:pantoken/css"; // the stylesheet string
import { tokens } from "virtual:pantoken/tokens"; // the resolved token IR
```

With `injectCss: true`, the stylesheet is added to the HTML entry's `<head>` automatically, so you
don't need to import `virtual:pantoken/css` yourself. `vite` is a peer dependency.

## API

- **`pantoken(options?): Plugin`** — the Vite plugin. `options.injectCss` injects the stylesheet into
  the HTML `<head>`. Also the default export.
- **`PantokenViteOptions`** — options type.

Virtual modules the plugin registers:

- **`virtual:pantoken/css`** — the stylesheet string (default export).
- **`virtual:pantoken/tokens`** — the resolved token IR (`tokens` named export plus default export).

## Related

- Wraps `@pantoken/css` and `@pantoken/tokens`, which supply the stylesheet and IR.
- Pairs with `@pantoken/tailwind` when you want Tailwind utilities backed by the injected custom
  properties.

## License

MIT
