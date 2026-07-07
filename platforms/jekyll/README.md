# @pantoken/jekyll

Emit the Instructure token stylesheet for a Jekyll site. Jekyll has no standard theming-variable
contract, so this delivers the tokens as drop-in assets: a Sass partial for `_sass/` and a plain CSS
file for `assets/css/`.

## Install

```sh
npm i @pantoken/jekyll
```

## Usage

```ts
import { toJekyllAssets } from "@pantoken/jekyll";

for (const { path, content } of toJekyllAssets()) {
  /* write `path` under your site root */
}
```

Or via the CLI, straight into a site:

```sh
pantoken generate jekyll --out ./my-site
```

## Output

Three files under the site root:

- `_sass/pantoken.scss` — a Sass partial (Instructure tokens as `$instui-*` variables). Import it
  from your main stylesheet: `@import "pantoken";`.
- `assets/css/pantoken.css` — a plain stylesheet (`--instui-*` custom properties) for sites that
  don't use Sass. Reference it from your layout.
- `assets/css/pantoken-prose.css` — an InstUI-look stylesheet for rendered content (tables,
  headings, links, code) in a `.pantoken-prose` region. From `@pantoken/components`.

Use the Sass partial if your site compiles SCSS; use the plain CSS otherwise. Add the prose sheet
and wrap your content in `.pantoken-prose` for the InstUI content look.

## API

- **`toJekyllAssets(): JekyllFile[]`** — build the token asset files (paths relative to the site
  root).
- **`JekyllFile`** — a generated file: `path` (site-relative) and `content`.

## Related

- Wraps `@pantoken/scss` (the Sass partial), `@pantoken/css` (the plain stylesheet), and
  `@pantoken/components` (the content look).
- Mirrors `@pantoken/hugo`, the same idea for Hugo sites.

## License

MIT
