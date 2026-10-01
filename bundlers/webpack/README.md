# @pantoken/webpack

A Webpack 5 plugin that emits the Instructure token stylesheet as a build asset (default
`pantoken.css`), so you can link it from your HTML without importing the large package into a bundle.

## Compatibility

Verified with webpack 5.61.0 through 5.111.1 using real builds that emit a custom-named token
stylesheet. Webpack 5.0.0 could not be verified on Node 26 because its internal MD4 hashing is
unsupported by this host. See the [compatibility matrix](https://pantoken.app/compatibility) for
exact tested releases.

## Install

```sh
npm i -D @pantoken/webpack
```

Also available as `pantoken/webpack`.

## Usage

```js
// webpack.config.js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

This emits `pantoken.css` into the output, ready to link from your HTML. Override the name with
`new PantokenWebpackPlugin({ filename: "tokens.css" })`. `webpack` is an optional peer dependency.

## API

- **`PantokenWebpackPlugin`** — the plugin class. Construct it with an optional `{ filename }` and add
  it to `plugins`. Also the default export.
- **`PantokenWebpackOptions`** — options type; `filename` sets the emitted asset name.

## Related

- Wraps `@pantoken/css`, which supplies the stylesheet this plugin emits.

## License

MIT
