[pantoken](../../../../index.md) / prune-custom-props

# prune-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-prune-custom-props` — tree-shake unused custom properties from a composed
stylesheet.

pantoken's `@pantoken/css` emits the whole `--instui-*` token set (≈1,800 icon data-URIs
included). A renderer that builds on that layer but only styles a slice of the system would
otherwise ship the entire set — so any such renderer wants this. Starting from the `var()`
references in real (non-custom-property) declarations, it transitively keeps only the custom
properties actually reachable, and drops the matching unused `@property` registrations.

It's a standalone PostCSS plugin (run it in your own PostCSS pipeline). The factory returns a
plain plugin object, so importing this module pulls in no runtime dependency — `postcss` is only
a type.

## Dæmi

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
```

## Breytur

- [pruneCustomProps](variables/pruneCustomProps.md)

## Tilvísanir

### default

Renames and re-exports [pruneCustomProps](variables/pruneCustomProps.md)
