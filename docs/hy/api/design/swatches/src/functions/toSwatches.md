[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / toSwatches

# Function: toSwatches()

> **toSwatches**(`tokens`, `mode?`): [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կրճատել տոկենի IR-ը գունային նմուշների հարթ ցանկի. լուծել հղումները, ընտրել ռեժիմ, պահել միայն
տոկենները, որոնց արժեքը hex գույն է (պատկերներն և ոչ գույնի տոկենները բաց են թողնվում)։

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### mode?

[`Mode`](../type-aliases/Mode.md) = `"light"`

Որ գույնի ռեժիմ լուծել (լռելյայն `"light"`).

## Returns

[`Swatch`](../interfaces/Swatch.md)[]

Նմուշների ցուցակը, որը անվանված է տոկենով (առանց `--instui-` նախածանցի).

## Examples

**Նվազեցրեք տոկեն IR-ը լույսի ռեժիմի նմուշներին**

```ts
import { toSwatches } from "@pantoken/swatches";
import { tokens } from "@pantoken/tokens";

const swatches = toSwatches(tokens); // [{ name: "color-background-brand", hex: "#…" }, …]
```

**Մութ ռեժիմ**

```ts
import { toSwatches } from "@pantoken/swatches";
import { byTheme } from "@pantoken/tokens";

const swatches = toSwatches(byTheme("canvas"), "dark");
```
