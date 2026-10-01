# @pantoken/angular

Angular helpers over `@pantoken/web-components`: register the Instructure custom elements once at
bootstrap, and read resolved `--instui-*` token values at runtime.

## Compatibility

Verified with Angular 16.2.12 / TypeScript 5.1.6 and Angular 22.2.0 / TypeScript 6.0.3 by compiling
a standalone component that uses `CUSTOM_ELEMENTS_SCHEMA` for `<instui-icon>`. The existing package
tests cover registration and the server token fallback. See the
[compatibility matrix](https://pantoken.app/compatibility) for the exact host pairs.

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
