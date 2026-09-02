[pantoken](../../../../index.md) / [renderers/bootstrap/src](../index.md) / toBootstrapCss

# Funktio: toBootstrapCss()

> **toBootstrapCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Emit the Bootstrap → Instructure CSS-variable bridge.

## Parametrit

### options?

[`ToBootstrapCssOptions`](../interfaces/ToBootstrapCssOptions.md) = `{}`

[ToBootstrapCssOptions](../interfaces/ToBootstrapCssOptions.md).

## Palauttaa

`string`

The bridging CSS string.

## Esimerkit

**Default :root bridge**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss();
// ":root { --bs-primary: var(--instui-color-background-brand); … }"
```

**Scope to Bootstrap's theme attribute**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss({ selector: "[data-bs-theme]" });
```
