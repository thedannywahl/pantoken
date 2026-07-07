# @pantoken/plugin-stacking

Named z-index depths from InstUI's view stacking scale — `deepest`, `below`, `above`, `topmost` — as
`--instui-stacking-*` tokens plus `.instui-stack-*` utility classes.

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { stacking } from "@pantoken/plugin-stacking";

const css = toCss(byTheme("rebrand"), { plugins: [stacking()] });
```

```html
<div class="instui-view -position-relative instui-stack-above">…</div>
```

It defines both a `tokens` hook (bake `--instui-stacking-*` into any output) and a `css` hook
(self-contained `.instui-stack-*` classes), so you pick the layer.
