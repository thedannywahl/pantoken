[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# Function: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Որոշեք CSS `@property` `syntax`, որի ներքո concrete token պետք է գրանցվի: Tokens Studio `type`s-ը 1:1-ի հետ չեն քարտեզագրվում CSS syntax-ի հետ, այնպես որ արժեքը մատնացուց է լինում: Վերադարձնում է `"*"` (universal) ցանկացած բանի համար, որ առանձին, հաշվողական-անկախ typed token չէ:

## Parameters

### value

`string`

Concrete արժեք (ոչ `var()` / `light-dark()`):

## Returns

`string`

`@property` syntax descriptor:

## Examples

**Typed միայնակ-token արժեքներ**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("#03893D"); // → "<color>"
cssSyntaxForValue("2px"); // → "<length>"
cssSyntaxForValue("50%"); // → "<percentage>"
cssSyntaxForValue("400"); // → "<integer>"
```

**Font-relative միավորներ և բարդ արժեքներ վերադառնում են universal-ի**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("1rem"); // → "*" (rem isn't computationally independent)
cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
cssSyntaxForValue("currentColor"); // → "*"
```
