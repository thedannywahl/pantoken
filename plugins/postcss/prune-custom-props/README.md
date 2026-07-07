# @pantoken/plugin-prune-custom-props

A PostCSS plugin — not a pantoken plugin — that tree-shakes unused custom properties out of a
composed stylesheet. Run it at the end of your own PostCSS pipeline.

## Install

```sh
npm i -D @pantoken/plugin-prune-custom-props postcss
```

Also available as `pantoken/pruneCustomProps`.

## Usage

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const pruned = postcss([pruneCustomProps()]).process(fullCss, { from: undefined }).css;
```

pantoken's `@pantoken/css` emits the whole `--instui-*` token set, including roughly 1,800 icon
data-URIs. A renderer that builds on that layer but only styles part of the system would otherwise
ship the entire set. This plugin keeps only the tokens your rules actually reference.

## What it does

Starting from the `var(--x)` references in real (non-custom-property) declarations — the ones that
actually render — it transitively keeps every custom property those reach, drops the rest, and
removes the matching unused `@property` registrations. Rules left empty are removed too.

The factory returns a plain PostCSS plugin object, so importing this package adds no runtime
dependency of its own — `postcss` is only a type here, and a peer at the point you run it.

## API

- **`pruneCustomProps(): Plugin`** — create the prune-unused-custom-properties PostCSS plugin.
- **default export** — `pruneCustomProps`.

## Related

- Used by `@pantoken/pendo` and other renderers built on the full `@pantoken/css` token layer.

## License

MIT
