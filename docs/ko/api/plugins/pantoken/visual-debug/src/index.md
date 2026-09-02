[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

`@pantoken/plugin-visual-debug` — the CSS for InstUI's `withVisualDebug` prop.

InstUI's layout primitives (View, Flex, Grid, List, …) take `withVisualDebug` to outline the box
and its children while debugging a layout. This plugin emits a single dash-prefixed modifier,
`-with-visual-debug`, that works on any element (compound with any base, e.g.
`.instui-view -with-visual-debug`). The outline colour is a `--pantoken-visual-debug-color` custom property
(default a bright magenta) so it's easy to retint.

## 예제

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## 인터페이스

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## 변수

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## 함수

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## 참조

### default

Renames and re-exports [visualDebug](functions/visualDebug.md)
