# @pantoken/drupal

Emit an Instructure-themed Drupal 10/11 sub-theme: the token stylesheet plus the `*.info.yml` and
`*.libraries.yml` a theme needs to load it. Drop the files into `themes/custom/<machine>/`.

## Install

```sh
npm i @pantoken/drupal
```

Also available as `pantoken/drupal`.

## Usage

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure" });
// [ instructure.info.yml, instructure.libraries.yml, css/tokens.css, css/pantoken-prose.css ]
for (const { path, content } of files) {
  /* write `path` under themes/custom/instructure/ */
}
```

Or via the CLI, straight into a theme directory:

```sh
pantoken generate drupal --out ./themes/custom/instructure
```

## Output

- `<machine>.info.yml` — the theme manifest (`core_version_requirement: ^10 || ^11`), attaching the
  `tokens` library.
- `<machine>.libraries.yml` — a `tokens` library that loads `css/tokens.css` and
  `css/pantoken-prose.css`.
- `css/tokens.css` — the `@pantoken/css` token stylesheet, defining the `--instui-*` custom
  properties your theme and modules consume.
- `css/pantoken-prose.css` — an InstUI-look stylesheet (from `@pantoken/components`) for rendered
  content in a `.pantoken-prose` region (tables, headings, links, code).

`<machine>` is the display name lower-snake-cased (for example `Instructure` → `instructure`).

## API

- **`toDrupalTheme(options?): DrupalFile[]`** — build the sub-theme files. `options` takes `name`
  (display name, default `"Instructure"`) and `baseTheme` (default `false`).
- **`machineName(name): string`** — convert a display name to a Drupal machine name (`lower_snake`).
- **`DrupalFile`** — a generated file: `path` (theme-relative) and `content`.
- **`ToDrupalThemeOptions`** — the options `toDrupalTheme` accepts.

## Related

- Wraps `@pantoken/css` (the token stylesheet) and `@pantoken/components` (the content look).

## License

MIT
