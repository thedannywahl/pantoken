# @pantoken/shadcn

Theme [shadcn/ui](https://ui.shadcn.com) with Instructure tokens. It points shadcn's CSS-variable
contract (`--background`, `--primary`, `--ring`, `--radius`, …) at `var(--instui-*)`, so shadcn
components adopt the Instructure look and keep theming through the same custom properties. Icons
align for free — shadcn and Instructure UI both use Lucide.

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
```

Or generate the bridge yourself:

```ts
import { shadcnCss, toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
```

Pair with `@pantoken/tailwind` for the Tailwind theme, and use a shadcn/Tailwind setup that reads
colors as direct values (Tailwind v4 `@theme`, or v3 without the `hsl(var(--x))` wrapper). Because
the values are `var(--instui-*)` references, `@pantoken/css` must be present to define them.

## API

- **`toShadcnCss(options?): string`** — emit the shadcn → Instructure bridge CSS. Pass `{ selector }`
  to change the wrapping selector (default `":root"`).
- **`shadcnCss: string`** — the ready-made bridge stylesheet.
- **`SHADCN_TO_INSTUI`** — the frozen map of shadcn CSS variable to the Instructure token it resolves
  to.
- **`ToShadcnCssOptions`** — options type for `toShadcnCss`.
- **`./theme.css`** — the generated static bridge stylesheet, for `@import` after `@pantoken/css`.

## Related

- Pairs with `@pantoken/css` for the `--instui-*` custom properties the bridge points at.
- Pair with `@pantoken/tailwind` for the matching Tailwind theme.

## License

MIT
