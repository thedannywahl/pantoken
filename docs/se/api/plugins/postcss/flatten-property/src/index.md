[pantoken](../../../../index.md) / flatten-property

# flatten-property

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

`@pantoken/plugin-flatten-property` — convert `@property` at-rules to plain custom-property
declarations.

`@property` at-rules register typed CSS custom properties with `syntax`, `inherits`, and
`initial-value` descriptors. They carry significant byte overhead — ~60 bytes of boilerplate per
property — and are unnecessary when the stylesheet is a self-contained bundle where type
registration provides no runtime benefit. This plugin replaces each `@property` block with a
simple `--name: value` declaration inside a chosen selector, recovering all that overhead.

**Semantic note:** removing `@property` loses CSS type registration. Typed transitions/animations,
`@starting-style`, and the CSS Typed OM depend on it. Only apply to bundles where those semantics
are not needed.

## Exempel

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";
const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## Interfáčat

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)

## Variables

- [flattenProperty](variables/flattenProperty.md)
