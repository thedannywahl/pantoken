# @pantoken/postcss

A PostCSS plugin that expands an `@pantoken;` at-rule into the full Instructure token stylesheet
(`@property` registrations plus declarations). Write `@pantoken;` where you want the tokens defined,
and the plugin replaces it at build time.

## Install

```sh
npm i @pantoken/postcss
```

Also available as `pantoken/postcss`.

## Usage

```js
// postcss.config.js
import pantoken from "@pantoken/postcss";

export default { plugins: [pantoken()] };
```

```css
/* your entry stylesheet */
@pantoken;

.button {
  background: var(--instui-color-background-brand);
}
```

At build time the `@pantoken;` at-rule is replaced with the `@property` registrations and
declarations from `@pantoken/css`. Pass `pantoken({ atRule: "instui" })` to expand `@instui;`
instead. `postcss` is a peer dependency.

## API

- **`pantoken(options?): Plugin`** — the PostCSS plugin; `options.atRule` sets the at-rule name
  (default `"pantoken"`). Exported both as the default and as a named `pantoken`.
- **`PantokenPostcssOptions`** — options type.

## Related

- Wraps `@pantoken/css`, which supplies the stylesheet the at-rule expands to.

## License

MIT
