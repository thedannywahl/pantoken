# @pantoken/plugin-layouts

Layout snippets and composition records for downstream consumers.

This package provides localized `PageLayout` HTML snippets for Canvas and other content editors.
It also keeps layout-level CSS records for `wrapper`, `callout`, `hero`, `page-layout`,
`rubric-note`, `testimonial`, and `two-column` compositions.

## Install

```sh
npm i @pantoken/plugin-layouts
```

Also available as `pantoken/layouts`.

## Usage

Use the bundled HTML snippets when you need ready-to-insert page content:

```ts
import { pageLayoutTemplates, renderPageLayout } from "@pantoken/plugin-layouts";

const layouts = pageLayoutTemplates.map((layout) => renderPageLayout(layout, "en-GB"));
```

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

Or import one layout:

```ts
import "@pantoken/plugin-layouts/hero.css";
```

## API

- `layouts(options?)` — returns a CSS plugin with `position: "append" | "prepend"`.
- `<name>Rules(prefix?)` — returns one layout's CSS text.
- `<name>Template(prefix?)` — returns canonical HTML for one layout.
- `pageLayouts` — English-rendered starter page records for Canvas and other content editors.
- `pageLayoutTemplates` — unresolved starter page records with `{{key}}` text placeholders.
- `renderPageLayout(layout, locale?)` — resolves a starter page record with `layouts.strings`.
- `PageLayoutImagePlaceholder` — provider-neutral image intent that consumers can materialize.
- `./layouts.css` — aggregate stylesheet export.
- `./<name>.css` — per-layout stylesheet exports.

## cssdoc

`./model.json` publishes all documented layout records as a `CssDocEntry[]` model. Add it to
your `cssdoc.json` `providers` so a consumer project resolves these classes/modifiers:

```jsonc
{
  "providers": [{ "path": "./node_modules/@pantoken/plugin-layouts/model.json" }],
  // Built with a different prefix than the default "instui-" (or none)? Rewrite it — `to` is used
  // verbatim, no separator assumed:
  //   "prefix": { "from": "instui-", "to": "acme-" }
}
```

Page layouts may declare image slots with `imagePlaceholders`. The HTML uses an
`data-pantoken-image-placeholder` marker on an `instui-img` image without embedding a provider URL.
Consumers resolve the slot and should always emit an `alt` attribute; use `alt=""` when the image is
decorative.
