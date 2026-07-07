# @pantoken/hugo

Emit the Instructure token stylesheet for a Hugo site. Hugo has no standard theming-variable
contract, so this delivers the tokens as drop-in assets under `assets/`, where Hugo Pipes (and Dart
Sass) pick them up.

## Install

```sh
npm i @pantoken/hugo
```

## Usage

```ts
import { toHugoAssets } from "@pantoken/hugo";

for (const { path, content } of toHugoAssets()) {
  /* write `path` under your site root */
}
```

Or via the CLI, straight into a site:

```sh
pantoken generate hugo --out ./my-site
```

## Output

Three files under the site root:

- `assets/scss/_pantoken.scss` — a Sass partial (`$instui-*` variables). Import it from your main
  SCSS and compile with `resources.Get "scss/main.scss" | toCSS`.
- `assets/css/pantoken.css` — a plain stylesheet (`--instui-*` custom properties) you can pipe
  directly with `resources.Get "css/pantoken.css"`.
- `assets/css/pantoken-prose.css` — an InstUI-look stylesheet for rendered content (tables,
  headings, links, code) in a `.pantoken-prose` region. From `@pantoken/components`.

Use the Sass partial if your site compiles SCSS; use the plain CSS otherwise. Add the prose sheet
and wrap your content in `.pantoken-prose` for the InstUI content look.

## API

- **`toHugoAssets(): HugoFile[]`** — build the token asset files (paths relative to the site root).
- **`HugoFile`** — a generated file: `path` (site-relative) and `content`.

## Related

- Wraps `@pantoken/scss` (the Sass partial), `@pantoken/css` (the plain stylesheet), and
  `@pantoken/components` (the content look).
- Mirrors `@pantoken/jekyll`, the same idea for Jekyll sites.

## License

MIT
