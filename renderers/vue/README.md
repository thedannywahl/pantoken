# @pantoken/vue

A Vue plugin over `@pantoken/web-components`. It registers the Instructure custom elements and tells
Vue's compiler to treat `instui-*` tags as custom elements.

## Compatibility

Verified with Vue 3.0.0 and 3.5.43 using server-rendered apps that install `PantokenVue`, emit an
`instui-icon`, and use the SSR-safe token fallback. See the
[compatibility matrix](https://pantoken.app/compatibility) for exact tested releases.

## Install

```sh
npm i @pantoken/vue
```

Also available as `pantoken/vue`.

## Usage

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
```

## API

- **`PantokenVue`** — the Vue plugin. `app.use(PantokenVue)` registers the custom elements and configures the compiler to accept `instui-*` tags. Also the default export.
- **`readToken(name, fallback?): string`** — read a resolved `--instui-*` value. Returns `fallback` on the server.
- **`register`, `iconSvg`** — re-exported from `@pantoken/web-components` for direct registration and icon-SVG lookup.

## Related

- Pairs with `@pantoken/css` for the base `--instui-*` custom properties.
- Wraps `@pantoken/web-components`, which supplies the custom elements.

## License

MIT
