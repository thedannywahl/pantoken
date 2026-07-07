# @pantoken/react

Thin React helpers over `@pantoken/web-components` and the token CSS: an `<Icon>` component, a
`useToken` hook, and a `<TokenProvider>` that registers the custom elements client-side.

## Install

```sh
npm i @pantoken/react
```

Also available as `pantoken/react`.

## Usage

```tsx
import { TokenProvider, Icon, useToken } from "@pantoken/react";
import "@pantoken/css";

function App() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return (
    <TokenProvider>
      <Icon name="check-mark" size="1.25rem" /> Saved — {brand}
    </TokenProvider>
  );
}
```

For InstUI's full React component library, use `@instructure/ui-*` directly. This package is the
lightweight token and icon layer.

## API

- **`<Icon name size? color?>`** — render the `<instui-icon>` custom element (React 19 passes props straight to custom elements).
- **`<TokenProvider>`** — register the pantoken custom elements client-side, then render children.
- **`useToken(name, fallback?): string`** — hook returning a resolved `--instui-*` value. Re-reads when `name` changes; SSR-safe.
- **`readToken(name, fallback?): string`** — read a resolved `--instui-*` value once. Returns `fallback` on the server.
- **`IconProps`, `TokenProviderProps`** — component prop interfaces.
- **`register`** — re-exported from `@pantoken/web-components` for direct control over registration timing.

## Related

- Pairs with `@pantoken/css` for the base `--instui-*` custom properties.
- Wraps `@pantoken/web-components`, which supplies the custom elements.

## License

MIT
