[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / checkPlugins

# Function: checkPlugins()

> **checkPlugins**(`plugins`, `stage`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ֆիլտրել լրացուցիչ մոդուլի ցուցակը մինչ նրանք, որ մասնակցում են `stage`-ին, մյուսների մասին հատկություն:

## Parameters

### plugins

readonly [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Գրանցված լրացուցիչ մոդուլներ:

### stage

[`Stage`](../type-aliases/Stage.md)

Վազեցվող փուլ:

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Լրացուցիչ մոդուլներ, որ կար ունեն `stage`-ի համար:

## Example

**Պահել միայն փուլում մասնակցող լրացուցիչ մոդուլներ**

```ts
import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";

const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });

// Warns that "tok" has no css hook, then returns just the css plugin.
checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
```
