[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-visual-debug` — CSS'et for InstUI's `withVisualDebug` prop.

InstUI's layout primitiver (View, Flex, Grid, List, …) tager `withVisualDebug` for at skitsere boksen
og dens børn mens du debugger et layout. Dette plugin udsender en enkelt bindestreg-præfixet modifier,
`-with-visual-debug`, der fungerer på ethvert element (sammensat med en hvilken som helst base, f.eks.
`.instui-view -with-visual-debug`). Omridsets farve er en `--pantoken-visual-debug-color` custom property
(standard en lysende magenta) så det er nemt at omfarve.

## Example

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## Interfaces

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## Variables

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## Functions

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## References

### default

Omdøber og re-eksporterer [visualDebug](functions/visualDebug.md)
