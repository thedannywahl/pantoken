# @pantoken/plugin-stacking

Named z-index depths from InstUI's view stacking scale — `deepest`, `below`, `above`, `topmost` — as
`--instui-stacking-*` tokens. The matching `.instui-stack-*` utility classes now live in
`@pantoken/components`' own `stacking` utility — this plugin only bakes the tokens for consumers
using the lower-level `@pantoken/css`/`@pantoken/tokens` pipeline directly.

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```
