# @pantoken/web-components

Framework-agnostic custom elements for Instructure UI. One package gives Vue, Svelte, Angular, and
plain HTML the icon plus a set of token-styled components (from `@pantoken/components`), with no
per-framework port.

## Install

```sh
npm i @pantoken/web-components
```

Also available as `pantoken/webComponents`.

## Usage

```ts
import "@pantoken/web-components"; // auto-registers the elements in the browser
import "@pantoken/css"; // defines the --instui-* custom properties the elements read
```

```html
<instui-button><instui-icon name="arrow-left"></instui-icon> Save</instui-button>
<instui-button variant="secondary">Cancel</instui-button>
<instui-alert variant="success">Saved.</instui-alert>
<instui-badge variant="danger">3</instui-badge>
<instui-avatar variant="blue">AB</instui-avatar>
<instui-progress value="60"></instui-progress>
```

The elements (each renders the matching `@pantoken/components` CSS into its shadow root; tokens are
inherited custom properties, so they pierce the shadow boundary — load `@pantoken/css`):

- `<instui-icon name="arrow-left" size="1.5rem" color="…">` — glyphs from `@pantoken/icons`.
- `<instui-button variant="secondary|danger">` — with `disabled` / `aria-disabled`.
- `<instui-alert variant="info|success|warning|danger">`.
- `<instui-badge variant="success|danger">`, `<instui-pill variant="info|success|warning|danger">`,
  `<instui-tag>`.
- `<instui-avatar variant="blue|green|red|orange" size="sm|lg" shape="rectangle">`.
- `<instui-spinner>`, `<instui-progress value="0–100" variant="success|danger">`.
- `<instui-progress-circle value="0–100" label="…">` — a ring driven by `value`.
- `<instui-metric value="…" label="…">`, `<instui-rating value="3" max="5">`.
- `<instui-icon-button label="…">`, `<instui-toggle-button pressed="true|false">`.
- `<instui-truncate lines="2">` — omit `lines` for a single-line ellipsis.
- `<instui-img src="…" alt="…" constrain="cover|contain" display="block">`.
- `<instui-side-nav-bar minimized="true|false">`, `<instui-tree-browser>`, `<instui-calendar>` —
  containers; slot the items / tree / day cells.
- `<instui-tooltip tip="…" placement="bottom|start|end">` — the slotted trigger plus a hover/focus
  bubble.
- `<instui-modal open>` — renders a real `<dialog>`; the `open` attribute drives `showModal()`/`close()`,
  and native dismissal (`Esc`/backdrop) reflects back and fires a `close` event.
- `<instui-context-view>`, `<instui-popover>`, `<instui-tray placement="start|end|top|bottom" size="…">`
  — native popovers; toggle from a button with `popovertarget`/`command`.
- `<instui-in-place-edit value="…" readonly>` — click-to-edit field; commits on Enter/blur (fires a
  `change` event), reverts on Escape.

The module is Node-safe: element classes are defined inside `register()`, which no-ops when there is
no DOM. Call `register(customElements)` manually if you need to control timing.

## API

- **`register(registry?): void`** — define the custom elements into a registry (defaults to `globalThis.customElements`). No-op when there is no DOM, so it's safe to import during SSR or a build.
- **`iconSvg(name, resolve?): string`** — resolve an icon name to inline SVG (empty string when unknown). Pure; the element renders the result.
- **`ELEMENTS`** — the tuple of custom-element tag names this package registers.

## Related

- Styles the elements with `@pantoken/components` and reads glyphs from `@pantoken/icons`.
- Pairs with `@pantoken/css` for the base `--instui-*` custom properties.
- Wrapped by the per-framework helpers: `@pantoken/angular`, `@pantoken/react`, `@pantoken/svelte`, and `@pantoken/vue`.

## License

MIT
