[pantoken](../../../../index.md) / flatten-property

# flatten-property

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-flatten-property` — converteix `@property` at-rules a declaracions de propietat personalitzada simple.

Les at-rules `@property` registren propietats CSS personalitzades tipificades amb descriptors `syntax`, `inherits` i
`initial-value`. Comporten una sobrecàrrega significativa de bytes — ~60 bytes de boilerplate per
propietat — i són innecessaris quan el full d'estils és un paquet autònoma on el registre de tipus
no proporciona cap benefici de temps d'execució. Aquest connector reemplaça cada bloc `@property` amb una
declaració simple `--name: value` dins d'un selector escollit, recuperant tota aquesta sobrecàrrega.

**Nota semàntica:** eliminar `@property` perd el registre de tipus CSS. Les transicions/animacions tipificades,
`@starting-style` i l'OM CSS tipificat en depenen. Aplicar només a paquets on aquestes semàntiques
no es necessiten.

## Example

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";
const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## Interfaces

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)

## Variables

- [flattenProperty](variables/flattenProperty.md)
