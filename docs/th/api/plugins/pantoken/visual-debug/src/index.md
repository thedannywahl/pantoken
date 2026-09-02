[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

`@pantoken/plugin-visual-debug` — the CSS for InstUI's `withVisualDebug` prop.

InstUI's layout primitives (View, Flex, Grid, List, …) take `withVisualDebug` to outline the box
and its children while debugging a layout. This plugin emits a single dash-prefixed modifier,
`-with-visual-debug`, that works on any element (compound with any base, e.g.
`.instui-view -with-visual-debug`). The outline colour is a `--pantoken-visual-debug-color` custom property
(default a bright magenta) so it's easy to retint.

## ตัวอย่าง

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## อินเทอร์เฟซ

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## ตัวแปร

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## ฟังก์ชัน

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## การอ้างอิง

### default

Renames and re-exports [visualDebug](functions/visualDebug.md)
