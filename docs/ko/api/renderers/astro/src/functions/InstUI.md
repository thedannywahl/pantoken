[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / InstUI

# 함수: InstUI()

> **InstUI**(`options?`): [`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Create the pantoken Starlight plugin.

## 매개변수

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## 반환값

[`StarlightPluginLike`](../interfaces/StarlightPluginLike.md)

A Starlight plugin that injects the pantoken stylesheet into the page head.

## 예제

**astro.config.mjs**

```ts
import starlight from "@astrojs/starlight";
import { InstUI } from "@pantoken/astro";
import { transition } from "@pantoken/plugin-transition";

export default defineConfig({
  integrations: [
    starlight({
      title: "Docs",
      plugins: [InstUI({ theme: "rebrand", plugins: [transition()] })],
    }),
  ],
});
```
