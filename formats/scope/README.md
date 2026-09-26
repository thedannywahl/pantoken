# @pantoken/scope

Run several pantoken themes and color schemes in one document. Scopes apply theme, scheme, and
color settings to a subtree, inherit independently from ancestors, and can form hard boundaries for
previews or embedded applications.

The package is browser-only and node-free. It supplies the runtime half of pantoken's scoped CSS
contract; load the corresponding token/component stylesheets separately.

## Install

```sh
npm i @pantoken/scope
```

Also available as `pantoken/scope`.

## Usage

Create independent scopes on the same page:

```ts
import { createScope } from "@pantoken/scope";

const app = createScope(document.querySelector("#app")!, {
  theme: "rebrand",
  scheme: "dark",
});

const preview = createScope(document.querySelector("#preview")!, {
  instanceId: "preview",
  theme: "canvas",
  scheme: "light",
  boundary: true,
});

preview.set({ theme: "canvasHighContrast" });
preview.set({ scheme: null }); // inherit the nearest scheme again
```

Each scope writes `data-pantoken-theme`, `data-pantoken-scheme`, and `data-pantoken-color` to its
element. Descendants resolve each field independently. `boundary: true` prevents ancestors outside
the scope from affecting it. Call `destroy()` when the scope is no longer needed.

For an embedded document, connect the child frame to a host scope:

```ts
// In the host document
const detach = app.attachFrame(document.querySelector("iframe")!);

// In the frame
import { connectScope } from "@pantoken/scope";

const disconnect = connectScope({ hostOrigin: "https://example.test" });
```

The host sends updates only to frames explicitly attached to that scope. Use `"*"` as
`hostOrigin` only for an opaque-origin `srcdoc` frame.

## API

- **`createScope(element, options?): PantokenScope`** — create and register a live scope. Its
  methods include `get`, `set`, `resolve`, `attachFrame`, `subscribe`, and `destroy`.
- **`getScope(instanceId?): PantokenScope | undefined`** — retrieve the registered scope for an
  instance in the current document.
- **`connectScope(options?): () => void`** — receive scope updates in an embedded document.
- **`resolveScope(element): ResolvedScope`** — resolve theme, scheme, color, and instance by walking
  ancestors. Resolution stops at a boundary or shadow root.
- **`resolveScheme(element): "light" | "dark"`** and **`resolveInstance(element): string`** —
  resolve the effective scheme or owning instance.
- **`observeScope(element, listener): () => void`** — watch for changes to the resolved scope,
  including changes made by an ancestor.
- **`ensureProperties(css, options?): boolean`** and **`hasProperties(id?, doc?): boolean`** —
  inject and check document-global `@property` registrations once per identifier.
- **`ScopeConfig`**, **`ResolvedScope`**, **`PantokenScope`**, **`CreateScopeOptions`**, and
  **`ConnectScopeOptions`** — runtime configuration and scope types.

## Related

- Pair with `@pantoken/css` or `@pantoken/components` stylesheets that select the
  `data-pantoken-*` attributes.
- Use `@pantoken/inline-styles` for static HTML output instead of browser-side scoped theming.

## License

MIT
