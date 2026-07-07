# @pantoken/plugin-visual-debug

The CSS for InstUI's `withVisualDebug` prop — a single `-with-visual-debug` modifier that outlines an
element and its immediate children for layout debugging.

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
```

```html
<div class="instui-view -with-visual-debug">…</div>
```

It's a dash-prefixed modifier, so it composes with any base. The outline colour is the
`--pantoken-visual-debug-color` custom property (default a bright magenta); pass `color` to change the
default, or set the custom property in your own CSS.
