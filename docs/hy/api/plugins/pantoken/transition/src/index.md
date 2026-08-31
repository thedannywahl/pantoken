[pantoken](../../../../index.md) / transition

# transition

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-transition` — InstUI-ի `Transition` օտարման հետևում գտնվող `--instui-transition-duration`/`--instui-transition-timing`
տոկեններ:

CSS-ը ինքնին (`.instui-transition` բազային կանոն գումարած `fade`/`scale`/`slide-*` վիճակի դասեր)
հիմա կենդանի է `@pantoken/components`-ի սեփական `transition` օտարման մեջ; այս խմբակը միայն երկու
տևողություն/ժամանակ տոկեններ մի տոկեն IR-ի մեջ թխում է անմիջապես ավելի ցածր մակարդակի `@pantoken/css` +
`@pantoken/tokens` խողովակից օգտվող սպառողների համար:

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

## Interfaces

- [TransitionOptions](interfaces/TransitionOptions.md)

## Functions

- [transition](functions/transition.md)

## References

### default

Վերանվանում և վերաներմուծում [transition](functions/transition.md)
