[pantoken](../../../../index.md) / flatten-property

# flatten-property

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-flatten-property` — konverter `@property` at-rules til almindelige custom-property
erklæringer.

`@property` at-rules registrerer typede CSS custom properties med `syntax`, `inherits`, og
`initial-value` deskriptorer. De medfører betydelig byte-overhead — ~60 bytes boilerplate pr.
egenskap — og er unødvendige når stilarket er et selvstændigt bundle hvor type
registrering giver ingen runtime-fordel. Dette plugin erstatter hver `@property` blok med en
eenkelt `--name: value` erklæring inde i en valgt selector, der genvinder al den overhead.

**Semantisk note:** Fjernelse af `@property` mister CSS type-registrering. Typede transitions/animationer,
`@starting-style`, og CSS Typed OM er afhængige af det. Anvend kun på bundles hvor denne semantik
ikke er nødvendig.

## Eksempel

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";
const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## Interfaces

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)

## Variabler

- [flattenProperty](variables/flattenProperty.md)
