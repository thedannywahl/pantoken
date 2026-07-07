# @pantoken/svelte

Svelte helpers over `@pantoken/web-components`: an `icon` action that renders an Instructure glyph
into a node, plus a token reader.

## Install

```sh
npm i @pantoken/svelte
```

Also available as `pantoken/svelte`.

## Usage

```svelte
<script>
  import { icon, readToken } from "@pantoken/svelte";
  import "@pantoken/css";
</script>

<span use:icon={"arrow-left"} />
```

The `<instui-icon>` custom element also works directly once `register()` has run.

## API

- **`icon(node, name): ActionResult`** — Svelte action that renders the icon's inline SVG into the host element and updates when the name changes.
- **`readToken(name, fallback?): string`** — read a resolved `--instui-*` value. Returns `fallback` on the server.
- **`ActionResult`** — the action's return shape (`update`, `destroy`).
- **`register`** — re-exported from `@pantoken/web-components` for direct control over registration timing.

## Related

- Pairs with `@pantoken/css` for the base `--instui-*` custom properties.
- Wraps `@pantoken/web-components`, which supplies the custom elements and icon SVGs.

## License

MIT
