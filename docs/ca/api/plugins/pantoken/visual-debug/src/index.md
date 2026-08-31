[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-visual-debug` — el CSS per a la propietat `withVisualDebug` d'InstUI.

Les primitives de disseny d'InstUI (View, Flex, Grid, List, …) prenen `withVisualDebug` per a esbossar la caixa
i els seus fills mentre es depura un disseny. Aquest connector emet un únic modificador amb prefix de guió,
`-with-visual-debug`, que funciona en qualsevol element (composat amb qualsevol base, p. ex.
`.instui-view -with-visual-debug`). El color del contorn és una propietat personalitzada `--pantoken-visual-debug-color`
(per defecte magenta brillant) perquè sigui fàcil retintela.

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

Reanomena i reexporta [visualDebug](functions/visualDebug.md)
