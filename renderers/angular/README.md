# @pantoken/angular

Angular helpers over `@pantoken/web-components`: register the Instructure custom elements once at
bootstrap, and read resolved `--instui-*` token values at runtime.

## Install

```sh
npm i @pantoken/angular
```

Also available as `pantoken/angular`.

## Usage

```ts
import { registerPantokenElements, readToken } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap

const brand = readToken("--instui-color-background-brand", "#0374B5");
```

Add `CUSTOM_ELEMENTS_SCHEMA` to any component or module that uses `<instui-icon>` so Angular's
template compiler accepts the tag.

## API

- **`registerPantokenElements(): void`** — register the pantoken custom elements. Call once at bootstrap.
- **`readToken(name, fallback?): string`** — read a resolved `--instui-*` value. Returns `fallback` on the server.
- **`register`** — re-exported from `@pantoken/web-components` for direct control over registration timing.

## Related

- Pairs with `@pantoken/css` for the base stylesheet that defines the `--instui-*` properties.
- Wraps `@pantoken/web-components`, which supplies the custom elements.

## License

MIT
