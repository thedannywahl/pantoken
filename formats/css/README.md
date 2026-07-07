# @pantoken/css

Emit Instructure design tokens as `@property`-typed CSS, with `light-dark()` theming and icon
data-URIs, from the pantoken IR. Concrete tokens register as typed `@property` rules; themed and
reference tokens stay as scoped declarations.

## Install

```sh
npm i @pantoken/css
```

Also available as `pantoken/css`.

## Usage

```ts
import { toCss, css } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";

css; // the ready-made rebrand stylesheet string
toCss(byTheme("canvas"), { scope: ":root" }); // build CSS for another theme
```

Side-effect injection (browser):

```ts
import "@pantoken/css/inject"; // appends <style data-pantoken> to document.head
```

Or a plain stylesheet: `@pantoken/css/style.css`.

A plugin's `css` hook can contribute or post-process CSS — for example, inject a focus ring that
isn't in the source tokens:

```ts
toCss(tokens, {
  plugins: [
    {
      name: "focus",
      css: () => ({ append: ":focus-visible { outline: 2px solid var(--instui-focus-color); }" }),
    },
  ],
});
```

## API

- **`css: string`** — the ready-made `rebrand` stylesheet (also the default export).
- **`toCss(tokens, options?): string`** — build CSS for any token IR. `options.scope` sets the
  declaration selector (default `":root"`); `options.plugins` runs `css` hooks after the base build.
- **`ToCssOptions`** — options for `toCss`.
- **`buildCssFile(args): string`** — the low-level builder: typed `@property` registrations followed
  by scoped declaration sections.
- **`CssSection`** — one scoped block of custom properties, optionally wrapped in an `@layer`.
- **`inject(doc?): HTMLStyleElement | undefined`** (from `@pantoken/css/inject`) — inject the
  stylesheet into `document.head` once; no-ops off the DOM.
- **`./inject`** — a DOM side-effect entry that injects the stylesheet on import.
- **`./style.css`** — the generated plain stylesheet, for a direct `<link>` or `@import`.

## Related

- Pairs with `@pantoken/tokens` for the underlying token IR.
- `@pantoken/scss`, `@pantoken/less`, and `@pantoken/stylus` emit the same tokens as preprocessor
  variables.

## License

MIT
