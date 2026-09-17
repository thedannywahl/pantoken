# @pantoken/shadcn

Theme [shadcn/ui](https://ui.shadcn.com) with Instructure tokens. It points shadcn's CSS-variable
contract (`--background`, `--primary`, `--ring`, `--radius`, …) at `var(--instui-*)`, so shadcn
components adopt the Instructure look and keep theming through the same custom properties. Icons
align for free — shadcn and Instructure UI both use Lucide. The bridge covers the current base,
chart, and sidebar theme variables.

## Install

```sh
npm i @pantoken/shadcn @pantoken/css
```

Also available as `pantoken/shadcn`.

## Usage

Import the static file, after the pantoken stylesheet defines the properties:

```css
@import "@pantoken/css/style.css"; /* defines the --instui-* custom properties */
@import "@pantoken/shadcn/theme.css"; /* maps shadcn's variables → var(--instui-*) */
@import "@pantoken/shadcn/tailwind-v4.css"; /* exposes the variables to Tailwind v4 */
```

Or generate the bridge yourself:

```ts
import { shadcnCss, toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
```

The separate Tailwind v4 stylesheet emits `@theme inline` color aliases and shadcn's derived
`--radius-sm` through `--radius-4xl` scale. Don't import it in Tailwind v3 projects; instead use a
configuration that reads the bridge variables as direct values without an `hsl(var(--x))` wrapper.
Because the values are `var(--instui-*)` references, `@pantoken/css` must be present to define them.

## API

- **`toShadcnCss(options?): string`** — emit the shadcn → Instructure bridge CSS. Pass `{ selector }`
  to change the wrapping selector (default `":root"`).
- **`shadcnCss: string`** — the ready-made bridge stylesheet.
- **`toShadcnTailwindV4Css(): string`** — emit Tailwind v4 `@theme inline` aliases and radii.
- **`shadcnTailwindV4Css: string`** — the ready-made Tailwind v4 alias stylesheet.
- **`SHADCN_TO_INSTUI`** — the frozen map of shadcn CSS variable to the Instructure token it resolves
  to.
- **`ToShadcnCssOptions`** — options type for `toShadcnCss`.
- **`./theme.css`** — the generated static bridge stylesheet, for `@import` after `@pantoken/css`.
- **`./tailwind-v4.css`** — Tailwind v4 aliases, imported after `./theme.css`.
- **`./components.css`** — optional Pantoken prose styles scoped to `.pantoken-prose`; it isn't a
  shadcn component bundle.

## Related

- Pairs with `@pantoken/css` for the `--instui-*` custom properties the bridge points at.
- Pair with `@pantoken/tailwind` for the matching Tailwind theme.

## License

MIT
