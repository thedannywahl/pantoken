# @pantoken/plugin-layouts

Layout composition records for downstream consumers.

This package provides layout-level CSS records (currently `wrapper`) that compose semantic components into an app-shell structure.

## Install

```sh
npm i @pantoken/plugin-layouts
```

Also available as `pantoken/layouts`.

## Usage

Use the plugin to append layout rules to token CSS output:

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { layouts } from "@pantoken/plugin-layouts";

const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```

Import the built stylesheet directly when you only need the static CSS:

```ts
import "@pantoken/plugin-layouts/layouts.css";
```

## API

- `layouts(options?)` — returns a CSS plugin with `position: "append" | "prepend"`.
- `wrapperRules(prefix?)` — returns the wrapper layout rules as CSS text.
- `./layouts.css` — published stylesheet export.

## cssdoc

`./model.json` publishes the documented `wrapper` layout record as a `CssDocEntry[]` model. Add it to
your `cssdoc.json` `providers` so a consumer project resolves these classes/modifiers:

```jsonc
{
  "providers": [{ "path": "./node_modules/@pantoken/plugin-layouts/model.json" }],
  // Built with a different prefix than the default "instui-" (or none)? Rewrite it — `to` is used
  // verbatim, no separator assumed:
  //   "prefix": { "from": "instui-", "to": "acme-" }
}
```
