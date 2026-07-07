# @pantoken/vue

A Vue plugin over `@pantoken/web-components`. It registers the Instructure custom elements and tells
Vue's compiler to treat `instui-*` tags as custom elements.

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
