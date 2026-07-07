# @pantoken/plugin-elevation

Named elevation shadows as multi-layer `box-shadow` tokens. A shadow at a given elevation is two
stacked layers, and there are several elevations, so it can't be one flat token — this plugin emits
one `--instui-elevation-<name>` custom property per level.

The named levels and geometry come from InstUI's `ui-view` shadow scale; the colours come from
pantoken's themed `--instui-color-drop-shadow-shadow-color1/2` tokens, so shadows deepen in dark mode.

## Install

```sh
npm i @pantoken/plugin-elevation
```

Also available as `pantoken/elevation`.

## Usage

Inject the elevation custom properties through `toCss`:

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { elevation } from "@pantoken/plugin-elevation";

const css = toCss(byTheme("rebrand"), { plugins: [elevation()] });
// :root { --instui-elevation-resting: …; --instui-elevation-above: …; --instui-elevation-topmost: …; … }
```

Then reference a level:

```css
.card {
  box-shadow: var(--instui-elevation-resting);
}
.card:hover {
  box-shadow: var(--instui-elevation-topmost);
}
```

Or bake resolved records into every output (CSS, Swift, …) through `buildTokens`:

```ts
import { buildTokens } from "@pantoken/core";
import { elevation } from "@pantoken/plugin-elevation";

buildTokens({ theme: "rebrand", plugins: [elevation()] });
```

## Levels

| Token                           | Alias of  | Use                             |
| ------------------------------- | --------- | ------------------------------- |
| `--instui-elevation-resting`    | —         | at-rest cards, low emphasis     |
| `--instui-elevation-above`      | —         | raised surfaces, menus          |
| `--instui-elevation-topmost`    | —         | modals, popovers, dragged items |
| `--instui-elevation-depth1/2/3` | the above | numeric aliases                 |
| `--instui-elevation-card`       | resting   | card at rest                    |
| `--instui-elevation-cardHover`  | topmost   | card on hover                   |
