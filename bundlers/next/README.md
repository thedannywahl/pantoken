# @pantoken/next

A Next.js config adapter. Instructure UI ships ESM packages Next must transpile, and `withPantoken`
merges them into `transpilePackages` so they build without extra setup.

## Install

```sh
npm i @pantoken/next
```

Also available as `pantoken/next`.

## Usage

```js
// next.config.mjs
import { withPantoken } from "@pantoken/next";

export default withPantoken({ reactStrictMode: true });
```

Then import the tokens in your root layout:

```ts
import "@pantoken/css";
```

Pass extra InstUI packages to transpile with `withPantoken(config, { transpile: ["@instructure/ui-modal"] })`.
`next` is an optional peer dependency.

## API

- **`withPantoken(nextConfig?, options?): NextConfigLike`** — merges the InstUI packages (plus any in
  `options.transpile`) into `nextConfig.transpilePackages` and returns the augmented config. Also the
  default export.
- **`INSTUI_TRANSPILE_PACKAGES: readonly string[]`** — the Instructure UI packages Next needs to
  transpile.
- **`WithPantokenOptions`** — options type; `transpile` adds more package names.
- **`NextConfigLike`** — minimal Next config shape this adapter touches.

## Related

- Pairs with `@pantoken/css` for the token stylesheet you import in your layout.

## License

MIT
